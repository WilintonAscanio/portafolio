import React, { useEffect, useState } from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { BsGithub } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'

const SocialNetworks = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {width > 900 ?
                <div className='socialNetworks'>
                    <a href='https://www.linkedin.com/in/wilintonascanio/' target='_blank'><BsLinkedin /></a>
                    <a href='https://github.com/WilintonAscanio' target='_blank'><BsGithub /></a>
                    <a href='https://www.instagram.com/wilintonascanio12/' target='_blank'><AiFillInstagram /></a>
                    <a href='mailto:wilintonascanio12@hotmail.com' target='_blank'><MdEmail /></a>
                </div> :
                <footer className='footer'>
                    <a href='https://www.linkedin.com/in/wilintonascanio/' target='_blank'><BsLinkedin /></a>
                    <a href='https://github.com/WilintonAscanio' target='_blank'><BsGithub /></a>
                    <a href='https://www.instagram.com/wilintonascanio12/' target='_blank'><AiFillInstagram /></a>
                    <a href='mailto:wilintonascanio12@hotmail.com' target='_blank'><MdEmail /></a>
                </footer>}

        </>
    )
}

export default SocialNetworks;