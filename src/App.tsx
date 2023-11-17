import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { Counter } from "./components/Counter";
import useTheme from "./theme/useTheme";
import './styles/index.scss';
import { classNames } from "./helpers/classNames/classNames";

const App = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>{theme}</button>
            <h1>Hello world</h1>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/counter'}>counter</Link>
            <Suspense fallback={'Loading...'}>
                <Routes>
                    <Route path={'/about'} element={<AboutPageAsync />} />
                    <Route path={'/'} element={<MainPageAsync />} />
                    <Route path={'/counter'} element={<Counter />} />
                </Routes>
            </Suspense>
        </div>
    )
};

export default App;