import {useState} from 'react';
import cn from 'classnames';
import {SortingType} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {changeSort} from '../../store/action';

function PlacesSorting (): JSX.Element {

  const dispatch = useAppDispatch();
  const sortingTypes = Object.keys(SortingType) as Array<keyof typeof SortingType>;
  const sorting = useAppSelector((state) => state.sorting);
  const [isSelectedSort, setIsSelectedSort] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">
        Sort by{' '}
      </span>
      <span
        onClick={() => setIsSelectedSort((prevState) => !prevState)}
        className="places__sorting-type"
        tabIndex={0}
      >
        {sorting}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={cn(
        'places__options places__options--custom',
        {'places__options--opened': isSelectedSort}
      )}
      >
        {sortingTypes.map((type) => (
          <li
            onClick={() => {
              dispatch(changeSort(type));
              setIsSelectedSort((prevState) => !prevState);
            }}
            key={type}
            className={cn(
              'places__option',
              {'places__option--active': type === sorting}
            )}
            tabIndex={0}
          >
            {SortingType[type]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorting;
