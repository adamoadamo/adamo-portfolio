#!/bin/bash

# Function to process each work file
process_file() {
    file="$1"
    echo "Processing $file..."
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Read the file and transform the content
    awk '
    BEGIN { in_frontmatter=0; data_count=0; role=""; collaborators=""; year="" }
    
    /^\+\+\+$/ {
        in_frontmatter = !in_frontmatter
        print
        next
    }
    
    in_frontmatter && /^\[\[data\]\]$/ {
        data_count++
        next
    }
    
    in_frontmatter && /^title = "Role"/ {
        next
    }
    
    in_frontmatter && /^title = "Collaborators"/ {
        next
    }
    
    in_frontmatter && /^title = "Year"/ {
        next
    }
    
    in_frontmatter && /^description = / {
        val = substr($0, 15)
        if (data_count == 1) role = val
        if (data_count == 2) collaborators = val
        if (data_count == 3) year = val
        next
    }
    
    in_frontmatter && /^$/ && (role != "" || collaborators != "" || year != "") {
        if (role != "") print "role = " role
        if (collaborators != "") print "collaborators = " collaborators
        if (year != "") print "year = " year
        role = ""; collaborators = ""; year = ""
        print ""
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

echo "All work files have been updated!" 