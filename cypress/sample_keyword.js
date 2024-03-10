describe('Pruebas unitarias para la búsqueda de profesores por palabra clave', () => {
    it('debería devolver una lista de profesores que coincidan con la palabra clave', () => {
      const keyword = 'matemáticas';
      cy.request('GET', `/BuscarProfesorPorKeyword/${keyword}`).then(response => {
        expect(response.status).to.equal(200);
  
        expect(response.body.listado).to.be.an('array').that.is.not.empty;
      });
    });
});
