const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@pages': 'src/pages',
    '@assets': 'src/assets',
    '@services': 'src/services',
    '@hooks': 'src/hooks',
    '@hocs': 'src/hocs',
    '@redux': 'src/redux',
    '@slices': 'src/redux/slices',
    '@selectors': 'src/redux/selectors',
    '@actions': 'src/redux/actions',
  })(config);

  return config;
};
