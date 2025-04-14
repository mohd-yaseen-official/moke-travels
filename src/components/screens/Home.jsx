import React, { useEffect, useState } from "react";
import axios from "axios";
import Place from "../addons/Place";
import { placesConfig } from "../../axiosConfig";
import Header from "../addons/Header";

export default function Home() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        placesConfig
            .get("/")
            .then((response) => {
                setPlaces(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching places:", error);
            });
    }, []);

    function renderPlaces() {
        return places.map((place) => (
            <>
                <Place
                    key={place.id}
                    name={place.name}
                    location={place.location}
                    image={place.image}
                    id={place.id}
                    likes={place.total_likes}
                />
            </>
        ));
    }

    return (
        <section className="wrapper">
            <Header />
            <div className="head">
                <h2>Welcome</h2>
                <p>Explore the world around you</p>
            </div>

            <div className="items">{renderPlaces()}</div>
        </section>
    );
}
