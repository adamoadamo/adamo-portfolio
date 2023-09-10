_Work in progress_

Personal portfolio website built with [Hugo](https://gohugo.io/), hosted on [Github Pages](https://pages.github.com/). 

Utilizes [Azure Computer Vision](https://portal.vision.cognitive.azure.com/) to generate alt text for images during compilation. A Python script (alt.py) scans the /content/work/ folder for images, submits them to Azure for analysis, and retrieves a single high-confidence image caption. This caption is seamlessly integrated into the TOML resources.params alt field in the corresponding markdown file, which links to the associated image(s).
