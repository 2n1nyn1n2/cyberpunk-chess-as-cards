import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import flatbuffers from "flatbuffers";

const IMAGE_SERVICE_API = process.env.IMAGE_SERVICE_API;
const IMAGE_SERVICE_SHARED_SECRET = process.env.IMAGE_SERVICE_SHARED_SECRET;

// --- Setup Environment Pathing ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = path.join(__dirname, "./imageService.proto");

// --- Load Proto Definition ---
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const ImageService = protoDescriptor.ImageGenerationService;

// --- Initialize Client ---
const client = new ImageService(
  IMAGE_SERVICE_API,
  grpc.credentials.createInsecure(),
);

/**
 * 1. UNARY CALL: Echo
 * Pattern: One Request -> One Response
 */
const runEcho = (name) => {
  const request = { name, sharedSecret: IMAGE_SERVICE_SHARED_SECRET };

  client.Echo(request, (err, response) => {
    if (err) return console.error("[Echo Error]:", err.message);
    console.log("[Echo Response]:", response.message);
    console.log("[Server ID]:", response.serverIdentifier);
  });
};

/**
 * 2. SERVER-SIDE STREAMING: GenerateImage
 * Pattern: One Request -> Multiple Response Chunks
 */
const generateImage = (prompt) => {
  const request = {
    sharedSecret: IMAGE_SERVICE_SHARED_SECRET,
    // prompt: prompt,
    // device: 'LAPTOP',
    // scaleFactor: 1,
    // chunked: true,
    configuration: createConfigurationBuffer(),
  };

  console.log(`[Generate]: Starting stream for "${prompt}"...`);
  const call = client.GenerateImage(request);

  call.on("data", (response) => {
    // Handle Signposts (Progress updates)
    if (response.currentSignpost) {
      console.log(
        " -> Progress:",
        Object.keys(response.currentSignpost.signpost)[0],
      );
    }

    // Handle Image Data
    if (response.generatedImages && response.generatedImages.length > 0) {
      console.log(
        ` -> Received image chunk (${response.generatedImages[0].length} bytes)`,
      );
    }
  });

  call.on("error", (err) => console.error("[Generate Error]:", err));
  call.on("end", () => console.log("[Generate]: Stream closed by server."));
};

/**
 * 3. BIDIRECTIONAL STREAMING: UploadFile
 * Pattern: Stream Request <-> Stream Response
 */
const uploadFile = (filename, fileDataBuffer) => {
  const stream = client.UploadFile();

  // Handle incoming acknowledgments from the server
  stream.on("data", (response) => {
    console.log(
      `[Upload Response]: ${response.message} (Offset: ${response.receivedOffset})`,
    );
  });

  stream.on("error", (err) => console.error("[Upload Error]:", err));
  stream.on("end", () => console.log("[Upload]: Finished."));

  // A. Send Initial Request
  stream.write({
    initRequest: {
      filename: filename,
      totalSize: fileDataBuffer.length,
      sha256: Buffer.from("dummy-sha"), // In production, calculate real SHA256
    },
  });

  // B. Send Chunks
  const CHUNK_SIZE = 1024 * 32; // 32KB chunks
  for (let i = 0; i < fileDataBuffer.length; i += CHUNK_SIZE) {
    const chunk = fileDataBuffer.slice(i, i + CHUNK_SIZE);
    stream.write({
      chunk: {
        content: chunk,
        filename: filename,
        offset: i,
      },
    });
  }

  // Signal completion
  stream.end();
};

function createConfigurationBuffer() {
  const builder = new flatbuffers.Builder(1024);
  const bytes = builder.asUint8Array();
  return Buffer.from(bytes);
}

// --- Execute Examples ---
await runEcho("DrawThingsNodeUser");
await generateImage("A cyberpunk neon street");
// uploadFile("test.png", Buffer.from([0, 1, 2, 3])); // Example usage
