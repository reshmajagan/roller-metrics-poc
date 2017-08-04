// This example creates an interactive map which constructs a polyline based on
  // user clicks. Note that the polyline only appears once its path property
  // contains two LatLng coordinates.

  var poly;
  var map;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: 41.879, lng: -87.624}  // Center the map on Chicago, USA.
    });

    simplePolylines();

    polylinesOnClick();

    
  }

  // Simple polylines

  function simplePolylines() {
    var flightPlanCoordinates = [
      {lat: 37.772, lng: -122.214},
      {lat: 21.291, lng: -157.821},
      {lat: -18.142, lng: 178.431},
      {lat: -27.467, lng: 153.027}
    ];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    flightPath.setMap(map);
  }

  function polylinesOnClick() {
    poly = new google.maps.Polyline({
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    poly.setMap(map);

    // Add a listener for the click event
    map.addListener('click', addLatLng);
  }

  // Handles click events on a map, and adds a new point to the Polyline.
  function addLatLng(event) {
    var path = poly.getPath();

    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);

    // Add a new marker at the new plotted point on the polyline.
    var marker = new google.maps.Marker({
      position: event.latLng,
      title: '#' + path.getLength(),
      map: map
    });
  }