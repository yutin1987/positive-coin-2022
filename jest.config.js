const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  resetMocks: true,
  moduleDirectories: ['node_modules'],
  coveragePathIgnorePatterns: ['/node_modules/']
};

module.exports = createJestConfig(customJestConfig)