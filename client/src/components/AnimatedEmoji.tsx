import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const AnimatedEmoji = ({ className }: { className?: string }) => {
    const [emoji, setEmoji] = useState('😊');

    const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "😸", "😺"];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * emojis.length);
            setEmoji(emojis[randomIndex]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={emoji} // Forces re-animation on emoji change
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={cn("text-xl align-middle my-auto", className)}
            >
                {emoji}
            </motion.span>
        </AnimatePresence>
    );
};

export default AnimatedEmoji;
