import { isWithinDateRange } from "./dateUtils";

/**
 * Función applyFilters
 * Filtra el dataset completo según los criterios especificados en el objeto filters
 * 
 * Parámetros:
 * @param {Array} data - Dataset completo sin filtrar
 * @param {Object} filters - Objeto con los filtros a aplicar:
 *   - mes: Array de meses seleccionados
 *   - aerolinea: Array de aerolíneas seleccionadas
 *   - gds: Array de GDS seleccionados
 *   - asesor: Array de asesores seleccionados
 *   - estado: Array de estados seleccionados
 *   - fechaInicio: Fecha de inicio del rango
 *   - fechaFin: Fecha de fin del rango
 * 
 * Retorna:
 * @returns {Array} Dataset filtrado que cumple con todos los criterios
 * 
 * Lógica:
 * - Para los filtros de array (múltiple selección), si el array está vacío, no filtra
 * - Si el array tiene elementos, solo mantiene registros que coincidan con alguno
 * - Para fechas, valida que el registro esté dentro del rango especificado
 */
export function applyFilters(data, filters) {
    return data.filter((row) => {
        // Valida si el mes del registro coincide con los meses seleccionados
        // Si no hay meses seleccionados (array vacío), acepta todos
        const mesMatch = !filters.mes || filters.mes.length === 0 || filters.mes.includes(row.mes);
        
        // Valida si la aerolínea del registro coincide con las seleccionadas
        // Si no hay aerolíneas seleccionadas, acepta todas
        const aerolineaMatch = !filters.aerolinea || filters.aerolinea.length === 0 || filters.aerolinea.includes(row.aerolinea);
        
        // Valida si el GDS del registro coincide con los GDS seleccionados
        const gdsMatch = !filters.gds || filters.gds.length === 0 || filters.gds.includes(row.gds);
        
        // Valida si el asesor del registro coincide con los asesores seleccionados
        const asesorMatch = !filters.asesor || filters.asesor.length === 0 || filters.asesor.includes(row.asesor);
        
        // Valida si el estado del registro coincide con los estados seleccionados
        const estadoMatch = !filters.estado || filters.estado.length === 0 || filters.estado.includes(row.estado);
        
        // Valida si la fecha de emisión del registro está dentro del rango de fechas
        const dateMatch = isWithinDateRange(
            row.fechaEmision,
            filters.fechaInicio,
            filters.fechaFin
        );

        // El registro se incluye en el resultado solo si cumple con TODOS los filtros
        return mesMatch && aerolineaMatch && gdsMatch && asesorMatch && estadoMatch && dateMatch;
    });
}
