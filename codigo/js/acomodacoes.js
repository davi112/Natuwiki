const locais = JSON.parse(localStorage.getItem('locais'));
const usuario = JSON.parse(localStorage.getItem('dadosUsuario'));

window.onload = () => {

    parametros = new URLSearchParams(window.location.search);
    idLocal = parametros.get('id');

    fillDetails(idLocal);
    
    
    document.getElementById('enviar').addEventListener('click', (e) => {
        e.preventDefault();

        if(usuario == null || (usuario.logado == false)){
            alert("É necessário estar logado para enviar um comentário");
            window.location.href = '/codigo/paginas/login.html';
        }else{
            enviarComentario(e, idLocal);
        }
    })
}

function fillDetails(id) {
    var local = locais.find(obj => obj.id == id);

    document.getElementById('nomeH').textContent = local.nome;
    document.getElementById('ImagemHotel').src = local.imagem;   
    document.getElementById('localizacao').textContent = local.endereco;
    document.getElementById('area').textContent = local.area;
    document.getElementById('cama').textContent = local.cama;
    document.getElementById('diaria').textContent = local.valor;
    document.getElementById('alimentacao').textContent = local.alimentacao;

    var caixa_comentarios = document.getElementById('caixa-comentarios');
    htmlComentarios = ``;
    local.comentarios.forEach(comentario => {
        htmlComentarios =
        `<div class="comentario">
            <h5>${comentario.autor}</h5>
            <div>
                <p>
                ${comentario.comentario}
                </p>
            </div>
            </div>
        <br>
        `
        caixa_comentarios.innerHTML += htmlComentarios;
    })
}

function enviarComentario(e, id) {

    let comentarioText = document.getElementById('comentario');

    if (comentarioText.value.length > 30) {
        var caixa_comentarios = document.getElementById('caixa-comentarios');
        
        let comentario = {
            "autor" : usuario.nome,
            "comentario": comentarioText.value
        }

        htmlComentario =
            `<div class="comentario">
                <h5>${comentario.autor}</h5>
                <div>
                    <p>
                    ${comentario.comentario}
                    </p>
                </div>
                </div>
            <br>
            `
        caixa_comentarios.innerHTML += htmlComentario;

        local = locais.find(obj => obj.id == id);

        if(local != null){
            local.comentarios.push(comentario);

            let indice = locais.findIndex(obj => obj.id == id);

            locais[indice] = local;
        }

        localStorage.setItem('locais', JSON.stringify(locais));

        alert("Comentário inserido");

    } else {
        alert('O comentário deve ter ao menos 30 caracteres');
    }
}