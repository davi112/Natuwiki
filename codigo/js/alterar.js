var erros = [];

window.onload = () => {
    pessoa = load_user_info(page);

    document.getElementById('btn-save').addEventListener('click', () => {
        erros = [];
        var nome = {"field":"nome", "value": document.getElementById('first-name').value};
        var sobrenome = {"field":"sobrenome", "value": document.getElementById('last-name').value};
        var telefone = {"field":"celular", "value": document.getElementById('telefone').value};
        var email = {"field":"email", "value": document.getElementById('email').value};
        var filhos = {"field":"filhos", "value": document.getElementById('filhos').value};
        var cidade = {"field":"cidade", "value": document.getElementById('cidade').value};

        fields = [nome, sobrenome, telefone, email, filhos, cidade];
        
        validateNotEmpty(fields, pessoa);

        pessoas = JSON.parse(localStorage.getItem('pessoas'));

        for(let i = 0; i < pessoas.length; i++){
            if(pessoas[i].id == pessoa.id){
                pessoas[i] = pessoa;
                break;
            }
        }
    
        if(erros.length > 0){
            strErros = '';
            erros.forEach(erro => {
                strErros += erro + "\n";
            })
            alert(strErros)
        }else{
            localStorage.setItem('dadosUsuario', JSON.stringify(pessoa));
            localStorage.setItem('pessoas', JSON.stringify(pessoas));
            window.location.href = './perfil.html';
        }
    })

    document.getElementById('btn-cancel').addEventListener('click', () => {
        window.location.href = './perfil.html';
    })

}

function validateNotEmpty(fields, pessoa){
    fields.forEach(item => {
        if(item.value == ''){
            erros.push(`${item.field} inválido !`);
        }
        else{
            pessoa[item.field] = item.value;
        }   
    });
}

function load_user_info() {
    var pessoa = JSON.parse(localStorage.getItem("dadosUsuario"));

    document.getElementById('first-name').value = pessoa.nome;
    document.getElementById('email').value = pessoa.email;
    document.getElementById('telefone').value = pessoa.celular;
    document.getElementById('cidade').value = pessoa.cidade;
    document.getElementById('last-name').value = pessoa.sobrenome;
    document.getElementById('filhos').value = pessoa.filhos;

    return pessoa;
}