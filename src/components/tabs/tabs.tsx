import {CITIES, AppRoute} from '../../const';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import { changeCity } from '../../store/app-process/app-process';
import { memo } from 'react';

type TabsProps = {
  currentCity: string;
}

function Tabs(props: TabsProps): JSX.Element {
  const {currentCity} = props;

  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city} className="locations__item">
              <Link
                onClick={() => {
                  dispatch(changeCity(city));
                }}
                className={cn(
                  'locations__item-link tabs__item',
                  {'tabs__item--active': city === currentCity}
                )}
                to={AppRoute.Main}
              >
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const TabsMemo = memo(Tabs);

export default TabsMemo;
