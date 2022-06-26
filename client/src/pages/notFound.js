import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <h1>Seite nicht gefunden</h1>
            <Link to="/" className="btn btn-primary">
                Zurück zur Startseite
            </Link>
        </div>
    )
}

export default NotFound