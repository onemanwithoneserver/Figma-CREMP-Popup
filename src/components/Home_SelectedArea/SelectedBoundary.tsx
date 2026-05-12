import type { PolygonPoint } from './types';

interface SelectedBoundaryProps {
  points: PolygonPoint[];
}

/**
 * Renders the selected-area polygon as SVG elements.
 * Must be placed inside an <svg viewBox="0 0 100 100"> parent.
 */
export default function SelectedBoundary({ points }: SelectedBoundaryProps) {
  const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <g>
      {/* Soft outer glow layer */}
      <polygon
        points={pointsStr}
        fill="rgba(124,58,237,0.06)"
        stroke="#7C3AED"
        strokeWidth="0.9"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 3px rgba(124,58,237,0.35))' }}
      />
      {/* Dashed inner border accent */}
      <polygon
        points={pointsStr}
        fill="none"
        stroke="#7C3AED"
        strokeWidth="0.35"
        strokeLinejoin="round"
        strokeDasharray="2,2"
        opacity={0.5}
      />
    </g>
  );
}
