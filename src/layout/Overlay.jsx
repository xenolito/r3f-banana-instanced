import { Container, Button } from './styles'
// import { ColorsContext } from '../context/ColorsProvider'
import { FruitsContext } from '../context/FruitsProvider'
import { useContext } from 'react'

 const Overlay = () => {

    // const {theme, cambioTheme} = useContext(ColorsContext)

    const {fruit, cambioFruit} = useContext(FruitsContext)

    const title = (fruit === 'kiwi') ? 'Kiwi' : 'Banana'


    const changeFruta = (fruta) => {
        // const bg = (fruta === 'kiwi') ? '#00ff00' : '#ffff00'

        // console.log(fruta, title);
        // cambioTheme({
        //     ...theme,
        //     background: bg

        // })
        cambioFruit(fruta)
    }

    return (
        <Container className="container">
            {/* <h1>{`The ${title}'s Life ···`}</h1> */}
            <h1>The <span className="outline">{title}'s</span> Life</h1>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
             <Button onClick={() => changeFruta('kiwi')}>
                Quiero Kiwis
            </Button>
             <Button onClick={() => changeFruta('banana')} color={'#fff'} hovercolors={{color: '#ffff00', bg: '#ff0000'}}>
                Quiero Plátanos
            </Button>
        </Container>
    )
}


export default Overlay