var usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario == null || usuario.logado == false) {
    document.location.href = './login.html';
}

window.onload = () => {
    pessoa = load_user_info(page);

    document.getElementById('logout').addEventListener('click', () => {
        sair();
    })
}

function load_user_info() {
    var pessoa = JSON.parse(localStorage.getItem("dadosUsuario"));

    let enabled_or_disabled = '';
    if (page == 'perfil') {
        enabled_or_disabled = 'disabled'
    }

    document.getElementById('first-name').value = pessoa.nome;
    document.getElementById('email').value = pessoa.email;
    document.getElementById('telefone').value = pessoa.celular;
    document.getElementById('cidade').value = pessoa.cidade;
    document.getElementById('last-name').value = pessoa.sobrenome;

    return pessoa;
}

function sair(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('dadosUsuario');
}