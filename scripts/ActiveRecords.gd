extends Node

# Dictionary to store cached results
# Format: { "path/to/file.json": [data], "path/to/textures/": [resources] }
var _cache: Dictionary = {}


## Clears the internal cache. Useful for reloading data or saving memory.
func clear_cache() -> void:
	_cache.clear()


func get_active_array_records(path: String, use_cache: bool = true) -> Array:
	if use_cache and _cache.has(path):
		return _cache[path]

	var data: Array = []
	var raw_data = _load_json(path)

	if typeof(raw_data) == TYPE_ARRAY:
		data = raw_data.filter(func(c): return c.get("active", false))

	if use_cache:
		_cache[path] = data
	return data


func get_active_dictionary_records(path: String, key: String, use_cache: bool = true) -> Array:
	var cache_key = path + ":" + key
	if use_cache and _cache.has(cache_key):
		return _cache[cache_key]

	var data: Array = []
	var raw_data = _load_json(path)

	if typeof(raw_data) == TYPE_DICTIONARY:
		var key_data = raw_data.get(key, [])
		if typeof(key_data) == TYPE_ARRAY:
			data = key_data.filter(func(c): return c.get("active", true))

	if use_cache:
		_cache[cache_key] = data
	return data


func get_all_png_resources_from_dir(path: String, use_cache: bool = true) -> Array[Resource]:
	if use_cache and _cache.has(path):
		return _cache[path]

	var png_resources: Array[Resource] = []
	if DirAccess.dir_exists_absolute(path):
		var files = DirAccess.get_files_at(path)
		for f in files:
			if f.ends_with(".png") or f.ends_with(".png.import"):
				var clean_path = path.path_join(f.replace(".import", ""))
				var resource = load(clean_path)
				if resource and not png_resources.has(resource):
					png_resources.append(resource)

	if use_cache:
		_cache[path] = png_resources
	return png_resources


func get_random_png_resource_from_dir(path: String, use_cache: bool = true) -> Resource:
	var pool = get_all_png_resources_from_dir(path, use_cache)
	return pool.pick_random() if not pool.is_empty() else null


# Internal helper to handle the actual file reading
func _load_json(path: String):
	if not FileAccess.file_exists(path):
		return null
	var file = FileAccess.open(path, FileAccess.READ)
	return JSON.parse_string(file.get_as_text())
