"use client";

import { useState, useEffect, useCallback } from 'react';

function Home() {
    const [trashs, setTrashs] = useState([
        {start: 0, top: 0, speed: 5, isGrabed: false, image: "/assets/leau.png"},
        {start: 0, top: 0, speed: 7, isGrabed: false, image: "/assets/bouteille-en-verre.png"}
    ]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTrashs((trashBins) =>
                trashBins.map((trash) => ({
                    ...trash,
                    top: Math.random() * (window.innerHeight * 0.7)
                }))
            );
        }
    }, []);

    const moveTrash = useCallback(() => {
        if (typeof window !== 'undefined') {
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
        }
    }, []);

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

    useEffect(() => {
        const interval = setInterval(() => {
            moveTrash();
        }, 20);
        return () => clearInterval(interval);
    }, [moveTrash]);

    return (
        <>
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            {trashs.map((trash, index) => (
                <img
                    key={index}
                    src={trash.image}
                    style={{
                        position: 'absolute',
                        left: trash.start,
                        top: trash.top,
                        width: '10%',
                        height: 'auto',
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                />
            ))}
        </div>
        <div>Score: {score}</div>
        </>
    );
}

export default Home;