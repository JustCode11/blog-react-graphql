import React from 'react';

import Header from "./Header";

function Layout({ children }) {
    return (
        <div>
            <Header />
            <main className="d-flex flex-column justify-content-center pt-3" style={{ width: '90%', margin: "auto" }}>{children}</main>
        </div>
    )
}

export default Layout;