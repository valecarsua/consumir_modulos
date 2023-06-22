const url = 'http://localhost:1018/academia/traslado'
const listarTraslado = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json())
    .then(function(data){
        let listaTraslado = data.traslados
        listaTraslado.map(function(traslado){
            respuesta +=`<tr><td>${traslado.nombre_estudiante}</td>`+
                        `<td>${traslado.documento}</td>`+
                        `<td>${traslado.curso_actual}</td>`+
                        `<td>${traslado.curso_nuevo}</td>`+
                        `<td>${traslado.detalle}</td>`+
                        `<td>${traslado.estado}</td>`+
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(traslado)})'>Editar</a><a class="waves-effect waves-light btn modal-danger red" herf='#' onclick='eliminar("${traslado._id}")'>Eliminar</a></td></tr>`
                        body.innerHTML = respuesta

        })
    })
}

const registrar = async() =>{

    let _nombre_estudiante = document.getElementById('nombre_estudiante').value;
    let _documento = document.getElementById('documento').value;
    let _curso_actual = document.getElementById('curso_actual').value;
    let _curso_nuevo = document.getElementById('curso_nuevo').value;
    let _detalle = document.getElementById('detalle').value;
    let _estado = document.getElementById('estado').value;

    if (
        _nombre_estudiante.trim() === '' ||
        _documento.trim() === '' ||
        _curso_actual.trim() === '' ||
        _curso_nuevo.trim() === '' ||
        _detalle.trim() === '' ||
        _estado.trim() === ''
    ) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, completa todos los campos.',
        });
        
        return; 
    }

    // Validación de nombre_estudiante que solo sean letras
    let nombreEstudianteRegex = /^[a-zA-Z\s]+$/;
    if (!nombreEstudianteRegex.test(_nombre_estudiante)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre del estudiante solo debe contener letras.',
        });
        return;
    }

    // Validación del documento que solo sean números
    let documentoRegex = /^[0-9]+$/;
    if (!documentoRegex.test(_documento)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El documento solo debe contener números.',
        });
        return;
    }

    // Validación del detalle que solo sea texto
    let detalleRegex = /^[a-zA-Z\s]+$/;
    if (!detalleRegex.test(_detalle)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El detalle solo debe contener texto.',
        });
        return;
    }

    let _traslado = {
        nombre_estudiante: _nombre_estudiante,
        documento: _documento,
        curso_actual: _curso_actual,
        curso_nuevo: _curso_nuevo,
        detalle: _detalle,
        estado: _estado
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(_traslado),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    
    .then((resp) => resp.json())
    .then(json   =>{
        Swal.fire(
        json.msg,
        '',
        'success'
        );
    })
    .then(() => {
        setTimeout(() => {
            window.location.href = "listarTraslado.html";
        }, 4000);
    })
    .catch(error => {
        Swal.fire(
          'Error al registrar',
          '',
          'error'
        );
      });
}

const editar = (traslado) =>{
    document.getElementById('nombre_estudiante').value = ''
    document.getElementById('documento').value = ''
    document.getElementById('curso_actual').value = ''
    document.getElementById('curso_nuevo').value = ''
    document.getElementById('detalle').value = ''
    document.getElementById('estado').value = ''

    document.getElementById('nombre_estudiante').value = traslado.nombre_estudiante
    document.getElementById('documento').value = traslado.documento
    document.getElementById('curso_actual').value = traslado.curso_actual
    document.getElementById('curso_nuevo').value = traslado.curso_nuevo
    document.getElementById('detalle').value = traslado.detalle
    document.getElementById('estado').value = traslado.estado
}

const actualizar = async () => {

    let _nombre_estudiante = document.getElementById('nombre_estudiante').value;
    let _documento = document.getElementById('documento').value;
    let _curso_actual = document.getElementById('curso_actual').value;
    let _curso_nuevo = document.getElementById('curso_nuevo').value;
    let _detalle = document.getElementById('detalle').value;
    let _estado = document.getElementById('estado').value;

    if (
        _nombre_estudiante.trim() === '' ||
        _documento.trim() === '' ||
        _curso_actual.trim() === '' ||
        _curso_nuevo.trim() === '' ||
        _detalle.trim() === '' ||
        _estado.trim() === ''
    ) {
        Swal.fire(
            'Por favor, complete todos los campos',
            '',
            'error'
        );
        return; 
    }

    // Validación de nombre_estudiante que solo sean letras
    let nombreEstudianteRegex = /^[a-zA-Z\s]+$/;
    if (!nombreEstudianteRegex.test(_nombre_estudiante)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre del estudiante solo debe contener letras.',
        });
        return;
    }

    // Validación del documento que solo sean números
    let documentoRegex = /^[0-9]+$/;
    if (!documentoRegex.test(_documento)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El documento solo debe contener números.',
        });
        return;
    }

    // Validación del detalle que solo sea texto
    let detalleRegex = /^[a-zA-Z\s]+$/;
    if (!detalleRegex.test(_detalle)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El detalle solo debe contener texto.',
        });
        return;
    }

    let _traslado = {
        nombre_estudiante: _nombre_estudiante,
        documento: _documento,
        curso_actual: _curso_actual,
        curso_nuevo: _curso_nuevo,
        detalle: _detalle,
        estado: _estado
    }

    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(_traslado),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

    .then((resp) => resp.json())
    .then(json => {
      Swal.fire(
        json.msg,
        '',
        'success'
      );
    })
    .catch(error => {
      Swal.fire(
        'Error al actualizar',
        '',
        'error'
      );
    });
}


const eliminar = (id) =>{
    if(confirm('¿Estas seguro de realizar la eliminación?') == true){

        let traslado = {
            _id: id
        }
        fetch(url,{
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(traslado),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then(json   =>{
            alert (json.msg)
        })
    }
}

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click', registrar)
}
if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click', actualizar)
}