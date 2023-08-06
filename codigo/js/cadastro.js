window.onload = () => {

    document.getElementById('btn_cadastro').addEventListener('click', validaDados)

}



function validaDados(e) {

    e.preventDefault();

    nome = document.getElementById('username').value;
    sobrenome = document.getElementById('sobrenome').value;
    cidade = document.getElementById('cidade').value;
    number = document.getElementById('number').value;
    email = document.getElementById('email').value;
    senha = document.getElementById('senha').value;
    confirmacao = document.getElementById('confirmacao').value;
    casadoTexto = document.getElementById('estado-civil').value;
    filhos = document.getElementById('filhos').value;
    transporte = document.getElementById('transporte').value;
    experiencia_natureza = document.getElementById('caixa-nivel').value;
    destinos = document.getElementById('destinos').value;

    casado = (casadoTexto === 'true');
    erro = false;
    limparMensagens();

    if (nome == '') {
        paragrafo = document.getElementById('erro_nome');
        erro_nome.textContent = 'Nome inválido';
        erro = true;
    }

    if (sobrenome == '') {
        paragrafo = document.getElementById('erro_sobrenome');
        erro_sobrenome.textContent = 'Sobrenome inválido';
        erro = true;
    }

    if (cidade == '') {
        paragrafo = document.getElementById('erro_cidade');
        erro_cidade.textContent = 'Cidade inválido';
        erro = true;
    }

    if (number == '') {
        paragrafo = document.getElementById('erro_number');
        erro_number.textContent = 'Número inválido';
        erro = true;
    }

    if (email == '') {
        paragrafo = document.getElementById('erro_email');
        erro_email.textContent = 'Email inválido';
        erro = true;
    }

    if (senha == '') {
        paragrafo = document.getElementById('erro_senha');
        erro_senha.textContent = 'Senha não pode ser vazia';
        erro = true;
    }

    if (senha != confirmacao) {
        paragrafo = document.getElementById('erro_senha');
        paragrafo.textContent = 'As senhas não correspondem';
        erro = true;
    }

    cadastrar(erro);

}

function cadastrar(erro) {

    if (!erro) {

        var pessoa = {

            "nome": nome,
            "sobrenome": sobrenome,
            "cidade": cidade,
            "celular": number,
            "email": email,
            "casado": casado,
            "filhos": filhos,
            "experiencia_natureza": experiencia_natureza,
            "destinos_favoritos": destinos,
            "transporte": transporte,
            "usuario": {
                "senha": senha,
                "login": email
            }

        }

        var jaExiste = false;
        pessoas = JSON.parse(localStorage.getItem('pessoas'));

        if (pessoas != null) {
            pessoas.forEach(p => {
                if (p.email == pessoa.email) {
                    alert('Usuário existente')
                    jaExiste = true;
                }
            });

            if (!jaExiste) {
                ids = pessoas.map(object => {
                    return object.id;
                })

                ultimoId = Math.max(...ids);

                pessoa.id = ultimoId + 1;
                pessoas.push(pessoa);
            }
        } else {
            pessoa.id = 1;
            pessoas = [];
            pessoas.push(pessoa);
        }

        localStorage.setItem('pessoas', JSON.stringify(pessoas));

        if(!jaExiste){
            alert('Usuário cadastrado com sucesso !');
        }
    }
}

function limparMensagens() {
    paragrafos = document.getElementsByClassName('invalido');

    for (let i = 0; i < paragrafos.length; i++) {
        paragrafos[i].textContent = '';
    }
}