import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleNameMapper: {
    "test/(.*)$": "<rootDir>/test/$1"
  }
};

export default config
