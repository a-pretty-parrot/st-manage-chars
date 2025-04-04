import { useEffect } from 'react';

export default function Extension() {
    useEffect(() => {
        console.log('[nav-button] React panel loaded!');
    }, []);

    return (
        <div>
            <h2>Nav Button Extension</h2>
            <p>This is a test panel for the nav-button extension.</p>
        </div>
    );
}