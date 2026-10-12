"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;
const stroke = { fill: "none", stroke: "#eceef0", strokeWidth: 1 } as const;
const view = { once: true, margin: "0px 0px -20% 0px" } as const;

// Dibujos de línea para cada servicio. Se trazan cuando la tarjeta entra en pantalla.
export function LineVisual({ slug }: { slug: string }) {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      {slug === "sistemas-integracion" && <Systems />}
      {slug === "datos-infraestructura" && <Data />}
      {slug === "inteligencia-artificial" && <Ai />}
      {slug === "seguridad-gobernanza" && <Security />}
    </svg>
  );
}

// Sistemas: fuentes dispersas conectadas a un solo núcleo, sin recaptura.
function Systems() {
  const nodes = [
    [120, 140], [300, 100], [480, 140], [90, 300], [510, 300], [120, 460], [300, 500], [480, 460],
  ];
  return (
    <g>
      {nodes.map(([x, y], i) => (
        <motion.path
          key={i}
          d={`M${x} ${y} L300 300`}
          {...stroke}
          strokeOpacity={0.35}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={view}
          transition={{ duration: 1.4, ease, delay: i * 0.08 }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x - 18}
          y={y - 12}
          width="36"
          height="24"
          rx="5"
          {...stroke}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={view}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.06 }}
        />
      ))}
      <circle cx="300" cy="300" r="46" {...stroke} />
      <motion.circle
        cx="300"
        cy="300"
        r="46"
        {...stroke}
        animate={{ r: [46, 96], strokeOpacity: [0.5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
      />
    </g>
  );
}

// Datos: registros que entran crudos, pasan por el filtro de anonimización y salen ordenados.
function Data() {
  const rows = Array.from({ length: 9 }, (_, i) => 150 + i * 36);
  return (
    <g>
      <rect x="270" y="120" width="60" height="360" rx="8" {...stroke} strokeOpacity={0.6} />
      {rows.map((y, i) => (
        <g key={y}>
          <motion.line
            x1="70"
            x2={130 + ((i * 53) % 110)}
            y1={y}
            y2={y}
            {...stroke}
            strokeOpacity={0.35}
            strokeDasharray="3 5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={view}
            transition={{ duration: 1, ease, delay: i * 0.05 }}
          />
          <motion.line
            x1="370"
            x2="530"
            y1={y}
            y2={y}
            {...stroke}
            strokeOpacity={0.7}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={view}
            transition={{ duration: 1, ease, delay: 0.6 + i * 0.05 }}
          />
        </g>
      ))}
      <motion.rect
        x="270"
        width="60"
        height="18"
        fill="#eceef0"
        fillOpacity={0.14}
        animate={{ y: [120, 462, 120] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  );
}

// IA: una respuesta solo sale si se apoya en una fuente; las demás se abstienen.
function Ai() {
  const sources = [160, 230, 300, 370, 440];
  return (
    <g>
      {sources.map((y, i) => (
        <g key={y}>
          <rect x="80" y={y - 20} width="120" height="40" rx="6" {...stroke} strokeOpacity={i === 2 ? 0.9 : 0.3} />
          <line x1="96" x2={150 + i * 6} y1={y} y2={y} {...stroke} strokeOpacity={0.3} />
          {i === 2 ? (
            <motion.path
              d={`M200 ${y} C300 ${y} 320 300 400 300`}
              {...stroke}
              strokeWidth={1.4}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={view}
              transition={{ duration: 1.6, ease, delay: 0.4 }}
            />
          ) : (
            <path d={`M200 ${y} C260 ${y} 280 300 400 300`} {...stroke} strokeOpacity={0.12} />
          )}
        </g>
      ))}
      <circle cx="440" cy="300" r="40" {...stroke} />
      <motion.path
        d="M424 300 l11 11 l22 -24"
        {...stroke}
        strokeWidth={1.6}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={view}
        transition={{ duration: 0.8, ease, delay: 1.8 }}
      />
    </g>
  );
}

// Seguridad: una matriz de controles que se van verificando uno por uno.
function Security() {
  const cells = Array.from({ length: 36 }, (_, i) => ({ x: 120 + (i % 6) * 62, y: 120 + Math.floor(i / 6) * 62, on: (i * 7) % 5 !== 0 }));
  return (
    <g>
      {cells.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width="44" height="44" rx="6" {...stroke} strokeOpacity={0.25} />
          {c.on && (
            <motion.rect
              x={c.x + 14}
              y={c.y + 14}
              width="16"
              height="16"
              rx="3"
              fill="#eceef0"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 0.85, scale: 1 }}
              viewport={view}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.045 }}
              style={{ transformOrigin: `${c.x + 22}px ${c.y + 22}px` }}
            />
          )}
        </g>
      ))}
    </g>
  );
}
