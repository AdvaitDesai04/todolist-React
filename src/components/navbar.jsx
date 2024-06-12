import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <div className = " flex px-20 py-3 bg-sky-700  justify-between  [&>*]:cursor-pointer flex-wrap">
        <div className ="text-xl font-bold" >Todo</div>
        <div>
            <ul className = "flex justify-center gap-8 text-xl  text-yellow-500 [&>*:hover]:text-yellow-800 flex-wrap">
                <a href ="/hi"><li className = " transition-all duration-200">Help</li></a>
                <li className = " transition-all duration-200">Contact</li>
                <a href ="/about"><li className = " transition-all duration-200" >About us</li>
                </a>
            </ul>
        </div>
    </div>
  )
}

export default navbar
