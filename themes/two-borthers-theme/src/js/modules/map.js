const mapboxgl = require('../../../../../node_modules/mapbox-gl/dist/mapbox-gl.js');

const mapApi = {
  mapInit() {
    const $map = $('#map');
    const PIN_IMAGE = 'https://cdn4.iconfinder.com/data/icons/geomicons/32/672403-pin-128.png';
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWlsYWxla3NpZWlldiIsImEiOiJjanN1ZnBjeXQwM2Q5NDlscm9qYmJ0aXk3In0.9MCeTgaA0njldbkIDA-pEg';
    function addMap() {
      const map = new mapboxgl.Map({
        container: 'map',
        zoom: '13',
        center: [36.253412, 50.0057559],
        style: 'mapbox://styles/mapbox/light-v9',
      });
      map.on('load', () => {
        map.loadImage(PIN_IMAGE, (error, image) => {
          if (error) throw error;
          map.addImage('cat', image);
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [{
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [36.25375, 50.00565],
                  },
                  properties: {
                    title: 'Mapbox DC',
                    'marker-symbol': 'monument',
                  },
                }],
              },
            },
            layout: {
              'icon-image': 'cat',
              'icon-size': 0.25,
            },
          });
        });
      });
      map.scrollZoom.disable();
      map.addControl(new mapboxgl.NavigationControl());
    }
    function init() {
      if (!$map.length) return;
      addMap();
    }
    return {
      init: init(),
    };
  },
};

export default mapApi;
