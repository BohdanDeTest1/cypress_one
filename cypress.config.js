const { defineConfig } = require('cypress');
const fs = require('fs'); // Підключення модуля file system

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // замініть на вашу URL-адресу
    defaultCommandTimeout: 10000, // зміна таймауту команд
    setupNodeEvents(on, config) {
      // Реєстрація кастомної задачі для читання файлів
      on('task', {
        readFixtureFile(filePath) {
          return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(JSON.parse(data));
            });
          });
        },
      });
    },
  },
});