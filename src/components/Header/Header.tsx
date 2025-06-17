import React from 'react';
import * as styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { myRoutes } from '../../const/const';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Link 
                to={myRoutes.default} 
                className={`${styles.header__logo} logo`}>
                    DYEorDIE
            </Link>
        </header>
    );
};

export default Header;
