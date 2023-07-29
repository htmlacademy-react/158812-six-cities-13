import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import {City} from '../../types/offers';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import cn from 'classnames';
import {useAppSelector} from '../../hooks';

type MapProps = {
  city: City;
  selectedPoint: string | null;
  variant: 'cities' | 'offer';
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
  const {city, selectedPoint, variant} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const currentOffers = useAppSelector((state) => state.offers);

  useEffect(() => {
    if (map) {
      currentOffers.forEach((offer) => {
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
    }
  }, [map, currentOffers, selectedPoint]);

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
