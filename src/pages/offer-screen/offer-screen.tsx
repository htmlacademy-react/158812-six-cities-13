import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
//import OffersList from '../../components/offers-list/offers-list';
//import ReviewForm from '../../components/review-form/review-form';
//import {Offer} from '../../types/offers';
//import NotFoundScreen from '../not-found-screen/not-found-screen';
import { calcRating } from '../../utils/utils';
import cn from 'classnames';
//import Map from '../../components/map/map';
import { useEffect } from 'react';
import { TypeOffer } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
//import {Review} from '../../types/reviews';
//import ReviewsList from '../../components/reviews-list/reviews-list';


function OfferScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  /*const otherOffers = offers.slice(0, 3);

  const params = useParams();
  const id = `${(params.id ? params.id.slice(1) : '0')}`;
  const currentOffer = offers.find((offer) => offer.id === id);

  const city = offers[0].city;*/


  const currentId = String(useParams().id);
  const isDetailsOfferLoaded = useAppSelector((state) => state.isDetailsOfferDataLoading);
  const currentOffer = useAppSelector((store) => store.offer);

  //const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  //const handleCardMouseEnter = (id: string) => setSelectedPoint(id);
  //const handleCardMouseLeave = () => setSelectedPoint(null);

  useEffect(() => {
    if (currentId) {
      dispatch(fetchOfferAction(currentId));
    }
  }, [dispatch, currentId]);


  if (isDetailsOfferLoaded) {
    return (
      <LoadingScreen />
    );
  }

  if (!currentOffer) {
    return <NotFoundScreen/>;
  }

  return (
    <div className="page">
      <Header isUserBlock />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button
                  className={cn(
                    'offer__bookmark-button',
                    'button',
                    {'offer__bookmark-button--active': currentOffer.isFavorite},
                  )}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: calcRating(currentOffer.rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {TypeOffer[currentOffer.type]}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (<li className="offer__inside-item" key={good}>{good}</li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width={74} height={74} alt={'Host avatar'}/>
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  {currentOffer.description
                    .split('.')
                    .filter((item) => item !== '')
                    .map((item) => item.replace(/^ +/, ''))
                    .map((item) => (
                      <p className="offer__text" key={item}>
                        {`${item}.`}
                      </p>
                    ))}
                </div>
              </div>
              {/*<section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                {reviews && <ReviewsList reviews={reviews} />}
                <ReviewForm />
                    </section>*/}
            </div>
          </div>
          {/*<Map
            city={city}
            offers={offers}
            selectedPoint={selectedPoint}
            variant={'offer'}
                  />*/}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {/*<OffersList
                offers={otherOffers}
                handleCardMouseEnter={handleCardMouseEnter}
                handleCardMouseLeave={handleCardMouseLeave}
          />*/}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
