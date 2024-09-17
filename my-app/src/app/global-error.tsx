'use client';

export default function GlobalError({ error, reset }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {


    return (
        <div>
            <h1>Global Error</h1>
            <p>{error.message}</p>
            <pre>{error.stack}</pre>
            <button onClick={reset}>Reset</button>
        </div>
    );

}