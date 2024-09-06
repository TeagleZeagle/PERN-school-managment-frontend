import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Home() {
    return (
        <div className="home-container">
            {/*<Link to="/admin">
                <button className="button button-admin">ADMİN</button>
            </Link>*/}
            <Link to="/teacher">
                <button className="button button-teacher">ÖĞRETMEN</button>
            </Link>
            <Link to="/student">
                <button className="button button-student">ÖĞRENCİ</button>
            </Link>
            <Link to="/register">
                <button className="button button-register">KAYIT OL</button>
            </Link>
        </div>
    );
}

export default Home;
