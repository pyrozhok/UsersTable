const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },

      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
