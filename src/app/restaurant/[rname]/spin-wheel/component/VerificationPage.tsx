'use client';

import React, { useState, useEffect } from 'react';

interface VerificationPageProps {
    onVerificationComplete: () => void;
    duration?: number; // in seconds, default 10
}

export default function VerificationPage({
    onVerificationComplete,
    duration = 10
}: VerificationPageProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + (100 / duration) / 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        onVerificationComplete();
                    }, 500);
                    return 100;
                }
                return newProgress;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [duration, onVerificationComplete]);

    const circumference = 2 * Math.PI * 100;
    const strokeDashoffset = circumference * (1 - progress / 100);

    return (
        <>
            <style jsx>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes rotate-spinner {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-dot {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .particle {
          animation: float-particle 5s infinite ease-in-out;
        }

        .confetti {
          animation: confetti-fall 3s infinite ease-in;
        }

        .loading-spinner {
          animation: rotate-spinner 2s linear infinite;
          transform-origin: center;
        }

        .bounce-dot {
          animation: bounce-dot 1.4s infinite ease-in-out;
        }

        .bounce-dot:nth-child(1) {
          animation-delay: -0.32s;
        }

        .bounce-dot:nth-child(2) {
          animation-delay: -0.16s;
        }
      `}</style>

            <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-400 flex items-center justify-center overflow-hidden z-[9999]">
                {/* Animated background particles */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="particle absolute w-1 h-1 bg-white/60 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                {/* Confetti elements */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti absolute w-2.5 h-2.5 -top-2.5 opacity-80"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                backgroundColor: ['#FFD700', '#FF69B4', '#9D4EDD', '#06FFA5', '#FF6B6B'][Math.floor(Math.random() * 5)]
                            }}
                        />
                    ))}
                </div>

                {/* Main content */}
                <div className="relative z-10 text-center px-8 max-w-md w-full">
                    {/* Header */}
                    <div className="mb-12 animate-[fade-in-down_0.6s_ease-out]">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] tracking-tight">
                            Almost there! 🎉
                        </h1>
                        <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium">
                            We're verifying your story<br />
                            to unlock your Lucky Spin!
                        </p>
                    </div>

                    {/* Circular Progress */}
                    <div className="relative w-60 h-60 mx-auto mb-12 animate-[scale-in_0.8s_cubic-bezier(0.34,1.56,0.64,1)]">
                        <svg
                            className="-rotate-90"
                            width="240"
                            height="240"
                        >
                            {/* Background circle */}
                            <circle
                                cx="120"
                                cy="120"
                                r="100"
                                strokeWidth="12"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.15)"
                            />

                            {/* Gradient definition for progress */}
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FF6B6B" />
                                    <stop offset="25%" stopColor="#FFD93D" />
                                    <stop offset="50%" stopColor="#6BCF7F" />
                                    <stop offset="75%" stopColor="#4D96FF" />
                                    <stop offset="100%" stopColor="#9D4EDD" />
                                </linearGradient>
                            </defs>

                            {/* Progress circle */}
                            <circle
                                cx="120"
                                cy="120"
                                r="100"
                                strokeWidth="12"
                                fill="none"
                                stroke="url(#progressGradient)"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-300 ease-out drop-shadow-[0_0_15px_rgba(157,78,221,0.8)]"
                            />

                            {/* Inner glow circle */}
                            <circle
                                cx="120"
                                cy="120"
                                r="100"
                                strokeWidth="20"
                                fill="none"
                                opacity="0.3"
                                stroke="url(#progressGradient)"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-300 ease-out blur-sm"
                            />
                        </svg>

                        {/* Center content */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <div className="text-6xl font-extrabold text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.3)] mb-2 bg-gradient-to-br from-white to-purple-100 bg-clip-text text-transparent">
                                {Math.round(progress)}%
                            </div>
                            <div className="flex items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                                    {progress > 95 ? (
                                        <path
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                            fill="url(#progressGradient)"
                                            className="animate-[check-appear_0.4s_ease-out]"
                                        />
                                    ) : (
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="8"
                                            stroke="url(#progressGradient)"
                                            strokeWidth="2"
                                            fill="none"
                                            className="loading-spinner"
                                        />
                                    )}
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Tip section */}
                    <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4 mx-auto mb-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] max-w-xs animate-[fade-in-up_0.8s_ease-out_0.3s_backwards]">
                        <div className="text-2xl mb-2">💡</div>
                        <p className="text-white text-sm leading-relaxed m-0">
                            <strong className="text-yellow-300 font-bold">Tip:</strong> Keep your story public for successful verification!
                        </p>
                    </div>

                    {/* Loading dots */}
                    <div className="flex justify-center gap-2 animate-[fade-in_1s_ease-out_0.5s_backwards]">
                        <span className="bounce-dot w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                        <span className="bounce-dot w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                        <span className="bounce-dot w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                    </div>
                </div>
            </div>
        </>
    );
}
