import { FC, ReactNode, useEffect, useState } from 'react';

interface FadeContainerProps {
    children: ReactNode;
    isVisible: boolean;
    duration?: number;
}

export const FadeContainer: FC<FadeContainerProps> = ({ 
    children, 
    isVisible, 
    duration = 300 
}) => {
    const [opacity, setOpacity] = useState(isVisible);
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            // Small delay to ensure DOM update before animation
            const timer = setTimeout(() => {
                setOpacity(true);
            }, 50);
            return () => clearTimeout(timer);
        } else {
            setOpacity(false);
            // Wait for fade out to complete before removing from DOM
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration]);

    if (!shouldRender) return null;

    const fadeClass = opacity 
        ? "opacity-100 transition-opacity duration-300 ease-in" 
        : "opacity-0 transition-opacity duration-300 ease-out";

    return (
        <div className={fadeClass}>
            {children}
        </div>
    );
};