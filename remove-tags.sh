#!/bin/bash

# Function to process each work file
process_file() {
    file="$1"
    echo "Processing $file..."
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Read the file and remove project_tags lines
    awk '
    BEGIN { skip_next = 0 }
    
    /^project_tags = / {
        skip_next = 1
        next
    }
    
    skip_next && /^\[/ {
        skip_next = 0
        print
        next
    }
    
    skip_next {
        next
    }
    
    { print }
    ' "$file" > "$temp_file"
    
    # Replace the original file with the transformed content
    mv "$temp_file" "$file"
}

# Process all work files
find content/work -name "index.md" -type f | while read -r file; do
    process_file "$file"
done

echo "All project tags have been removed!" 