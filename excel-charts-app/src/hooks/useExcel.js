import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

/**
 * Hook useExcel
 * Carga datos de un archivo Excel (XLSX) y los procesa para usarlos en la aplicación
 * 
 * Proceso:
 * 1. Hace un fetch al archivo Excel en la carpeta public/data
 * 2. Lee el archivo con la librería XLSX
 * 3. Convierte el contenido a JSON
 * 4. Normaliza los datos (renombra columnas y convierte fechas)
 * 5. Retorna los datos y el estado de carga
 * 
 * Retorna:
 * @returns {Object} { data: Array, loading: boolean }
 *   - data: Array de registros normalizados
 *   - loading: true mientras carga, false cuando termina
 */

/**
 * Convierte una fecha de formato Excel a JavaScript Date
 * Excel almacena fechas como números (días desde 1899-12-30)
 * @param {number} excelDate - Número que representa la fecha en Excel
 * @returns {Date|null} Objeto Date o null si la entrada es nula
 */
function excelDateToJSDate(excelDate){
    if (!excelDate) {
        return null;
    }

    // Fecha base de Excel: 30 de diciembre de 1899
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    // Multiplica los días por milisegundos (1 día = 86400 segundos)
    const jsDate = new Date(
        excelEpoch.getTime() + excelDate * 86400 * 1000
    );

    return jsDate;
}

/**
 * Normaliza una fila del Excel renombrando columnas a nombres en minúsculas
 * y convirtiendo fechas de formato Excel a JavaScript Date
 * @param {Object} row - Fila del Excel con columnas en mayúsculas
 * @returns {Object} Objeto normalizado con estructura predefinida
 */
function normalizeRow(row) {
    // Retorna objeto normalizado con propiedades en minúsculas
    return {
        mes: row["MES"],                                    // Mes del registro
        tkt: row["TKT"],                                    // Número de ticket
        aerolinea: row["AEROLINEA"],                        // Nombre de la aerolínea
        fechaEmision: excelDateToJSDate(row["FECHA DE EMISION"]),  // Fecha convertida a JavaScript
        tarifaNeta: row["TARIFA NETA"],                    // Tarifa sin impuestos
        total: row["TOTAL"],                                // Total con impuestos
        gds: row["GDS"],                                    // Sistema de distribución global
        asesor: row["ASESOR"],                              // Nombre del vendedor
        estado: row["ESTADO"],                              // FACTURADO o NO FACTURADO
        pasajero: row["PASAJERO"]                           // Nombre del pasajero
    };
}

/**
 * Hook principal que carga y procesa datos del archivo Excel
 */
function useExcel() {
    // Estado de los datos cargados
    const [data, setData] = useState([]);
    // Estado de carga
    const [loading, setLoading] = useState(true);

    /**
     * Effect: Carga el archivo Excel cuando el componente monta
     * Se ejecuta solo una vez ([] vacío)
     */
    useEffect(() => {
        // Hace fetch al archivo Excel
        fetch("/data/datos.xlsx")
            .then((response) => response.arrayBuffer())   // Obtiene el contenido como buffer
            .then((buffer) => {
                // Lee el archivo Excel con la librería XLSX
                const workbook = XLSX.read(buffer, { type: "array" });
                // Obtiene la primera hoja del libro
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convierte la hoja a JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                // Normaliza cada fila de datos
                const normalizedData = jsonData.map(normalizeRow);

                // Actualiza el estado con los datos normalizados
                setData(normalizedData);
                // Marca como cargados
                setLoading(false);
            })
            .catch((error) => {
                // Registra errores en la consola
                console.error("Error leyendo el Excel:", error);
                // Deja de mostrar estado de carga
                setLoading(false);
            });
    }, []);

    return { data, loading };
}

export default useExcel;
