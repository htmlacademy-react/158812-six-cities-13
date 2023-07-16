import { Fragment } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import {Offer} from '../../types/offers';

type FavoritesScreenProps = {
  offers: Offer[];
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {

  const cities = Array.from(new Set(offers.map((offer) => offer.city.name)));

  return (
    <div className="page">
      <Header isUserBlock />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {cities.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offers.filter((offer) => offer.city.name === city).map((offer) => (
                      <Fragment key={offer.id}>
                        <PlaceCard
                          offer={offer}
                          variant={'favorites'}
                        />
                      </Fragment>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
