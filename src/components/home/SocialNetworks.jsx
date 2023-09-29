import React from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { BsGithub } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'

const SocialNetworks = () => {
    return (
        <div className='socialNetworks'>
            <a href='https://www.linkedin.com/in/wilintonascanio/'><BsLinkedin /></a>
            <a href='https://github.com/WilintonAscanio'><BsGithub /></a>
            <a href='https://www.instagram.com/wilintonascanio12/'><AiFillInstagram /></a>
        </div>
    )
}

export default SocialNetworks