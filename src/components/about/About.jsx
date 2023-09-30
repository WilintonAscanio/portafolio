import React from 'react'
import './about.scss'
import bootstrap from '../../assets/bootstrap.png'
import css from '../../assets/css.png'
import html from '../../assets/html.png'
import java from '../../assets/java.png'
import js from '../../assets/js.png'
import mysql from '../../assets/mysql.png'
import python from '../../assets/python.png'
import react from '../../assets/react.png'
import redux from '../../assets/redux.png'
import sass from '../../assets/sass.png'

const About = () => {
  return (
    <div className='about' id='about'>
      <p>
        I'm a web development professional with experience in building online applications. My overall skill set includes the use of technologies like <strong>HTML5, CSS3, JavaScript</strong>, and <strong>ReactJS</strong> to create engaging and useful user experiences. Additionally, I have knowledge of backend technologies including <strong>Java, Python, Docker, APIs</strong>, and related as well as unrelated data bases.
        Along with my technical skills, I also have strong teamwork abilities and excellent communication skills. I'm versatile and am knowledgeable about using agile project management methodologies.
      </p>
      <figure>
        <img src={js} alt="js" />
        <img src={react} alt="react" />
        <img src={redux} alt="redux" />
        <img src={sass} alt="sass" />
        <img src={html} alt="html" />
        <img src={css} alt="css" />
        <img src={java} alt="java" />
        <img src={python} alt="python" />
        <img src={bootstrap} alt="bootstrap" />
        <img src={mysql} alt="mysql" />
      </figure>
    </div>
  )
}

export default About