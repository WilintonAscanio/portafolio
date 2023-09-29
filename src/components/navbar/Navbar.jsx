import React from 'react'
import './navbar.scss'
import { BsCode } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
import { BiSolidUserDetail } from 'react-icons/bi'
import { GoProjectSymlink } from 'react-icons/go'
import { MdOutlineContactSupport } from 'react-icons/md'


const Navbar = () => {
    return (
        <nav>
            <BsCode className='icon' />
            <ul>
                <li> <AiOutlineHome />Home</li>
                <li> <BiSolidUserDetail />About</li>
                <li> <GoProjectSymlink />Projects</li>
                <li> <MdOutlineContactSupport />Contact</li>
            </ul>
        </nav>
    )
}

export default Navbar