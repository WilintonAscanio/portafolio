import React, { useState } from 'react'
import './home.scss'
import Navbar from '../navbar/Navbar'
import photo from '../../assets/profile.jpeg'
import SocialNetworks from './SocialNetworks'
import pdf from '../../assets/wilinton.pdf'
import About from '../about/About'
import Projects from '../projects/Projects'
import colombia from '../../assets/colombia.png'

const Home = () => {
    const [spanish, setSpanish] = useState(false)

    const changeLanguage = () => {
        setSpanish(!spanish)
    }
    console.log(spanish);


    return (
        <article className='home' id='home'>
            <SocialNetworks />
            <Navbar changeLanguage={changeLanguage} />
            {spanish ? <>
                <div className='home__info'>
                    <section>
                        <strong>Hola, soy Wilinton Ascanio Toro</strong>
                        <h2>Desarrollador Web</h2>
                        <strong style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                            , fontSize: '16px'

                        }}><img src={colombia} style={{
                            height: '30px'
                        }} alt="colombia" />Colombia</strong>
                        <a href={pdf} target="_blank" download='CVWilintonAscanioToro.pdf' className='btnDownload'>DESCARGAR CV</a>
                    </section>
                    <figure>
                        <img src={photo} alt="perfil" />
                    </figure>
                </div></> : <>
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
                </div></>
            }

            <About spanish={spanish} />
            <Projects spanish={spanish} />

        </article>
    )
}

export default Home