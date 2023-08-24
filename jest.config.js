module.exports = {
  bail: true,  //Caso um teste falhar, ele para o teste
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ],
}