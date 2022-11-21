const { BaseElement } = require("./base-element");
class GoogleMap extends BaseElement {
  constructor(centerOfMap) {
    super();
    this.centerOfMap = centerOfMap;
    this.data = [];
    this.map = null;
  }
  createElement() {
    super.createElement();
    setTimeout(() => {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: this.centerOfMap,
      });
    }, 0);
  }
  addMarker(marker) {
    if (!marker) {
      return;
    }
    this.data.push(marker);
    let [lat, long] = marker?.latLong.split(" ");
    let myLatlng = new window.google.maps.LatLng(lat, long);

    let createdMarker = new window.google.maps.Marker({
      position: myLatlng,
      label: marker.name,
      map: this.map,
    });
    createdMarker.setMap(this.map);
    let [clat, clong] = this.getLatLngCenter();
    createdMarker.setMap(this.map);
    var coord = new google.maps.LatLng(clat, clong);
    this.map.setCenter(coord);
  }
  rad2degr(rad) {
    return (rad * 180) / Math.PI;
  }
  degr2rad(degr) {
    return (degr * Math.PI) / 180;
  }
  getLatLngCenter() {
    if (!this.data) {
      return;
    }
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i = 0; i < this.data?.length; i++) {
      let [latitude, long] = this.data[i]?.latLong.split(" ");
      var lat = this.degr2rad(latitude);
      var lng = this.degr2rad(long);
      // sum of cartesian coordinates
      sumX += Math.cos(lat) * Math.cos(lng);
      sumY += Math.cos(lat) * Math.sin(lng);
      sumZ += Math.sin(lat);
    }

    var avgX = sumX / this.data?.length;
    var avgY = sumY / this.data?.length;
    var avgZ = sumZ / this.data?.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    return [this.rad2degr(lat), this.rad2degr(lng)];
  }
  getElementString() {
    return `<div id="map"></div>`;
  }
}
module.exports = { GoogleMap };
