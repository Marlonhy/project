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
import "./TicketsByAirline.scss";

/**
 * Componente TicketsByAirline
 * Gráfico de barras vertical que muestra tickets y ventas agrupados por aerolínea
 * 
 * Características:
 * - Vista dual: puede mostrar Ventas o Cantidad de Tickets
 * - Barras verticales con colores diferentes por aerolínea
 * - Etiquetas de valores encima de cada barra
 * - Toggle para cambiar entre dos modos de visualización
 * - Nombre de aerolíneas en eje X
 * - Tooltip personalizado
 * 
 * Props:
 * @param {Array} data - Array de objetos con tickets por aerolínea
 * @param {Array} salesData - Array de objetos con ventas por aerolínea
 */
function TicketsByAirline({ data, salesData }) {
    // Estado para controlar qué datos mostrar: "ventas" o "cantidad"
    const [viewMode, setViewMode] = useState("ventas");

    // Validación: mostrar mensaje si no hay datos
    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>TKTs por Aerolínea</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    // Paleta de colores para las barras
    const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#06b6d4"];

    /**
     * Componente Tooltip Personalizado
     * Muestra información según el modo (ventas o tickets)
     */
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            return (
                <div className="custom-tooltip">
                    {/* Nombre de la aerolínea */}
                    <p className="label">{payload[0].payload.name}</p>
                    {/* Valor con formato según el modo de visualización */}
                    <p className="value">
                        {viewMode === "cantidad" 
                            ? `${payload[0].value} TKTs`
                            : `$${payload[0].value.toLocaleString()}`
                        }
                    </p>
                </div>
            );
        }
        return null;
    };

    /**
     * Renderiza las etiquetas encima de cada barra
     * Formatea el valor según el modo actual
     */
    const renderCustomizedLabel = (props) => {
        const { x, y, width, value } = props;
        // Formatea el valor: número para tickets, dinero para ventas
        const formattedValue = viewMode === "cantidad" ? value : `$${value.toLocaleString()}`;
        return (
            <text
                x={x + width / 2}               // Centrado horizontalmente en la barra
                y={y - 10}                      // Posición arriba de la barra
                fill="#1f2937"                  // Color gris oscuro
                textAnchor="middle"             // Alineación del texto
                fontSize={11}                   // Tamaño de fuente
                fontWeight="600"                // Semibold
            >
                {formattedValue}
            </text>
        );
    };

    // Selecciona qué dataset mostrar según el modo
    const displayData = viewMode === "cantidad" ? data : (salesData || data);

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h3>{viewMode === "ventas" ? "Totales por Aerolínea" : "Cantidad de TKTs por Aerolínea"}</h3>
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
                        disabled={!data}
                    >
                        Cantidad
                    </button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={displayData} margin={{ top: 50, right: 50, left: 0, bottom: 70 }} clipPath={false}>
                    <XAxis
                        dataKey="name"
                        angle={0}
                        textAnchor="middle"
                        height={50}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="value"
                        fill="#f59e0b"
                        radius={[8, 8, 0, 0]}
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

export default TicketsByAirline;
