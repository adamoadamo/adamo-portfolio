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
            label: "Resources",
            name: "resources",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.src || "New Image" }
              },
            },
            fields: [
              {
                type: "string",
                label: "Image Path",
                name: "src",
                description: "Path to the image file",
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
                    description: "Add a caption for this image",
                  },
                  {
                    type: "string",
                    label: "Alt Text",
                    name: "alt",
                    description: "Describe the image for accessibility",
                  },
                ],
              },
            ],
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
            label: "Email",
            name: "email_link",
            description: "Your email address",
          },
          {
            type: "string",
            label: "Instagram",
            name: "instagram_link",
            description: "Your Instagram profile URL",
          },
          {
            type: "string",
            label: "Github",
            name: "github_link",
            description: "Your Github profile URL",
          },
          {
            type: "rich-text",
            label: "Content",
            name: "body",
            isBody: true,
          },
        ],
      },
      {
        format: "md",
        label: "Footer",
        name: "footer",
        path: "content",
        match: {
          include: "footer",
        },
        fields: [
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
