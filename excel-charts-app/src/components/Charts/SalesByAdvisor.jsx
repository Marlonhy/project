import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import "./SalesByAdvisor.scss";

/**
 * Componente SalesByAdvisor
 * Gráfico de barras horizontal que muestra ventas y tickets agrupados por asesor
 * 
 * Características:
 * - Vista dual: puede mostrar Ventas o Cantidad de Tickets
 * - Barras horizontales para facilitar lectura de nombres largos
 * - Etiquetas de valores al final de cada barra
 * - Toggle para cambiar entre dos modos de visualización
 * - Tooltip personalizado
 * - Margen derecho amplio para mostrar etiquetas
 * 
 * Props:
 * @param {Array} data - Array de objetos con ventas por asesor
 * @param {Array} ticketsData - Array de objetos con tickets por asesor
 */
function SalesByAdvisor({ data, ticketsData }) {
    // Estado para controlar qué datos mostrar: "ventas" o "cantidad"
    const [viewMode, setViewMode] = useState("ventas");

    // Validación: mostrar mensaje si no hay datos
    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>Asesor</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    // Paleta de colores para las barras
    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

    /**
     * Componente Tooltip Personalizado
     * Muestra información contexto según el modo (ventas o tickets)
     */
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            return (
                <div className="custom-tooltip">
                    {/* Nombre del asesor */}
                    <p className="label">{payload[0].payload.name}</p>
                    {/* Valor con formato según el modo de visualización */}
                    <p className="value">
                        {viewMode === "ventas"
                            ? `$${payload[0].value.toLocaleString()}`
                            : `${payload[0].value} TKTs`
                        }
                    </p>
                </div>
            );
        }
        return null;
    };

    /**
     * Renderiza las etiquetas al final de cada barra (lado derecho)
     * Formatea el valor según el modo actual
     */
    const renderCustomizedLabel = (props) => {
        const { x, y, width, height, value } = props;
        // Formatea el valor: dinero para ventas, número para tickets
        const formattedValue = viewMode === "ventas" 
            ? `$${value.toLocaleString()}`
            : `${value}`;
        return (
            <text
                x={x + width + 8}              // Posición hacia la derecha de la barra
                y={y + height / 2}             // Centrado verticalmente en la barra
                fill="#1f2937"                  // Color gris oscuro
                textAnchor="start"              // Alineación desde la izquierda
                dominantBaseline="middle"       // Alineación vertical
                fontSize={11}                   // Tamaño de fuente
                fontWeight="600"                // Semibold
            >
                {formattedValue}
            </text>
        );
    };

    // Selecciona qué dataset mostrar según el modo
    const displayData = viewMode === "ventas" ? data : (ticketsData || data);

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h3>{viewMode === "ventas" ? "Totales por Asesor" : "Cantidad de TKTs por Asesor"}</h3>
                <div className="view-toggle">
                    <button 
                        className={viewMode === "ventas" ? "active" : ""}
                        onClick={() => setViewMode("ventas")}
                    >
                        Totales
                    </button>
                    <button 
                        className={viewMode === "cantidad" ? "active" : ""}
                        onClick={() => setViewMode("cantidad")}
                        disabled={!ticketsData}
                    >
                        Cantidad
                    </button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={450}>
                <BarChart
                    data={displayData}
                    layout="vertical"
                    margin={{ top: 20, right: 150, left: 100, bottom: 20 }}
                    clipPath={false}
                >
                    <XAxis type="number" hide={true} />
                    <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={150}
                        tick={{ fontSize: 12 }}
                        interval={0}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                        dataKey="value" 
                        fill="#3b82f6" 
                        radius={[0, 8, 8, 0]}
                        label={renderCustomizedLabel}
                    >
                        {displayData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SalesByAdvisor;
