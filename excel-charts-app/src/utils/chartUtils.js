/**
 * Calcula ventas totales agrupadas por GDS
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
 * Calcula cantidad de TKTs agrupadas por GDS
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
 * Calcula facturas contando TKTs por estado
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
 * Calcula ventas totales agrupadas por aerolínea
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
 * Calcula cantidad de TKTs agrupadas por aerolínea
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
 * Obtiene datos pendientes por facturar
 */
export function getPendingInvoices(data) {
    return data
        .filter((row) => row.estado === "NO FACTURADO")
        .sort((a, b) => new Date(b.fechaEmision) - new Date(a.fechaEmision));
}

/**
 * Calcula el total de ventas
 */
export function calculateTotalSales(data) {
    return data.reduce((sum, row) => sum + (row.total || 0), 0);
}

/**
 * Calcula total de facturado vs no facturado en valores
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
 * Calcula ventas totales agrupadas por Asesor
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
 * Calcula cantidad de TKTs agrupadas por Asesor
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
