import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const isTimerAlive = timeRemaining < targetTime * 1000 && timeRemaining > 0;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={isTimerAlive ? handleStop : handleStart}>
                        {isTimerAlive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={isTimerAlive ? "active" : undefined}>
                    {isTimerAlive ? "Timer Running" : "Inactive"}
                </p>
            </section>
        </>
    );
}
