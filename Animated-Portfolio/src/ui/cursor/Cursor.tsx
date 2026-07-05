import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursor.scss";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current || !glowRef.current) return;

    gsap.set([dotRef.current, glowRef.current], {
      xPercent: -50,
      yPercent: -50,
    });

    const moveDotX = gsap.quickTo(dotRef.current, "x", {
      duration: 0.12,
      ease: "power3.out",
    });

    const moveDotY = gsap.quickTo(dotRef.current, "y", {
      duration: 0.12,
      ease: "power3.out",
    });

    const moveGlowX = gsap.quickTo(glowRef.current, "x", {
      duration: 0.6,
      ease: "power3.out",
    });

    const moveGlowY = gsap.quickTo(glowRef.current, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const handleMove = (e: MouseEvent) => {
      moveDotX(e.clientX);
      moveDotY(e.clientY);

      moveGlowX(e.clientX);
      moveGlowY(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow hidden md:block"></div>
      <div ref={dotRef} className="cursor-dot hidden md:block"></div>
    </>
  );
}