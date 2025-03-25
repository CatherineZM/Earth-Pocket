"use client";

import { useEffect, useRef } from "react";

class Point {
    x: number;
    y: number;
    fixedY: number;
    speed: number;
    cur: number;
    max: number;
    amplitude: number;

    constructor(index: number, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.045;
        this.cur = index;
        this.amplitude = 10;
        this.max = Math.random() * 0 + this.amplitude;
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + Math.sin(this.cur) * this.max;
    }
}

class Wave {
    index: number;
    totalPoints: number;
    color: string;
    points: Point[] = [];
    stageWidth: number = 0;
    stageHeight: number = 0;
    centerX: number = 0;
    centerY: number = 0;
    pointGap: number = 0;

    constructor(index: number, totalPoints: number, color: string) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth: number, stageHeight: number) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.centerX = stageWidth / 8;
        this.centerY = stageHeight / 4;
        this.pointGap = stageWidth / (this.totalPoints + 8);
        this.init();
    }

    init() {
        this.points = [];
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY
            );
            this.points[i] = point;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.7;
        ctx.lineCap = "square";

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;
        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1) this.points[i].update();

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.moveTo(prevX, prevY);
        ctx.stroke();
    }
}

class WaveGroup {
    totalWaves = 4;
    totalPoints = 20;
    color = "#FFE65C";
    waves: Wave[] = [];

    constructor() {
        for (let i = 0; i < this.totalWaves; i++) {
            this.waves[i] = new Wave(i, this.totalPoints, this.color);
        }
    }

    resize(stageWidth: number, stageHeight: number) {
        this.waves.forEach((wave) => wave.resize(stageWidth, stageHeight));
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.waves.forEach((wave) => wave.draw(ctx));
    }
}

export default function WaveCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const waveGroupRef = useRef<WaveGroup | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        waveGroupRef.current = new WaveGroup();

        const resize = () => {
            const stageWidth = 200;
            const stageHeight = 100;
            canvas.width = stageWidth;
            canvas.height = stageHeight;

            // Flip horizontally
            ctx.setTransform(-2, 0, 0, 2, stageWidth * 2, 0);

            waveGroupRef.current?.resize(stageWidth, stageHeight);
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            waveGroupRef.current?.draw(ctx);
            requestAnimationFrame(animate);
        };

        resize();
        animate();
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div id="container" className="relative w-[500px] h-[1000px]">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
