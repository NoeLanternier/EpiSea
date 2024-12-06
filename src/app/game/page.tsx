'use client';
import React, { useState } from "react";
import { useCallback } from "react";

function CreateTrash(
    width: number,
    height: number,
    image: string,
    start: number,
    top: number,
    handleMouseEnter: () => void,
    handleMouseLeave: () => void
) {
    return <img
        src={image}
        style={{
            position: 'absolute',
            width: width.toString() + 'vh',
            height: height.toString() + 'vh',
            left: start,
            top: top,
            rotate: image == "/assets/bouteille-en-verre.png" ? "0deg" : "-60deg"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    ></img>
}

export default function Home() {
    const [trashs, setTrashs] = useState([
        {start: 0, top: Math.random() * (window.innerHeight * 0.7), speed: 5, isGrabed: false, image: "/assets/leau.png"},
        {start: 0, top: Math.random() * (window.innerHeight * 0.7), speed: 7, isGrabed: false, image: "/assets/bouteille-en-verre.png"}
    ])
    const [score, setScore] = useState(0)

    const moveTrash = useCallback(() => {
        setTrashs((trashBins) =>
            trashBins.map((trash) => {
                let newStart = trash.start + trash.speed;
                let newTop = trash.isGrabed ? trash.top - 5 : trash.top;

                if (newTop <= 0) {
                    newStart = 0;
                    newTop = Math.random() * (window.innerHeight * 0.7);
                    setScore((prevScore) => prevScore + 1);
                }

                if (newStart > (window.innerWidth - (0.12 * window.innerWidth / 2))) {
                    newStart = 0;
                }

                return { ...trash, start: newStart, top: newTop };
            })
        );
    }, []);


    const handleMouseEnter = (index: number) => {
        setTrashs((prevTrashBins) =>
            prevTrashBins.map((trash, i) => {
                if (i === index)
                    return { ...trash, isGrabed: true };
                else
                    return trash
            })
        );
    };

    const handleMouseLeave = (index: number) => {
        setTrashs((prevTrashBins) =>
            prevTrashBins.map((trash, i) => {
                if (i === index)
                    return { ...trash, isGrabed: false };
                else
                    return trash
            })
        );
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            moveTrash();
        }, 20);
        return () => clearInterval(interval);
    }, [moveTrash]);

    return (
        <>
        <div
            style={{
                backgroundColor:'white',
                minHeight:'30vh',
                display:'flex',
                justifyContent:'center',
                alignItems:'flex-end',
                paddingLeft:'10vh'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '18px'
                }}
            >
                Score: {score}
            </div>
            <div
                style={{
                    borderRadius:'50%',
                    backgroundColor:'green',
                    width:'5vh',
                    height:'5vh'
                }}
            ></div>
        </div>
        <div
            style={{
                backgroundColor:'#3987c9',
                minHeight:'70vh',
                position: 'relative'
            }}
            >
                {trashs.map((trash, index) =>
                    <React.Fragment key={index}>
                    {CreateTrash(
                        10,
                        10,
                        trash.image,
                        trash.start,
                        trash.top,
                        () => handleMouseEnter(index),
                        () => handleMouseLeave(index)
                    )}
                </React.Fragment>
                )}
        </div>
        </>
    );
  }

