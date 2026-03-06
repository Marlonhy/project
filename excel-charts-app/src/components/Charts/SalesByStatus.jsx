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

/**
 * Componente SalesByStatus
 * Gráfico de barras vertical que muestra el total de ventas por estado de facturación
 * 
 * Características:
 * - Dos barras: una para Facturado (verde) y otra para No Facturado (rojo)
 * - Grid de fondo para facilitar lectura
 * - Tooltip que formatea los valores en moneda
 * - Margen superior amplio para mostrar etiquetas
 * 
 * Props:
 * @param {Array} data - Array con estructura: [{ name: "Facturado", value: 5000 }, { name: "No Facturado", value: 2000 }]
 */
function SalesByStatus({ data }) {
    // Validación: mostrar mensaje si no hay datos
    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>Ventas por Estado</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    // Mapeo de colores para cada estado
    const COLORS = {
        "Facturado": "#10b981",          // Verde para facturado
        "No Facturado": "#ef4444"        // Rojo para no facturado
    };

    return (
        <div className="chart-container">
            <h3>Ventas Totales por Estado de Facturación</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 50, right: 30, left: 0, bottom: 20 }} clipPath={false}>
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
