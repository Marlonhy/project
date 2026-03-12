import "./PendingInvoices.scss";
import * as XLSX from "xlsx";

/**
 * Componente PendingInvoices
 * Tabla que muestra todos los registros pendientes por facturar
 * 
 * Características:
 * - Tabla con scroll horizontal si es necesario
 * - Columnas: MES, TKT, AEROLÍNEA, FECHA EMISIÓN, TOTAL, ASESOR, GDS, PASAJERO
 * - Formatea fechas en formato español
 * - Formatea valores monetarios con separadores de miles
 * - Muestra el total de registros pendientes
 * - Permite exportar datos a Excel
 * 
 * Props:
 * @param {Array} data - Array de registros con estado "NO FACTURADO"
 */
function PendingInvoices({ data }) {
    // Validación: mostrar mensaje si no hay datos pendientes
    if (!data || data.length === 0) {
        return (
            <div className="pending-invoices">
                <h3>Tkts Pendientes por Facturar</h3>
                <div className="empty-state">
                    <p>No hay datos pendientes por facturar</p>
                </div>
            </div>
        );
    }

    /**
     * Convierte una fecha a formato español (DD/MM/YYYY)
     * @param {Date} date - Fecha a convertir
     * @returns {string} Fecha formateada o "N/A" si es nula
     */
    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("es-ES");
    };

    /**
     * Formatea un valor numérico a moneda con separadores de miles
     * @param {number} value - Valor a formatear
     * @returns {string} Valor formateado como dinero
     */
    const formatCurrency = (value) => {
        return `$${parseFloat(value || 0).toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    /**
     * Exporta los datos pendientes a un archivo Excel
     */
    const exportToExcel = () => {
        if (!data || data.length === 0) {
            alert("No hay datos para exportar");
            return;
        }

        // Preparar los datos con formato
        const exportData = data.map(row => ({
            "MES": row.mes,
            "TKT": row.tkt,
            "AEROLÍNEA": row.aerolinea,
            "FECHA EMISIÓN": formatDate(row.fechaEmision),
            "TOTAL": formatCurrency(row.total),
            "ASESOR": row.asesor,
            "GDS": row.gds,
            "PASAJERO": row.pasajero
        }));

        // Crear un nuevo workbook
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // Ajustar ancho de columnas
        const columnWidths = [
            { wch: 12 },
            { wch: 12 },
            { wch: 15 },
            { wch: 18 },
            { wch: 15 },
            { wch: 15 },
            { wch: 10 },
            { wch: 25 }
        ];
        worksheet["!cols"] = columnWidths;

        // Agregar la hoja al workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pendientes");

        // Descargar el archivo
        XLSX.writeFile(workbook, `Pendientes_${new Date().toLocaleDateString("es-ES")}.xlsx`);
    };

    return (
        <div className="pending-invoices">
            <div className="header-container">
                <h3>Tkts Pendientes por Facturar ({data.length})</h3>
                <button 
                    className="export-btn"
                    onClick={exportToExcel}
                    title="Exportar a Excel"
                >
                    <span>📊</span> Exportar Excel
                </button>
            </div>
            <div className="pending-table">
                <div className="table-header">
                    <div className="col col-mes">MES</div>
                    <div className="col col-tkt">TKT</div>
                    <div className="col col-aerolinea">AEROLINEA</div>
                    <div className="col col-fecha">FECHA EMISIÓN</div>
                    <div className="col col-total">TOTAL</div>
                    <div className="col col-asesor">ASESOR</div>
                    <div className="col col-gds">GDS</div>
                    <div className="col col-pasajero">PASAJERO</div>
                </div>
                <div className="table-body">
                    {data.map((row, index) => (
                        <div key={index} className="table-row">
                            <div className="col col-mes">{row.mes}</div>
                            <div className="col col-tkt">{row.tkt}</div>
                            <div className="col col-aerolinea">{row.aerolinea}</div>
                            <div className="col col-fecha">{formatDate(row.fechaEmision)}</div>
                            <div className="col col-total">{formatCurrency(row.total)}</div>
                            <div className="col col-asesor">{row.asesor}</div>
                            <div className="col col-gds">{row.gds}</div>
                            <div className="col col-pasajero">{row.pasajero}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PendingInvoices;
