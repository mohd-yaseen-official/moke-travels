import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router";
import LocationIcon from "../assets/images/place.svg";
import LikeIcon from "../assets/images/heart-regular.svg";
import LikeFillIcon from "../assets/images/heart-solid.svg";
import { commentConfig, likeConfig, placeConfig, placeProtectedConfig } from "../../axiosConfig";
import { Helmet } from "react-helmet";
import Header from "../addons/Header";
import Reply from "../addons/Reply";
import { userDataContext } from "../../App";
import Loader from "../addons/Loader";


export default function ViewPlace() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    const {userData} = useContext(userDataContext);

    const [comment, setComment] = useState("")
    const [isLiked, setIsLiked] = useState(null)

    useEffect(() => {
        console.log(userData);

        axios
            .get(`http://localhost:8000/api/v1/places/protected/${id}`, {
                headers: {
                    Authorization: `Bearer ${userData?.access}`
                }
            })
            .then((response) => {
                setDetails(response.data.data);
                console.log(response.data);
                setIsLiked(response.data.data.is_liked)
            })
            .catch((error) => console.log(error));
    });

    const renderImages = () => {
        return details?.gallery?.map((image) => (
            <img key={image.id} src={image.image} alt={`Gallery ${image.id}`} />
        ));
    };


    const renderComments = () => {
        return details?.comment?.map((comment) => (
            <>
                <div key={comment.id} className="comment">
                    <h4>{comment.user}</h4>
                    <p>{comment.comment}</p>
                    <span>{comment.created_at}</span>
                </div><div className="replies">
                    <Reply comment={comment} />
                </div>
            </>
        ));
    }

    const handleCommentSubmission = () => {

        commentConfig.post(`/${id}`,
            {
                comment: comment
            }, 
            {
                headers: {
                    Authorization: `Bearer ${userData?.access}`
                }
            },
        )
    }

    const handleLike = () => {
        likeConfig.post(`/${id}/`, {}, {
            headers: {
                Authorization: `Bearer ${userData?.access}`
            }
        }).then(
            setIsLiked(!isLiked)
        )
    }

    if (!details) {
        return (
            <Loader />
        );
    }

    return (
        <section className="wrapper">
            <Header />
            <div className="place">
                <Helmet>
                    <title>{details.name} | Moke Travel</title>
                </Helmet>
                <div className="head">
                    <h2>{details.name}</h2>
                    <span className="category">{details.category}</span>
                    <span className="location">
                        <img src={LocationIcon} alt="Location Icon" />
                        <span>{details.location}</span>
                    </span>
                    {!userData ? (
                        <span className="likes">
                            <img src={LikeIcon} alt='Like Icon'/>
                            {details.total_likes} Likes
                        </span>)
                        :
                        (<span className="likes">
                            {isLiked ? 
                                <img src={LikeFillIcon} onClick={() => handleLike()} alt='Like Icon'/>
                            :
                                <img src={LikeIcon} onClick={() => handleLike()} alt='Like Icon'/>
                            }

                            {details.total_likes} Likes
                          
                        </span>)
                    }
                </div>

                <div className="gallery">
                    <img src={details.featured_image} alt={details.name} />
                    {renderImages()}
                </div>

                <div className="bottom">
                    <h3>Place Details</h3>
                    <p>{details.description}</p>
                </div>

                <div className="comments">
                    {renderComments()}
                </div>

                <div className="add_comment">
                    <h3>Leave a Comment</h3>
                    <form onSubmit={() => handleCommentSubmission()}>
                        <textarea 
                            placeholder="Your Comment" 
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
