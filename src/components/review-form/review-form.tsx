import { FormEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CommentData } from '../../types/comment-data';
import { postCommentAction } from '../../store/api-actions';
import { EMPTY_RATING, MAX_COMMENT_LENGTH, MAX_RATING, MIN_COMMENT_LENGTH, RATING_VALUES, Status } from '../../const';
import { getCommentStatus } from '../../store/app-data/selectors';
import { setCommentStatus } from '../../store/app-data/app-data';

type ReviewFormProps = {
  offerId: string;
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {

  const [formData, setFormData] = useState({
    rating: EMPTY_RATING,
    comment: '',
    offerId: offerId
  });

  const dispatch = useAppDispatch();

  const postCommentStatus = useAppSelector(getCommentStatus);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const isValid = useMemo(() => formData.rating !== EMPTY_RATING && formData.rating <= MAX_RATING && formData.comment.length >= MIN_COMMENT_LENGTH && formData.comment.length <= MAX_COMMENT_LENGTH, [formData.comment, formData.rating]);

  useEffect(() => {
    if (isValid) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [isValid]);

  useEffect(() => {
    if (postCommentStatus === Status.Success) {
      dispatch(setCommentStatus(Status.Idle));
      setFormData({...formData, comment: '', rating: EMPTY_RATING});
    }
  }, [dispatch, formData, postCommentStatus]);

  const handleInputChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, rating: Number(evt.target.value)});
  },
  [formData]
  );

  const handleTextareaChange = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, comment: evt.target.value});
  },
  [formData]
  );

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
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          RATING_VALUES.map((score) => (
            <Fragment key={score.value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score.value}
                id={`${score.value}-stars`}
                type="radio"
                checked={formData.rating === score.value}
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
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least
          <b className="reviews__text-amount"> {MIN_COMMENT_LENGTH} characters</b>
          {(formData.comment && formData.comment.length >= MAX_COMMENT_LENGTH) && <b style={{color:'red'}}> max 300 characters</b>}.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled || isSending}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
