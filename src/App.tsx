import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import './styles/global.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import MaterialsPage from './components/MaterialsPage/MaterialsPage';
import { myRoutes } from './const/const';
import NewWorkPage from './components/NewWorkPage/NewWorkPage';

const App: React.FC = () => {

    return (
        <Router>
            <Header />
            <Routes>
                <Route 
                    path={myRoutes.default} 
                    element={<MainPage />}/>
                <Route 
                    path={myRoutes.materials} 
                    element={<MaterialsPage/>}/>
                <Route
                    path={myRoutes.new}
                    element={<NewWorkPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
