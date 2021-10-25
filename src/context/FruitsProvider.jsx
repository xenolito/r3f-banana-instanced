import React, { createContext, useEffect, useState } from 'react'

export const FruitsContext = createContext()

const FruitsProvider = (props) => {

    const defFruit = 'banana' // Default fruit

    const [fruit, setFruit] = useState(defFruit)

    useEffect(() => {
        if(localStorage.getItem('fruitLocal')){
            setFruit(JSON.parse(localStorage.getItem('fruitLocal')))
        }
    }, [])

    const cambioFruit = (valor) => {
        setFruit(valor)
        localStorage.setItem('fruitLocal',JSON.stringify(valor))
    }

    return (
        <FruitsContext.Provider value={{fruit, cambioFruit}} >
            {props.children}
        </FruitsContext.Provider>
    )
}

export default FruitsProvider;
