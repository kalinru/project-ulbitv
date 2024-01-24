import { Modal } from './Modal';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
var meta = {
    title: 'shared/Modal',
    component: Modal,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};
export default meta;
export var Default = {
    args: {
        children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, veritatis. Fuga iure praesentium rem asperiores aspernatur, ratione provident, nemo nisi quas dignissimos suscipit. Ducimus sit unde sed id laudantium inventore.',
        isOpen: true
    }
};
export var Dark = {
    args: {
        children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, veritatis. Fuga iure praesentium rem asperiores aspernatur, ratione provident, nemo nisi quas dignissimos suscipit. Ducimus sit unde sed id laudantium inventore.',
        isOpen: true
    },
    decorators: [ThemeDecorator(Theme.DARK)]
};
