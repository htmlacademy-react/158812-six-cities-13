import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCity = (state: State): string => state[NameSpace.App].city;

export const getSorting = (state: State): string => state[NameSpace.App].sorting;
