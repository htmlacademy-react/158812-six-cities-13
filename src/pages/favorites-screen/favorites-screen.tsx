import { useEffect } from 'react';
import FavoritesListEmpty from '../../components/favorites-list-empty/favorites-list-empty';
import Footer from '../../components/footer/footer';
import HeaderMemo from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteOffers, getFavoriteOffersCount} from '../../store/app-data/selectors';
import cn from 'classnames';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/app-process/app-process';
import { AppRoute } from '../../const';

function FavoritesScreen(): JSX.Element {

  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);

  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  return (
    <div
      className={cn(
        'page',
        favoriteOffersCount === 0 ? 'page--favorites-empty' : ''
      )}
    >
      <HeaderMemo isUserBlock />

      <main
        className={cn(
          'page__main',
          'page__main--favorites',
          favoriteOffersCount === 0 ? 'page__main--favorites-empty' : ''
        )}
      >
        <div className="page__favorites-container container">
          <section
            className={cn(
              'favorites',
              favoriteOffersCount === 0 ? 'favorites--empty' : ''
            )}
          >

            {favoriteOffersCount ?
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {cities.map((city) => (
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link
                            className="locations__item-link"
                            to={AppRoute.Main}
                            onClick={() => {
                              dispatch(changeCity(city));
                            }}
                          >
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {favoriteOffers.filter((offer) => offer.city.name === city).map((offer) => (
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
              </> :
              <FavoritesListEmpty/>}

          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesScreen;
