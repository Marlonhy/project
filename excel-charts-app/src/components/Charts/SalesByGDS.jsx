import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import "./SalesByGDS.scss";

function SalesByGDS({ data, ticketsData }) {
    const [viewMode, setViewMode] = useState("ventas");

    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>GDS</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0].payload.name}</p>
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

    const renderCustomizedLabel = (props) => {
        const { x, y, width, height, value } = props;
        const formattedValue = viewMode === "ventas" 
            ? `$${value.toLocaleString()}`
            : `${value}`;
        return (
            <text
                x={x + width + 8}
                y={y + height / 2}
                fill="#1f2937"
                textAnchor="start"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight="600"
            >
                {formattedValue}
            </text>
        );
    };

    const displayData = viewMode === "ventas" ? data : (ticketsData || data);

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h3>{viewMode === "ventas" ? "Totales por GDS" : "Cantidad de TKTs por GDS"}</h3>
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
                    margin={{ top: 20, right: 50, left: 120, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" hide={true} />
                    <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={180}
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

export default SalesByGDS;
