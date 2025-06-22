import React from 'react';
import * as styles from './MainNavigation.module.css';
import { Link, useLocation } from 'react-router-dom';
import { myRoutes, MainNavigationButtons } from '../../const/const';

type getNavBtnsProps = {
    isMain: boolean;
    location: string;
};

const getNavBtns = ({isMain, location}: getNavBtnsProps) => {
    return Object.entries(MainNavigationButtons).map(([key, label]) => (
        <Link
            key={key}
            to={myRoutes[key as keyof typeof myRoutes]}
            className={`${isMain
                ? styles['main-navigation__button']
                : styles.navigation__button} ${key === location ? styles.active : ''}`}>
            {label}
        </Link>
    ))
};

const MainNavigation: React.FC = () => {
    const location = useLocation();
    const isMain = location.pathname === '/';
    
    return (
        <section className={isMain
            ? styles['main-navigation']
            : styles.navigation}>
            {getNavBtns({
                isMain, 
                location: location.pathname.slice(1)
                })}
        </section>
    );
};

export default MainNavigation;