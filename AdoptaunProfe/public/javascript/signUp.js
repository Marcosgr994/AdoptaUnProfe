// Función para validar el formulario de registro
function validarRegistro() {
    var user = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    var hay_campos_vacios = user == "" || email == "" || password == "" || confirm_password == "";
    
    if (!hay_campos_vacios && password == confirm_password) {
        document.getElementById("confirm_sign_up").disabled = false;
    } else {
        document.getElementById("confirm_sign_up").disabled = true;
    }
    
    if (password != "" && confirm_password != "" && password != confirm_password) {
        document.getElementById("confirm_password_error").innerHTML = "Las contraseñas no coinciden";
        return false;
    } else {
        document.getElementById("confirm_password_error").innerHTML = "";
        return true;
    }
}

// Adjuntar la función validarRegistro a los eventos input en los campos del formulario
document.getElementById('username').addEventListener('input', validarRegistro);
document.getElementById('email').addEventListener('input', validarRegistro);
document.getElementById('password').addEventListener('input', validarRegistro);
document.getElementById('confirm_password').addEventListener('input', validarRegistro);


// Función para limpiar los campos del formulario en el modal de registro
function limpiarCamposRegistro() {
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm_password').value = '';
    document.getElementById('confirm_sign_up').disabled = true; // Deshabilitar el botón de registro
    document.getElementById('confirm_password_error').innerHTML = ''; // Limpiar el mensaje de error de confirmación de contraseña
}




// Función para mostrar el mensaje en el modal
function mostrarMensajeModal(mensaje, exitoso) {
    const mensajeModalBody = document.getElementById('mensajeModalBody');
    const modalContent = document.querySelector('.modal-content');

    // Remover clases de éxito o error previas
    modalContent.classList.remove('modal-content-error');
    modalContent.classList.remove('modal-content-success');

    if (exitoso) {
        modalContent.classList.add('modal-content-success');
        limpiarCamposRegistro();
    } else {
        modalContent.classList.add('modal-content-error');
        limpiarCamposRegistro();
    }

    // Insertar mensaje en el cuerpo del modal
    mensajeModalBody.innerHTML = `<p class="${exitoso ? 'text-success' : 'text-danger'}">${mensaje}</p>`;

    // Ocultar el modal de registro y mostrar el modal de mensaje
    $('#registroModal').modal('hide');
    $('#mensajeModal').modal('show');
}

// Escuchar el evento de envío del formulario
document.getElementById('registroForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const response = await fetch(this.action, {
        method: this.method,
        body: formData
    });
    if (response.ok) {
        // Si la respuesta es exitosa
        const responseData = await response.json();
        mostrarMensajeModal(responseData.message, true);
    } else {
        // Si hay un error en la respuesta
        const responseData = await response.text();
        mostrarMensajeModal(responseData, false);
    }
});


// Escuchar el evento de clic en el botón "OK" del mensaje modal para cerrarlo
document.getElementById('cerrarMensajeModal').addEventListener('click', function () {
    $('#mensajeModal').modal('hide');
});

// Escuchar el evento de cierre del modal de registro para limpiar el mensaje
$('#mensajeModal').on('hidden.bs.modal', function (e) {
    const mensajeModalBody = document.getElementById('mensajeModalBody');
    mensajeModalBody.innerHTML = '';
});
