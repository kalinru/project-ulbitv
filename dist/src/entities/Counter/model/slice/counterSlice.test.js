import { counterActions, counterReducer } from './counterSlice';
describe('counterSlice', function () {
    test('should increment counter value', function () {
        var state = {
            value: 10
        };
        expect(counterReducer(state, counterActions.incremented())).toEqual({ value: 11 });
    });
    test('should decriment counter value', function () {
        var state = {
            value: 10
        };
        expect(counterReducer(state, counterActions.decremented())).toEqual({ value: 9 });
    });
    test('should work with empty state', function () {
        expect(counterReducer(undefined, counterActions.incremented())).toEqual({ value: 1 });
    });
});
