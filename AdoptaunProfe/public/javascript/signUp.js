function validarContrasena() {
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;

    if (password != confirm_password) {
        document.getElementById("confirm_password_error").innerHTML = "Las contraseñas no coinciden";
        document.getElementById("confirm_sign_up").disabled = true;
        return false;
    } else {
        document.getElementById("confirm_password_error").innerHTML = "";
        document.getElementById("confirm_sign_up").disabled = false;
        return true;
    }
}