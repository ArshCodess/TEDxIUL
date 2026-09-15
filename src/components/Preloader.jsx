'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/*
  TEDx Integral 2026 — "Tessellation Assembly"
  ────────────────────────────────────────────
  Theme Metaphor: No loading bars. No percentages. Pure visual storytelling. 
  Animation: 20 geometric shards mathematically assemble into the perfect 
             Tessellated 'X' below the Edition text.
*/

const DURATION = 6000;

export default function Preloader({ onVideoEnd, duration = DURATION }) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const startRef = useRef(null);

    // States
    const [exiting, setExiting] = useState(false);
    const [phase, setPhase] = useState('scattered');

    // Refs for logic
    const bgNodesRef = useRef([]);
    const shardsRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });

    // ── 1. Track Interactive Mouse ──
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

    // ── 2. Initialize Mathematical Shards for the 'X' ──
    const initShards = useCallback(() => {
        if (shardsRef.current) return;

        // The precise coordinates to form a perfect geometric 'X'
        const P = {
            M: { x: 50, y: 50 }, TLc: { x: 30, y: 30 }, TRc: { x: 70, y: 30 }, BRc: { x: 70, y: 70 }, BLc: { x: 30, y: 70 },
            A: { x: 20, y: 10 }, B: { x: 50, y: 40 }, C: { x: 80, y: 10 }, D: { x: 90, y: 20 }, E: { x: 60, y: 50 },
            F: { x: 90, y: 80 }, G: { x: 80, y: 90 }, H: { x: 50, y: 60 }, I: { x: 20, y: 90 }, J: { x: 10, y: 80 },
            K: { x: 40, y: 50 }, L: { x: 10, y: 20 }
        };

        // 20 perfect triangles that tessellate into the 'X'
        const triangles = [
            [P.B, P.E, P.M], [P.E, P.H, P.M], [P.H, P.K, P.M], [P.K, P.B, P.M],       // Center
            [P.L, P.A, P.TLc], [P.A, P.B, P.TLc], [P.B, P.K, P.TLc], [P.K, P.L, P.TLc], // TL Arm
            [P.B, P.C, P.TRc], [P.C, P.D, P.TRc], [P.D, P.E, P.TRc], [P.E, P.B, P.TRc], // TR Arm
            [P.E, P.F, P.BRc], [P.F, P.G, P.BRc], [P.G, P.H, P.BRc], [P.H, P.E, P.BRc], // BR Arm
            [P.K, P.H, P.BLc], [P.H, P.I, P.BLc], [P.I, P.J, P.BLc], [P.J, P.K, P.BLc]  // BL Arm
        ];

        const colors = [
            'rgba(230, 43, 30, 0.95)',  // TED Red
            'rgba(180, 20, 10, 0.9)',   // Dark Red
            'rgba(138, 43, 226, 0.8)',  // Poster Purple
            'rgba(209, 18, 80, 0.8)',   // Poster Magenta
            'rgba(255, 255, 255, 0.85)' // Glass Edge
        ];

        shardsRef.current = triangles.map((tri) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = window.innerWidth * (0.6 + Math.random() * 0.4); // Start way off-screen

            return {
                targetPts: tri.map(pt => ({ x: (pt.x - 50) * 1.8, y: (pt.y - 50) * 1.8 })),
                offsetX: Math.cos(angle) * dist,
                offsetY: Math.sin(angle) * dist,
                startRot: (Math.random() - 0.5) * Math.PI * 6, // Crazy spinning start
                delay: Math.random() * 0.4, // Staggered entry
                color: colors[Math.floor(Math.random() * colors.length)]
            };
        });
    }, []);

    // ── 3. Initialize Interactive Background Grid ──
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
                    activationTime: Math.random() * 0.5 // Random subtle twinkling
                });
            }
        }
        bgNodesRef.current = nodes;
    }, []);

    // ── 4. Main Render Engine ──
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

        // Premium Physics Easing: "Ease Out Back" for a magnetic snapping feel
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

            // Classy Architectural Black
            ctx.fillStyle = '#030304';
            ctx.fillRect(0, 0, W, H);

            // --- Draw Interactive Background Web ---
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

            // --- Draw the Assembling 'X' ---
            ctx.save();
            // Positioned dynamically below the "EDITION" text
            ctx.translate(cX, cY + 120);

            // Sort shards so the glass/white ones draw last (on top)
            const sortedShards = [...(shardsRef.current || [])].sort((a, b) => a.delay - b.delay);

            sortedShards.forEach((shard) => {
                // Individual shard progress (maps rawT to a 0-1 scale for this specific shard)
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

                // Flash bright white right upon magnetic impact
                if (shardProgress > 0.95 && shardProgress < 1) {
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#e62b1e';
                    ctx.shadowBlur = 30;
                } else {
                    ctx.fillStyle = shard.color;
                    ctx.shadowBlur = 0;
                }

                ctx.globalAlpha = Math.min(ease * 1.5, 1); // Fade in
                ctx.fill();

                // Draw the tessellation blueprint lines on top
                ctx.strokeStyle = `rgba(255,255,255, ${0.1 * ease})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();

                ctx.restore();
            });

            // Global 'X' Glow after fully formed
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

            // Deep Vignette Overlay
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

    // ── 5. Exit Choreography ──
    const [mounted, setMounted] = useState(true);
    
    useEffect(() => {
        const tExit = setTimeout(() => {
            setExiting(true);
            document.body.classList.remove('loading-preloader');
        }, duration - 600);
        
        const tEnd = setTimeout(() => { 
            if (onVideoEnd) onVideoEnd(); 
            // Wait for fade transition before unmounting
            setTimeout(() => setMounted(false), 1200);
        }, duration);
        
        return () => { 
            clearTimeout(tExit); 
            clearTimeout(tEnd); 
            document.body.classList.remove('loading-preloader');
        };
    }, [duration, onVideoEnd]);

    if (!mounted) return null;

    const premiumSpring = 'cubic-bezier(0.2, 0.9, 0.3, 1)';

    return (
        <div
            role="status"
            style={{
                position: 'fixed', inset: 0, zIndex: 99999,
                backgroundColor: '#030304', overflow: 'hidden',
                opacity: exiting ? 0 : 1,
                pointerEvents: exiting ? 'none' : 'auto',
                transition: `opacity 1.2s ${premiumSpring}`,
            }}
        >
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />

            {/* Cinematic Film Grain */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />

            {/* ── Brand Typography Overlay ── */}
            <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
                transform: 'translateY(-60px)' // Shifted up to make room for the X
            }}>

                {/* TEDx Lockup */}
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    opacity: phase === 'revealing' ? 1 : 0,
                    transform: phase === 'revealing' ? 'translateY(0)' : 'translateY(15px)',
                    transition: `all 1.5s ${premiumSpring}`,
                    marginBottom: '2.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', lineHeight: 0.8 }}>
                        <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '38px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.05em' }}>TED</span>
                        <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '38px', fontWeight: 900, color: '#e62b1e', letterSpacing: '-0.05em' }}>x</span>
                    </div>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginTop: '12px' }}>
                        Integral University
                    </div>
                </div>

                {/* Edition Reveal */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '20px',
                    opacity: phase === 'revealing' ? 1 : 0,
                    transform: phase === 'revealing' ? 'translateY(0)' : 'translateY(-10px)',
                    transition: `all 1.5s ${premiumSpring} 0.2s`, // Slight stagger
                }}>
                    <div style={{ width: '30px', height: '1px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                    <span style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '18px', fontWeight: 400, letterSpacing: '0.3em',
                        color: '#ffffff', textShadow: '0 0 20px rgba(255,255,255,0.3)'
                    }}>
                        EDITION - I
                    </span>
                    <div style={{ width: '30px', height: '1px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;900&family=Playfair+Display:wght@400&display=swap');
      `}} />
        </div>
    );
}
