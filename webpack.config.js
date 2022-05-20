const path = require('path');

module.exports = {
  entry: {
    control : {
      import: './src/Entry/Central.ts',
      filename: 'control_worker.js',
    },
    overlay : {  
      import: './src/Entry/Overlay.ts',
      // dependOn: "components",
      filename: 'overlay_controller.js',
    },
    // components: [
    //   './src/Overlay/Components/FollowNotification/FollowNotification.ts',
    //   './src/Overlay/Components/DebugContainer/DebugContainer.ts'
    // ]
  }, 
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
  }
};

// module.exports.stats = { errorDetails: true };

module.exports.module = {
  rules: [
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }, 
  ]
};

module.exports.resolve = {
    modules: ['src', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
};

module.exports.optimization = { usedExports : true };
