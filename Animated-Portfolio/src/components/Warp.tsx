import { useEffect, useRef } from "react";
import "./Warp.scss";

class Star {
  x: number;
  y: number;
  c: number;
  w: number;
  h: number;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.c = 0;
  }

  updateColor() {
    this.c = Math.min(255, this.c + 5);
  }

  updatePos(w: number, h: number, xMod: number, yMod: number, warpSpeed: number) {
    this.w = w;
    this.h = h;
    const speedMult = warpSpeed ? 0.028 : 0.02;
    const cx = w / 2;
    const cy = h / 2;

    this.x += xMod + (this.x - cx) * speedMult;
    this.y += yMod + (this.y - cy) * speedMult;

    this.updateColor();

    if (this.x > w || this.x < 0) {
      this.x = Math.random() * w;
      this.c = 0;
    }

    if (this.y > h || this.y < 0) {
      this.y = Math.random() * h;
      this.c = 0;
    }
  }
}

export default function WarpSpeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();

    let xMod = 0;
    let yMod = 0;
    let warpSpeed = 0;

    const setWrap = (on: boolean) => {
      warpSpeed = on ? 1 : 0;
    };

    const STAR_COUNT = 200;
    const stars = Array.from({ length: STAR_COUNT }, () => new Star(w, h));

    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.keyCode || e.which;

      switch (code) {
        case 32:
          setWrap(true);
          break;
        case 37:
          xMod = Math.min(6, xMod + 0.3);
          break;
        case 38:
          yMod = Math.min(6, yMod + 0.3);
          break;
        case 39:
          xMod = Math.max(-6, xMod - 0.3);
          break;
        case 40:
          yMod = Math.max(-6, yMod - 0.3);
          break;
        default:
          return;
      }
      e.preventDefault();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const code = e.keyCode || e.which;

      switch (code) {
        case 32:
          setWrap(false);
          break;
        case 37:
        case 39:
          xMod = 0;
          break;
        case 38:
        case 40:
          yMod = 0;
          break;
        default:
          return;
      }
      e.preventDefault();
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      setWrap(true);
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return;
      setWrap(false);
    };

    const draw = () => {
      if (warpSpeed === 0) {
        ctx.fillStyle = "rgba(4, 3, 8, 0.2)";
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = "rgba(4, 3, 8, 0.45)";
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const c = s.c;

        if (warpSpeed) {
          ctx.fillStyle = `rgb(${Math.floor(c * 0.4)}, ${Math.floor(c * 0.2)}, ${c})`;
        } else {
          ctx.fillStyle = `rgba(${c}, ${c}, ${c}, ${c / 255})`;
        }

        const size = (c / 128) * (warpSpeed ? 1.5 : 1.0);
        ctx.fillRect(s.x, s.y, size, size);
        s.updatePos(w, h, xMod, yMod, warpSpeed);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp, { passive: false });
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);

    let scrollTimeout: any = null;
    const handleScrollSpeed = () => {
      setWrap(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setWrap(false);
      }, 150);
    };
    window.addEventListener("scroll", handleScrollSpeed, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("scroll", handleScrollSpeed);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="warp-warp fixed inset-0 z-0 pointer-events-none opacity-40">
      <canvas ref={canvasRef} className="warp-canvas w-full h-full block"></canvas>
    </div>
  );
}