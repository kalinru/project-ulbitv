import { getCounter } from '../getCounter/getCounter';
import { createSelector } from 'reselect';
export var getCounterValue = createSelector(getCounter, function (counter) { return counter.value; });
