// scriptRecuperacao.js
function recuperarSenha() {
    let email = document.querySelector('#email');
    let labelEmail = document.querySelector('#labelEmail');
    let msgError = document.querySelector('#msgError');
    let msgSuccess = document.querySelector('#msgSuccess');
  

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      labelEmail.setAttribute('style', 'color: red');
      labelEmail.innerHTML = 'E-mail *Insira um e-mail válido';
      email.setAttribute('style', 'border-color: red');
      return;
    }
  
    msgSuccess.setAttribute('style', 'display: block');
    msgSuccess.innerHTML = 'Um e-mail de recuperação de senha foi enviado, verifique sua caixa de entrada!';
    msgError.innerHTML = '';
    msgError.setAttribute('style', 'display: none');

    window.location.href = './NovaSenha.html';
  }
  