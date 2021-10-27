import { Suspense } from 'react'
import {Stats} from '@react-three/drei'
import Overlay from './layout/Overlay'
import { FadeIn } from './layout/styles'
import ColorsProvider from './context/ColorsProvider'
import FruitsProvider from './context/FruitsProvider'
import PageBackground from './components/PageBackground'
import Organic from './components/Organic'


/* const Loader = () => {
    const { progress } = useProgress()
    // console.log(`progress= ${progress}`)
    return <Html center>{progress} % loaded</Html>
}
 */
export default function App({ count = 60, depth = 80 }) {
    return (
        <>
            <ColorsProvider>
            <FruitsProvider>
                <Suspense fallback={null}>
                    {/* <PageBackground count={count} depth={depth}/> */}
                    <Organic />
                    <FadeIn />
                </Suspense>
                <Overlay />
                <Stats />
            </FruitsProvider>
            </ColorsProvider>

        </>
    )
}
