#!/bin/bash

# Function to rename files in a project directory
rename_project_files() {
    local project_dir="$1"
    local project_name=$(basename "$project_dir")
    local index=1

    # Find all image and video files, excluding index.md
    find "$project_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" -o -iname "*.mp4" \) -not -name "index.md" | sort | while read -r file; do
        # Get file extension
        ext="${file##*.}"
        # Create new filename based on project name
        new_name="${project_dir}/${project_name}-${index}.${ext}"
        
        # Only rename if the file isn't already in the correct format
        if [ "$file" != "$new_name" ] && [ "$(basename "$file")" != "$(basename "$new_name")" ]; then
            echo "Renaming: $file -> $new_name"
            mv "$file" "$new_name"
            
            # Update the reference in index.md
            old_name=$(basename "$file")
            new_basename=$(basename "$new_name")
            sed -i '' "s|src = \"${old_name}\"|src = \"${new_basename}\"|g" "${project_dir}/index.md"
        fi
        
        ((index++))
    done
}

# Function to watch for directory changes
watch_directories() {
    local last_check=$(date +%s)
    
    while true; do
        # Find all project directories that have been modified since last check
        find content/projects -mindepth 1 -maxdepth 1 -type d -newermt "@$last_check" | while read -r project_dir; do
            echo "Directory modified: $project_dir"
            rename_project_files "$project_dir"
        done
        
        last_check=$(date +%s)
        sleep 2
    done
}

echo "Starting directory watch..."
watch_directories 