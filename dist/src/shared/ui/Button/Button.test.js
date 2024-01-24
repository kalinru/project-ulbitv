import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';
describe('Button', function () {
    test('simple button', function () {
        render(_jsx(Button, { children: "Test" }));
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
    test('button with theme', function () {
        render(_jsx(Button, { theme: ButtonTheme.CLEAR, children: "Test" }));
        expect(screen.getByText('Test')).toHaveClass('clear');
        screen.debug();
    });
});
