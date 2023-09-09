_Work in progress_

Personal portfolio website built with [Hugo](https://gohugo.io/), hosted on [Github Pages](https://pages.github.com/). 

Uses [Azure Computer Vision](https://portal.vision.cognitive.azure.com/) for generating alt text for images as part of the compilation process. A Python script (alt.py) scans the /content/work/ folder for images, sends them to Azure for analysis, and retrieves a single high-confidence image caption. This caption is then  integrated into the TOML resources.params alt field within the corresponding markdown file, which references the associated image(s).
