
function initMap() {
  const requestURL = 'http://13.209.245.78/first/ipserializer/?format=json';
  const request = new XMLHttpRequest();
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 2,
      center: { lat: 37.5642135 ,lng: 127.0016985 }
    });
  function addMarker({address, lat, lng}) {
    new google.maps.Marker({
      position: {lat: Number(lat), lng: Number(lng)} ,
      map: map,
      label: address,
    });
  }

  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    const asfLocationInformations = request.response;
    for (let i=0; i < asfLocationInformations.length; i++) {
      addMarker(asfLocationInformations[i]);
      // console.log(asfLocationInformations[i]);
    }
  }
}
