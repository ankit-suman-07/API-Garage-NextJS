"use client"

import React, { useState } from 'react'
import NavBar from '../components/navbar/page'
import Footer from '../components/footer/page'

import API_URL from '../components/url/page'
import Headers from '../components/headers/page'
import Body from '../components/body/page'
import Params from '../components/params/page'
import Response from '../components/response/page'

const MainPage = () => {
    const [params, showParams] = useState(false);
    const [headers, showHeaders] = useState(false);
    const [body, showBody] = useState(false);

    const handleclick = (arg: string) => {
        if(arg === "params"){
            showParams(true);
            showHeaders(false);
            showBody(false);
        }
        else if(arg === "headers"){
            showParams(false);
            showHeaders(true);
            showBody(false);
        }
        else if(arg === "body"){
            showParams(false);
            showHeaders(false);
            showBody(true);
        }
    }
  return (
    <div>
        <NavBar />
        <API_URL />
        <div>
            <button onClick={() => handleclick("params")} >Params</button>
            <button onClick={() => handleclick("headers")} >Headers</button>
            <button onClick={() => handleclick("body")} >Body</button>
            
        </div>
        <div>
            {params && <Params />}
            {headers && <Headers />}
            {body && <Body />}
        </div>
        <div>
            <Response />
        </div>
        <Footer />
    </div>
  )
}

export default MainPage
