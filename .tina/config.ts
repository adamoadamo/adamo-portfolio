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
  search: {
    tina: {
      indexerToken: "642a871367fbe9501e6ba75a6c5aea98e05e24ec",
      stopwordLanguages: ["eng"],
    },
  },
  contentApiUrlOverride: "/api/tina/gql",
  localContentPath: "./content",
  schema: {
    collections: [
      {
        name: "work",
        label: "Work",
        path: "content/work",
        format: "md",
        ui: {
          filename: {
            readonly: true,
            slugify: values => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}`
            },
          }
        },
        defaultItem: () => {
          return {
            title: 'New Project',
            section: 'work',
            data: [],
            resources: []
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
            type: "string",
            name: "section",
            label: "Section",
            required: true,
          },
          {
            type: "object",
            name: "data",
            label: "Project Details",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Detail Title",
              },
              {
                type: "string",
                name: "description",
                label: "Detail Description",
              },
            ],
          },
          {
            type: "object",
            name: "resources",
            label: "Images",
            list: true,
            fields: [
              {
                type: "string",
                name: "src",
                label: "Image Source",
              },
              {
                type: "object",
                name: "params",
                label: "Image Parameters",
                fields: [
                  {
                    type: "string",
                    name: "caption",
                    label: "Caption",
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "pages",
        label: "Pages",
        path: "content",
        format: "md",
        ui: {
          filename: {
            readonly: true
          }
        },
        fields: [
          {
            type: "string",
            name: "email_text",
            label: "Email Text",
          },
          {
            type: "string",
            name: "email_link",
            label: "Email Link",
          },
          {
            type: "string",
            name: "instagram_text",
            label: "Instagram Text",
          },
          {
            type: "string",
            name: "instagram_link",
            label: "Instagram Link",
          },
          {
            type: "string",
            name: "github_text",
            label: "Github Text",
          },
          {
            type: "string",
            name: "github_link",
            label: "Github Link",
          },
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