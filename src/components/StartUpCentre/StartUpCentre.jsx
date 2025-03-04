import React from "react";
import "./StartUpCentre.css";
import image01 from "../../assets/organiser-image-01.png";
import image02 from "../../assets/organiser-image-02.png";
import image03 from "../../assets/organiser-image-03.png";
import image04 from "../../assets/organiser-image-04.png";
import image05 from "../../assets/organiser-image-05.png";
import image06 from "../../assets/organiser-image-06.png";
import image07 from "../../assets/organiser-image-07.png";
import image08 from "../../assets/organiser-image-08.png";

export const StartUpCentre = () => {
  //
  const images = [
    image01,
    image02,
    image03,
    image04,
    image05,
    image06,
    image07,
    image08,
  ];

  const picturesContent = [
    "Create Job",
    "Add Tasks",
    "Invite Users",
    "Assign Tasks",
    "Invite as many users as You want",
    "Create Shopping List",
    "Add items to List",
    "Cooperate",
  ];
  return (
    <div className="StartUpCentre">
      {picturesContent.map((item, index) => {
        return (
          <div key={index}>
            <p className="startUpImageContent">{item}</p>
            {/* <p>{returnImageFunction(index + 1)}</p> */}
            <img
              className="startUpImage"
              src={images[index]}
              alt={images[index]}
            ></img>
          </div>
        );
      })}
    </div>
  );
};
