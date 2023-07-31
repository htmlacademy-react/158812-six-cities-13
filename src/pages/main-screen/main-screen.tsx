import { useState } from 'react';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import Tabs from '../../components/tabs/tabs';
import { useAppSelector } from '../../hooks';
import PlacesSorting from '../../components/places-sorting/places-sorting';

function MainScreen(): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => setSelectedPoint(id);
  const handleCardMouseLeave = () => setSelectedPoint(null);

  const currentOffers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.city);

  return (
    <div className="page page--gray page--main">
      <Header isUserBlock />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs currentCity={currentCity} />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {currentCity}</b>
              <PlacesSorting />
              <OffersList
                handleCardMouseEnter={handleCardMouseEnter}
                handleCardMouseLeave={handleCardMouseLeave}
              />
            </section>
            <div className="cities__right-section">
              <Map
                selectedPoint={selectedPoint}
                variant={'cities'}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
