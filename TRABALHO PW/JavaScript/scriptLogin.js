let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') === 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

function entrar() {
  let email = document.querySelector('#email');
  let emailLabel = document.querySelector('#userLabel');
  
  let senha = document.querySelector('#senha');
  let senhaLabel = document.querySelector('#senhaLabel');
  
  let msgError = document.querySelector('#msgError');
  let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
  
  let userValid = {
    nome: '',
    email: '',
    senha: '',
  };

  listaUser.forEach((item) => {
    if (email.value === item.emailCad && senha.value === item.senhaCad) {
      userValid = {
        nome: item.nomeCad,
        email: item.emailCad,
        senha: item.senhaCad
      };
    }
  });

  // Verifica se os campos de e-mail e senha estão preenchidos
  if (email.value.trim() === "" || senha.value.trim() === "") {
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = 'Por favor, preencha todos os campos';
    if (email.value.trim() === "") {
      emailLabel.setAttribute('style', 'color: red');
      email.setAttribute('style', 'border-color: red');
    } else {
      emailLabel.setAttribute('style', 'color: green');
      email.setAttribute('style', 'border-color: green');
    }
    if (senha.value.trim() === "") {
      senhaLabel.setAttribute('style', 'color: red');
      senha.setAttribute('style', 'border-color: red');
    } else {
      senhaLabel.setAttribute('style', 'color: green');
      senha.setAttribute('style', 'border-color: green');
    }
    return;
  } else {
    // Redefine as cores se os campos estiverem preenchidos
    emailLabel.setAttribute('style', 'color: green');
    email.setAttribute('style', 'border-color: green');
    senhaLabel.setAttribute('style', 'color: green');
    senha.setAttribute('style', 'border-color: green');
  }

  if (email.value === userValid.email && senha.value === userValid.senha) {
    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;
    
    localStorage.setItem('token', token);
    localStorage.setItem('userLogado', JSON.stringify(userValid));
    window.location.href = './Dispensa.html';
  } else {
    emailLabel.setAttribute('style', 'color: red');
    email.setAttribute('style', 'border-color: red');
    senhaLabel.setAttribute('style', 'color: red');
    senha.setAttribute('style', 'border-color: red');
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = 'Usuário ou senha incorretos';
    email.focus();
  }
}
