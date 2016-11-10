module.exports = {  
  entry: {
    lib: ["./lib.ts"],
    test: "./test.ts"
  },
  output: {
    filename: '[name].js',
    libraryTarget: "commonjs",
    library: "timer"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}