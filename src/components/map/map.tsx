import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import cn from 'classnames';
import {City, Offer} from '../../types/offers';
import leaflet from 'leaflet';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedPoint?: string | null;
  variant: 'cities' | 'offer';
  currentOffer?: Offer;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

function Map(props: MapProps): JSX.Element {
  const {selectedPoint, variant, city, offers, currentOffer} = props;
  const mapRef = useRef(null);

  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);

      if (currentOffer) {
        leaflet.marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        }, {
          icon:  currentCustomIcon,
        }).addTo(map);
      }

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedPoint && selectedPoint === offer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }

  }, [map, offers, selectedPoint, city, currentOffer]);

  return (
    <section
      className={cn(
        `${variant}__map`,
        'map'
      )}
      ref={mapRef}
      style={{height: '100%', minHeight: '579px'}}
    />
  );
}

export default Map;
