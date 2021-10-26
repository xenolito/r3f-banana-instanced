import React, {useContext} from 'react'
import {ColorsContext} from '../context/ColorsProvider'
import { FruitsContext } from '../context/FruitsProvider'
import { useFrame } from '@react-three/fiber'


const Background = () => {
    const {theme} = useContext(ColorsContext)
    const {fruit} = useContext(FruitsContext)

    useFrame(state => {
        // console.log('background');
    })

    return (
            <color
                attach="background"
                args={[`rgb(${theme[fruit].bgColor[0]},${theme[fruit].bgColor[1]},${theme[fruit].bgColor[2]})`]}
            />
    )
}

export default Background
