const deps = require('../../package.json').dependencies;

const sharedModulesSettings = {
  react: {
    singleton: true, // only a single version of the shared module is allowed
    requiredVersion: deps.react,
  },
  'react-dom': {
    singleton: true, // only a single version of the shared module is allowed
    requiredVersion: deps['react-dom'],
  },
};

const baseSettings = {
  name: 'services',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './App',
    './Barber': './apps/barber',
    './Brand': './apps/brand',
    './Shop': './apps/shop',
  },
  shared: sharedModulesSettings,
};

const moduleFederationSettings = {
  dev: {
    ...baseSettings,
    shared: {
      ...sharedModulesSettings,
      react: {
        eager: true,
        singleton: true,
        requiredVersion: deps.react,
      },
      'react-dom': {
        eager: true,
        singleton: true,
        requiredVersion: deps['react-dom'],
      },
    },
  },
  prod: baseSettings,
};

module.exports = moduleFederationSettings;
