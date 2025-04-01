// jest.config.ts
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['/mnt/c/Remove/petSmart/pokemon-grid-app/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '/mnt/c/Remove/petSmart/pokemon-grid-app/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(customJestConfig);
