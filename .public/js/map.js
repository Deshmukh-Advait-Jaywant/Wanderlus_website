mapboxgl.accessToken = mapToken;
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet URL
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 10 // starting zoom level
    });


const marker = new mapboxgl.Marker({color:"red"})
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 2})
.setHTML(`<h3>${listing.location}</h3><p>Excat location will be provided after booking<p>`)
.setMaxWidth("300px"))
.addTo(map);
