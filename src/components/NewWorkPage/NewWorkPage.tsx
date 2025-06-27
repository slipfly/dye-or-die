import React from 'react';
import * as styles from './NewWorkPage.module.css';
import { Link } from 'react-router-dom';
import { myRoutes } from '../../const/const';
import MainNavigation from '../MainNavigation/MainNavigation';

const NewWorkPage: React.FC = () => {
    return (
        <main className="main">
            <MainNavigation />
            <form className="work-form" action="" method="post">
                <h2>New work</h2>
                <label className="work-form__label">
                    <span className="work-form__text">Client name</span>
                    <input type="text" id="client-name" />
                </label>

                <h2>Time</h2>
                <label className="work-form__label">
                    <span className="work-form__text">Date</span>
                    <input type="date" name="work-date" id="work-date" />
                </label>
                <label className="work-form__label">
                    <span className="work-form__text">Start time</span>
                    <input type="time" name="start-time" id="start-time" />
                </label>
                <label className="work-form__label">
                    <span className="work-form__text">End time</span>
                    <input type="time" name="end-time" id="end-time" />
                </label>

                <h2>Base preparation</h2>
                <section className="control-buttons">
                    <div className="control-buttons__button control-buttons__button--add">Add</div>
                    <div className="control-buttons__button control-buttons__button--edit">Edit</div>
                    <div className="control-buttons__button control-buttons__button--remove">Remove</div>
                </section>
                <section className="materials-table">
                    <fieldset className="materials-table__column materials-table__column--checker visually-hidden">
                        <div className="materials-table__header">#</div>
                        <div className="materials-table__item">
                            <label>
                                <input type="radio" name="material" id="material1"/>
                            </label>
                        </div>
                        <div className="materials-table__item materials-table__item--checked">
                            <label>
                                <input type="radio" name="material" id="material2" checked />
                            </label>
                        </div>
                        <div className="materials-table__item">
                            <label>
                                <input type="radio" name="material" id="material3"/>
                            </label>
                        </div>
                    </fieldset>
                    <ul className="materials-table__column materials-table__column--name">
                        <li className="materials-table__header">Name</li>
                        <li className="materials-table__item">Порошок эстель</li>
                        <li className="materials-table__item">Перчатки</li>
                        <li className="materials-table__item">Оксид 3%</li>
                    </ul>
                    <ul className="materials-table__column materials-table__column--amount">
                        <li className="materials-table__header">Amount</li>
                        <li className="materials-table__item">60 гр.</li>
                        <li className="materials-table__item">2 шт.</li>
                        <li className="materials-table__item">120 мл.</li>
                    </ul>
                </section>

                <h2>Dying</h2>
                <section className="control-buttons">
                    <div className="control-buttons__button control-buttons__button--add">Add</div>
                    <div className="control-buttons__button control-buttons__button--edit">Edit</div>
                    <div className="control-buttons__button control-buttons__button--remove">Remove</div>
                </section>
                <section className="materials-table">
                    <fieldset className="materials-table__column materials-table__column--checker visually-hidden">
                        <div className="materials-table__header">#</div>
                        <div className="materials-table__item">
                            <label>
                                <input type="radio" name="material" id="material1"/>
                            </label>
                        </div>
                        <div className="materials-table__item materials-table__item--checked">
                            <label>
                                <input type="radio" name="material" id="material2" checked/>
                            </label>
                        </div>
                        <div className="materials-table__item">
                            <label>
                                <input type="radio" name="material" id="material3"/>
                            </label>
                        </div>
                    </fieldset>
                    <ul className="materials-table__column materials-table__column--name">
                        <li className="materials-table__header">Name</li>
                        <li className="materials-table__item">Тоника bloody mary</li>
                        <li className="materials-table__item">Kapous silver</li>
                        <li className="materials-table__item">Оксид 3%</li>
                    </ul>
                    <ul className="materials-table__column materials-table__column--amount">
                        <li className="materials-table__header">Amount</li>
                        <li className="materials-table__item">60 гр.</li>
                        <li className="materials-table__item">2 шт.</li>
                        <li className="materials-table__item">120 мл.</li>
                    </ul>
                </section>

                <h2>Additional info</h2>
                <label className="work-form__label">
                    <span className="work-form__text">Photos</span>
                    <div className="photos__upload-button"></div>
                    <input
                        className="visually-hidden"
                        type="file"
                        name="photos"
                        id="photos"
                        multiple
                        accept="image/jpeg" />
                </label>
                <section className="photo__box">
                    <section className="photo__container">
                        <img src="" alt="" width="100" height="100" />
                            <div className="photo__delete-button"></div>
                    </section>
                    <section className="photo__container">
                        <img src="" alt="" width="100" height="100" />
                            <div className="photo__delete-button"></div>
                    </section>
                    <section className="photo__container">
                        <img src="" alt="" width="100" height="100" />
                            <div className="photo__delete-button"></div>
                    </section>
                </section>
                <label className="work-form__label">
                    <span className="work-form__text">Tags</span>
                    <input className="work-form__tags" type="text" disabled />
                        <section className="work-form__tags-add-buttons">
                            <div className="work-form__tags-button">Tags cloud</div>
                        </section>
                </label>
                <label className="work-form__label">
                    <span className="work-form__text">Commentary</span>
                    <textarea name="commentary" id="commentary" />
                </label>
            </form>
            <section className="control-buttons">
                <div className="control-buttons__button">Save</div>
                <div className="control-buttons__button">Cancel</div>
            </section>
        </main>
    );
};

export default NewWorkPage;