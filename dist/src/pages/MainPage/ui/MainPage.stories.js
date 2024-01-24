import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import MainPage from './MainPage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
var meta = {
    title: 'pages/MainPage',
    component: MainPage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};
export default meta;
export var Normal = {
    args: {}
};
Normal.decorators = [StoreDecorator({})];
export var Dark = {
    args: {}
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
