/**
 * Función calculateSalesByGDS
 * Calcula las ventas totales agrupadas por GDS (Sistema de Distribución Global)
 * Agrupa todos los registros por su campo 'gds' y suma sus totales
 * @param {Array} data - Dataset filtrado
 * @returns {Array} Array ordenado descendente [{ name: "GDS1", value: 5000 }, ...]
 */
export function calculateSalesByGDS(data) {
    const sales = {};
    
    data.forEach((row) => {
        if (row.gds && row.total) {
            sales[row.gds] = (sales[row.gds] || 0) + row.total;
        }
    });
    
    return Object.entries(sales)
        .map(([gds, total]) => ({
            name: gds,
            value: parseFloat(total.toFixed(2))
        }))
        .sort((a, b) => b.value - a.value);
}

/**
 * Función calculateTicketsByGDS
 * Calcula la cantidad de tickets agrupados por GDS
 * Cuenta cuántos registros hay en cada GDS
 * @param {Array} data - Dataset filtrado
 * @returns {Array} Array ordenado descendente [{ name: "GDS1", value: 10 }, ...]
 */
export function calculateTicketsByGDS(data) {
    const ticketCount = {};
    
    data.forEach((row) => {
        if (row.gds) {
            ticketCount[row.gds] = (ticketCount[row.gds] || 0) + 1;
        }
    });
    
    return Object.entries(ticketCount)
        .map(([gds, count]) => ({
            name: gds,
            value: count
        }))
        .sort((a, b) => b.value - a.value);
}

/**
 * Función calculateInvoicesByStatus
 * Cuenta la cantidad de registros por estado de facturación
 * Agrupa registros en "FACTURADO" y "NO FACTURADO"
 * @param {Array} data - Dataset filtrado
 * @returns {Array} [{ name: "FACTURADO", value: 50 }, { name: "NO FACTURADO", value: 30 }]
 */
export function calculateInvoicesByStatus(data) {
    const statusCount = {
        "FACTURADO": 0,
        "NO FACTURADO": 0
    };
    
    data.forEach((row) => {
        if (row.estado === "FACTURADO") {
            statusCount["FACTURADO"]++;
        } else if (row.estado === "NO FACTURADO") {
            statusCount["NO FACTURADO"]++;
        }
    });
    
    return Object.entries(statusCount).map(([status, count]) => ({
        name: status,
        value: count
    }));
}

/**
 * Función calculateSalesByAirline
 * Calcula las ventas totales agrupadas por aerolínea
 * Suma todos los totales para cada aerolínea
 * @param {Array} data - Dataset filtrado
 * @returns {Array} Array ordenado descendente [{ name: "LATAM", value: 10000 }, ...]
 */
export function calculateSalesByAirline(data) {
    const sales = {};
    
    data.forEach((row) => {
        if (row.aerolinea && row.total) {
            sales[row.aerolinea] = (sales[row.aerolinea] || 0) + row.total;
        }
    });
    
    return Object.entries(sales)
        .map(([aerolinea, total]) => ({
            name: aerolinea,
            value: parseFloat(total.toFixed(2))
        }))
        .sort((a, b) => b.value - a.value);
}

/**
 * Función calculateTicketsByAirline
 * Calcula la cantidad de tickets agrupados por aerolínea
 * Cuenta cuántos registros hay en cada aerolínea
 * @param {Array} data - Dataset filtrado
 * @returns {Array} Array ordenado descendente [{ name: "LATAM", value: 50 }, ...]
 */
export function calculateTicketsByAirline(data) {
    const ticketCount = {};
    
    data.forEach((row) => {
        if (row.aerolinea) {
            ticketCount[row.aerolinea] = (ticketCount[row.aerolinea] || 0) + 1;
        }
    });
    
    return Object.entries(ticketCount)
        .map(([aerolinea, count]) => ({
            name: aerolinea,
            value: count
        }))
        .sort((a, b) => b.value - a.value);
}

/**
 * Función getPendingInvoices
 * Filtra y retorna todos los registros con estado "NO FACTURADO"
 * Los ordena por fecha de emisión (más recientes primero)
 * @param {Array} data - Dataset filtrado
 * @returns {Array} Registros no facturados ordenados por fecha descendente
 */
export function getPendingInvoices(data) {
    return data
        .filter((row) => row.estado === "NO FACTURADO")
        .sort((a, b) => new Date(b.fechaEmision) - new Date(a.fechaEmision));
}

/**
 * Función calculateTotalSales
 * Suma todos los valores del campo 'total' del dataset
 * Retorna la suma total de ventas en dinero
 * @param {Array} data - Dataset filtrado
 * @returns {number} Total de ventas en moneda
 */
export function calculateTotalSales(data) {
    return data.reduce((sum, row) => sum + (row.total || 0), 0);
}

/**
 * Función calculateSalesByInvoiceStatus
 * Calcula el total de ventas separado por estado de facturación
 * Suma los totales para registros "FACTURADO" y "NO FACTURADO"
 * @param {Array} data - Dataset filtrado
 * @returns {Array} [{ name: "Facturado", value: 8000 }, { name: "No Facturado", value: 2000 }]
 */
export function calculateSalesByInvoiceStatus(data) {
    let facturado = 0;
    let noFacturado = 0;
    
    data.forEach((row) => {
        if (row.total) {
            if (row.estado === "FACTURADO") {
                facturado += row.total;
            } else if (row.estado === "NO FACTURADO") {
                noFacturado += row.total;
            }
        }
    });
    
    return [
        {
            name: "Facturado",
            value: parseFloat(facturado.toFixed(2))
        },
        {
            name: "No Facturado",
            value: parseFloat(noFacturado.toFixed(2))
        }
    ];
}

/**
 * Función calculateSalesByAdvisor
 * Calcula las ventas totales agrupadas por asesor
 * Suma todos los totales para cada vendedor
 * @param {Array} data - Dataset filtrado
 * @returns {Array} Array ordenado descendente [{ name: "Juan", value: 5000 }, ...]
 */
export function calculateSalesByAdvisor(data) {
    const sales = {};
    
    data.forEach((row) => {
        if (row.asesor && row.total) {
            sales[row.asesor] = (sales[row.asesor] || 0) + row.total;
        }
    });
    
    return Object.entries(sales)
        .map(([asesor, total]) => ({
            name: asesor,
            value: parseFloat(total.toFixed(2))
        }))
        .sort((a, b) => b.value - a.value);
}

/**
 * Función calculateTicketsByAdvisor
 * Calcula la cantidad de tickets agrupados por asesor
 * Cuenta cuántos registros ha vendido cada asesor
 * @param {Array} data - Dataset filtrado
 * @returns {Array} Array ordenado descendente [{ name: "Juan", value: 25 }, ...]
 */
export function calculateTicketsByAdvisor(data) {
    const ticketCount = {};
    
    data.forEach((row) => {
        if (row.asesor) {
            ticketCount[row.asesor] = (ticketCount[row.asesor] || 0) + 1;
        }
    });
    
    return Object.entries(ticketCount)
        .map(([asesor, count]) => ({
            name: asesor,
            value: count
        }))
        .sort((a, b) => b.value - a.value);
}
