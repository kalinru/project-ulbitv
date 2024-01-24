import { AppLink, AppLinkTheme } from './AppLink';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
var meta = {
    title: 'shared/AppLink',
    component: AppLink,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {
        to: '/'
    }
};
export default meta;
export var Primary = {
    args: {
        theme: AppLinkTheme.PRIMARY,
        children: 'Button'
    }
};
export var Secondary = {
    args: {
        theme: AppLinkTheme.SECONDARY,
        children: 'Button'
    }
};
export var PrimaryDark = {
    args: {
        theme: AppLinkTheme.PRIMARY,
        children: 'Button'
    }
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export var SecondaryDark = {
    args: {
        theme: AppLinkTheme.SECONDARY,
        children: 'Button'
    }
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
