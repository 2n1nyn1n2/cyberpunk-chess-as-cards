import * as fs from "fs";

const regexObject = new RegExp("\\s", "g");

const POSSESSIONS_INPUT_FILE_PATH = "./data/possessions.json";

const POSSESSIONS_OUTPUT_FILE_PATH = "./.invokeAi/possessions-prompts.txt";

const possessionData = JSON.parse(
  fs.readFileSync(POSSESSIONS_INPUT_FILE_PATH, "utf8"),
);

const prompts = [];

let basePrompt = possessionData.prompt.join("\n");

const seed = Date.now() % 1000000;

const prompt = async (possession, possessionPrompt) => {
  console.log("starting", possession.name, "prompt");
  const body = {
    _version: 2,
    maskBlur: 16,
    maskBlurMethod: "box",
    canvasCoherenceMode: "Gaussian Blur",
    canvasCoherenceMinDenoise: 0,
    canvasCoherenceEdgeSize: 16,
    infillMethod: "lama",
    infillTileSize: 32,
    infillPatchmatchDownscaleSize: 1,
    infillColorValue: { r: 0, g: 0, b: 0, a: 1 },
    cfgScale: 7.5,
    cfgRescaleMultiplier: 0,
    guidance: 4,
    img2imgStrength: 0.75,
    optimizedDenoisingEnabled: true,
    iterations: 1,
    scheduler: "dpmpp_3m_k",
    upscaleScheduler: "kdpm_2",
    upscaleCfgScale: 2,
    seed: seed,
    shouldRandomizeSeed: false,
    steps: 30,
    model: {
      key: "55f939e9-9394-45d4-8db6-0eaf288e80f0",
      hash: "blake3:1f500a206b3b305723705d2c11800e8d0d6f1cdae637764ea9812a83f00e0ba5",
      name: "Juggernaut XL v9",
      base: "sdxl",
      type: "main",
    },
    vae: null,
    vaePrecision: "fp32",
    fluxVAE: null,
    seamlessXAxis: false,
    seamlessYAxis: false,
    clipSkip: 0,
    shouldUseCpuNoise: true,
    positivePrompt: possessionPrompt,
    negativePrompt: null,
    refinerModel: null,
    refinerSteps: 20,
    refinerCFGScale: 7.5,
    refinerScheduler: "euler",
    refinerPositiveAestheticScore: 6,
    refinerNegativeAestheticScore: 2.5,
    refinerStart: 0.8,
    t5EncoderModel: null,
    clipEmbedModel: null,
    clipLEmbedModel: null,
    clipGEmbedModel: null,
    controlLora: null,
    dimensions: {
      width: 1024,
      height: 1024,
      aspectRatio: { id: "1:1", value: 1, isLocked: false },
    },
  };
  const response = await fetch(
    "http://127.0.0.1:9091/api/v1/client_state/default/set_by_key?key=params",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "text/plain;charset=UTF-8",
        "sec-ch-ua":
          '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        Referer: "http://127.0.0.1:9091/",
      },
      body: JSON.stringify(body),
      method: "POST",
    },
  );
  const responseJson = await response.json();
  console.log("success", possession.name, "prompt", JSON.parse(responseJson));
};

const enqueueBatch = async (possession) => {
  console.log("starting", possession.name, "enqueueBatch");
  const body = {
    prepend: false,
    batch: {
      graph: {
        id: "sdxl_graph:DjDLTM0LHJ",
        nodes: {
          "sdxl_model_loader:EDJbEn2206": {
            type: "sdxl_model_loader",
            id: "sdxl_model_loader:EDJbEn2206",
            model: {
              key: "55f939e9-9394-45d4-8db6-0eaf288e80f0",
              hash: "blake3:1f500a206b3b305723705d2c11800e8d0d6f1cdae637764ea9812a83f00e0ba5",
              path: "55f939e9-9394-45d4-8db6-0eaf288e80f0",
              file_size: 6941188883,
              name: "Juggernaut XL v9",
              description: "Photograph-focused model.",
              source: "RunDiffusion/Juggernaut-XL-v9",
              source_type: "hf_repo_id",
              source_api_response: null,
              cover_image: null,
              type: "main",
              trigger_phrases: null,
              default_settings: {
                vae: null,
                vae_precision: null,
                scheduler: null,
                steps: null,
                cfg_scale: null,
                cfg_rescale_multiplier: null,
                width: 1024,
                height: 1024,
                guidance: null,
              },
              format: "diffusers",
              repo_variant: "fp16",
              prediction_type: "epsilon",
              variant: "normal",
              base: "sdxl",
            },
            is_intermediate: true,
            use_cache: true,
          },
          "positive_prompt:JSYR1x1ELL": {
            id: "positive_prompt:JSYR1x1ELL",
            type: "string",
            is_intermediate: true,
            use_cache: true,
          },
          "pos_cond:NIy4GzDEXc": {
            type: "sdxl_compel_prompt",
            id: "pos_cond:NIy4GzDEXc",
            is_intermediate: true,
            use_cache: true,
          },
          "pos_cond_collect:Oswhs47qEk": {
            type: "collect",
            id: "pos_cond_collect:Oswhs47qEk",
            is_intermediate: true,
            use_cache: true,
          },
          "neg_cond:wRECYTFU6A": {
            type: "sdxl_compel_prompt",
            id: "neg_cond:wRECYTFU6A",
            prompt: "",
            style: "",
            is_intermediate: true,
            use_cache: true,
          },
          "neg_cond_collect:89dlQlCoph": {
            type: "collect",
            id: "neg_cond_collect:89dlQlCoph",
            is_intermediate: true,
            use_cache: true,
          },
          "seed:RlFhzKOviv": {
            id: "seed:RlFhzKOviv",
            type: "integer",
            is_intermediate: true,
            use_cache: true,
          },
          "noise:Z7Fi2FB2bk": {
            type: "noise",
            id: "noise:Z7Fi2FB2bk",
            use_cpu: true,
            is_intermediate: true,
            use_cache: true,
            width: 1024,
            height: 1024,
          },
          "denoise_latents:ATu2zOUgTj": {
            type: "denoise_latents",
            id: "denoise_latents:ATu2zOUgTj",
            cfg_scale: 7.5,
            cfg_rescale_multiplier: 0,
            scheduler: "dpmpp_3m_k",
            steps: 30,
            is_intermediate: true,
            use_cache: true,
            denoising_start: 0,
            denoising_end: 1,
          },
          "core_metadata:4LnC45lO4k": {
            id: "core_metadata:4LnC45lO4k",
            type: "core_metadata",
            is_intermediate: true,
            use_cache: true,
            cfg_scale: 7.5,
            cfg_rescale_multiplier: 0,
            model: {
              key: "55f939e9-9394-45d4-8db6-0eaf288e80f0",
              hash: "blake3:1f500a206b3b305723705d2c11800e8d0d6f1cdae637764ea9812a83f00e0ba5",
              name: "Juggernaut XL v9",
              base: "sdxl",
              type: "main",
            },
            steps: 30,
            rand_device: "cpu",
            scheduler: "dpmpp_3m_k",
            negative_prompt: "",
            seamless_x: false,
            seamless_y: false,
            width: 1024,
            height: 1024,
            generation_mode: "sdxl_txt2img",
            ref_images: [],
            regions: [],
            canvas_v2_metadata: {
              controlLayers: [],
              inpaintMasks: [],
              rasterLayers: [],
              regionalGuidance: [],
            },
          },
          "canvas_output:iKpUuBNxCI": {
            type: "l2i",
            id: "canvas_output:iKpUuBNxCI",
            fp32: true,
            is_intermediate: true,
            use_cache: false,
          },
        },
        edges: [
          {
            source: { node_id: "sdxl_model_loader:EDJbEn2206", field: "unet" },
            destination: {
              node_id: "denoise_latents:ATu2zOUgTj",
              field: "unet",
            },
          },
          {
            source: { node_id: "sdxl_model_loader:EDJbEn2206", field: "clip" },
            destination: { node_id: "pos_cond:NIy4GzDEXc", field: "clip" },
          },
          {
            source: { node_id: "sdxl_model_loader:EDJbEn2206", field: "clip" },
            destination: { node_id: "neg_cond:wRECYTFU6A", field: "clip" },
          },
          {
            source: { node_id: "sdxl_model_loader:EDJbEn2206", field: "clip2" },
            destination: { node_id: "pos_cond:NIy4GzDEXc", field: "clip2" },
          },
          {
            source: { node_id: "sdxl_model_loader:EDJbEn2206", field: "clip2" },
            destination: { node_id: "neg_cond:wRECYTFU6A", field: "clip2" },
          },
          {
            source: { node_id: "positive_prompt:JSYR1x1ELL", field: "value" },
            destination: { node_id: "pos_cond:NIy4GzDEXc", field: "prompt" },
          },
          {
            source: { node_id: "positive_prompt:JSYR1x1ELL", field: "value" },
            destination: { node_id: "pos_cond:NIy4GzDEXc", field: "style" },
          },
          {
            source: { node_id: "pos_cond:NIy4GzDEXc", field: "conditioning" },
            destination: {
              node_id: "pos_cond_collect:Oswhs47qEk",
              field: "item",
            },
          },
          {
            source: {
              node_id: "pos_cond_collect:Oswhs47qEk",
              field: "collection",
            },
            destination: {
              node_id: "denoise_latents:ATu2zOUgTj",
              field: "positive_conditioning",
            },
          },
          {
            source: { node_id: "neg_cond:wRECYTFU6A", field: "conditioning" },
            destination: {
              node_id: "neg_cond_collect:89dlQlCoph",
              field: "item",
            },
          },
          {
            source: {
              node_id: "neg_cond_collect:89dlQlCoph",
              field: "collection",
            },
            destination: {
              node_id: "denoise_latents:ATu2zOUgTj",
              field: "negative_conditioning",
            },
          },
          {
            source: { node_id: "seed:RlFhzKOviv", field: "value" },
            destination: { node_id: "noise:Z7Fi2FB2bk", field: "seed" },
          },
          {
            source: { node_id: "noise:Z7Fi2FB2bk", field: "noise" },
            destination: {
              node_id: "denoise_latents:ATu2zOUgTj",
              field: "noise",
            },
          },
          {
            source: { node_id: "denoise_latents:ATu2zOUgTj", field: "latents" },
            destination: {
              node_id: "canvas_output:iKpUuBNxCI",
              field: "latents",
            },
          },
          {
            source: { node_id: "seed:RlFhzKOviv", field: "value" },
            destination: { node_id: "core_metadata:4LnC45lO4k", field: "seed" },
          },
          {
            source: { node_id: "positive_prompt:JSYR1x1ELL", field: "value" },
            destination: {
              node_id: "core_metadata:4LnC45lO4k",
              field: "positive_prompt",
            },
          },
          {
            source: { node_id: "sdxl_model_loader:EDJbEn2206", field: "vae" },
            destination: { node_id: "canvas_output:iKpUuBNxCI", field: "vae" },
          },
          {
            source: { node_id: "core_metadata:4LnC45lO4k", field: "metadata" },
            destination: {
              node_id: "canvas_output:iKpUuBNxCI",
              field: "metadata",
            },
          },
        ],
      },
      runs: 1,
      data: [
        [
          {
            node_path: "seed:RlFhzKOviv",
            field_name: "value",
            items: [3682693976],
          },
        ],
        [
          {
            node_path: "positive_prompt:JSYR1x1ELL",
            field_name: "value",
            items: ["a"],
          },
        ],
      ],
      origin: "canvas",
      destination: "canvas:dyX8eQq1F7",
    },
  };
  const response = await fetch(
    "http://127.0.0.1:9091/api/v1/queue/default/enqueue_batch",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        Referer: "http://127.0.0.1:9091/",
      },
      body: JSON.stringify(body),
      method: "POST",
    },
  );
  const responseText = await response.text();
  console.log(
    "success",
    possession.name,
    "enqueueBatch",
    JSON.parse(responseText),
  );
};

for (const possession of possessionData.possessions) {
  let possessionPrompt = possession.prompt.join("\n");
  possessionPrompt =
    possession.name + "\n" + basePrompt + "\n" + possessionPrompt;
  possessionPrompt = basePrompt + "\n" + possessionPrompt;
  possessionPrompt = possessionPrompt.replace(regexObject, " ");

  console.log("starting", possession.name);
  await prompt(possession, possessionPrompt);
  await enqueueBatch(possession);

  console.log("started", possession.name);
}
