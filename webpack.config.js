module.exports = {
  entry: [
    "./react/front.js",
    "./views/style.scss",
    "./react/app.js",
    "./react/app.module.css",
    "./node_modules/video-react/dist/video-react.css",
  ],
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        // sass / scss loader for webpack
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/[name].css",
            },
          },
          "extract-loader",
          "css-loader?-url",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
