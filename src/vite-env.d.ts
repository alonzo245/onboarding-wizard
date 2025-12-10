/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly BASE_URL: string;
  };
}

declare module "canvas-confetti" {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x: number; y: number };
    colors?: string[];
    shapes?: Array<"square" | "circle">;
    zIndex?: number;
  }

  function confetti(options?: ConfettiOptions): Promise<null>;
  export = confetti;
}
