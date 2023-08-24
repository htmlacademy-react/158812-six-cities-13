import { useParams } from 'react-router-dom';
import { calculateRating, getReviews } from '../../utils/utils';
import Map from '../../components/map/map';
import { useEffect } from 'react';
import { AuthorizationStatus, TypeOffer } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferAction, fetchNearbyOffersAction, fetchReviewsOfferAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import NearbyPlacesList from '../../components/nearby-places-list/nearby-places-list';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import { getComments, getCommentsDataLoadingStatus, getNearbyOffers, getNearbyOffersDataLoadingStatus, getOffer, getOfferDataLoadingStatus } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import HeaderMemo from '../../components/header/header';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import cn from 'classnames';

function OfferScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentId = String(useParams().id);

  const currentOffer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const currentComments = useAppSelector(getComments);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const isDetailsOfferLoaded = useAppSelector(getOfferDataLoadingStatus);
  const isOfferNearbyDataLoading = useAppSelector(getNearbyOffersDataLoadingStatus);
  const isReviewsDataLoading = useAppSelector(getCommentsDataLoadingStatus);

  const nearbyOffersList = nearbyOffers?.slice(0, 3);

  useEffect(() => {
    dispatch(fetchOfferAction(currentId));
    dispatch(fetchNearbyOffersAction(currentId));
    dispatch(fetchReviewsOfferAction(currentId));
  }, [dispatch, currentId]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDetailsOfferLoaded || isOfferNearbyDataLoading || isReviewsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (!currentOffer) {
    return <NotFoundScreen/>;
  }

  return (
    <div className="page">
      <HeaderMemo isUserBlock />

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
                <BookmarkButton
                  variant='offer'
                  width={31}
                  height={33}
                  offerId={currentId}
                  isFavorite={currentOffer.isFavorite}
                  textIcon={'To bookmarks'}
                  isCheckAuth
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: calculateRating(currentOffer.rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {TypeOffer[currentOffer.type]}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} {currentOffer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} {currentOffer.maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
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
                  <div
                    className={cn(
                      'offer__avatar-wrapper',
                      'user__avatar-wrapper',
                      {'offer__avatar-wrapper--pro': currentOffer.host.isPro}
                    )}
                  >
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
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentComments?.length}</span></h2>
                {currentComments && <ReviewsList reviews={getReviews(currentComments)} />}

                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={currentId} />}
              </section>
            </div>
          </div>
          {nearbyOffersList &&
          <Map
            city={nearbyOffersList[0].city}
            offers={nearbyOffersList}
            variant={'offer'}
            currentOffer={currentOffer}
          />}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffersList &&
              <NearbyPlacesList
                offers={nearbyOffersList}
              />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
