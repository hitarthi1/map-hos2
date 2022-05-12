// mapboxgl.accessToken =
//   'pk.eyJ1IjoiYnRyYXZlcnN5IiwiYSI6ImNqenY5MThjMDBqZ3YzY3A0N3ppZTA5Y2QifQ.LrFjedgw1wG34TkWCpNtFg';
mapboxgl.accessToken = 'pk.eyJ1IjoiaGl0YXJ0aGkwMSIsImEiOiJjbDExa2lmb3IwMmliM2RwNHhobXluODVhIn0.fcHve_vB4qC3LOzTgaeIvw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [72.141645,21.771884]
  

});

// Fetch stores from API
async function getHoss() {
  const res = await fetch('/api/v1/hospitals');
  const data = await res.json();

  const hoss = data.data.map(hos => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          hos.location.coordinates[0],
          hos.location.coordinates[1]
        ]
      },
      properties: {
        hospitalId: hos.hospitalId,
        icon: 'shop'
      }
    };
  });

  loadMap(hoss);
}

// Load map with stores
function loadMap(hoss) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: hoss
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{hospitalId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getHoss();
