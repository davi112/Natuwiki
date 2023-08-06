function initMap() {

    //dados da pessoa atual
    var pessoa = JSON.parse(localStorage.getItem("dadosUsuario"));

    //lugar padrão
    const sydney = new google.maps.LatLng(-33.867, 151.195);

    infowindow = new google.maps.InfoWindow(); 

    map = new google.maps.Map(document.getElementById("my-map"), {
        center: sydney,
        zoom: 15,
    });

    service = new google.maps.places.PlacesService(map);

    const request = {
        query: pessoa.cidade,
        fields: ["formatted_address","name", "geometry"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
            document.getElementById('endereco').textContent = results[0].formatted_address;
            
        }
    });
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
    });
}