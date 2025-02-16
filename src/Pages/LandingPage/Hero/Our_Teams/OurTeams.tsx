import React, { useEffect, useRef } from "react";
import "./OurTeam.css"; // Import the CSS file for styling

// Import images using ES6 syntax
import founder1 from "../../../../assets/lukas.png"; // Replace with founder images
import founder2 from "../../../../assets/ibenemenew.jpg";
import founder3 from "../../../../assets/ju.png";
import founder4 from "../../../../assets/gbola.png";
const teamMembers = [
  {
    name: "Lucky Lukas Ibeh",
    title: "Chief Executive Officer",
    image: founder1,
    bio: "Lucky Lukas Ibeh is a visionary entrepreneur with a passion for creating innovative design solutions. As the CEO of Lukas Design Lab, he leads the team with a focus on growth, creativity, and building a brand that stands out in the design industry. His leadership ensures that every project meets the highest standards of craftsmanship and functionality.",
  },
  {
    name: "Ikenna Ibeneme",
    title: "Chief Technology Officer",
    image: founder2,
    bio: "Ikenna Ibeneme is a technology enthusiast and a skilled developer. With a background in software engineering, he leads the technological innovations at Lukas Design Lab. Ikenna is responsible for overseeing the development of the Clonekraft app and ensuring that all technological aspects align with the company’s commitment to excellence.",
  },
  {
    name: "Gbolahan Ifeoluwa",
    title: "Chief Operating Officer",
    image: founder4,
    bio: "Gbolahan Ifeoluwa is a dynamic operations strategist who brings efficiency and precision to Lukas Design Lab. As the COO, he is responsible for managing day-to-day operations, optimizing processes, and ensuring that all teams work seamlessly to deliver exceptional results on time and within budget.",
  },
  {
    name: "Judith Ichado",
    title: "Chief Communications Officer",
    image: founder3,
    bio: "Judith Ichado is a communications expert with a flair for strategic storytelling. As the CCO, she shapes the brand’s narrative and manages public relations, ensuring that Lukas Design Lab’s vision, mission, and values resonate with both internal and external stakeholders. Judith plays a key role in building relationships and elevating the company’s presence in the design world.",
  },
];

const OurTeam: React.FC = () => {
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-content");
          } else {
            entry.target.classList.remove("show-content");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the item is in view
    );

    overlayRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      overlayRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div

    >
      <section className="our-team">
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div
              className="team-member"
              key={index}
              ref={(el) => (overlayRefs.current[index] = el)}
            >
              <div className="team-member-image">
                <img src={member.image} alt={member.name} />
                <div className="team-member-bio">
                  <p>{member.bio}</p>
                </div>
              </div>
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <p>{member.title}</p>
                {/* <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#000",
                  color: "#C4D92E",
                  padding: `4px 12px`,
                }}
              >
                View LinkedIn
              </a> */}
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default OurTeam;
