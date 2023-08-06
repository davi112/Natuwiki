const dadosLocais = JSON.parse(localStorage.getItem('locais'));
const parametros = new URLSearchParams(window.location.search);
const usuario = JSON.parse(localStorage.getItem("usuario"));

window.onload = () => {

    if (usuario == null || usuario.logado == false) {
        document.getElementsByClassName("pesquisa-rapida")[0].style.display = "none";
    } else {
        document.getElementsByClassName("pesquisa-rapida")[0].style.display = "block";
    }
    
    if(parametros.size > 0){
        loadSearchResult();
    }else{
        fillPlacesCards(dadosLocais);
    }

    document.getElementById("anchor").addEventListener('click', e => {
        pesquisa(e);
    })

}

function shuffleArray(array) {
    return array.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

function fillPlacesCards(array) {
    var locais = shuffleArray(array);

    var placesContainer = document.getElementById('places-container');
    placesContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
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

            linkDetalhe = `<a href="./detalhe.html?id=${local.id}">
                             <p class="mt-2">Leia mais</p>
                           </a>`
        }

        if (local.categoria == 'estadia') {
            imagens =
                `<div class="carousel-item active">
            <img src="${local.imagem}" class="d-block w-100 m-auto"
             alt="${local.nome}">
            </div>`

            linkDetalhe = `<a href="./acomodacoes.html?id=${local.id}">
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

function loadSearchResult() {

    conteudo = parametros.get('query');

    locaisFiltrados = dadosLocais.filter
    (local => (
        (local.nome.toLowerCase()).includes(conteudo.toLowerCase()))
    )

    if(locaisFiltrados.length > 0){
        fillPlacesCards(locaisFiltrados);
    }else{
        paragrafo = document.getElementById('p-result');
        paragrafo.textContent = 'Nenhum local encontrado';
        paragrafo.style.color = 'red';
    }
}