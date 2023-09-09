_Work in progress_

Personal portfolio website built with [Hugo](https://gohugo.io/), hosted on [Github Pages](https://pages.github.com/). 

Uses [Azure Computer Vision](https://portal.vision.cognitive.azure.com/) for image alt text generation as part of the compiling process. The Python script (alt.py) scrubs the /content/work/ folder for images, sends to Azure, recieves a single high confidence image caption and intersts into the TOML resources.params alt field in the markdown file that references the associated image(s).
