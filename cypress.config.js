// const { defineConfig } = require('cypress');
// const fs = require('fs'); // Підключення модуля file system

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:3000', // замініть на вашу URL-адресу
//     defaultCommandTimeout: 10000, // зміна таймауту команд
//     setupNodeEvents(on, config) {
//       // Реєстрація кастомної задачі для читання файлів
//       on('task', {
//         readFixtureFile(filePath) {
//           return new Promise((resolve, reject) => {
//             fs.readFile(filePath, 'utf8', (err, data) => {
//               if (err) {
//                 return reject(err);
//               }
//               resolve(JSON.parse(data));
//             });
//           });
//         },
//       });
//     },
//   },
// });
const { defineConfig } = require('cypress');
const qautoConfig = require('./cypress/configs/qauto.config');
const qauto2Config = require('./cypress/configs/qauto2.config');

// Обираємо конфігурацію на основі змінної середовища
const currentConfig = process.env.CONFIG === 'qauto2' ? qauto2Config : qautoConfig;

module.exports = defineConfig({
  e2e: {
    baseUrl: currentConfig.baseUrl,
    env: {
      users: currentConfig.users,
    },
    defaultCommandTimeout: 10000,
    reporter: 'mochawesome', // Додаємо репортер
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      // Тут можете додавати інші задачі
    },
  },
});
