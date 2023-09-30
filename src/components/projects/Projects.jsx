import React from 'react'
import './project.scss'
import css from '../../assets/css.png'
import html from '../../assets/html.png'
import js from '../../assets/js.png'
import react from '../../assets/react.png'
import redux from '../../assets/redux.png'
import sass from '../../assets/sass.png'

const Projects = () => {
  const projects = [
    {
      name: 'Terruño Colombiano',
      description: 'Terruño Colombiano es una página web de turismo donde los usuarios podrán explorar, compartir nuevos lugares además de interactuar con los demás usuarios dentro de la plataforma.',
      tecnologies: [react, js, sass, redux, html, css],
      img: 'https://terrunocolombiano-60fec.web.app/static/media/aleegre.7bedae4a732ca85699d4.jpeg',
      color: 'white',
      url: 'https://terrunocolombiano-60fec.web.app/welcome',

    },
    {
      name: 'Food Delivery App',
      description: 'Esta página tiene como objetivo mostrar al usuario diferentes restaurantes, cada uno con sus platos, organizados por categorías los cuales el usuario podrá filtrar a su gusto.',
      tecnologies: [react, js, sass, redux, html, css],
      img: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600',
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
              backgroundImage: `url(${project.img})`,
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