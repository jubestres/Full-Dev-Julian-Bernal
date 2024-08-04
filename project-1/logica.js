// Verificar si los datos de usuarios ya existen en localStorage
let usuarios = JSON.parse(localStorage.getItem('usuarios'));

if (!usuarios) {
  // Si no existen, inicializa el array de usuarios y guárdalo en localStorage
  usuarios = [
    { id: 1, usuario: 'usuario1', clave: '1234', intentosFallidos: 0, bloqueado: false },
    { id: 2, usuario: 'usuario2', clave: '5678', intentosFallidos: 0, bloqueado: false },
    { id: 3, usuario: 'usuario3', clave: '9101', intentosFallidos: 0, bloqueado: false },
    { id: 4, usuario: 'usuario4', clave: '1121', intentosFallidos: 0, bloqueado: false },
    { id: 5, usuario: 'usuario5', clave: '3141', intentosFallidos: 0, bloqueado: false }
  ];

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function iniciarSesion(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Obtiene los usuarios del localStorage cada vez que se intenta iniciar sesión
  usuarios = JSON.parse(localStorage.getItem('usuarios'));

  const usuario = usuarios.find(u => u.usuario === username);

  if (!usuario) {
    alert("Usuario o clave incorrecta");
    return;
  }

  if (usuario.bloqueado) {
    alert("Su usuario ha sido bloqueado por exceder el número de intentos");
    return;
  }

  if (usuario.clave === password) {
    alert("Inicio de sesión exitoso");
    usuario.intentosFallidos = 0; // Restablece el contador de intentos fallidos
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda el estado actualizado
    window.location.href = 'login.html';
  } else {
    usuario.intentosFallidos++;
    alert("Usuario o clave incorrecta");

    if (usuario.intentosFallidos >= 3) {
      usuario.bloqueado = true;
      alert("Su usuario ha sido bloqueado por exceder el número de intentos");
    }

    // Guarda el estado actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  // Restablece los campos de entrada
  usernameInput.value = '';
  passwordInput.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', iniciarSesion);
});
