// app.test.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const supertest = require('supertest');
const app = require('../app');



// Lee el contenido del archivo EJS
const ejsTemplate = fs.readFileSync(path.resolve(__dirname, '../views/index.ejs'), 'utf8');

// Configura el entorno de JSDOM
const dom = new JSDOM(ejsTemplate, { runScripts: 'dangerously' });
global.document = dom.window.document;
global.window = dom.window;
global.$ = require('jquery');

// Importa las funciones y el archivo que deseas probar
const { obtenerProfesores } = require('../public/javascript/index');

// Importa el router
const router = require('../routes/index');

// Configura supertest con el servidor de Express
const request = supertest(app);
let server;

beforeAll(async () => {
    // Inicia el servidor antes de las pruebas
    server = app.listen(80); // Puedes usar cualquier puerto libre disponible
  });

  afterAll(async () => {
    // Detén el servidor después de las pruebas
    await server.close();
    await app.end();
  }); 


describe('Test de AJAX', () => {
  test('debería actualizar el HTML después de hacer clic en el botón', () => {
    // Simula el evento de clic en el botón
    obtenerProfesores();

    // Obtén el HTML actualizado después de la llamada AJAX
    const htmlDespuesDeClic = document.getElementById('lista').innerHTML;

    // Realiza aserciones en base al HTML esperado
    //expect(htmlDespuesDeClic).toContain('<div class="card');
    //expect(htmlDespuesDeClic).toContain('Nombre:');
    //expect(htmlDespuesDeClic).toContain('Materia:');

    // Puedes agregar más aserciones según la estructura de tu HTML

    // Limpiar el entorno después de la prueba si es necesario
  });

  // Agrega más pruebas según sea necesario
});