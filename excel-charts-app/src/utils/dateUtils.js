/**
 * Función isWithinDateRange
 * Valida si una fecha está dentro de un rango especificado
 * 
 * Lógica:
 * - Si no hay fecha, retorna false
 * - Si hay fecha inicio, valida que la fecha sea mayor o igual
 * - Si hay fecha fin, valida que la fecha sea menor o igual
 * - Retorna true solo si cumple todas las validaciones
 * 
 * @param {Date|string} date - Fecha a validar
 * @param {string} start - Fecha inicio del rango (formato YYYY-MM-DD)
 * @param {string} end - Fecha fin del rango (formato YYYY-MM-DD)
 * @returns {boolean} true si la fecha está dentro del rango, false en caso contrario
 */
export function isWithinDateRange(date, start, end) {
    // Validación: si no hay fecha, no está en el rango
    if (!date) {
        return false;
    }

    // Convierte las fechas a objeto Date
    const current = new Date(date);
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    // Valida que la fecha sea mayor o igual a la fecha inicio
    if (startDate && current < startDate) {
        return false;
    }

    // Valida que la fecha sea menor o igual a la fecha fin
    if (endDate && current > endDate) {
        return false;
    }

    // Si pasó todas las validaciones, está en el rango
    return true;
}
