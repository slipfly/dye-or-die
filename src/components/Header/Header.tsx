import React from 'react';
import * as styles from './Header.module.css';

const Header: React.FC = () => {
    console.log(styles);
    console.log('Raw import:', require('./Header.module.css'));
    return (
        <header className={styles.header}>
            <h1 className={`${styles.header__logo} logo`}>DYEorDIE</h1>
        </header>
    );
};

export default Header;
