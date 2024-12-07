'use client';
import React, { useState, useEffect, useCallback } from "react";

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
    interface Trash {
        start: number;
        top: number;
        speed: number;
        isGrabed: boolean;
        image: string;
    }

    const [trashs, setTrashs] = useState<Trash[]>([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setTrashs([
            {start: 0, top: Math.random() * (window.innerHeight * 0.7), speed: 5, isGrabed: false, image: "/assets/leau.png"},
            {start: 0, top: Math.random() * (window.innerHeight * 0.7), speed: 7, isGrabed: false, image: "/assets/bouteille-en-verre.png"}
        ]);
    }, []);

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

                return { ...trash, start: newStart, top: newTop };
            })
        );
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            moveTrash();
        }, 20);
        return () => clearInterval(interval);
    }, [moveTrash]);

    const handleMouseEnter = (index: number) => {
        setTrashs((prevTrashBins) =>
            prevTrashBins.map((trash, i) => {
                if (i === index)
                    return { ...trash, isGrabed: true };
                else
                    return trash;
            })
        );
    };

    const handleMouseLeave = (index: number) => {
        setTrashs((prevTrashBins) =>
            prevTrashBins.map((trash, i) => {
                if (i === index)
                    return { ...trash, isGrabed: false };
                else
                    return trash;
            })
        );
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: '/assets/sky.jpg',
                    backgroundColor: 'white',
                    minHeight: '30vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingLeft: '10vh',
                    borderBottom: "4px solid black",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
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
                        fontSize: '18px',
                    }}
                >
                    Score: {score}
                </div>
                <img
                    src='/assets/iglou.png'
                    style={{
                        width: '10vh',
                        height: '10vh',
                        marginRight: '60vh'
                    }}
                ></img>
                <img
                    src='/assets/pole-nord.png'
                    style={{
                        width: '10vh',
                        height: '10vh',
                    }}
                ></img>
            </div>
            <div
                style={{
                    background: "linear-gradient(#1CB5E0 0%, #000851 100%)",
                    minHeight: '70vh',
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