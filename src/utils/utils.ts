const COUNT_STARS = 5;

export const calcRating = (rating: number) => `${Math.round(rating) / COUNT_STARS * 100}%`;
