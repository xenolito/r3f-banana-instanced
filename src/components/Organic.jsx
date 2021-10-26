import { Canvas, useThree, extend } from '@react-three/fiber'
// import React from 'react'
// import { Effects } from '@react-three/drei'

import { UnrealBloomPass } from 'three-stdlib'

// extend({UnrealBloomPass})

const Swarm = ({count}) => {
    // const {viewport, mouse} = useThree()

    return (
        <h1>Hola</h1>
    )
}



const Organic = () => {

    return (

        <Canvas
            camera={{fov: 75, position: [0,0,70]}}
            className="webgl"
            style={{ position: 'fixed', height: '100vh', zIndex: '1' }}
        >
            <pointLight intensity={0.2} color="white" />
            <spotLight intensity={0.2} position={[70,70,70]} penumbra={1} color="lightblue" />
            {/* <Effects>
                <waterPass attachArray="passes" factor={2} />
                <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
            </Effects> */}

        </Canvas>
    )
}

export default Organic
