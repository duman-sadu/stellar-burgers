module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Отключаем coverage
    collectCoverage: false,
    coverageDirectory: '<rootDir>/__disabled_coverage__',
    coverageReporters: [],
};
