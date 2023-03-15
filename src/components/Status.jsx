import React from "react";
import { status } from "../data";
import { Link } from "react-router-dom";

function Status() {
  return (
    <>
      <div className="story">
        <div className="storyContainer">
          <div className="box"></div>
          <h6>Your Story</h6>
        </div>
        {status.map(({ img, name }) => {
          return (
            <div className="storyContainer">
              <Link to="/status">
                <div className="box">
                  <img className="chatImage" src={img} alt="" />
                </div>
              </Link>
              <h6>{name}</h6>
            </div>
          );
        })}
      </div>
      <hr></hr>
    </>
  );
}

export default Status;
