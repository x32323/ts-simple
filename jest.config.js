/* eslint-disable no-undef */
module.exports = {
    coverageDirectory: "/coverage",
    preset: 'ts-jest',
    testEnvironment: 'node',

    clearMocks: true,
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
};
