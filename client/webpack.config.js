module.exports = {
  module: {
    rules: [
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  }
};