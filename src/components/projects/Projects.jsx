import React from 'react'
import './project.scss'
import css from '../../assets/css.png'
import html from '../../assets/html.png'
import js from '../../assets/js.png'
import react from '../../assets/react.png'
import redux from '../../assets/redux.png'
import sass from '../../assets/sass.png'
import firebase from '../../assets/firebase.png'

const Projects = ({ spanish }) => {
  const projects = [
    {
      name: 'Terruño Colombiano',
      description: 'Terruño Colombiano is an online tourism platform where users can discover and share information about new destinations, as well as connect with other users to exchange experiences and travel recommendations related to trips and places of interest in Colombia.',
      descripcion: 'Terruño Colombiano es una plataforma en línea dedicada al turismo, donde los usuarios tienen la oportunidad de descubrir y compartir información sobre nuevos destinos, además de conectarse con otros usuarios para intercambiar experiencias y recomendaciones relacionadas con viajes y lugares de interés en Colombia.',
      tecnologies: [react, js, firebase, sass, redux, html],
      img: 'https://terrunocolombiano-60fec.web.app/static/media/aleegre.7bedae4a732ca85699d4.jpeg',
      color: 'white',
      url: 'https://terrunocolombiano-60fec.web.app/welcome',

    },
    {
      name: 'Food Delivery App',
      description: 'Food Delivery is a platform that provides users with a list of restaurants that have a wide variety of meals. Users can tailor their search results to their preferences and choose the dishes they want to order.',
      descripcion: 'Food Delivery es una plataforma que ofrece a los usuarios un directorio de restaurantes que cuentan con una amplia selección de comidas. Los usuarios tienen la opción de personalizar su búsqueda según sus preferencias y seleccionar los platos que deseen pedir.',
      tecnologies: [react, js, sass, redux, html, firebase],
      img: 'https://images.pexels.com/photos/14731806/pexels-photo-14731806.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'white',
      url: 'https://sprint4-aec49.firebaseapp.com/'

    },
      {
      name: 'Pizza App',
      description: 'Pizza App is uniquely tailored to meet the needs of developers. It not only provides you with the convenience of ordering delicious pizzas but also offers you exclusive benefits. From special deals tailored to your taste to the ease of making secure online payments, Pizza App caters to your preferences. ',
      descripcion: 'La aplicación Pizza App está específicamente orientada a satisfacer las necesidades de los desarrolladores. No solo te brinda la conveniencia de ordenar deliciosas pizzas, sino que también te ofrece beneficios exclusivos. Desde ofertas especiales diseñadas para tu gusto hasta la facilidad de realizar pagos en línea de forma segura, Pizza App se adapta a tus preferencias.',
      tecnologies: [react, js, sass, redux, html, firebase],
      img: 'https://images.pexels.com/photos/8725224/pexels-photo-8725224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      color: 'white',
      url: ''

    },
    {
      name: 'Space App',
      description: 'On this platform, you can delve into various aspects related to planets, space equipment, and technologies. We provide in-depth information about different planets, as well as the latest innovations in space technology and the missions and equipment that make space exploration possible. ',
      descripcion: 'En esta plataforma, podrás explorar diversos aspectos relacionados con los planetas, equipos y tecnologías espaciales. Te ofrecemos información detallada sobre diferentes planetas, así como las últimas innovaciones en tecnología espacial y las misiones y equipos que hacen posible la exploración del espacio. ',
      tecnologies: [react, js, sass, redux, html, firebase],
      img: 'https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'white',
      url: ''

    }
  ]
  return (
    <article id='projects' className='project'>
      <strong >{spanish ? 'Mis proyectos' : 'Projects'}</strong>
      <div>
        {projects?.map((project, index) =>
          <a href={project.url ? project.url : 'javascript:void(0)'} target={project.url ? '_blank' : ''} key={index} >
            <section style={{
              backgroundImage: `linear-gradient(120deg, rgba(0,0,0,1)2%, rgba(32,32,32,0) 80%), url(${project.img})`,
              color: project.color
            }}>

              <p>
                {spanish ? project.descripcion : project.description}
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