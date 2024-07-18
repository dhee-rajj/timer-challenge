import { forwardRef, useRef, useImperativeHandle } from "react";

const ResultModal = forwardRef(function ResultModal(
    { targetTime, timeRemaining, onReset },
    ref
) {
    const userLost = timeRemaining <= 0;
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
    const score = Math.round(1 - (timeRemaining / (targetTime * 1000)) * 100);
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });
    return (
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} second</strong>
            </p>
            <p>
                You Stopped the timer with{" "}
                <strong>{formattedTimeRemaining} seconds left</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button>close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;
