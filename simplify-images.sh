#!/bin/bash

# Function to process each work file
process_file() {
    file="$1"
    echo "Processing $file..."
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Read the file and transform the content
    awk '
    BEGIN { in_resources = 0; in_params = 0; src = ""; alt = ""; }
    
    /^\[\[resources\]\]$/ {
        in_resources = 1
        print
        next
    }
    
    in_resources && /^src = / {
        src = $0
        print
        next
    }
    
    in_resources && /^\[resources\.params\]$/ {
        in_params = 1
        next
    }
    
    in_resources && in_params && /^alt = / {
        alt = $0
        print
        in_params = 0
        in_resources = 0
        next
    }
    
    /^$/ {
        if (in_resources || in_params) {
            in_resources = 0
            in_params = 0
        }
        print
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

echo "All image structures have been simplified!" 