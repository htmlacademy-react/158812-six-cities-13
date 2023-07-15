import { Fragment, useState } from 'react';

function ReviewForm(): JSX.Element {

  const ratingValues: number[] = [5, 4, 3, 2, 1];

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          ratingValues.map((score) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                checked={score === rating}
                onChange = {(evt) => setRating(Number(evt.target.value))}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title="good"
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        name="review"
        id="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={(evt) => setReview(evt.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
