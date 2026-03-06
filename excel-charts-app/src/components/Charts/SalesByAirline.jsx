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

/**
 * Componente SalesByAirline
 * Gráfico de barras que muestra las ventas totales agrupadas por aerolínea
 * 
 * Características:
 * - Muestra etiquetas de valores SOLO si hay 5 o menos aerolíneas
 * - Si hay más de 5, oculta las etiquetas (mostralas al pasar el mouse)
 * - Cada barra tiene un color diferente según su posición
 * - Tooltip personalizado al pasar el mouse
 * 
 * Props:
 * @param {Array} data - Array de objetos con estructura: [{ name: "Aerolínea", value: 1000 }, ...]
 */
function SalesByAirline({ data }) {
    // Validación: mostrar mensaje si no hay datos
    if (!data || data.length === 0) {
        return (
            <div className="chart-container">
                <h3>Ventas por Aerolínea</h3>
                <p className="empty-state">Sin datos disponibles</p>
            </div>
        );
    }

    // Paleta de colores para las barras del gráfico
    // Se repite si hay más aerolíneas que colores definidos
    const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

    // Mostrar etiquetas siempre
    const shouldShowLabels = true;

    /**
     * Componente Tooltip Personalizado
     * Muestra información cuando el usuario pasa el mouse sobre una barra
     * 
     * Props del tooltip:
     * - active: boolean que indica si hay datos bajo el cursor
     * - payload: array con los datos del punto bajo el cursor
     */
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload[0]) {
            return (
                <div className="custom-tooltip">
                    {/* Nombre de la aerolínea */}
                    <p className="label">{payload[0].payload.name}</p>
                    {/* Valor formateado como moneda */}
                    <p className="value">${payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    /**
     * Renderiza las etiquetas de valores encima de las barras
     * SOLO si hay 5 o menos aerolíneas
     * 
     * @param {Object} props - Propiedades de la etiqueta de Recharts
     *   - x: posición X de la barra
     *   - y: posición Y (arriba de la barra)
     *   - width: ancho de la barra
     *   - value: valor numérico de la barra
     * 
     * @returns {React.Element|null} Elemento SVG text o null
     */
    const renderCustomizedLabel = (props) => {
        // Si no debemos mostrar etiquetas, retorna null
        if (!shouldShowLabels) {
            return null;
        }
        
        const { x, y, width, value } = props;
        // Formatea el valor en miles (ej: 50000 → 50k)
        const formattedValue = `$${(value / 1000).toFixed(0)}k`;
        
        return (
            <text
                x={x + width / 2}           // Centra la etiqueta horizontalmente
                y={y - 10}                  // Posiciona arriba de la barra
                fill="#1f2937"              // Color gris oscuro
                textAnchor="middle"         // Alineación del texto
                fontSize={12}               // Tamaño de fuente
                fontWeight="600"            // Peso de la fuente (semibold)
                pointerEvents="none"        // No interfiere con eventos del mouse
            >
                {formattedValue}
            </text>
        );
    };

    // Márgenes fijos del gráfico
    // - top: espacio para etiquetas
    // - right/left: espacio lateral
    // - bottom: espacio para los nombres de las aerolíneas rotados
    const chartMargin = { top: 50, right: 30, left: 0, bottom: 80 };

    return (
        <div className="chart-container">
            {/* Título del gráfico */}
            <h3>Ventas Totales por Aerolínea</h3>
            
            {/* Contenedor responsivo que se adapta al ancho de la pantalla */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={chartMargin}>
                    {/* Grid: líneas de fondo para facilitar la lectura */}
                    <CartesianGrid strokeDasharray="3 3" />
                    
                    {/* Eje X: nombres de las aerolíneas */}
                    <XAxis
                        dataKey="name"
                        angle={-45}                 // Rota los nombres 45 grados
                        textAnchor="end"            // Alineación de los textos
                        height={100}                // Espacio para los nombres
                        tick={{ fontSize: 12 }}     // Tamaño de la fuente
                    />
                    
                    {/* Eje Y: valores (oculto porque usamos etiquetas en las barras) */}
                    <YAxis hide={true} />
                    
                    {/* Tooltip: información al pasar el mouse */}
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Componente Bar: las barras del gráfico */}
                    <Bar 
                        dataKey="value"                              // Campo del data a graficar
                        fill="#10b981"                               // Color por defecto (verde)
                        radius={[8, 8, 0, 0]}                        // Esquinas redondeadas arriba
                        label={shouldShowLabels ? renderCustomizedLabel : false}  // Etiquetas condicionales
                    >
                        {/* Mapea colores diferentes para cada barra */}
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]}  // Cicla entre los colores
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SalesByAirline;
