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
import "./TicketsByAirline.scss";

function TicketsByAirline({ data, salesData }) {
    const [viewMode, setViewMode] = useState("ventas");

    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>TKTs por Aerolínea</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#06b6d4"];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0].payload.name}</p>
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

    const renderCustomizedLabel = (props) => {
        const { x, y, width, value } = props;
        const formattedValue = viewMode === "cantidad" ? value : `$${value.toLocaleString()}`;
        return (
            <text
                x={x + width / 2}
                y={y - 10}
                fill="#1f2937"
                textAnchor="middle"
                fontSize={11}
                fontWeight="600"
            >
                {formattedValue}
            </text>
        );
    };

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
                <BarChart data={displayData} margin={{ top: 30, right: 50, left: 0, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
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
