import { FormEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { CommentData } from '../../types/comment-data';
import { postCommentAction } from '../../store/api-actions';

type ReviewFormProps = {
  offerId: string;
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {

  const ratingValues = [
    {value: 5, title: 'perfect'},
    {value: 4, title: 'good'},
    {value: 3, title: 'not bad'},
    {value: 2, title: 'terribly'},
    {value: 1, title: 'badly'},
  ];
  const MIN_COMMENT_LENGTH = 50;
  const MAX_COMMENT_LENGTH = 300;
  const EMPTY_RATING = 0;
  const MAX_RATING = 5;

  const [formData, setFormData] = useState({
    rating: EMPTY_RATING,
    comment: '',
    offerId: offerId
  });

  const dispatch = useAppDispatch();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const isValid = useMemo(() => formData.rating !== EMPTY_RATING && formData.rating <= MAX_RATING && formData.comment.length >= MIN_COMMENT_LENGTH && formData.comment.length <= MAX_COMMENT_LENGTH, [formData.comment.length, formData.rating]);

  useEffect(() => {
    if (isValid) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [isValid]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, rating: Number(evt.target.value)});
  };

  const handleTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, comment: evt.target.value});
  };

  const resetData = (evt: FormEvent<HTMLFormElement>) => {
    setFormData({...formData, comment: '', rating: EMPTY_RATING});
    evt.currentTarget.reset();
  };

  const onSubmit = async (newComment: CommentData) => await dispatch(postCommentAction(newComment));

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setIsSending(true);

    if(isValid) {
      onSubmit({
        rating: formData.rating,
        comment: formData.comment,
        offerId: offerId,
      }).then(() => {
        setIsSending(false);
      });
    }

    resetData(evt);
  };

  return (
    <form className="reviews__form form" action="" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          ratingValues.map((score) => (
            <Fragment key={score.value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score.value}
                id={`${score.value}-stars`}
                type="radio"
                onChange={handleInputChange}
                disabled={isSending}
              />
              <label
                htmlFor={`${score.value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={score.title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star"/>
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
        onChange={handleTextareaChange}
        value={formData.comment}
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled || isSending}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
