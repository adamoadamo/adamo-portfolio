import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "",
  clientId: "", // Get this from tina.io
  token: "", // Get this from tina.io
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
        ui: {
          filename: {
            readonly: true
          }
        },
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
      },
      {
        name: "content",
        label: "Site Content",
        path: "content",
        format: "md",
        match: {
          include: "_index",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Bio",
            isBody: true,
          },
        ],
      },
    ],
  },
}); 