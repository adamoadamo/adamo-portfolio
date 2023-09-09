import os
import requests
import toml

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
            print(response_data)  # Print the response data for debugging
            captions = response_data.get('description', {}).get('captions', [])
            if captions:
                description = captions[0]['text']
                return description
        print(f"No description found for {image_path}")
    except Exception as e:
        print(f"Failed to get description for {image_path}: {e}")
    return None

def update_markdown_file(md_file_path, front_matter_toml, image_index, alt_text):
    try:
        with open(md_file_path, 'r', encoding='utf-8') as file:
            content = file.readlines()
        
        front_matter_updated = "+++\n" + toml.dumps(front_matter_toml) + "+++\n"
        
        line_number = content.index('+++\n') + 1  # Find the end of the front matter block
        content = content[:line_number] + [front_matter_updated] + content[line_number + 1:]
        
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
                    update_markdown_file(md_file_path, data, i, alt_text)
