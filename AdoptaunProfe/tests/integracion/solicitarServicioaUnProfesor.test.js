const request = require('supertest');
const app = require('../../app');

describe('Test de integración de solicitud de servicio y listado', () => {
    test('Buscar profesor por palabra clave y hacer una solicitud de servicio', async () => {
        // Realizar la solicitud para buscar un profesor por palabra clave
        const searchResponse = await request(app.app).get('/services/BuscarProfesorPorKeyword/matematicas');
        expect(searchResponse.status).toBe(200);
        expect(searchResponse.body).toHaveProperty('listado');
        expect(searchResponse.body.listado).toBeInstanceOf(Array);
        
        // Tomar el primer profesor de la lista como ejemplo
        const profesor = searchResponse.body.listado[0];

        const solicitudResponse = await request(app.app)
            .post('/services/SolicitarServicioAUnProfesor')
            .send({
                fecha: '22/02/2022',
                horaInicio: 10,
                telefono: '123456789',
                materia: 'Matemáticas',
                mailProfesor: profesor.email,
                mailAlumno: 'demo1@gmail.com'
            });
        console.log(solicitudResponse.error);
        expect(solicitudResponse.status).toBe(200);
        expect(solicitudResponse.body).toHaveProperty('msg', 'Solicitud almacenada correctamente');
    });
});