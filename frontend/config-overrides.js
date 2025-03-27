const webpack = require('webpack');

module.exports = function override(config) {
  // Existing buffer fallback
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/'),
  };

  // Add TinyMCE specific configuration
  config.module.rules.push({
    test: /tinymce[\\/]skins[\\/]/i,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'tinymce/skins/',
        publicPath: '/tinymce/skins/',
      },
    },
  });

  // Handle TinyMCE icons
  config.module.rules.push({
    test: /tinymce[\\/]icons[\\/]/i,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'tinymce/icons/',
        publicPath: '/tinymce/icons/',
      },
    },
  });

  // Existing plugins configuration
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      'window.tinymce': 'tinymce', // Add this line for TinyMCE
      tinymce: 'tinymce', // Add this line for TinyMCE
    }),
  ]);

  // Optional: Add source maps if needed
  config.devtool = 'source-map';

  return config;
};