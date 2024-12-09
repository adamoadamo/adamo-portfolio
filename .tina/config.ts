import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "3be951b7-73ae-48af-90a9-eea8b0233bbb",
  token: "642a871367fbe9501e6ba75a6c5aea98e05e24ec",
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "work",
        label: "Work",
        path: "content/work",
        format: "md",
        templates: [
          {
            name: "project",
            label: "Project",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "datetime",
                name: "date",
                label: "Date",
              },
              {
                type: "image",
                name: "image",
                label: "Featured Image",
              },
              {
                type: "string",
                name: "caption",
                label: "Caption",
              },
              {
                type: "rich-text",
                name: "description",
                label: "Description",
              },
            ],
          }
        ]
      },
      {
        name: "pages",
        label: "Pages",
        path: "content",
        format: "md",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },
    ],
  },
}); 