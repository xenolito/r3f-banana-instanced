import * as THREE from 'three'
import { useRef, useState, useContext, instancedMesh, useLayoutEffect, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

// import { ColorsContext } from '../context/ColorsProvider'
import { FruitsContext } from '../context/FruitsProvider'

const Banana = ({ z, depth, bgTo, id }) => {
    const ref = useRef()
    const { viewport, camera } = useThree()
    const [clicked, setClicked] = useState(false)
    const [hover, setHovered] = useState(false)



    const {fruit} = useContext(FruitsContext)



    let { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

    // const dracoDecoderTemp = 'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
    const dracoDecoderTemp = './gltf/'

    // const { nodes, materials } = useGLTF('./banana-transformed.glb', dracoDecoderTemp)

    // const { nodes, materials } = useGLTF('/kiwi-transformed.glb')

    const fruitModels = {
        kiwi: {
            ...useGLTF('./kiwi-transformed.glb',dracoDecoderTemp),
            scale: [2.77, 2.77, 2.77],
            rotation: [0, 1.51, 0],
            bgColor: [0, 255, 0,]
        },
        banana: {
            ...useGLTF('./banana-transformed.glb', dracoDecoderTemp),
            matE: {
                color: 'orange',
                intensity: 0.15
            },
            rotation: [-1.5, 0, 0],
            bgColor: [255, 191, 64,],
            scale: 1
        }
    }

    const [data] = useState({
        x: THREE.MathUtils.randFloatSpread(2), // -1 to 1
        y: THREE.MathUtils.randFloatSpread(height),
        z: z,
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
    })

    useEffect(() => {
        // console.log(ref, id);
    }, [ref])

    useFrame((state, delta, clock, camera) => {
        ref.current.material.wireframe = hover



        ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.005), (data.rZ += 0.0005))
        ref.current.position.set(
            data.x * width,
            (data.y += 0.02),
            clicked ? (data.z -= 0.2) : data.z
        )

        if (data.y > viewport.getCurrentViewport(camera, [0, 0, data.z]).height) {
            data.y = -viewport.getCurrentViewport(camera, [0, 0, data.z]).height * 0.85
        }

        if (clicked) {
            if (ref.current.position.z < -(depth * 2)) {
                // console.log('deflimit reached', -(depth * 1.1), 'con Z', ref.current.position.z)
                setClicked(false)
                data.z = -Math.random() * depth
                data.y = -viewport.getCurrentViewport(camera, [0, 0, data.z]).height
                ref.current.position.z = data.z
                ref.current.position.y = data.y
            }
        }
    })

    return (
        <>
            <mesh
                ref={ref}
                onClick={() => setClicked(!clicked)}
                onPointerEnter={(e) => setHovered(true) }
                onPointerLeave={(e) => setHovered(false)}
                geometry={fruitModels[fruit].nodes[fruit].geometry}
                scale={fruitModels[fruit].scale ? fruitModels[fruit].scale : 1}
                rotation={fruitModels[fruit].rotation ? fruitModels[fruit].rotation : false}
            >
                <meshStandardMaterial
                    attach="material"
                    map={fruitModels[fruit].materials.skin.map}
                    emissive={fruitModels[fruit].matE ? fruitModels[fruit].matE.color : "#000000"}
                    emissiveIntensity={fruitModels[fruit].matE ? fruitModels[fruit].matE.intensity : 0 }
                    wireframe={clicked}
                />
            </mesh>
        </>
    )
}

// ! INSTANCIANDO DIRECTAMENTE => NO mejora el rendimiento, RTF debe instanciarlas por defecto
export const Instances = ({ count = 40, temp = new THREE.Object3D(), z = 80, depth = 80 }) => {
    const ref = useRef()
    const { viewport, camera } = useThree()
    // const [clicked, setClicked] = useState(false)
    let { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

    const { nodes, materials } = useGLTF('./banana-transformed.glb')

    const geometry = nodes.banana.geometry

    const [data] = useState({
        x: THREE.MathUtils.randFloatSpread(2), // -1 to 1
        y: THREE.MathUtils.randFloatSpread(height),
        z: z,
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
    })

    useLayoutEffect(() => {
        // Set positions
        for (let i = 0; i < count; i++) {
            // temp.position.set(data.x * width, (data.y += 0.02), data.z)
            temp.position.set(
                (data.x = THREE.MathUtils.randFloatSpread(2) * width),
                data.y,
                -Math.random() * 80
            )
            temp.updateMatrix()
            ref.current.setMatrixAt(i, temp.matrix)
            // console.log(data.x)
        }
        // Update the instance
        ref.current.instanceMatrix.needsUpdate = true
    }, [count,data,temp,width])

    useFrame((state) => {
        // console.log(ref.current.instanceMatrix)
        // console.log(ref.current.position.x)
    })

    return <instancedMesh ref={ref} args={[geometry, materials.skin, count]}></instancedMesh>
}

export default Banana
