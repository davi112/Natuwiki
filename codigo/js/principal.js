const usuario = JSON.parse(localStorage.getItem("usuario"));

const dadosLocais = JSON.parse(localStorage.getItem('locais'));

window.onload = () => {

    fillPlacesCards(dadosLocais);

    if (usuario == null || usuario.logado == false) {
        document.getElementsByClassName("pesquisa-rapida")[0].style.display = "none";
    } else {
        document.getElementsByClassName("pesquisa-rapida")[0].style.display = "block";
    }

    document.getElementById("anchor").addEventListener('click', e => {
        pesquisa(e);
    })

    carregarComentarios();

}

function shuffleArray(array) {
    return array.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

function fillPlacesCards(dadosLocais) {
    var locais = shuffleArray(dadosLocais);

    var placesContainer = document.getElementById('places-container');
    placesContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        var local = locais[i];

        let cardLocal = '';
        let linkDetalhe = '';
        let imagens = '';

        if (local.categoria === 'local') {
            imagens =
                `<div class="carousel-item active">
            <img src="${local.imagensprincipal[0]}" class="d-block w-100 m-auto"
             alt="${local.nome}">
            </div>`

            for (let i = 1; i < local.imagensprincipal.length; i++) {
                imagens += `
            <div class="carousel-item">
               <img src="${local.imagensprincipal[i]}" class="d-block w-100 m-auto"
                alt="${local.nome}">
            </div>`
            }

            linkDetalhe = `<a href="./paginas/detalhe.html?id=${local.id}">
                             <p class="mt-2">Leia mais</p>
                           </a>`
        }

        if (local.categoria == 'estadia') {
            imagens =
                `<div class="carousel-item active">
            <img src="${local.imagem}" class="d-block w-100 m-auto"
             alt="${local.nome}">
            </div>`

            linkDetalhe = `<a href="./paginas/acomodacoes.html?id=${local.id}">
            <p class="mt-2">Leia mais</p>
             </a>`
        }

        cardLocal =
            `<div class="card col-lg-3 col-md-6 col-xs-12 shadow p-3 mb-5 bg-white rounded border-0">
                    <h4>${local.nome}</h4>
                    <div id="carouselExampleIndicators${local.id}" class="carousel slide mt-2">
                        <div class="carousel-inner">
                            ${imagens}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${local.id}"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${local.id}"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                    <p class="card-tag">${local.descricao.slice(0, 150)}...</p>
                    <i class="fa fa-map-marker d-flex">
                        <p class="px-2">${local.endereco}</p>
                    </i>
                    <div class="leiamais botoes1">
                        ${linkDetalhe}
                    </div>
            </div>`

        placesContainer.innerHTML += cardLocal;
    }
}

function pesquisa(e) {

    input = document.getElementById('pesquisa').value;

    if (input.length == 0) {
        alert('Pesquisa inválida')
        e.preventDefault();
    } else {
        document.getElementById('anchor').href = `/codigo/paginas/pesquisa.html?query=${input}`
    }
}

function carregarComentarios() {

    let array = shuffleArray(dadosLocais);

    let algunsComentarios = [];

    let aux = 0;
    while (algunsComentarios.length < 3) {
        let max = Math.round(array[aux].comentarios.length);
        let random = Math.floor((Math.random() * (max)));
        algunsComentarios.push(array[aux].comentarios[random]);
        aux++;
    }

    let comentariosContainer = document.getElementById('comentarios-container');

    algunsComentarios.forEach(comentario => {
        htmlComentario = `
    <div class="comentario mb-3">
    <i id="autor" class="fa-solid fa-user d-flex" style="color:black"><p class="px-2">${comentario.autor}</p></i>
    <!--<p id="titulo-comentario" class="titulo-comentario fw-bold mb-0"></p>!-->
    <p id="conteudo">${comentario.comentario}</p>
    </div>`

        comentariosContainer.innerHTML += htmlComentario;
    })
}