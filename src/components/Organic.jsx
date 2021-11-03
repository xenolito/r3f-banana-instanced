import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree, extend} from '@react-three/fiber'
// import { EffectComposer, DepthOfField} from '@react-three/postprocessing'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, DotScreen } from "@react-three/postprocessing"
import {useGLTF} from '@react-three/drei'
// import React from 'react'
// import { Effects } from '@react-three/drei'

// import { UnrealBloomPass } from 'three-stdlib'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

extend({UnrealBloomPass})

const Swarm = ({count}) => {
    const light = useRef()
    const mesh = useRef()
    const {viewport, mouse} = useThree()
    // const {viewport, mouse} = useThree()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const dracoDecoderTemp = './gltf/'
    const model = useGLTF('./banana-transformed.glb', dracoDecoderTemp)

    const geometry = model.nodes['banana'].geometry
    const material = model.materials.skin

    // console.log(model.materials);


    // useMemo(() => {
    //     geometry.computeVertexNormals()
    //     geometry.scale(1,1,1)
    // },[geometry])


    // Generate random positions, speed factors and timings

    const particles = useMemo(() => {
        // Load Async model


        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.005 + Math.random() / 100
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0})
        }
        return temp
    },[count])

    useFrame((state) => {
        light.current.position.set((mouse.x * viewport.width / 2), (mouse.y * viewport.height / 2), 0)

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle

            t = particle.t += speed / 1.5
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.cos(t) + Math.sin(t * 2) / 10
            const s = Math.cos(t)

            particle.mx += mouse.x * viewport.width * particle.mx * 0.01
            particle.my += mouse.y * viewport.height * particle.my * 0.01

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
            )

            // dummy.position.set(
            //     (particle.mx / 10) + Math.sin(t/20) * factor * a + xFactor + Math.cos(t * 10) * a ,
            //     (particle.my / 10) + Math.cos(t/20) * factor * a + yFactor + Math.sin(t * 10) * b,
            //     (particle.my / 10) + Math.sin(t*2/10) * factor * a + yFactor + Math.cos(t * 10)

            // )

            dummy.scale.set(s,s,s)
            dummy.rotation.set(s*5,s*5,s*5)
            dummy.updateMatrix()

            // Apply the matrix to the instanced item
            mesh.current.setMatrixAt(i, dummy.matrix)

        })
        mesh.current.instanceMatrix.needsUpdate = true


    })

    return (
        <>
            <pointLight postition={[0,0,10]} ref={light} distance={1} intensity={0.6} color="white"/>
            <instancedMesh ref={mesh} args={[null, null, count]} >
                <tetrahedronBufferGeometry args={[1,0]}/>
                <dodecahedronBufferGeometry args={[2,0]} />
                {/* <torusBufferGeometry args={[1.1,1,12,12,6.3]}/> */}
                {/* <sphereBufferGeometry  args={[2,15,15]}/> */}
                <meshStandardMaterial color="black" wireframe={false} />
            </instancedMesh>

            {/* <instancedMesh ref={mesh} args={[geometry, material, count]} /> */}
        </>
    )
}



const Organic = () => {

    return (

        <Canvas
            // camera={{ near: 0.001, far: 70*1.1, fov: 45, position: [0,0,70] }}
            camera={{ fov: 75, position: [0, 0, 70] }}
            gl={{
                alpha: false,
                antialias: true,
                powerPreference: "high-performance"
            }}
            performance={{ min: 0.5 }}
            dpr={[1, 1.5]}

            className="webgl"
            style={{ position: 'fixed', height: '100vh', zIndex: '1' }}
        >
            <color attach="background" args={['#080808']}/>
            {/* <ColorsContext.Provider value={{theme, cambioTheme}} >
                <FruitsContext.Provider value={{fruit, cambioFruit}} >
                    <Background />
                </FruitsContext.Provider>
            </ColorsContext.Provider> */}

            <pointLight intensity={0.2} color="white" />
            <spotLight intensity={1.2} position={[70,70,70]} penumbra={1} color="lightblue" />
            <Swarm count={800} />
            {/* <Effects>
                <waterPass attachArray="passes" factor={2} />
                <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
            </Effects> */}

            <EffectComposer disableNormalPass={true} multisampling={0}>
                <DepthOfField target={[0, 0, 30 / 2]} focusDistance={0} focalLength={0.05} bokehScale={3} height={380} />
                <Bloom luminanceThreshold={0.5} luminanceSmoothing={1.1} height={300} opacity={3} />
                <Noise opacity={0.0325} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>

        </Canvas>
    )
}

export default Organic
