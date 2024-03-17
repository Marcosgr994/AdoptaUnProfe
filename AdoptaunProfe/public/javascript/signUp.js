function validarContraseña() {
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;

    if (password != confirm_password) {
        document.getElementById("confirm_password_error").innerHTML = "Las contraseñas no coinciden";
        return false;
    } else {
        document.getElementById("confirm_password_error").innerHTML = "";
        return true;
    }
}


$(document).ready(function() {
    // Cuando se haga clic en el botón "Registro" del primer modal
    $('#openModalBtn').click(function() {
      // Mostrar el segundo modal
      $('#registroModal').modal('show');
    });
  });