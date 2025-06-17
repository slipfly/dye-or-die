import React from 'react';
import * as styles from './MaterialsPage.module.css'
import ControlButtons from '../ControlButtons/ControlButtons';
import MainNavigation from '../MainNavigation/MainNavigation';
import { Material } from '../../types/types';
import Popup from '../Popup/Popup';

const CONTROL_BUTTONS = ['Add', 'Edit', 'Remove'];

type MaterialsPageProps = {
    data: Material[];
};

const MaterialsPage: React.FC<MaterialsPageProps> = ({data}) => {
    
    return (
        <main className="main">
            <MainNavigation />
            <ControlButtons buttonNames={CONTROL_BUTTONS}></ControlButtons>
            <table className={styles["materials-table"]}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Amount</th>
                        <th>CPU</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .slice() // create a shallow copy so we don’t mutate the original
                        .sort((a, b) => a.name.localeCompare(b.name)) // alphabetically by `name`
                        .map((item) => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.cost}</td>
                                <td>{item.amount}</td>
                                <td>{item.cpu}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <Popup></Popup>
        </main>
    );
};

export default MaterialsPage;