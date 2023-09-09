import os
import requests

AZURE_API_KEY = os.getenv("AZURE_API")

AZURE_ENDPOINT = "https://adamtoreilly.cognitiveservices.azure.com/"

SITE_PATH = "../content/work/"

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
            description = response.json()['description']['captions'][0]['text']
            return description
    except Exception as e:
        print(f"Failed to get description for {image_path}: {e}")
        return None

def update_markdown_file(md_file_path, image_path, alt_text):
    try:
        with open(md_file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        content = content.replace(f'![]({os.path.basename(image_path)})', f'![{alt_text}]({os.path.basename(image_path)})')

        with open(md_file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated alt text for {os.path.basename(image_path)} in {md_file_path}")
    except Exception as e:
        print(f"Failed to update markdown file {md_file_path}: {e}")

for root, dirs, files in os.walk(SITE_PATH):
    for file_name in files:
        if file_name.endswith(".md"):
            md_file_path = os.path.join(root, file_name)
            with open(md_file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Find all images in the markdown file
            for line in content.split('\n'):
                if line.strip().startswith('![]('):
                    # Get the image path
                    image_path = os.path.join(root, line.strip()[4:-1])
                    
                    # Get the alt text from Azure
                    alt_text = get_image_description(image_path)
                    
                    if alt_text:
                        # Update the markdown file with the alt text
                        update_markdown_file(md_file_path, image_path, alt_text)
