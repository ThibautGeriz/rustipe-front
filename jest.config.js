const { jsWithBabel: tsjPreset } = require('ts-jest/presets');
const { withEnzyme } = require('jest-expo-enzyme');

const iosConfig = withEnzyme(require('jest-expo/ios/jest-preset'));
const androidConfig = withEnzyme(require('jest-expo/android/jest-preset'));

const projects = [iosConfig, androidConfig];

// note: disable `.mjs` file extensions, it's not supported at the moment
projects.forEach((project) => {
  // eslint-disable-next-line no-param-reassign
  project.moduleFileExtensions = project.moduleFileExtensions.filter((ext) => !ext.endsWith('mjs'));
});

module.exports = {
  projects,
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: [
    'node_modules/(?!react-native|expo|react-native-vector-icons|react-native-safe-area-view)',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
    __DEV__: true,
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|js?|jsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  setupFiles: ['./test-setup.js', './test-shim.js'],
  cacheDirectory: '.jest/cache',
};
