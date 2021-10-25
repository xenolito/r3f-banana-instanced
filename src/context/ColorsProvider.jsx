import React, { createContext, useEffect, useState } from 'react'

export const ColorsContext = createContext()

const ColorsProvider = (props) => {

const [bgColor, setBgColor] = useState([255, 191, 64, 1])

    const themes = {
        banana: {
            bgColor: [255, 191, 64, 1],
            txtColor: [0,0,0],
        },
        kiwi: {
            bgColor: [131,92,8,1],
            txtColor: [255,255,0],
        }
    }

    const [theme, setTheme] = useState(themes)

    useEffect(() => {
        if(localStorage.getItem('themeLocal')){
            setTheme(JSON.parse(localStorage.getItem('themeLocal')))
        }
    }, [])

    const cambioTheme = (valor) => {
        setTheme(valor)
        localStorage.setItem('themeLocal',JSON.stringify(valor))
    }

    return (
        <ColorsContext.Provider value={{theme, cambioTheme}} >
            {props.children}
        </ColorsContext.Provider>
    )
}

export default ColorsProvider;
