import os
import toml
from azure.ai.vision import sdk

AZURE_API_KEY = os.getenv("AZURE_API")
AZURE_ENDPOINT = os.getenv("VISION_ENDPOINT")
SITE_PATH = "content/work/"

service_options = sdk.VisionServiceOptions(AZURE_ENDPOINT, AZURE_API_KEY)

def get_image_description(image_path):
    try:
        vision_source = sdk.VisionSource(file_path=image_path)
        analysis_options = sdk.ImageAnalysisOptions()
        analysis_options.features = (
            sdk.ImageAnalysisFeature.CAPTION |
            sdk.ImageAnalysisFeature.TEXT
        )
        analysis_options.language = "en"
        analysis_options.gender_neutral_caption = True

        image_analyzer = sdk.ImageAnalyzer(service_options, vision_source, analysis_options)
        result = image_analyzer.analyze()

        if result.reason == sdk.ImageAnalysisResultReason.ANALYZED:
            if result.caption is not None:
                description = result.caption.content
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
