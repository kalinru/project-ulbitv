import { classNames } from 'shared/lib/classNames/classNames';
describe('classNames', function () {
    test('only first param', function () {
        expect(classNames('someClass')).toBe('someClass');
    });
    test('first param and additinal param', function () {
        expect(classNames('someClass', {}, ['class1'])).toBe('someClass class1');
    });
    test('param 1 and 2', function () {
        expect(classNames('someClass', { class1: true, class2: false })).toBe('someClass class1');
    });
});
