const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'jest-expo-enzyme',
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
