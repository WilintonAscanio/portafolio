import React from 'react'
import './project.scss'
import css from '../../assets/css.png'
import html from '../../assets/html.png'
import js from '../../assets/js.png'
import react from '../../assets/react.png'
import redux from '../../assets/redux.png'
import sass from '../../assets/sass.png'
import firebase from '../../assets/firebase.png'

const Projects = () => {
  const projects = [
    {
      name: 'Terruño Colombiano',
      description: 'Terruño Colombiano is an online tourism platform where users can discover and share information about new destinations, as well as connect with other users to exchange experiences and travel recommendations related to trips and places of interest in Colombia.',
      tecnologies: [react, js, sass, redux, html, firebase],
      img: 'https://terrunocolombiano-60fec.web.app/static/media/aleegre.7bedae4a732ca85699d4.jpeg',
      color: 'white',
      url: 'https://terrunocolombiano-60fec.web.app/welcome',

    },
    {
      name: 'Food Delivery App',
      description: 'Food Delivery is a platform that provides users with a list of restaurants that have a wide variety of meals. Users can tailor their search results to their preferences and choose the dishes they want to order.',
      tecnologies: [react, js, sass, redux, html, firebase],
      img: 'https://images.pexels.com/photos/14731806/pexels-photo-14731806.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'white',
      url: 'https://sprint4-aec49.firebaseapp.com/'

    }
  ]
  return (
    <article id='project' className='project'>
      <strong >Projects</strong>
      <div>
        {projects?.map((project, index) =>
          <a href={project.url} target='_blank' >
            <section key={index} style={{
              backgroundImage: `linear-gradient(120deg, rgba(0,0,0,1)2%, rgba(32,32,32,0) 80%), url(${project.img})`,
              color: project.color
            }}>

              <p>
                {project.description}
              </p>
              <small>{project.name}</small>
              <figure>
                {project.tecnologies.map((tec, index) =>
                  <img key={index} src={tec} alt="tec" />)}
              </figure>

            </section>
          </a>
        )}

      </div>


    </article>
  )
}

export default Projects