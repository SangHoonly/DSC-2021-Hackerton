function initMap() {
  const locations = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
  ];
  const requestURL = 'http://13.209.245.78/first/ipserializer/?format=json';
  const request = new XMLHttpRequest();
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 2.5,
      minZoom: 2.5,
      center: { lat: 37.5642135 ,lng: 127.0016985 }
    });
  // function addMarker({address, lat, lng}) {
  //   const infoWindow = new google.maps.InfoWindow({
  //     content: infoToString(address, lat, lng),
  //   })
  //   const marker = new google.maps.Marker({
  //     position: {lat: Number(lat), lng: Number(lng)} ,
  //     map: map,
  //   });
  //   marker.addListener("click", () => {
  //     if(!this.open) {
  //       infoWindow.open(map,marker);
  //       this.open = true;
  //       return;
  //     }
  //     infoWindow.close();
  //     this.open = false;
  //   });
  //   return marker;
  // }

  const infoToString = (location) => {
    const toString = `<h4>${location.address}</h4>
      <div>위도: ${location.lat.toFixed(5)}</div>
      <div>경도: ${location.lng.toFixed(5)}</div>
      <div>발생 일시: ${location.happened_at}</div>
      `;
    return toString;
  }
  const markers = [];

  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    const asfLocationInformations = request.response;
    for (let i=0; i < asfLocationInformations.length; i++) {
      // console.log(asfLocationInformations[i]);
      const { address, happened_at } = asfLocationInformations[i];
      const lat = Number(asfLocationInformations[i].lat);
      const lng = Number(asfLocationInformations[i].lng);

      const location = {
        lat: lat,
        lng: lng,
        address: address,
        happened_at: happened_at
      };

      locations.push(location);

      // infoWindow 핸들링
      // const infoWindow = new google.maps.InfoWindow({
      //   content: infoToString(asfLocationInformations[i].address, location),
      // })

      // marker.addListener("click", () => {
      //   if(!marker.open) {
      //     infoWindow.open(map,marker);
      //     marker.open = true;
      //     return;
      //   }
      //   infoWindow.close();
      //   marker.open = false;
      // });

      // markers.push(marker);
      // console.log(markers);
    }
    const markers = locations.map((location) => {
      // console.log({ lat: location.lat, lng: location.lng });
      const marker = new google.maps.Marker({
        // center: new google.maps.LatLng(location.lat, location.lng),
        map,
        // map: map,
        position: location,

        // circle 
        // strokeColor: "#FF0000",
        // strokeOpacity: 0.8,
        // strokeWeight: 2,
        // fillColor: "#FF0000",
        // fillOpacity: 0.35,
        // radius: 100000,
      });
      const circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        radius: 100000,
      });
      circle.bindTo('center', marker, 'position');
      circle.bindTo('map', marker, 'map');

      console.log(marker);
      const infoWindow = new google.maps.InfoWindow({
        content: infoToString(location),
      })

      // google.maps.event.addListener(marker, 'click', () => {
      //   if(!marker.open) {
      //     infoWindow.setPosition(marker.getCenter());
      //     infoWindow.open(map);
      //     marker.open = true;
      //     return;
      //   }
      //   infoWindow.close();
      //   marker.open = false;
      // });

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
      gridSize: 30,
      zoomOnClick: true,
    };

    const markerClusterer = new MarkerClusterer(map, markers, clusterOptions);

    const styles = markerClusterer.getStyles();
    for (let i=0; i<styles.length; i++) {
      styles[i].textSize = 10;
    }

  }
}
