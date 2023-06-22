const url = 'http://localhost:1018/academia/estudiante'
const listarEstudiantes = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json())
    .then(function(data){
        let listaEstudiante = data.estudiantes
        listaEstudiante.map(function(estudiante){
            respuesta += `<tr><td>${estudiante.nombre}</td>`+
                         `<td>${estudiante.apellido}</td>`+
                         `<td>${estudiante.correo}</td>`+
                         `<td>${estudiante.documento}</td>`+
                         `<td>${estudiante.tipo_documento}</td>`+
                         `<td>${estudiante.nro_telefono}</td>`+
                         `<td>${estudiante.estado}</td>`+
                         `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(estudiante)})'>Editar</a><a class="waves-effect waves-light btn modal-danger red" herf='#' onclick='eliminar("${estudiante._id}")'>Eliminar</a></td></tr>`
                         body.innerHTML = respuesta
        })
    })
}



const registrar = async()=>{

    let _nombre = document.getElementById('nombre').value;
    let _apellido = document.getElementById('apellido').value;
    let _correo = document.getElementById('correo').value;
    let _documento = document.getElementById('documento').value;
    let _tipo_documento = document.getElementById('tipo_documento').value;
    let _nro_telefono = document.getElementById('nro_telefono').value;
    let _estado = document.getElementById('estado').value;

    if (
      _nombre.trim() === '' ||
      _apellido.trim() === '' ||
      _correo.trim() === '' ||
      _documento.trim() === '' ||
      _tipo_documento.trim() === '' ||
      _nro_telefono.trim() === '' ||
      _estado.trim() === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos.',
      });
      return;
  }

  // Validación de nombre que solo sean letras
  let nombreRegex = /^[a-zA-Z\s]+$/;
  if (!nombreRegex.test(_nombre)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El nombre solo debe contener letras.',
    });
    return;
  }

  // Validación de apellido que solo sean letras
  let apellidoRegex = /^[a-zA-Z\s]+$/;
  if (!apellidoRegex.test(_apellido)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El apellido solo debe contener letras.',
    });
    return;
  }

  // Validación del correo electrónico
  let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(_correo)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El correo electrónico no es válido.',
    });
    return;
  }

  // Validación del documento (máximo 10 dígitos)
  if (_documento.length > 10) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El documento debe tener máximo 10 dígitos.',
    });
    return;
  }

  // Validación del tipo de documento (cedula o tarjeta de identidad)
  let tipoDocumentoRegex = /^(Cedula|Tarjeta Identidad)$/i;
  if (!tipoDocumentoRegex.test(_tipo_documento)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El tipo de documento no es válido. Debe ser "cedula" o "Tarjeta Identidad".',
    });
    return;
  }

  // Validación del número de teléfono (solo números)
  let telefonoRegex = /^[0-9]+$/;
  if (!telefonoRegex.test(_nro_telefono)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El número de teléfono solo debe contener dígitos numéricos.',
    });
    return;
  }
  
  let _estudiante = {
    nombre: _nombre,
    apellido: _apellido,
    correo: _correo,
    documento: _documento,
    tipo_documento: _tipo_documento,
    nro_telefono: _nro_telefono,
    estado: _estado
  }
  
  fetch (url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(_estudiante),
    headers: {"Content-type": "application/json; charset=UTF-8"}
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
      window.location.href = "listarEstudiantes.html";
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

const editar = (estudiante) =>{
    document.getElementById('nombre').value = ''
    document.getElementById('apellido').value = ''
    document.getElementById('correo').value = ''
    document.getElementById('documento').value = ''
    document.getElementById('tipo_documento').value = ''
    document.getElementById('nro_telefono').value = ''
    document.getElementById('estado').value = ''

    document.getElementById('nombre').value = estudiante.nombre
    document.getElementById('apellido').value = estudiante.apellido
    document.getElementById('correo').value = estudiante.correo
    document.getElementById('documento').value = estudiante.documento
    document.getElementById('tipo_documento').value = estudiante.tipo_documento
    document.getElementById('nro_telefono').value = estudiante.nro_telefono
    document.getElementById('estado').value = estudiante.estado
}

const actualizar = async () => {
  let _nombre = document.getElementById('nombre').value;
  let _apellido = document.getElementById('apellido').value;
  let _correo = document.getElementById('correo').value;
  let _documento = document.getElementById('documento').value;
  let _tipo_documento = document.getElementById('tipo_documento').value;
  let _nro_telefono = document.getElementById('nro_telefono').value;
  let _estado = document.getElementById('estado').value;

  if (
    _nombre.trim() === '' ||
    _apellido.trim() === '' ||
    _correo.trim() === '' ||
    _documento.trim() === '' ||
    _tipo_documento.trim() === '' ||
    _nro_telefono.trim() === '' ||
    _estado.trim() === ''
  )  {
    Swal.fire(
      'Por favor, complete todos los campos',
      '',
      'error'
    );
    return;
  }

  // Validación de nombre que solo sean letras
  let nombreRegex = /^[a-zA-Z\s]+$/;
  if (!nombreRegex.test(_nombre)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El nombre solo debe contener letras.',
    });
    return;
  }

  // Validación de apellido que solo sean letras
  let apellidoRegex = /^[a-zA-Z\s]+$/;
  if (!apellidoRegex.test(_apellido)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El apellido solo debe contener letras.',
    });
    return;
  }

  // Validación del correo electrónico
  let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(_correo)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El correo electrónico no es válido.',
    });
    return;
  }

  // Validación del documento (máximo 10 dígitos)
  if (_documento.length > 10) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El documento debe tener máximo 10 dígitos.',
    });
    return;
  }
  
  // Validación del tipo de documento (cedula o tarjeta de identidad)
  let tipoDocumentoRegex = /^(Cedula|Tarjeta Identidad)$/i;
  if (!tipoDocumentoRegex.test(_tipo_documento)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El tipo de documento no es válido. Debe ser "cedula" o "Tarjeta Identidad".',
    });
    return;
  }

  // Validación del número de teléfono (solo números)
  let telefonoRegex = /^[0-9]+$/;
  if (!telefonoRegex.test(_nro_telefono)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El número de teléfono solo debe contener dígitos numéricos.',
    });
    return;
  }
  
  let _estudiante = {
    nombre: _nombre,
    apellido: _apellido,
    correo: _correo,
    documento: _documento,
    tipo_documento: _tipo_documento,
    nro_telefono: _nro_telefono,
    estado: _estado
  };
  
  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(_estudiante),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
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
    if(confirm('¿Estas seguro en realizar la eliminación?') == true){

        let estudiante ={
            _id: id
        } 
        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(estudiante),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then(json   =>{
            alert(json.msg)
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