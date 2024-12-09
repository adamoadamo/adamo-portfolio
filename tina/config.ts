import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "3be951b7-73ae-48af-90a9-eea8b0233bbb",
  token: "642a871367fbe9501e6ba75a6c5aea98e05e24ec",
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  schema: {
    collections: [
      {
        format: "md",
        label: "Work",
        name: "work",
        path: "content/work",
        match: {
          include: "**/index",
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            label: "Section",
            name: "section",
          },
          {
            type: "object",
            label: "Project Details",
            name: "data",
            list: true,
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
              },
            ],
          },
          {
            type: "object",
            label: "Resources",
            name: "resources",
            list: true,
            fields: [
              {
                type: "string",
                label: "Source",
                name: "src",
              },
              {
                type: "object",
                label: "Parameters",
                name: "params",
                fields: [
                  {
                    type: "string",
                    label: "Caption",
                    name: "caption",
                  },
                  {
                    type: "string",
                    label: "Alt Text",
                    name: "alt",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        format: "md",
        label: "Pages",
        name: "pages",
        path: "content",
        match: {
          include: "_index",
        },
        fields: [
          {
            type: "string",
            label: "Email Text",
            name: "email_text",
          },
          {
            type: "string",
            label: "Email Link",
            name: "email_link",
          },
          {
            type: "string",
            label: "Instagram Text",
            name: "instagram_text",
          },
          {
            type: "string",
            label: "Instagram Link",
            name: "instagram_link",
          },
          {
            type: "string",
            label: "Github Text",
            name: "github_text",
          },
          {
            type: "string",
            label: "Github Link",
            name: "github_link",
          },
          {
            type: "rich-text",
            label: "Content",
            name: "body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
