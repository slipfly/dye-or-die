import React from 'react';
import * as styles from './Footer.module.css'

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <section className="footer__logo logo logo--smaller">DYEorDIE</section>
        </footer>
    );
};

export default Footer;
