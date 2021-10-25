import styled, { keyframes } from 'styled-components'

export const fade = keyframes`
    from { opacity:1 }
    to { opacity: 0 }
`

export const FadeIn = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100vh !important;
    pointer-events: none;
    background: #ffd863;
    animation: ${fade} 4s normal forwards ease-in-out 1s;
    z-index: 2;
`

export const Container = styled.div`
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 16px;
    padding: min(3vw, 3rem);


    & h1 {
        position: relative;
        padding: 0;
        margin: 0 0 0.05em 0;
        font-family: Avenir, Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: min(10vw, 8rem);
        width: 6ch;
        line-height: 0.85em;
        color: #202020;
        display: block;
        z-index: 2;

        & .outline {
            -webkit-text-stroke: 0.04ch #343434;
            -webkit-text-fill-color: #0000!important;
        }
    }

    & p {
        position: relative;
        backdrop-filter: saturate(90%) blur(20px);
        -webkit-backdrop-filter: saturate(90%) blur(20px);
        z-index: 3;
        padding: 3rem;
        margin: 4rem auto;
        border-radius: 15px;
        font-size: min(calc(1.6 + 2vw), 1.6rem);

        background-color: rgba(255,255,255,0.15);

        @supports (-webkit-backdrop-filter: blur(0px)) or (backdrop-filter: blur(0px)) {
            backdrop-filter: saturate(90%) blur(20px);
            -webkit-backdrop-filter: saturate(90%) blur(20px);
            background-color: transparent;
            /* background-color: rgba(255,255,255,0.1); */
        }

    }
`

export const Button = styled.button`
    font-size: 2rem;
    position: relative;
    z-index:2;
    margin-right: 2rem;
    background-color: transparent;
    border: 1px solid #343434;
    border-radius: 6px;
    font-size: min(1.3rem, 6vw);
    cursor: pointer;
    padding: .4rem 1rem;
    transition: all .3s ease;

    &:hover  {
        background-color: #ffffff88;
    }

`
