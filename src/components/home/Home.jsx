import React, { useState } from 'react'
import './home.scss'
import Navbar from '../navbar/Navbar'
import photo from '../../assets/profile.jpeg'
import SocialNetworks from './SocialNetworks'
import pdf from '../../assets/wilinton.pdf'
import About from '../about/About'
import Projects from '../projects/Projects'
import colombia from '../../assets/colombia.png'
import Contact from '../contact/Contact'

const Home = () => {
    const [spanish, setSpanish] = useState(false)
    const [isDark, setIsDark] = useState(false)

    const changeLanguage = () => {
        setSpanish(!spanish)
    }
    const changeMode = () => {
        setIsDark(!isDark)

    }


    return (
        <article className={isDark ? 'homeDark' : 'home'} id='home'>
            <Navbar changeLanguage={changeLanguage} changeMode={changeMode} />
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
                        <a href={pdf} target="_blank" download='CVWilintonAscanioToro.pdf' className={isDark ? 'btnDownload dark' : 'btnDownload'}>DESCARGAR CV</a>
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
                        <a href={pdf} target="_blank" download='CVWilintonAscanioToro.pdf' className={isDark ? 'btnDownload dark' : 'btnDownload'}>DOWNLOAD RESUME</a>
                    </section>
                    <figure>
                        <img src={photo} alt="perfil" />
                    </figure>
                </div></>
            }

            <About spanish={spanish} />
            <Projects spanish={spanish} />
            <Contact isDark={isDark} spanish={spanish} />
            <SocialNetworks isDark={isDark} />


        </article>
    )
}

export default Home