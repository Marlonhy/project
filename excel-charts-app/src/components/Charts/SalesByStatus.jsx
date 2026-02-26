import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import "./SalesByStatus.scss";

function SalesByStatus({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>Ventas por Estado</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    const COLORS = {
        "Facturado": "#10b981",
        "No Facturado": "#ef4444"
    };

    return (
        <div className="chart-container">
            <h3>Ventas Totales por Estado de Facturación</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                        formatter={(value) => `$${value.toLocaleString()}`}
                        contentStyle={{ backgroundColor: "#f3f4f6", border: "1px solid #e5e7eb" }}
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SalesByStatus;
