import { Suspense, useState } from 'react'
import { Html, useProgress, Stats} from '@react-three/drei'
import Overlay from './layout/Overlay'
import { FadeIn } from './layout/styles'
import ColorsProvider from './context/ColorsProvider'
import FruitsProvider from './context/FruitsProvider'
import PageBackground from './components/PageBackground'
import Swarm from './components/Swarm'


const Loader = () => {
    const { progress } = useProgress()
    // console.log(`progress= ${progress}`)
    return <Html center>{progress} % loaded</Html>
}

export default function App({ count = 60, depth = 80 }) {
    const [bgColor, setBgColor] = useState([255, 191, 64, 1])

    // const ContextBridge = useContextBridge(FruitsContext)

    return (
        <>
            <ColorsProvider>
            <FruitsProvider>
                <Suspense fallback={null}>
                    <PageBackground count={count} depth={depth}/>
                    {/* <Swarm count={200} /> */}
                    <FadeIn />
                </Suspense>
                <Overlay />
                <Stats />
            </FruitsProvider>
            </ColorsProvider>

        </>
    )
}
