from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials

import os
import toml
import traceback

# Get the environment variables
region = os.environ['ACCOUNT_REGION']
key = os.environ['ACCOUNT_KEY']
SITE_PATH = "content/work/"

# Check if environment variables are set
if not region or not key:
    raise EnvironmentError("ACCOUNT_REGION and/or ACCOUNT_KEY are not set in the environment")

# Create a Computer Vision client instance
credentials = CognitiveServicesCredentials(key)
client = ComputerVisionClient(
    endpoint=f"https://{region}.api.cognitive.microsoft.com/",
    credentials=credentials
)

def get_image_description(image_path):
    try:
        with open(image_path, 'rb') as image_data:
            analysis = client.describe_image_in_stream(image_data)
            
            if analysis.captions:
                for caption in analysis.captions:
                    print(f"Caption: {caption.text}, Confidence: {caption.confidence}")
                
                description = analysis.captions[0].text
                return description
        
        print(f"No description found for {image_path}")
    
    except Exception as e:
        print(f"Failed to get description for {image_path}: {e}")
        traceback.print_exc()  # Print the full traceback to help diagnose the issue

    return None

def update_markdown_file(md_file_path, front_matter_toml, image_index, alt_text):
    try:
        # Read the content of the file and find the TOML front matter
        with open(md_file_path, 'r', encoding='utf-8') as file:
            content = file.readlines()
        
        front_matter_end = content.index('+++\n', 3) + 1  # Find the end of the front matter block

            # Identify the lines where the alt field for the given image is defined
        alt_field_line = None
        inside_correct_resource_block = False
        for i in range(3, front_matter_end):
            line = content[i]
            if line.startswith("[[resources]]"):
                inside_correct_resource_block = False  # Reset the flag at the start of each new resource block
            if f'src = "{front_matter_toml["resources"][image_index]["src"]}"' in line:
                inside_correct_resource_block = True
            if inside_correct_resource_block and line.strip().startswith('alt ='):
                alt_field_line = i
                break

        # If the alt field is found, update it with the new alt text
        if alt_field_line is not None:
            content[alt_field_line] = f'alt = "{alt_text}"\n'
        else:
            print(f"No alt field line found for image index {image_index} in file {md_file_path}")

        # Write the modified content back to the file
        with open(md_file_path, 'w', encoding='utf-8') as file:
            file.writelines(content)    

        print(f"Updated description in {md_file_path} with: {alt_text}")  # Log the updated description
    
    except Exception as e:
        print(f"Failed to update markdown file {md_file_path}: {e}")
        traceback.print_exc()  # Print the full traceback to help diagnose the issue

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
