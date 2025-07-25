export default {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
    moduleNameMapper: {
    "\\.(css|less|scss|sass)$":"identity-obj-proxy"
  }
};