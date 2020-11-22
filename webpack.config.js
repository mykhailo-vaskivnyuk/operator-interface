const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, relative } = require('path');

const CONFIG = {
  HASH: 'bundle',
  PATHS: {
    src: resolve(__dirname, 'src'),
    build: resolve(__dirname, 'build'),
  },
};

/* ENTRIES DEFINED */
CONFIG.ENTRIES = {
  app: [CONFIG.PATHS.src + '/entries/app/index.tsx'],
};

function createHtml(name) {
  return new HtmlWebpackPlugin({
    title: 'Bit application',
    chunks: [name],
    filename: `${name}.html`,
    template: './src/public/templates/template.html',
    minify: {
      collapseWhitespace: true,
    },
  });
}

module.exports = (env = {}, argv = {}) => {
  const isProduction = argv.mode === 'production';
  const port = argv.port || 3001;
  const open = argv.open === 'true';

  return {
    mode: argv.mode || 'development',

    entry: () => {
      return env.bundle === undefined
        ? CONFIG.ENTRIES
        : { [env.bundle]: CONFIG.ENTRIES[env.bundle] };
    },

    output: {
      path: CONFIG.PATHS.build,

      filename: isProduction
        ? '[name]/assets/js/index.[chunkhash].js'
        : '[name]/assets/js/index.' + CONFIG.HASH + '.js',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    devtool: isProduction ? 'cheap-module-source-map' : 'eval',

    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.(jp?g|svg|png|gif)$/i,
          include: resolve('src'), //!
          use: [
            {
              loader: 'file-loader',
              options: {
                context: resolve('src'),
                name: `/images/[name].[ext]`,
                outputPath: (url, resourcePath, context) => {
                  let entryName = 'public';
                  // Get entry name from relative path.
                  const relativePath = relative(context, resourcePath);
                  const relativeMatch = relativePath.match(/^entries[\\/]([a-zA-Z0-9_.-]*)/);

                  console.log({ relativePath, relativeMatch });

                  if (relativeMatch) {
                    entryName = relativeMatch[1] + '/assets';
                  }

                  return `${entryName}${url}`;
                },
              },
            },
          ],
        },

        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
          include: resolve('src'),
          use: [
            {
              loader: 'file-loader',
              options: {
                context: resolve('src'),
                name: `/fonts/[name].[ext]`,
                outputPath: (url, resourcePath, context) => {
                  let entryName = 'public';

                  // Get entry name from relative path.
                  const relativePath = relative(context, resourcePath);
                  const relativeMatch = relativePath.match(/^entries[\\/]([a-zA-Z0-9_.-]*)/);

                  if (relativeMatch) {
                    entryName = relativeMatch[1] + '/assets';
                  }
                  return `${entryName}${url}`;
                },
              },
            },
          ],
        },
      ],
    },

    plugins: [...Object.keys(CONFIG.ENTRIES).map(createHtml)],

    devServer: {
      contentBase: CONFIG.PATHS.build,
      compress: true,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      },
      open,
      overlay: {
        warnings: true,
        errors: true,
      },
      port,
      publicPath: `http://localhost:${port}/`,
      hot: true,
      historyApiFallback: true,
    },

    stats: {
      assetsSort: '!size',
      moduleAssets: false,
      cached: false,
      children: false,
      chunkModules: false,
    },
  };
};
