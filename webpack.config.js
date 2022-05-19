const path = require('path');

module.exports = {
  entry: {
    control : {
      import: './src/Entry/Central.ts',
      filename: 'control_worker.js',
    },
    overlay : {  
      import: './src/Entry/Overlay.ts',
      filename: 'overlay_controller.js',
    }
  }, 
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
  }
};

module.exports.module = {};
module.exports.module.rules = [
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }, 
];

module.exports.resolve = {
    extensions: ['.tsx', '.ts', '.js'],
};
