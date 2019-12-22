import React from "react"
import {ReactComponent as LoaderSvg} from './../../assets/loader2.svg'
import './loader.scss'


const Loader = () => {
  return( <div className='loader-page'>
    <LoaderSvg className='loader'/>
    </div> )
}

export default Loader;
