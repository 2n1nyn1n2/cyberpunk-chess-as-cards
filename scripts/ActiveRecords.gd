extends Node


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass  # Replace with function body.


func get_active_array_records(path: String):
	var data: Array = []
	var file = FileAccess.open(path, FileAccess.READ)
	if file:
		var raw_data = JSON.parse_string(file.get_as_text())
		if typeof(raw_data) == TYPE_ARRAY:
			#print("Raw Size:", raw_data.size())
			for i in range(raw_data.size()):
				var c = raw_data[i]
				#print("Raw Raw Index:", i, " Scene:", c)
				var active: bool = c.get("active", false)
				if active:
					data.append(c)

	#print("Data:", data)
	return data


func get_active_dictionary_records(path: String, key: String):
	var data: Array = []
	var file = FileAccess.open(path, FileAccess.READ)
	if file:
		var raw_data: Dictionary = JSON.parse_string(file.get_as_text())
		if typeof(raw_data) == TYPE_DICTIONARY:
			var key_data: Array = raw_data.get(key, [])
			#print("Raw Size:", raw_data.size())
			for i in range(key_data.size()):
				var c = key_data[i]
				#print("Raw Raw Index:", i, " Scene:", c)
				var active: bool = c.get("active", true)
				if active:
					data.append(c)

	#print("Data:", data)
	return data


func get_dictionary_record(path: String):
	var file = FileAccess.open(path, FileAccess.READ)
	if file:
		var raw_data: Dictionary = JSON.parse_string(file.get_as_text())
		if typeof(raw_data) == TYPE_DICTIONARY:
			return raw_data

	return Dictionary()


func get_random_png_resource_from_dir(path: String) -> Resource:
	var resource = null

	var dir = DirAccess.open(path)

	if dir:
		var files = dir.get_files()
		var pngs: Array[String] = []
		#print("get_random_png_resource_from_dir files: ", files.size())

		for f in files:
			# In exported projects (Web), .png files often show up as "image.png.import"
			# We check for both original and imported versions
			if f.ends_with(".png") or f.ends_with(".png.import"):
				# Strip .import to get the actual resource path
				var clean_name = f.replace(".import", "")

				# Avoid duplicates in the array if both .png and .png.import exist
				if not pngs.has(clean_name):
					pngs.append(clean_name)

		#print("get_random_png_resource_from_dir pngs: ", pngs.size())

		if not pngs.is_empty():
			var random_png = pngs.pick_random()
			# load() works with the virtual res:// path automatically
			resource = load(path.path_join(random_png))

	#print("get_random_png_resource_from_dir path: ", path, " resource: ", resource)
	return resource


func get_all_png_resources_from_dir(path: String) -> Array[Resource]:
	var png_resources: Array[Resource] = []
	if DirAccess.dir_exists_absolute(path):
		var files = DirAccess.get_files_at(path)
		for f in files:
			# When exported, "image.png" becomes "image.png.import"
			# We check for both original and imported versions
			if f.ends_with(".png") or f.ends_with(".png.import"):
				# Strip the ".import" to get the original resource path
				var clean_path = f.replace(".import", "")
				var resource = load(path.path_join(clean_path))
				if resource:
					png_resources.append(resource)
	return png_resources
