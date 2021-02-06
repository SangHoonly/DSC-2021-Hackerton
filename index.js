const gradient = [
  "rgba(0,0,0,0)",
  "rgb(255, 70, 70)",
    "rgb(240, 55, 55)",
    "rgb(226, 40, 40)",
    "rgb(213, 25, 25)",
    "rgb(200, 10, 10)",
    "rgb(189, 0, 0)",
    "rgb(177, 0, 0)",
    "rgb(165, 0, 0)",
    "rgb(156, 0, 0)",
    "rgb(143, 0, 0)",
    "rgb(130, 0, 0)",
    "rgb(120, 0, 0)",
]

function initMap() {
  const locations = [];
  const requestURL = 'http://13.209.183.106/first/ipserializer/?format=json';
  const request = new XMLHttpRequest();
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 2.5,
      minZoom: 2.5,
      center: { lat: 37.5642135 ,lng: 127.0016985 }
    });
  const infoToString = (location) => {
    const toString = `<h4>${location.address}</h4>
      <div>위도: ${location.lat.toFixed(5)}</div>
      <div>경도: ${location.lng.toFixed(5)}</div>
      <div>발생 일시: ${location.happened_at}</div>
      `;
    return toString;
  }
  const heatmapLocations = [];

  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    const asfLocationInformations = request.response;
    for (let i=0; i < asfLocationInformations.length; i++) {
      const { address, happened_at } = asfLocationInformations[i];
      const lat = Number(asfLocationInformations[i].lat);
      const lng = Number(asfLocationInformations[i].lng);
      
      if ( 
        (((-145 > lng && lng  > -178 ) || ( lng  > 145 )) && ( 27 > lat && lat > -10)) ||
        ((lng > 56 && lng < 97) && (lat < 8 && lat > -8)) ||
        (( -100 < lng && lng < -21) && ( 0 < lat && lat < 50)) 
      ){
        continue;
      }
      
      const heatmapLocation = new google.maps.LatLng(lat, lng);
      const location = {
        lat: lat,
        lng: lng,
        address: address,
        happened_at: happened_at
      };
      locations.push(location);
      heatmapLocations.push(heatmapLocation);
    }
    const heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapLocations,
      dissipating: true,
      map: map,
      gradient: gradient,
    });
    
    const markers = locations.map((location) => {
      const marker = new google.maps.Marker({
        map,
        position: location,
        icon: "./virus.png",
      });
   
      const infoWindow = new google.maps.InfoWindow({
        content: infoToString(location),
      })

      marker.addListener("click", () => {
        if(!marker.open) {
          infoWindow.open(map,marker);
          marker.open = true;
          return;
        }
        infoWindow.close();
        marker.open = false;
      });

      return marker;
    });

    const clusterOptions = {
      imagePath: "./img/",
      imageSizes: [38, 38],
      gridSize: 45,
      zoomOnClick: true,
    };

    const markerClusterer = new MarkerClusterer(map, markers, clusterOptions);

    const styles = markerClusterer.getStyles();
    for (let i=0; i<styles.length; i++) {
      styles[i].textSize = 10;
    }

  }
}
