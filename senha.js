function login() {
  const password = document.getElementById('password').value;
  const correctPassword = 'magalhaes'; // Defina sua senha correta aqui

  if (password === correctPassword) {
    window.location.href = 'dono.html'; // Redireciona para a página de destino
  } else {
    document.getElementById('error-message').innerText =
      'Senha incorreta. Tente novamente.';
  }
}
