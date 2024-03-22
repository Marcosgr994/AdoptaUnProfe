$("#Buscar").click(function(){
    $.ajax({
      url: '/services/BuscarProfesorPorKeyword/' + $("#buscador").val(),
      dataType: 'json',
      success: function (data) {
          //si todo ha ido bien lo notificamos
          var html = "<div id='lista' class='row'>\n";
          data.listado.forEach(element => {
            html += "<div class='card bg-white col-12 col-md-3 m-2'>\n";
            html += "<img class='card-img-top rounded-2 img-fluid mt-2' src='/imgs/img_avatar1.png' alt='imagen del profesor'/>"
            html += "<div class='card-body'>\n";
            html += "<div class='card-title'><h3 class= 'h3'>Nombre: "+element.nombre + " " + element.apellidos + "</h3></div>\n";
            html += "<div class='card-text'><h4 class= 'h4'>Materia: "+element.materia+"</h4></div>\n";
            html += "</div>\n";
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