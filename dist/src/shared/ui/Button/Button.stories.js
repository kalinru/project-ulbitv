import { Button, ButtonSize, ButtonTheme } from './Button';
var meta = {
    title: 'shared/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};
export default meta;
export var Primary = {
    args: {
        children: 'Button'
    }
};
export var Clear = {
    args: {
        children: 'Button',
        theme: ButtonTheme.CLEAR
    }
};
export var Outline = {
    args: {
        children: 'Button',
        theme: ButtonTheme.OUTLINE
    }
};
export var OutlineSizeL = {
    args: {
        children: 'Button',
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.L
    }
};
export var OutlineSizeXL = {
    args: {
        children: 'Button',
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.XL
    }
};
export var Background = {
    args: {
        children: 'Button',
        theme: ButtonTheme.BACKGROUND
    }
};
export var BackgroundInverted = {
    args: {
        children: 'Button',
        theme: ButtonTheme.BACKGROUND_INVERTED
    }
};
export var Square = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true
    }
};
export var SquareSizeL = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
        size: ButtonSize.L
    }
};
export var SquareSizeXL = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
        size: ButtonSize.XL
    }
};
export var Disabled = {
    args: {
        children: 'disabled',
        theme: ButtonTheme.OUTLINE,
        disabled: true
    }
};
