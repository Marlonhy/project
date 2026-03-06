/**
 * Función getUniqueValues
 * Extrae todos los valores únicos de un array de objetos para un campo específico
 * Elimina duplicados y valores vacíos
 * 
 * Ejemplo de uso:
 * const meses = getUniqueValues(data, "mes")
 * // Retorna: ["Enero", "Febrero", "Marzo", ...]
 * 
 * Parámetros:
 * @param {Array} data - Array de objetos (dataset completo)
 * @param {string} key - Nombre de la propiedad a extraer (ej: "mes", "asesor", "gds")
 * 
 * Retorna:
 * @returns {Array} Array con valores únicos sin duplicados ni valores vacíos
 * 
 * Proceso:
 * 1. Extrae todos los valores del campo especificado usando map()
 * 2. Filtra valores vacíos/undefined usando filter(Boolean)
 * 3. Crea un Set para eliminar duplicados
 * 4. Convierte el Set nuevamente a Array usando spread operator
 */
export function getUniqueValues(data, key) {
    return [...new Set(
        data.map((row) => row[key]).filter(Boolean)
    )];
}
