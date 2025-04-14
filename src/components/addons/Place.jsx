import React from "react";
import LocationIcon from "../assets/images/place.svg";
import LikeIcon from "../assets/images/heart-regular.svg";
import { Link } from "react-router-dom";
export default function Place(props) {
    return (
        <div className="item">
            <Link to={`/places/${props.id}`}>
                <div className="top">
                    <img src={props.image} alt="Place" />
                </div>
                <div className="middle">
                    <h3>{props.name}</h3>
                </div>
                <div className="bottom">
                    <img src={LocationIcon} alt="Location Icon" />
                    <span>{props.location}</span>
                    <img src={LikeIcon} alt="Like Icon" />
                    <span>{props.likes}</span>
                </div>
            </Link>
        </div>
    );
}
