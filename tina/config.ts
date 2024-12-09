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
      publicFolder: "static",
      mediaRoot: "images"
    }
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
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}`
            },
          },
          router: ({ document }) => {
            return `/work/${document._sys.filename}`
          }
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
            options: ["Design", "Development", "Research"]
          },
          {
            type: "object",
            label: "Project Images",
            name: "resources",
            list: true,
            ui: {
              visualSelector: true,
              itemProps: (item) => ({
                label: item?.params?.caption || "Image",
              }),
              defaultItem: {
                src: "",
                params: {
                  caption: "",
                  alt: ""
                }
              }
            },
            fields: [
              {
                type: "image",
                label: "Image",
                name: "src"
              },
              {
                type: "object",
                label: "Image Details",
                name: "params",
                fields: [
                  {
                    type: "string",
                    label: "Caption",
                    name: "caption",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "string",
                    label: "Alt Text",
                    name: "alt"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            label: "Project Details",
            name: "data",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title || "Detail"
              })
            },
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title"
              },
              {
                type: "string",
                label: "Description",
                name: "description",
                ui: {
                  component: "textarea"
                }
              }
            ]
          }
        ]
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
          },
          {
            type: "string",
            label: "Instagram",
            name: "instagram_link",
          },
          {
            type: "string",
            label: "Github",
            name: "github_link",
          },
          {
            type: "rich-text",
            label: "Content",
            name: "body",
            isBody: true,
          }
        ]
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
          }
        ]
      }
    ]
  }
});
