const MAPBOX_ACCESS_TOKEN = "YOUR TOKEN GOES HERE";
const main = async () => {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  // Create map
  const map = new mapboxgl.Map({
    container: "map",
    zoom: 12,
    center: [-3, 40],
    style: "mapbox://styles/mapbox/streets-v11"
  });

  // Center the map to your location
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(`Your location is:`, position);
      const { longitude, latitude } = position.coords;
      map.setCenter([longitude, latitude]);
      // map.setZoom(5);

      const marker = addMarker([longitude, latitude]);
      // const popup = createPopUp("<h1>This is a popup</h1>");
      // marker.setPopup(popup);
    },
    () => console.log("Unable to get current location!")
  );

  // Get all books and create a market with a popup for each one of them
  const addMarker = coords => {
    return new mapboxgl.Marker({
      color: "blue",
      draggable: true
    })
      .setLngLat(coords)
      .addTo(map);
  };

  const { data } = await bookService.getAllBooks();
  data.forEach(book => {
    addMarker(book.location.coordinates);
  });
};

window.addEventListener("load", main);
