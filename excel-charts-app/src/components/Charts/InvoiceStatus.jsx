import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import "./InvoiceStatus.scss";

function InvoiceStatus({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>Estado de Facturas</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    const COLORS = {
        "FACTURADO": "#10b981",
        "NO FACTURADO": "#ef4444"
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0].payload.name}</p>
                    <p className="value">{payload[0].value} TKTs</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-container">
            <h3>Cantidad de TKTs por Estado</h3>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name] || "#3b82f6"} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default InvoiceStatus;
