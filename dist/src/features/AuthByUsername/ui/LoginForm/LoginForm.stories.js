import LoginForm from './LoginForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
var meta = {
    title: 'features/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};
export default meta;
export var Primary = {
    args: {},
    decorators: [StoreDecorator({
            loginForm: {
                username: 'Peter',
                password: 'secret'
            }
        })]
};
