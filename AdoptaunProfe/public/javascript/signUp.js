const e = require("express");

function validarRegistro() {
    var user = document.getElementById("username").value;
    var email =document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    var hay_campos_vacios = user == "" || email == "" || password == "" || confirm_password ==""
    if (!hay_campos_vacios && password == confirm_password){
        document.getElementById("confirm_sign_up").disabled = false;
    }
    else{
        document.getElementById("confirm_sign_up").disabled = true;
    }
    if(password != "" && confirm_password != "" && password != confirm_password){
        document.getElementById("confirm_password_error").innerHTML = "Las contraseñas no coinciden";
            document.getElementById("password").classList.add("is-invalid");
            document.getElementById("confirm_password").classList.add("is-invalid");
            return false;
    }
    
    else {
        document.getElementById("confirm_password_error").innerHTML = "";
        document.getElementById("password").classList.remove("is-invalid");
        document.getElementById("confirm_password").classList.remove("is-invalid");
        return true;
    }
}