const request = require('supertest');
const app = require('../../app');

// Obtener la URL de ngrok desde la variable de entorno, si está definida
const ngrokUrl = process.env.NGROK_URL || 'http://localhost';

describe('Test de integración de solicitud de servicio y listado', () => {
    test('Buscar profesor por palabra clave y hacer una solicitud de servicio', async () => {
        // Realizar la solicitud para buscar un profesor por palabra clave
        const searchResponse = await request(`${ngrokUrl}/services/BuscarProfesorPorKeyword/matematicas`);
        expect(searchResponse.status).toBe(200);
        expect(searchResponse.body).toHaveProperty('listado');
        expect(searchResponse.body.listado).toBeInstanceOf(Array);
        
        // Tomar el primer profesor de la lista como ejemplo
        const profesor = searchResponse.body.listado[0];

        const solicitudResponse = await request(`${ngrokUrl}/services/SolicitarServicioAUnProfesor`)
            .post('/')
            .send({
                fecha: '22/02/2022',
                horaInicio: 10,
                telefono: '123456789',
                materia: 'Matemáticas',
                mailProfesor: profesor.email,
                mailAlumno: 'demo1@gmail.com'
            });
        
        expect(solicitudResponse.status).toBe(200);
        expect(solicitudResponse.body).toHaveProperty('msg', 'Solicitud almacenada correctamente');
    });
});