let map, heatmap;

function initMap() {
  const locations = [];
  const requestURL = 'http://13.209.183.106/first/ipserializer/?format=json';
  const request = new XMLHttpRequest();
  map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 2.5,
      minZoom: 2.5,
      center: { lat: 37.5642135 ,lng: 127.0016985 },
    });

  const gradient = [
    "rgba(0,0,0,0)",
    "rgb(255, 108, 108)",
      "rgb(245, 98, 98)",
      "rgb(235, 88, 88)",
      "rgb(225, 78, 78)",
      "rgb(215, 68, 68)",
      "rgb(205, 58, 58)",
      "rgb(195, 48, 48)",
      "rgb(185, 38, 38)",
      "rgb(175, 28, 28)",
      "rgb(165, 18, 18)",
      "rgb(155, 10, 10)",
      "rgb(150, 0, 0)",
  ]

  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    const asfLocationInformations = request.response;
    for (let i=0; i < asfLocationInformations.length; i++) {
      const location = new google.maps.LatLng(
        Number(asfLocationInformations[i].lat),
        Number(asfLocationInformations[i].lng)
      )
      locations.push(location);
    }
    // console.log(locations);
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: locations,
      dissipating: true,
      map: map,
      gradient: gradient,
    });
    // heatmap.setMap(map);
    console.log(locations.length);

    
  }
}  
