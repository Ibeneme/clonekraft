import React from "react";
import "./Team.css"; // assuming you have a CSS file for styling
import LukasImage from "../../../assets/Sofa/Lukas.png";
import IfeImage from "../../../assets/Sofa/ife.jpg";
import IbenemeImage from "../../../assets/Sofa/Ibeneme.jpeg";

const TeamMembers = () => {
  const team = [
    {
      id: 1,
      name: "Lucky Lukas Ibeh",
      title: "CEO -Chief Executive Officer",
      imageUrl: LukasImage,
    },
    {
      id: 2,
      name: "Gbolahan Ifeoluwa",
      title: "COO -  Chief Operating Officer",
      imageUrl: IfeImage,
    },
    {
      id: 3,
      name: "Ibeneme Ikenna",
      title: "CTO - Chief Technology Officer",
      imageUrl: IbenemeImage,
    },
    // {
    //   id: 4,
    //   name: "Emily Brown",
    //   title: "CFO",
    //   imageUrl: IfeImage,
    // },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h3
        className="product-text"
        style={{ marginRight: 16, textDecorationLine: "overline" }}
      >
        The Creative Team
      </h3>

      <div className="team-container">
        {team.map((member) => (
          <div key={member.id} className="team-member">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="bw-image"
            />
            <div className="member-details">
              <h3>{member.name}</h3>
              <p>{member.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
