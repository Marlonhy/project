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
import "./SalesByAirline.scss";

function SalesByAirline({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>Ventas por Aerolínea</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0].payload.name}</p>
                    <p className="value">${payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    const renderCustomizedLabel = (props) => {
        const { x, y, width, value } = props;
        const formattedValue = `$${(value / 1000).toFixed(0)}k`;
        return (
            <text
                x={x + width / 2}
                y={y - 10}
                fill="#1f2937"
                textAnchor="middle"
                fontSize={12}
                fontWeight="600"
            >
                {formattedValue}
            </text>
        );
    };

    return (
        <div className="chart-container">
            <h3>Ventas Totales por Aerolínea</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                        dataKey="value" 
                        fill="#10b981" 
                        radius={[8, 8, 0, 0]}
                        label={renderCustomizedLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SalesByAirline;
