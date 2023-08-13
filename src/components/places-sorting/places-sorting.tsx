import {useState} from 'react';
import cn from 'classnames';
import {SortingType} from '../../const';
import {useAppDispatch} from '../../hooks';
import { changeSort } from '../../store/app-process/app-process';

type PlacesSortingProps = {
  sorting: string;
}

function PlacesSorting (props: PlacesSortingProps): JSX.Element {
  const {sorting} = props;

  const dispatch = useAppDispatch();
  const sortingTypes = Object.entries(SortingType);
  const [isSelectedSort, setIsSelectedSort] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">
        Sort by {' '}
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
        {sortingTypes.map(([type, title]) => (
          <li
            onClick={() => {
              dispatch(changeSort(title));
              setIsSelectedSort((prevState) => !prevState);
            }}
            key={title}
            className={cn(
              'places__option',
              {'places__option--active': type === sorting}
            )}
            tabIndex={0}
          >
            {title}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorting;
