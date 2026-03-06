import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import "./InvoiceStatus.scss";

/**
 * Componente InvoiceStatus
 * Gráfico de pastel (pie chart) que muestra la distribución de tickets por estado de facturación
 * 
 * Características:
 * - Dos categorías: FACTURADO (verde) y NO FACTURADO (rojo)
 * - Etiquetas directas en el gráfico llamando el estado y cantidad
 * - Tooltip personalizado al pasar el mouse
 * - Leyenda para identificar los estados
 * 
 * Props:
 * @param {Array} data - Array con estructura: [{ name: "FACTURADO", value: 100 }, { name: "NO FACTURADO", value: 50 }]
 */
function InvoiceStatus({ data }) {
    // Validación: mostrar mensaje si no hay datos
    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>Estado de Facturas</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    // Mapeo de colores para cada estado
    const COLORS = {
        "FACTURADO": "#10b981",      // Verde para facturado
        "NO FACTURADO": "#ef4444"    // Rojo para no facturado
    };

    /**
     * Componente Tooltip Personalizado
     * Muestra información cuando el usuario pasa el mouse sobre una sección del pie
     */
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            return (
                <div className="custom-tooltip">
                    {/* Estado del registro (FACTURADO / NO FACTURADO) */}
                    <p className="label">{payload[0].payload.name}</p>
                    {/* Cantidad de TKTs con ese estado */}
                    <p className="value">{payload[0].value} TKTs</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-container">
            {/* Título del gráfico */}
            <h3>Cantidad de TKTs por Estado</h3>
            {/* Contenedor responsivo que se adapta al ancho de la pantalla */}
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    {/* Componente Pie: el gráfico de pastel */}
                    <Pie
                        data={data}                          // Datos a mostrar
                        cx="50%"                            // Posición horizontal (centro)
                        cy="50%"                            // Posición vertical (centro)
                        labelLine={false}                    // Sin líneas conectando etiquetas
                        label={({ name, value }) => `${name}: ${value}`}  // Etiquetas en el gráfico
                        outerRadius={100}                   // Radio del círculo externo
                        fill="#8884d8"                       // Color por defecto
                        dataKey="value"                     // Campo a graficar
                    >
                        {/* Mapea colores diferentes para cada sección */}
                        {data.map((entry) => (
                            <Cell 
                                key={`cell-${entry.name}`} 
                                fill={COLORS[entry.name] || "#3b82f6"}  // Usa color del estado o azul por defecto
                            />
                        ))}
                    </Pie>
                    {/* Tooltip: información al pasar el mouse */}
                    <Tooltip content={<CustomTooltip />} />
                    {/* Leyenda: describe qué representa cada color */}
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default InvoiceStatus;
