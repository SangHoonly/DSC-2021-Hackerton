function initMap() {
  // const locations = [
  //   new google.maps.LatLng(-31.56391, 147.154312),    
  //   new google.maps.LatLng(-33.718234, 150.363181),
  //   new google.maps.LatLng(-33.727111, 150.371124),
  //   new google.maps.LatLng(-33.848588, 151.209834),
  //   new google.maps.LatLng(-33.851702, 151.216968),
  //   new google.maps.LatLng(-34.671264, 150.863657),
  //   new google.maps.LatLng(-35.304724, 148.662905),
  //   new google.maps.LatLng(-36.817685, 175.699196),
  //   new google.maps.LatLng(-36.828611, 175.790222),
  //   new google.maps.LatLng(-37.75, 145.116667),
  //   new google.maps.LatLng(-37.759859, 145.128708)
  // ];

  const locations = [];
  const requestURL = 'http://13.209.245.78/first/ipserializer/?format=json';
  const request = new XMLHttpRequest();
  const map = new google.maps.Map(
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
    const heatmap = new google.maps.visualization.HeatmapLayer({
      data: locations,
      dissipating: true,
      map: map,
      gradient: gradient,
    });
    heatmap.setMap(map);
  }
}
