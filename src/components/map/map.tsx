import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import {City, Point} from '../../types/offers';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import cn from 'classnames';

type MapProps = {
  city: City;
  points: Point[];
  selectedPoint: Point | undefined;
  variant: 'cities' | 'offer';
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPoint, variant} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined &&
            point.latitude === selectedPoint?.latitude &&
            point.longitude === selectedPoint?.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

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
