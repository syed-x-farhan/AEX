import React from "react";
import styles from "./team.module.css";
import FarhanImage from "../Images/Farhan.jpeg";
import SeharImage from "../Images/Sehar.jpeg";
import KainatImage from "../Images/Kainat.jpeg";
import AleezeImage from "../Images/Aleeze.jpeg";
import MoeezImage from "../Images/Moeez.jpeg";
const teamMembers = [
  {
    name: "Farhan Hassan",
    role: "Founder",
    image: FarhanImage,
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Kainat Irfan",
    role: "Head of Operations",
    image: KainatImage,
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Sehar Nadeem",
    role: "Head of Marketing",
    image: SeharImage,
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
  
  {
    name: "Moeez Ahmed",
    role: "Lead Developer",
    image: MoeezImage,
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Aleeza Manzoor",
    role: "Lead Designer",
    image: AleezeImage,
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

const TeamMember = ({ name, role, image, socialLinks }) => (
  <div className={styles.card}>
    <img src={image} alt={name} />
    <h3>{name}</h3>
    <p>{role}</p>
    <div className={styles.socialIcons}>
      <a href={socialLinks.linkedin} aria-label="LinkedIn">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href={socialLinks.twitter} aria-label="Twitter">
        <i className="fab fa-twitter"></i>
      </a>
    </div>
  </div>
);

const Team = () => (
  <div className={styles.teamContainer}>
    <h1>Meet the Team</h1>
    <div className={styles.team}>
      {teamMembers.map((member, index) => (
        <TeamMember
          key={index}
          name={member.name}
          role={member.role}
          image={member.image}
          socialLinks={member.socialLinks}
        />
      ))}
    </div>
  </div>
);

export default Team;
