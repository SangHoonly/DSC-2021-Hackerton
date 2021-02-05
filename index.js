function initMap() {
  const locations = [];
  const requestURL = 'http://http://13.209.183.106/first/ipserializer/?format=json';
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
