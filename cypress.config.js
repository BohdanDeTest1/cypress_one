const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // замініть на вашу URL-адресу
    defaultCommandTimeout: 10000, // зміна таймауту команд
  },
})