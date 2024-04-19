// webpack.config.js
module.exports = {
    // Other webpack configurations
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[contenthash].[ext]',
                outputPath: 'images', // Specify the output directory
              },
            },
          ],
        },
      ],
    },
  };
  