const request = require('supertest');
const express = require('express');
const router = require('../routes/services'); // Asegúrate de cambiar esto al nombre correcto de tu archivo de rutas

const app = express();
app.use(express.json());
app.use('/', router);

jest.mock('../app.js', () => ({
  pool: {
    getConnection: jest.fn().mockImplementation((callback) => {
      callback(null, {
        query: jest.fn().mockImplementation((query, params, queryCallback) => {
          // Simulamos el resultado de la consulta
          const mockData = [{ id: 1, nombre: 'Profesor 1', materia: 'Matemáticas' }];
          queryCallback(null, mockData);
        }),
        release: jest.fn(),
      });
    }),
  },
}));

describe('Router Tests', () => {
  test('GET /BuscarProfesorPorKeyword/:keyword devuelve el listado de profesores', async () => {
    const response = await request(app).get('/BuscarProfesorPorKeyword/keyword');

    expect(response.status).toBe(200);
    expect(response.body.listado).toHaveLength(1);
    // Puedes agregar más aserciones según la estructura esperada del listado de profesores
  });

  // Puedes agregar más pruebas para casos como:
  // - No existen profesores con esas características
  // - Manejo de errores en la consulta a la base de datos
});
