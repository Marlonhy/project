import { useState, useMemo } from "react";
import useExcel from "../hooks/useExcel";
import FiltersHeader from "../components/FiltersHeader/FiltersHeader";
import SalesByGDS from "../components/Charts/SalesByGDS";
import TicketsByAirline from "../components/Charts/TicketsByAirline";
import InvoiceStatus from "../components/Charts/InvoiceStatus";
import SalesByAdvisor from "../components/Charts/SalesByAdvisor";
import PendingInvoices from "../components/PendingInvoices/PendingInvoices";
import { applyFilters } from "../utils/filterUtils";
import {
    calculateSalesByGDS,
    calculateInvoicesByStatus,
    calculateSalesByAirline,
    calculateTicketsByAirline,
    calculateTicketsByGDS,
    calculateSalesByAdvisor,
    calculateTicketsByAdvisor,
    getPendingInvoices,
    calculateTotalSales
} from "../utils/chartUtils";
import "./Dashboard.scss";

/**
 * Componente Dashboard
 * Página principal que contiene:
 * - Panel de filtros interactivos
 * - Métricas resumen (registros, ventas, facturación)
 * - Múltiples gráficos de análisis de ventas
 * 
 * Flujo:
 * 1. Carga datos del archivo Excel mediante useExcel hook
 * 2. Aplica filtros al dataset completo
 * 3. Calcula los datos para cada gráfico usando useMemo
 * 4. Renderiza todos los componentes con los datos filtrados
 */
function Dashboard() {
    // Hook personalizado para cargar datos del archivo Excel
    const { data, loading } = useExcel();

    /**
     * Estado inicial de los filtros
     * Todos los arrays comienzan vacíos (sin filtros aplicados)
     * Las fechas inician vacías (sin rango)
     */
    const initialFilters = {
        mes: [],           // Múltiple selección de meses
        aerolinea: [],     // Múltiple selección de aerolíneas
        gds: [],          // Múltiple selección de GDS
        asesor: [],       // Múltiple selección de asesores
        estado: [],       // Múltiple selección de estados
        fechaInicio: "", // Fecha inicial del rango
        fechaFin: ""     // Fecha final del rango
    };

    // Estado de los filtros actuales
    const [filters, setFilters] = useState(initialFilters);

    /**
     * Restaura los filtros a su estado inicial
     * Se ejecuta cuando el usuario hace click en "Limpiar filtros"
     */
    const handleResetFilters = () => {
        setFilters(initialFilters);
    };

    /**
     * Aplica los filtros al dataset completo
     * Recalcula automáticamente cuando los filtros o datos cambian
     * Usa useMemo para optimizar el rendimiento evitando cálculos innecesarios
     */
    const filteredData = useMemo(() => {
        return applyFilters(data, filters);
    }, [data, filters]);

    /**
     * Calcula los datos para cada gráfico filtrando el dataset
     * Usa useMemo para optimizar y evitar recálculos innecesarios
     * Solo recalcula si filteredData cambia
     */
    // Datos de ventas por GDS (Sistema de Distribución Global)
    const salesByGDS = useMemo(() => calculateSalesByGDS(filteredData), [filteredData]);
    // Datos de tickets por GDS
    const ticketsByGDS = useMemo(() => calculateTicketsByGDS(filteredData), [filteredData]);
    // Datos de facturas por estado (Facturado/No Facturado)
    const invoicesByStatus = useMemo(() => calculateInvoicesByStatus(filteredData), [filteredData]);
    // Datos de ventas totales por aerolínea
    const salesByAirline = useMemo(() => calculateSalesByAirline(filteredData), [filteredData]);
    // Datos de tickets por aerolínea
    const ticketsByAirline = useMemo(() => calculateTicketsByAirline(filteredData), [filteredData]);
    // Datos de ventas por asesor
    const salesByAdvisor = useMemo(() => calculateSalesByAdvisor(filteredData), [filteredData]);
    // Datos de tickets por asesor
    const ticketsByAdvisor = useMemo(() => calculateTicketsByAdvisor(filteredData), [filteredData]);
    // Datos de facturas pendientes
    const pendingInvoices = useMemo(() => getPendingInvoices(filteredData), [filteredData]);
    // Total de ventas en dinero
    const totalSales = useMemo(() => calculateTotalSales(filteredData), [filteredData]);

    /**
     * Cálcula el conteo de registros facturados
     * Filtra el dataset buscando solo registros con estado "FACTURADO"
     */
    const facturadoCount = useMemo(() => {
        return filteredData.filter((row) => row.estado === "FACTURADO").length;
    }, [filteredData]);

    /**
     * Calcula el conteo de registros no facturados
     * Filtra el dataset buscando solo registros con estado "NO FACTURADO"
     */
    const noFacturadoCount = useMemo(() => {
        return filteredData.filter((row) => row.estado === "NO FACTURADO").length;
    }, [filteredData]);

    // Muestra estado de carga mientras se obtienen los datos
    if (loading) {
        return (
            <div className="dashboard">
                <div className="loading-state">
                    <p>Cargando datos...</p>
                </div>
            </div>
        );
    }

    /**
     * Maneja cambios en los filtros
     * Actualiza un filtro específico reteniendo los demás valores
     * @param {string} key - Clave del filtro a actualizar
     * @param {any} value - Nuevo valor del filtro
     */
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    /**
     * Formatea un valor numérico a moneda con decimales
     * @param {number} value - Valor a formatear
     * @returns {string} Valor formateado como divisa
     */
    const formatCurrency = (value) => {
        return `$${parseFloat(value || 0).toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    /**
     * Formatea un valor numérico a moneda sin decimales
     * Útil para mostrar totales grandes de forma más compacta
     * @param {number} value - Valor a formatear
     * @returns {string} Valor formateado como divisa
     */
    const formatCurrencyNoDecimals = (value) => {
        return `$${Math.floor(parseFloat(value || 0)).toLocaleString("es-ES")}`;
    };

    return (
        <div className="dashboard">
            {/* Encabezado del dashboard con título y panel de filtros */}
            <header className="dashboard-header">
                <h2 className="dashboard-title">📊 Dashboard de Ventas</h2>
            
                {/* Componente de filtros interactivos */}
                <FiltersHeader
                    originalData={data}           // Dataset completo para mostrar todas las opciones
                    filteredData={filteredData}   // Dataset filtrado (para referencia)
                    filters={filters}             // Estado actual de los filtros
                    onFilterChange={handleFilterChange}  // Callback para actualizar filtros
                    onReset={handleResetFilters}        // Callback para limpiar filtros
                />
            </header>

            {/* Sección de métricas resumen (KPIs) */}
            <section className="dashboard-metrics">
                {/* Tarjeta: Total de registros en el rango filtrado */}
                <div className="metric-card">
                    <h4>Total de Registros</h4>
                    <p>{filteredData.length}</p>
                </div>

                {/* Tarjeta: Total de ventas en dinero */}
                <div className="metric-card">
                    <h4>Total Ventas</h4>
                    <p>{formatCurrencyNoDecimals(totalSales)}</p>
                </div>

                {/* Tarjeta: Cantidad de registros facturados */}
                <div className="metric-card">
                    <h4>Facturados</h4>
                    <p>{facturadoCount}</p>
                </div>

                {/* Tarjeta: Cantidad de registros no facturados */}
                <div className="metric-card">
                    <h4>No Facturados</h4>
                    <p>{noFacturadoCount}</p>
                </div>
            </section>

            {/* Sección principal de gráficos */}
            <section className="dashboard-content">
                {/* Gráfico: Ventas y Tickets por GDS */}
                <SalesByGDS data={salesByGDS} ticketsData={ticketsByGDS} />
                {/* Gráfico: Tickets y Ventas por Aerolínea */}
                <TicketsByAirline data={ticketsByAirline} salesData={salesByAirline} />
                {/* Gráfico: Estado de Facturas (Pastel) */}
                <InvoiceStatus data={invoicesByStatus} />
                {/* Gráfico: Ventas y Tickets por Asesor */}
                <SalesByAdvisor data={salesByAdvisor} ticketsData={ticketsByAdvisor} />
            </section>

            {/* Sección ancho completo: Tabla de facturas pendientes */}
            <section className="dashboard-full">
                <PendingInvoices data={pendingInvoices} />
            </section>
        </div>
    );
}

export default Dashboard;
