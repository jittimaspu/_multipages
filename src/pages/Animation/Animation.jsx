import React, { useState, useEffect } from 'react';
import './Animation.css';

const Animation = () => {
    const fieldWidth = 800;
    const fieldHeight = 400;
    const ballSize = 150;
    const maxX = fieldWidth - ballSize - 6;
    const maxY = fieldHeight - ballSize - 6;

    const [running, setRunning] = useState(false);
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [x, setX] = useState((fieldWidth - ballSize) / 2);
    const [y, setY] = useState((fieldHeight - ballSize) / 2);
    const [vX] = useState(8);
    const [vY] = useState(8);
    const [angle, setAngle] = useState(0);
    const [angleSpin, setAngleSpin] = useState(Math.floor(Math.random() * 10 + 4));
    const [ballType, setBallType] = useState('None');

    const toggleBallType = (type) => setBallType(type);

    const updatePosition = () => {
        let newX = goRight ? x + vX : x - vX;
        let newY = goDown ? y + vY : y - vY;

        if (newX >= maxX || newX <= 6) {
            setGoRight(!goRight);
            setAngleSpin(Math.floor(Math.random() * 10 + (goRight ? -4 : 4)));
        }

        if (newY >= maxY || newY <= 6) {
            setGoDown(!goDown);
            setAngleSpin(Math.floor(Math.random() * 10 + (goDown ? -4 : 4)));
        }

        setX(newX);
        setY(newY);
        setAngle(prev => prev + angleSpin);
    };

    useEffect(() => {
        if (running) {
            const interval = setInterval(updatePosition, 40);
            return () => clearInterval(interval);
        }
    }, [running, x, y, goRight, goDown, angleSpin]);

    const toggleRunning = () => setRunning(prev => !prev);

    useEffect(() => {
        const handleKey = ({ key }) => {
            const keyMapping = {
                ' ': toggleRunning,
                '1': () => toggleBallType('Basketball'),
                '2': () => toggleBallType('Football'),
                '3': () => toggleBallType('Volleyball'),
                '4': () => toggleBallType('Human'),
                '5': () => toggleBallType('Cartoon'),
                '6': () => toggleBallType('Logo'),
                '0': () => toggleBallType('None'),
            };
            keyMapping[key]?.();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <div className='animation-container'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                    className='field-display'
                    style={{
                        width: fieldWidth,
                        height: fieldHeight,
                        position: 'relative',
                        border: '1px solid black',

                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                        margin: '10px',
                        borderRadius: '5px',
                    }}
                >
                    <div
                        className={ballType !== 'None' ? `ball-${ballType.toLowerCase()}` : 'ball-none'}
                        style={{
                            border: '1px solid black',
                            borderRadius: '50%',
                            width: ballSize,
                            height: ballSize,
                            left: x,
                            top: y,
                            position: 'relative',
                            transform: `rotate(${angle}deg)`,
                            backgroundColor: 'rgb(172, 255, 255)',
                            backgroundSize: '115%',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                </div>
            </div>
            <div>
                <button className={`mx-4 btn ${running ? 'btn-danger' : 'btn-success'}`} onClick={toggleRunning}>
                    <span className={`bi ${running ? 'bi-pause' : 'bi-play'}`}>
                        &nbsp;{running ? 'PAUSE' : 'RUN'}
                    </span>
                </button>

                {['None', 'Basketball', 'Football', 'Volleyball', 'Human', 'Cartoon', 'Logo'].map((type, index) => (
                    <React.Fragment key={index}>
                        <input
                            type="radio"
                            className="btn-check"
                            name="options-outlined"
                            id={`typeBall${index + 1}`}
                            autoComplete="off"
                            checked={ballType === type}
                            onChange={() => toggleBallType(type)}
                        />
                        <label
                            className={`mx-1 btn btn-outline-${type === 'None' ? 'secondary' : 'primary'}`}
                            htmlFor={`typeBall${index + 1}`}
                        >
                            {type}
                        </label>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Animation;
