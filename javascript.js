document.addEventListener('DOMContentLoaded', function() {

    const formulario = document.getElementById('formularioRegistro');
    const contenedorErrores = document.getElementById('contenedorErrores');

    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const inputTelefono = document.getElementById('telefono');
    const selectPrograma = document.getElementById('programa');
    const checkboxTerminos = document.getElementById('terminos');

    const campos = [inputNombre, inputCorreo, inputTelefono, selectPrograma, checkboxTerminos];
    campos.forEach(campo => {
        const evento = (campo.tagName === 'SELECT' || campo.type === 'checkbox') ? 'change' : 'input';

        campo.addEventListener(evento, function() {
            const corregido = campo.type === 'checkbox'
                ? campo.checked
                : campo.value.trim() !== '';

            if (corregido) {
                campo.classList.remove('borde-error');
            }
        });
    });

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        let errores = [];
        let esValido = true;

        contenedorErrores.classList.add('d-none');
        contenedorErrores.innerHTML = '';
        campos.forEach(campo => campo.classList.remove('borde-error', 'borde-exito'));


        if (inputNombre.value.trim() === '' || inputNombre.value.trim().length < 4) {
            errores.push('El Nombre Completo es obligatorio y debe tener al menos 4 caracteres.');
            inputNombre.classList.add('borde-error');
            esValido = false;
        } else {
            inputNombre.classList.add('borde-exito');
        }

        const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!expresionCorreo.test(inputCorreo.value.trim())) {
            errores.push('Ingresa un Correo Electrónico válido (ejemplo@dominio.com).');
            inputCorreo.classList.add('borde-error');
            esValido = false;
        } else {
            inputCorreo.classList.add('borde-exito');
        }

        const expresionTelefono = /^[0-9]{7,11}$/;
        if (!expresionTelefono.test(inputTelefono.value.trim())) {
            errores.push('El Teléfono debe contener solo números (entre 7 y 11 dígitos).');
            inputTelefono.classList.add('borde-error');
            esValido = false;
        } else {
            inputTelefono.classList.add('borde-exito');
        }

        if (selectPrograma.value === '') {
            errores.push('Debes seleccionar un Programa Académico de interés.');
            selectPrograma.classList.add('borde-error');
            esValido = false;
        } else {
            selectPrograma.classList.add('borde-exito');
        }

        if (!checkboxTerminos.checked) {
            errores.push('Debes aceptar recibir información institucional para registrarte.');
            checkboxTerminos.classList.add('borde-error');
            esValido = false;
        } else {
            checkboxTerminos.classList.add('borde-exito');
        }

        if (!esValido) {
            // Manipulación del DOM para inyectar y desplegar la lista de errores recolectados
            contenedorErrores.classList.remove('d-none');
            const listaErrores = document.createElement('ul');
            listaErrores.className = 'mb-0 ps-3';

            errores.forEach(function(mensajeError) {
                const item = document.createElement('li');
                item.textContent = mensajeError;
                listaErrores.appendChild(item);
            });

            contenedorErrores.appendChild(listaErrores);

            contenedorErrores.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {

            const datosPost = {
                nombre: inputNombre.value.trim(),
                correo: inputCorreo.value.trim(),
                telefono: inputTelefono.value.trim(),
                programa: selectPrograma.value,
                fechaRegistro: new Date().toLocaleString()
            };

            console.log('Simulando envío de datos HTTP POST al servidor institucional:', datosPost);

            alert(
                `¡REGISTRO EXITOSO (MÉTODO POST SIMULADO)!\n\n` +
`Los datos de ${datosPost.nombre} se enviaron correctamente por método POST al servidor de la institución.\n\n` +
                `Programa elegido: ${datosPost.programa.toUpperCase()}\n` +
                `Próximamente un asesor se comunicará contigo.`
            );

            formulario.reset();
            campos.forEach(campo => campo.classList.remove('borde-exito'));
        }
    });
});S
