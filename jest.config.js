const { jsWithBabel: tsjPreset } = require('ts-jest/presets');

const iosConfig = require('jest-expo/ios/jest-preset');
const androidConfig = require('jest-expo/android/jest-preset');

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
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
