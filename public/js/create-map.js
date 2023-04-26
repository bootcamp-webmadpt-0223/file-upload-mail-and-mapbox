const MAPBOX_ACCESS_TOKEN = "YOUR TOKEN GOES HERE";

const main = async () => {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  // Create map with search input (geocoder)
  const map = new mapboxgl.Map({
    container: "map",
    zoom: 12,
    center: [-3, 40],
    style: "mapbox://styles/mapbox/streets-v11"
  });

  // Get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(`Your location is:`, position);
        const { longitude, latitude } = position.coords;
        map.setCenter([longitude, latitude]);
        // map.setZoom(5);

        const marker = addMarker([longitude, latitude]);
        const popup = createPopUp("<h1>This is a popup</h1>");
        marker.setPopup(popup);
      },
      () => console.log("Unable to get current location!")
    );
  } else {
    console.log(
      "Browser does not support geolocation. Try giving location permission."
    );
  }

  // Add full screen control
  const fullScreenControl = new mapboxgl.FullscreenControl({
    container: "map"
  });
  map.addControl(fullScreenControl);

  // Geolocate control
  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  });
  map.addControl(geolocateControl);

  // Navigation controls
  const nav = new mapboxgl.NavigationControl({
    visualizePitch: true
  });
  map.addControl(nav, "bottom-right");

  // Geocoder control (search)
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  });
  map.addControl(geocoder);
  // Listener that fires every time you get a search result
  geocoder.on("result", e => {
    console.log(e);
    const center = e.result.center;
    const latInput = document.querySelector("#latitude");
    const lngInput = document.querySelector("#longitude");
    lngInput.value = center[0];
    latInput.value = center[1];
  });

  // Marker
  const addMarker = coords => {
    return new mapboxgl.Marker({
      color: "blue",
      draggable: true
    })
      .setLngLat(coords)
      .addTo(map);
  };

  // PopUp
  const createPopUp = html =>
    new mapboxgl.Popup({ offset: "top", className: "my-class" })
      .setHTML(html)
      .setMaxWidth("300px");

  // Go to clicked point
  map.on("click", e => {
    console.log(e);
    map.flyTo({
      center: [e.lngLat.lng, e.lngLat.lat]
    });
  });
};

window.addEventListener("load", main);
