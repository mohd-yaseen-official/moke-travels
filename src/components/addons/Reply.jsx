import React from "react";


export default function Reply(props) {
    return (
        <div className="item">
            {props.comment.reply.map((reply) => (
                <>
                <div className="top">
                <h3>{reply.user}</h3>
                </div>
                <div className="middle">
                    <p>{reply.reply}</p>   
                </div><div className="bottom">
                    <span>{reply.created_at}</span>
                </div>
                </>
            ))}
        
        </div>
    );
}
