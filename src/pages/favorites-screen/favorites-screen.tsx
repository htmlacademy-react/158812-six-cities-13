import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import { useAppSelector } from '../../hooks';
import { getOffers } from '../../store/app-data/selectors';

function FavoritesScreen(): JSX.Element {

  const offers = useAppSelector(getOffers);

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
                      <PlaceCard
                        key={offer.id}
                        offer={offer}
                        variant={'favorites'}
                      />
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
