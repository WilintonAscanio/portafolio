import React from 'react'
import './home.scss'
import Navbar from '../navbar/Navbar'
import photo from '../../assets/profile.jpeg'
import SocialNetworks from './SocialNetworks'

const Home = () => {
    return (
        <article className='home'>
            <SocialNetworks />
            <Navbar />
            <div className='home__info'>
                <section>
                    <strong>Wilinton Ascanio Toro</strong>
                    <h2>Web Developer</h2>
                    <p>
                        I'm a web development professional with experience in building online applications. My overall skill set includes the use of technologies like HTML5, CSS3, JavaScript, and ReactJS to create engaging and useful user experiences. Additionally, I have knowledge of backend technologies including Java, Python, Docker, APIs, and related as well as unrelated data bases.
                        Along with my technical skills, I also have strong teamwork abilities and excellent communication skills. I'm versatile and am knowledgeable about using agile project management methodologies.
                    </p>
                </section>
                <figure>
                    <img src={photo} alt="perfil" />
                </figure>
            </div>
        </article>
    )
}

export default Home