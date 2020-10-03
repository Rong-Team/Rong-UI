const path = require("path");
const srcRoot = path.resolve(__dirname, "../components");

module.exports = {
  mode: "development",
  entry: {
    path: path.resolve(__dirname, "../example/src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "../example/src"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: path.join(__dirname, "../example/src"),
    compress: true,
    port: 3001, // 启动端口为 3001 的服务
    open: true // 自动打开浏览器
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "cache-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "cache-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            }
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
          },
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [`${srcRoot}/components/styles/normalize.less`]
          //   }
          // },
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: "url-loader?limit=8192",
        include: srcRoot
      }
    ]
  }
};
