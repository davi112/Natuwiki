const pessoas = JSON.parse(localStorage.getItem('pessoas'));

//código da Hayanne inicio
var usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario != null && usuario.logado == true) {
    document.location.href = './perfil.html';
}
//código da Hayanne fim

window.onload = () => {
    form = document.getElementById("form-login");
    error = document.getElementById("error");
    limpar = document.getElementById("limpar");
    entrar = document.getElementById("link-entrar");

    entrar.addEventListener('click', (event) => {
        validaAutenticacao(event);
    })

    limpar.addEventListener('click', () => {
        error.style.display = 'none';
        limpar.style.display = 'none';
    });
};


function validaAutenticacao(event) {
    var entradaUsuario = document.getElementById("username").value;
    var entradaSenha = document.getElementById("password").value;
    var usuario;

    for (let i = 0; i < pessoas.length; i++) {

        if (entradaUsuario == pessoas[i].usuario.login && entradaSenha == pessoas[i].usuario.senha) {
            usuario = {
                "nome": pessoas[i].usuario.login,
                "logado": true
            };
            localStorage.setItem('usuario', JSON.stringify(usuario));
            localStorage.setItem('dadosUsuario', JSON.stringify(pessoas[i]));
        }
    }

    if (usuario == null) {
        event.preventDefault();
        error.style.display = 'block';
        limpar.style.display = 'inline-block';
        error.textContent = "Senha e/ou usuário inválidos";
    }
}

