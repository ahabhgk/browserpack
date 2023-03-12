const webpack = require('webpack');

module.exports = (env) => {
  const production = env === 'production';

  /**
   * @type {import('webpack').Configuration}
   */
  const shared = {
    mode: production ? 'production' : 'development',
    entry: './src/index.js',
    resolve: {
      alias: {
        // os.cpus() of 'node:os' polyfill is [],
        // so terser-webpack-plugin will never use jest-worker
        'jest-worker': false,
        // only use terser to minify code
        'uglify-js': false,
        '@swc/core': false,
        'esbuild': false,
      },
      fallback: {
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        constants: require.resolve('constants-browserify'),
        crypto: require.resolve('crypto-browserify'),
        events: require.resolve('events'),
        fs: require.resolve('memfs'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        module: require.resolve('builtin-modules/static'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        process: require.resolve('process/browser'),
        querystring: require.resolve('querystring-es3'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url'),
        util: require.resolve('util'),
        vm: require.resolve('vm-browserify'),
        zlib: require.resolve('browserify-zlib'),
      },
    },
    devtool: 'source-map',
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: [require.resolve('buffer/'), 'Buffer'],
        process: require.resolve('process/browser')
      }),
    ],
  };

  return [
    {
      output: {
        library: {
          type: 'module',
        },
      },
      experiments: {
        outputModule: true,
      },
    },
    {
      output: {
        library: {
          type: 'commonjs2',
        },
      },
    }
  ].map(i => ({ ...shared, ...i }));
}
