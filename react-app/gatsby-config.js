// require("dotenv").config()
require("dotenv").config({
  path: `/tmp/.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "21zthldv",
        dataset: "production",
        token: "skQ5FwGNILmvRFeD0pZtdAtPN0LJTW4iyNDjfyfj3tfjVtA8unr8Q6DijSI28ZX06daSpzVbTvyjPKJRc",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-vanilla-extract",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Kumato Project",
        short_name: "Kumato",
        start_url: "/",
        // These can be imported once ESM support lands
        background_color: "#ffe491",
        theme_color: "#004ca3",
        icon: "src/favicon.png",
      },
    },
  ],
}
