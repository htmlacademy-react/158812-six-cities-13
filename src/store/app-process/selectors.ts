import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const changeCity = (state: State): string => state[NameSpace.App].city;

export const changeSort = (state: State): string => state[NameSpace.App].sorting;
