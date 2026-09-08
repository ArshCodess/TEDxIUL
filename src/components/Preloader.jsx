'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import logo from '../assets/tedx-logo-clean.svg';

const DURATION = 5000;

export default function Preloader({ onVideoEnd, duration = DURATION }) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const startRef = useRef(null);

    const [exiting, setExiting] = useState(false);
    const [phase, setPhase] = useState('scattered');

    const bgNodesRef = useRef([]);
    const shardsRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.active = true;
        };
        const handleMouseLeave = () => { mouseRef.current.active = false; };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const initShards = useCallback(() => {
        if (shardsRef.current) return;

        const P = {
            M: { x: 50, y: 50 }, TLc: { x: 30, y: 30 }, TRc: { x: 70, y: 30 }, BRc: { x: 70, y: 70 }, BLc: { x: 30, y: 70 },
            A: { x: 20, y: 10 }, B: { x: 50, y: 40 }, C: { x: 80, y: 10 }, D: { x: 90, y: 20 }, E: { x: 60, y: 50 },
            F: { x: 90, y: 80 }, G: { x: 80, y: 90 }, H: { x: 50, y: 60 }, I: { x: 20, y: 90 }, J: { x: 10, y: 80 },
            K: { x: 40, y: 50 }, L: { x: 10, y: 20 }
        };

        const triangles = [
            [P.B, P.E, P.M], [P.E, P.H, P.M], [P.H, P.K, P.M], [P.K, P.B, P.M],
            [P.L, P.A, P.TLc], [P.A, P.B, P.TLc], [P.B, P.K, P.TLc], [P.K, P.L, P.TLc],
            [P.B, P.C, P.TRc], [P.C, P.D, P.TRc], [P.D, P.E, P.TRc], [P.E, P.B, P.TRc],
            [P.E, P.F, P.BRc], [P.F, P.G, P.BRc], [P.G, P.H, P.BRc], [P.H, P.E, P.BRc],
            [P.K, P.H, P.BLc], [P.H, P.I, P.BLc], [P.I, P.J, P.BLc], [P.J, P.K, P.BLc]
        ];

        const colors = [
            'rgba(230, 43, 30, 0.95)',
            'rgba(180, 20, 10, 0.9)',
            'rgba(138, 43, 226, 0.8)',
            'rgba(209, 18, 80, 0.8)',
            'rgba(255, 255, 255, 0.85)'
        ];

        shardsRef.current = triangles.map((tri) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = window.innerWidth * (0.6 + Math.random() * 0.4);

            return {
                targetPts: tri.map(pt => ({ x: (pt.x - 50) * 1.8, y: (pt.y - 50) * 1.8 })),
                offsetX: Math.cos(angle) * dist,
                offsetY: Math.sin(angle) * dist,
                startRot: (Math.random() - 0.5) * Math.PI * 6,
                delay: Math.random() * 0.4,
                color: colors[Math.floor(Math.random() * colors.length)]
            };
        });
    }, []);

    const initGrid = useCallback((W, H) => {
        const nodes = [];
        const spacing = 85;
        const cols = Math.ceil(W / spacing) + 2;
        const rows = Math.ceil(H / spacing) + 2;

        for (let y = 0; y <= rows; y++) {
            for (let x = 0; x <= cols; x++) {
                const xOffset = (y % 2 === 0) ? 0 : spacing / 2;
                nodes.push({
                    x: x * spacing + xOffset - spacing,
                    y: y * spacing - spacing,
                    activationTime: Math.random() * 0.5
                });
            }
        }
        bgNodesRef.current = nodes;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initGrid(canvas.width, canvas.height);
            initShards();
        };
        resize();
        window.addEventListener('resize', resize);

        const snapEase = (x) => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return x === 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        };

        const tick = (ts) => {
            if (!startRef.current) startRef.current = ts;
            const elapsed = ts - startRef.current;
            const rawT = Math.min(elapsed / duration, 1);

            if (rawT > 0.1) setPhase('revealing');

            const W = canvas.width;
            const H = canvas.height;
            const cX = W / 2;
            const cY = H / 2;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, W, H);

            ctx.lineWidth = 0.5;
            bgNodesRef.current.forEach((n, i) => {
                const distToMouse = Math.hypot(n.x - mx, n.y - my);
                const isActive = (rawT > n.activationTime) || (mouseRef.current.active && distToMouse < 200);

                if (isActive) {
                    ctx.fillStyle = `rgba(255, 255, 255, 0.05)`;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, 1, 0, Math.PI * 2);
                    ctx.fill();

                    for (let j = i + 1; j < Math.min(i + 15, bgNodesRef.current.length); j++) {
                        const neighbor = bgNodesRef.current[j];
                        const distNeighbor = Math.hypot(n.x - neighbor.x, n.y - neighbor.y);

                        if (distNeighbor > 60 && distNeighbor < 100) {
                            const lineAlpha = (mouseRef.current.active && distToMouse < 200) ? 0.15 : 0.02;
                            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha * (1 - rawT * 0.5)})`;
                            ctx.beginPath();
                            ctx.moveTo(n.x, n.y);
                            ctx.lineTo(neighbor.x, neighbor.y);
                            ctx.stroke();
                        }
                    }
                }
            });

            ctx.save();
            ctx.translate(cX, cY);

            const sortedShards = [...(shardsRef.current || [])].sort((a, b) => a.delay - b.delay);

            sortedShards.forEach((shard) => {
                const shardProgress = Math.max(0, Math.min(1, (rawT - shard.delay) / 0.4));
                const ease = snapEase(shardProgress);

                const currOffsetX = shard.offsetX * (1 - ease);
                const currOffsetY = shard.offsetY * (1 - ease);
                const currRot = shard.startRot * (1 - ease);

                ctx.save();
                ctx.translate(currOffsetX, currOffsetY);
                ctx.rotate(currRot);

                ctx.beginPath();
                ctx.moveTo(shard.targetPts[0].x, shard.targetPts[0].y);
                ctx.lineTo(shard.targetPts[1].x, shard.targetPts[1].y);
                ctx.lineTo(shard.targetPts[2].x, shard.targetPts[2].y);
                ctx.closePath();

                if (shardProgress > 0.95 && shardProgress < 1) {
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#e62b1e';
                    ctx.shadowBlur = 30;
                } else {
                    ctx.fillStyle = shard.color;
                    ctx.shadowBlur = 0;
                }

                ctx.globalAlpha = Math.min(ease * 1.5, 1);
                ctx.fill();

                ctx.strokeStyle = `rgba(255,255,255, ${0.1 * ease})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();

                ctx.restore();
            });

            if (rawT > 0.8) {
                const glowPhase = Math.sin((rawT - 0.8) * Math.PI * 4);
                const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 150);
                glow.addColorStop(0, `rgba(230, 43, 30, ${0.2 * glowPhase})`);
                glow.addColorStop(1, 'transparent');
                ctx.fillStyle = glow;
                ctx.globalCompositeOperation = 'screen';
                ctx.fillRect(-150, -150, 300, 300);
            }
            ctx.restore();

            const gradient = ctx.createRadialGradient(cX, cY, W * 0.1, cX, cY, W * 0.7);
            gradient.addColorStop(0, 'rgba(3, 3, 4, 0.2)');
            gradient.addColorStop(1, 'rgba(3, 3, 4, 0.95)');
            ctx.fillStyle = gradient;
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillRect(0, 0, W, H);

            animRef.current = requestAnimationFrame(tick);
        };

        animRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [duration, initGrid, initShards]);

    useEffect(() => {
        const tExit = setTimeout(() => setExiting(true), duration - 600);
        const tEnd = setTimeout(() => { if (onVideoEnd) onVideoEnd(); }, duration);
        return () => { clearTimeout(tExit); clearTimeout(tEnd); };
    }, [duration, onVideoEnd]);

    const premiumSpring = 'cubic-bezier(0.2, 0.9, 0.3, 1)';

    return (
        <div
            role="status"
            style={{
                position: 'fixed', inset: 0, zIndex: 99999,
                backgroundColor: '#030304', overflow: 'hidden',
                opacity: exiting ? 0 : 1,
                transition: `opacity 1.2s ${premiumSpring}`,
            }}
        >
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />

            <div style={{
                position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />

            <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
                transform: 'translateY(-100px)'
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px',
                    opacity: phase === 'revealing' ? 1 : 0,
                    transform: phase === 'revealing' ? 'translateY(0)' : 'translateY(15px)',
                    transition: `all 1.5s ${premiumSpring}`
                }}>
                    <img
                        src={logo.src}
                        alt="TEDx Integral University"
                        style={{ width: 'min(78vw, 560px)', height: 'auto', display: 'block', margin: '0', transform: 'translateX(30px)' }}
                    />

                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;900&family=Playfair+Display:wght@400&display=swap');
                @keyframes preloader-spin {
                    to { transform: rotate(360deg); }
                }
      `}} />
        </div>
    );
}
