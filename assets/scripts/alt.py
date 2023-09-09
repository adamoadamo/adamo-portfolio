import os
import requests
import toml  # Make sure to install this module

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
            description = response_data['description']['captions'][0]['text']
            return description
    except Exception as e:
        print(f"Failed to get description for {image_path}: {e}")
        return None

def update_markdown_file(md_file_path, image_index, alt_text):
    try:
        with open(md_file_path, 'r', encoding='utf-8') as file:
            content = file.readlines()

        front_matter = []
        line_number = 0
        recording = False
        for line in content:
            if line.strip() == "+++":
                if recording:
                    break
                else:
                    recording = True
            if recording:
                front_matter.append(line)
            line_number += 1

        front_matter_toml = toml.loads(''.join(front_matter[1:-1]))

        front_matter_toml["resources"][image_index]["params"]["alt"] = alt_text

        front_matter_updated = "+++\n" + toml.dumps(front_matter_toml) + "+++\n"
        
        content = content[:len(front_matter)-1] + [front_matter_updated] + content[line_number:]

        with open(md_file_path, 'w', encoding='utf-8') as file:
            file.writelines(content)

        print(f"Updated alt text in {md_file_path}")

    except Exception as e:
        print(f"Failed to update markdown file {md_file_path}: {e}")

for root, dirs, files in os.walk(SITE_PATH):
    for file_name in files:
        if file_name.endswith(".md"):
            md_file_path = os.path.join(root, file_name)
            with open(md_file_path, 'r', encoding='utf-8') as file:
                content = file.read()

            front_matter_end = content.find('+++', 3)
            front_matter = content[3:front_matter_end]
            
            data = toml.loads(front_matter)

            resources = data.get('resources', [])
            for i, resource in enumerate(resources):
                image_path = os.path.join(root, resource['src'])

                alt_text = get_image_description(image_path)
                
                if alt_text:
                    update_markdown_file(md_file_path, i, alt_text)
