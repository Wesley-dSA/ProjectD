// scriptNovaSenha.js
let btnNovaSenha = document.querySelector('#verNovaSenha');
let btnConfirmNovaSenha = document.querySelector('#verConfirmNovaSenha');

let novaSenha = document.querySelector('#novaSenha');
let labelNovaSenha = document.querySelector('#labelNovaSenha');
let validNovaSenha = false;

let confirmNovaSenha = document.querySelector('#confirmNovaSenha');
let labelConfirmNovaSenha = document.querySelector('#labelConfirmNovaSenha');
let validConfirmNovaSenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

novaSenha.addEventListener('keyup', () => {
  let senhaVal = novaSenha.value;
  let validChar = /[!@#$%^&*(),.?":{}|<>]/.test(senhaVal);
  let validLetterMai = /[A-Z]/.test(senhaVal);
  let validLetterMin = /[a-z]/.test(senhaVal);
  let validNum = /[0-9]/.test(senhaVal);

  if (validChar && validLetterMai && validLetterMin && validNum && senhaVal.length >= 6) {
    labelNovaSenha.setAttribute('style', 'color: green');
    labelNovaSenha.innerHTML = 'Nova Senha';
    novaSenha.setAttribute('style', 'border-color: green');
    validNovaSenha = true;
  } else {
    labelNovaSenha.setAttribute('style', 'color: red');
    labelNovaSenha.innerHTML = 'Nova Senha *Insira uma senha válida';
    novaSenha.setAttribute('style', 'border-color: red');
    validNovaSenha = false;
  }
});

confirmNovaSenha.addEventListener('keyup', () => {
  if (novaSenha.value !== confirmNovaSenha.value) {
    labelConfirmNovaSenha.setAttribute('style', 'color: red');
    labelConfirmNovaSenha.innerHTML = 'Confirmar Nova Senha *As senhas não conferem';
    confirmNovaSenha.setAttribute('style', 'border-color: red');
    validConfirmNovaSenha = false;
  } else {
    labelConfirmNovaSenha.setAttribute('style', 'color: green');
    labelConfirmNovaSenha.innerHTML = 'Confirmar Nova Senha';
    confirmNovaSenha.setAttribute('style', 'border-color: green');
    validConfirmNovaSenha = true;
  }
});

function salvarNovaSenha() {
  if (validNovaSenha && validConfirmNovaSenha) {
    msgSuccess.setAttribute('style', 'display: block');
    msgSuccess.innerHTML = 'Nova senha definida com sucesso!';
    msgError.innerHTML = '';
    msgError.setAttribute('style', 'display: none');

    userLogado.senha = novaSenha.value;
    localStorage.setItem('userLogado', JSON.stringify(userLogado));

    setTimeout(() => {
      window.location.href = './login.html';
    }, 3000);
  } else {
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de salvar</strong>';
    msgSuccess.innerHTML = '';
    msgSuccess.setAttribute('style', 'display: none');
  }
}

btnNovaSenha.addEventListener('click', () => {
  let inputNovaSenha = document.querySelector('#novaSenha');
  if (inputNovaSenha.getAttribute('type') === 'password') {
    inputNovaSenha.setAttribute('type', 'text');
  } else {
    inputNovaSenha.setAttribute('type', 'password');
  }
});

btnConfirmNovaSenha.addEventListener('click', () => {
  let inputConfirmNovaSenha = document.querySelector('#confirmNovaSenha');
  if (inputConfirmNovaSenha.getAttribute('type') === 'password') {
    inputConfirmNovaSenha.setAttribute('type', 'text');
  } else {
    inputConfirmNovaSenha.setAttribute('type', 'password');
  }
});
