import { useState } from 'react';

export default function Home() {

    const [mostrarVideo, setMostrarVideo] = useState(false)
    const [dancar, setDancar] = useState(false)

    const autoplay = 1
    const start = 1

    function aoClicar() {
        setMostrarVideo(true)
        setInterval(() => {
            setDancar(true)
        }, 2000)
    }

    return <>
        <style jsx global>{`

            body {
                background-color: #FFF7CA;
            }

            main {
                height: 90dvh;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: arial;
                flex-direction: column;
            }

            h1 {
                text-align: center;
                max-width: 500px;
                margin-bottom: 40px;
            }

            .dancando {
                animation: dancar 0.98s ease-in-out infinite;
            }

            @keyframes dancar { /* rotate() translateY() */
                0% {
                    transform: rotate(0deg) translateY(20px)
                }

                25% {
                    transform: rotate(-6deg) translateY(0px)
                }

                50% {
                    transform: rotate(0deg) translateY(20px)
                }

                75% {
                    transform: rotate(6deg) translateY(0px)
                }

                100% {
                    transform: rotate(0deg) translateY(20px)
                }
            }
                
            button {
                background-color: #FD3775;
                height: 80px;
                width: 200px;
                border: none;
                border-radius: 20px;
                color: white;
                font-size: 20px;
            }

            button:hover {
                background-color: #FD165E;
                cursor: pointer;
            }

            iframe {
                aspect-ratio: 16 / 9;
                max-width: 500px;
            }

            footer {
                color: #b1b1b1;
                font-style: italic;
                margin-top: 40px;
            }

            footer p {
                margin: 0;
            }

        `}</style>
        <main>
            <h1 className={dancar ? 'dancando' : ''}>Olá amor! Quero que você saiba que é assim que eu me sinto por você 💓❤️‍🔥❣️😘💘🥰😍❤️💕😘❣️😁🫶</h1>
            
            {!mostrarVideo &&
                <button type="button" onClick={aoClicar}>Quero ver! 😁</button>
            }

            {mostrarVideo && 
                <iframe
                    src={`https://www.youtube.com/embed/c-dmCtw5xVs?si=yL3ZJmPsooM2eR0t&autoplay=${autoplay}&start=${start}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            }

            <footer>
                <p>De: Andrew</p>
                <p>Para: Mariane</p>
            </footer>
        </main>
    </>
}