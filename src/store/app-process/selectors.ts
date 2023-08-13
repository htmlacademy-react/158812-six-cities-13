import { State } from '../../types/state';
import { NameSpace, SortingType } from '../../const';

export const getCityName = (store: State): string => store[NameSpace.App].activeCity;

export const getSortingType = (store: State): SortingType => store[NameSpace.App].sorting as SortingType;
