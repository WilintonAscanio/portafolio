import React from 'react'
import './home.scss'
import Navbar from '../navbar/Navbar'
import photo from '../../assets/profile.jpeg'
import SocialNetworks from './SocialNetworks'
import pdf from '../../assets/wilinton.pdf'
import About from '../about/About'
import Projects from '../projects/Projects'
import colombia from '../../assets/colombia.png'

const Home = () => {

    return (
        <article className='home'>
            <SocialNetworks />
            <Navbar />
            <div className='home__info'>
                <section>
                    <strong>Hi, I'm Wilinton Ascanio Toro</strong>
                    <h2>Web Developer</h2>
                    <strong style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                        , fontSize: '16px'

                    }}><img src={colombia} style={{
                        height: '30px'
                    }} alt="colombia" />Colombia</strong>
                    <a href={pdf} target="_blank" download='CVWilintonAscanioToro.pdf' className='btnDownload'>DOWNLOAD RESUME</a>
                </section>
                <figure>
                    <img src={photo} alt="perfil" />
                </figure>
            </div>
            <About />
            {/* <Projects /> */}

        </article>
    )
}

export default Home