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
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve("assert/"),
      "net" : require.resolve("net-browserify"),
      "path": require.resolve("path-browserify"),
      "tls": require.resolve("tls-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
};

module.exports.optimization = { usedExports : true };
