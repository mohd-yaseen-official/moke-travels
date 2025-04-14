import React from "react";
import { Helmet } from "react-helmet";
import Header from "../addons/Header";

export default function NotFound() {
    return (
        <section className="wrapper">
            <Header />
            <div className="notfound">
                <Helmet>
                    <title>Not Found | Moke Travel</title>
                </Helmet>
                <h1>Page Not Found</h1>
                <h3>404</h3>
            </div>
        </section>
    );
}
