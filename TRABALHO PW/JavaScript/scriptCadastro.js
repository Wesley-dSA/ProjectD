let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');

let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let validNome = false;

let email = document.querySelector('#email');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

let char = document.querySelector('#char');
let letterMai = document.querySelector('#letterMai');
let letterMin = document.querySelector('#letterMin');
let num = document.querySelector('#Num');

nome.addEventListener('keyup', () => {
  if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color: red');
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
    nome.setAttribute('style', 'border-color: red');
    validNome = false;
  } else {
    labelNome.setAttribute('style', 'color: green');
    labelNome.innerHTML = 'Nome';
    nome.setAttribute('style', 'border-color: green');
    validNome = true;
  }
});

email.addEventListener('keyup', () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    labelEmail.setAttribute('style', 'color: red');
    labelEmail.innerHTML = 'E-mail *Insira um e-mail válido';
    email.setAttribute('style', 'border-color: red');
    validEmail = false;
  } else {
    labelEmail.setAttribute('style', 'color: green');
    labelEmail.innerHTML = 'E-mail';
    email.setAttribute('style', 'border-color: green');
    validEmail = true;
  }
});

senha.addEventListener('keyup', () => {
  let senhaVal = senha.value;
  let validChar = /[!@#$%^&*(),.?":{}|<>]/.test(senhaVal);
  let validLetterMai = /[A-Z]/.test(senhaVal);
  let validLetterMin = /[a-z]/.test(senhaVal);
  let validNum = /[0-9]/.test(senhaVal);

  if (validChar) {
    char.setAttribute('style', 'display: none');
  } else {
    char.setAttribute('style', 'display: list-item');
  }

  if (validLetterMai) {
    letterMai.setAttribute('style', 'display: none');
  } else {
    letterMai.setAttribute('style', 'display: list-item');
  }

  if (validLetterMin) {
    letterMin.setAttribute('style', 'display: none');
  } else {
    letterMin.setAttribute('style', 'display: list-item');
  }

  if (validNum) {
    num.setAttribute('style', 'display: none');
  } else {
    num.setAttribute('style', 'display: list-item');
  }

  if (senhaVal.length > 5 && validChar && validLetterMai && validLetterMin && validNum) {
    labelSenha.setAttribute('style', 'color: green');
    labelSenha.innerHTML = 'Senha';
    senha.setAttribute('style', 'border-color: green');
    validSenha = true;
  } else {
    labelSenha.setAttribute('style', 'color: red');
    labelSenha.innerHTML = 'Senha *Insira uma senha válida';
    senha.setAttribute('style', 'border-color: red');
    validSenha = false;
  }
});

confirmSenha.addEventListener('keyup', () => {
  if (senha.value !== confirmSenha.value) {
    labelConfirmSenha.setAttribute('style', 'color: red');
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
    confirmSenha.setAttribute('style', 'border-color: red');
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green');
    labelConfirmSenha.innerHTML = 'Confirmar Senha';
    confirmSenha.setAttribute('style', 'border-color: green');
    validConfirmSenha = true;
  }
});

function cadastrar() {
  if (validNome && validEmail && validSenha && validConfirmSenha) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    // Verifica se o e-mail já está cadastrado
    if (listaUser.some(user => user.emailCad === email.value)) {
      msgError.setAttribute('style', 'display: block');
      msgError.innerHTML = '<strong>E-mail já cadastrado</strong>';
      msgSuccess.innerHTML = '';
      msgSuccess.setAttribute('style', 'display: none');
      return;
    }

    const usuarioObj = {
      nomeCad: nome.value,
      emailCad: email.value,
      senhaCad: senha.value
    };

    listaUser.push(usuarioObj);
    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    // Criar uma chave única para o usuário para armazenar os produtos
    localStorage.setItem(email.value + '_items', JSON.stringify([]));

    msgSuccess.setAttribute('style', 'display: block');
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
    msgError.setAttribute('style', 'display: none');
    msgError.innerHTML = '';

    setTimeout(() => {
      window.location.href = './login.html';
    }, 3000);
  } else {
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.innerHTML = '';
    msgSuccess.setAttribute('style', 'display: none');
  }
}

btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');
  if (inputSenha.getAttribute('type') === 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
});

btnConfirm.addEventListener('click', () => {
  let inputConfirmSenha = document.querySelector('#confirmSenha');
  if (inputConfirmSenha.getAttribute('type') === 'password') {
    inputConfirmSenha.setAttribute('type', 'text');
  } else {
    inputConfirmSenha.setAttribute('type', 'password');
  }
});

email.addEventListener('focus', () => {
  email.placeholder = 'example@domain.com';
});

email.addEventListener('blur', () => {
  email.placeholder = ' ';
});
