import { RoutePath } from 'shared/config/routerConfig/routerConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/home.svg';
import PersonIcon from 'shared/assets/icons/person.svg';
export var SidebaarItemsList = [
    {
        path: RoutePath.main,
        text: 'Главная',
        Icon: MainIcon
    },
    {
        path: RoutePath.about,
        text: 'О нас',
        Icon: AboutIcon
    },
    {
        path: RoutePath.profile,
        text: 'Профиль',
        Icon: PersonIcon
    }
];
