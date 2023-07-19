const COUNT_STARS = 5;

export const calcRating = (rating: number) => `${Math.round(rating) / COUNT_STARS * 100}%`;

export function getCapitalizeFirstLetter(text: string): string {
  const re = /\s+/;
  return text.split(re).map((item) => item[0].toUpperCase() + item.substring(1)).join(' ');
}
