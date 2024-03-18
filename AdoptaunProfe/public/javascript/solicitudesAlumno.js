$("#Buscar").click(function(){
    $.ajax({
      url: '/alumno/solicitudes/' + $("#buscador").val(),
      dataType: 'json',
      success: function (data) {
          //si todo ha ido bien lo notificamos
          var html = "<div id='lista' class='row'>\n";
          data.listado.forEach(element => {
            html += "<div class='bg-white col-10 m-2'>\n";
            html += "<h3 class= 'h3 text-dark'>Profesor: "+element.nombre+" "+element.apellido+"</h3>\n";
            html += "<h4 class= 'h4 text-secondary'>Estado: "+element.estado+"</h4>\n";
            html += "</div>\n";
          });
          html += "</div>\n";
          $("#lista").html(html);
      },
      error: function(err){
          //si ha habido error lo notificamos al usuario
          alert(err.responseJSON.msg)
      }
  });
  });