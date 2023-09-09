import os
import requests
import yaml

AZURE_API_KEY = os.getenv("AZURE_API")
AZURE_ENDPOINT = "https://adamtoreilly.cognitiveservices.azure.com/"
SITE_PATH = "content/work/"

def get_image_description(image_path):
    try:
        with open(image_path, 'rb') as image_data:
            headers = {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
            }
            params = {
                'visualFeatures': 'Description',
            }
            response = requests.post(AZURE_ENDPOINT + 'vision/v3.1/analyze', headers=headers, params=params, data=image_data)
            response_data = response.json()
            print(f"Azure API response: {response_data}")  # Debugging line
            description = response_data['description']['captions'][0]['text']
            print(f"Extracted description: {description}")  # Debugging line
            return description
    except Exception as e:
        print(f"Failed to get description for {image_path}: {e}")
        return None

def update_markdown_file(md_file_path, image_index, alt_text):
    try:
        with open(md_file_path, 'r', encoding='utf-8') as file:
            content = file.readlines()

        # Identify the lines containing the front matter
        front_matter = []
        line_number = 0
        recording = False
        for line in content:
            if line.strip() == "---":
                if recording:
                    break
                else:
                    recording = True
            if recording:
                front_matter.append(line)
            line_number += 1

        # Parse the YAML front matter
        front_matter_yaml = yaml.safe_load(''.join(front_matter[1:-1]))

        # Update the alt text
        front_matter_yaml["resources"][image_index]["params"]["alt"] = alt_text

        # Convert the updated YAML back to a string
        front_matter_updated = yaml.safe_dump(front_matter_yaml, sort_keys=False)
        print(f"YAML data before update: {front_matter_yaml}")  # Debugging line
        print(f"YAML data after update: {front_matter_updated}")  # Debugging line

        # Replace the old front matter with the updated front matter in the content
        content = content[:len(front_matter)-1] + [front_matter_updated] + content[line_number:]

        # Write the updated content back to the file
        with open(md_file_path, 'w', encoding='utf-8') as file:
            file.writelines(content)

        print(f"Updated alt text in {md_file_path}")

    except Exception as e:
        print(f"Failed to update markdown file {md_file_path}: {e}")

for root, dirs, files in os.walk(SITE_PATH):
    for file_name in files:
        if file_name.endswith(".md"):
            md_file_path = os.path.join(root, file_name)
            print(f"Processing file: {md_file_path}")  # Debugging line
            with open(md_file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            # Find the front matter and extract resource information
            front_matter_end = content.find('---', 1)
            front_matter = content[4:front_matter_end]
            data = yaml.safe_load(front_matter)

            resources = data.get('resources', [])
            for i, resource in enumerate(resources):
                image_path = os.path.join(root, resource['src'])
                print(f"Found image: {image_path}")  # Debugging line

                # Get the alt text from Azure
                alt_text = get_image_description(image_path)
                
                if alt_text:
                    # Update the markdown file with the alt text
                    update_markdown_file(md_file_path, i, alt_text)
