#!/bin/bash

# Function to process each work file
process_file() {
    file="$1"
    echo "Processing $file..."
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Read the file and remove caption lines
    awk '
    /^caption = / {
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

echo "All captions have been removed!" 