import React from 'react';
import * as styles from './Footer.module.css'
import { Link } from 'react-router-dom';
import { myRoutes } from '../../const/const';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <Link 
                to={myRoutes.default} 
                className={`${styles.footer__logo} logo logo--smaller`}>
                    DYEorDIE
            </Link>
        </footer>
    );
};

export default Footer;
