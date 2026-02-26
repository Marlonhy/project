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

function Dashboard() {
    const { data, loading } = useExcel();

    const initialFilters = {
        mes: "",
        aerolinea: "",
        gds: "",
        asesor: "",
        estado: "",
        fechaInicio: "",
        fechaFin: ""
    };

    const [filters, setFilters] = useState(initialFilters);

    const handleResetFilters = () => {
        setFilters(initialFilters);
    };

    const filteredData = useMemo(() => {
        return applyFilters(data, filters);
    }, [data, filters]);

    // Calcular datos para gráficos
    const salesByGDS = useMemo(() => calculateSalesByGDS(filteredData), [filteredData]);
    const ticketsByGDS = useMemo(() => calculateTicketsByGDS(filteredData), [filteredData]);
    const invoicesByStatus = useMemo(() => calculateInvoicesByStatus(filteredData), [filteredData]);
    const salesByAirline = useMemo(() => calculateSalesByAirline(filteredData), [filteredData]);
    const ticketsByAirline = useMemo(() => calculateTicketsByAirline(filteredData), [filteredData]);
    const salesByAdvisor = useMemo(() => calculateSalesByAdvisor(filteredData), [filteredData]);
    const ticketsByAdvisor = useMemo(() => calculateTicketsByAdvisor(filteredData), [filteredData]);
    const pendingInvoices = useMemo(() => getPendingInvoices(filteredData), [filteredData]);
    const totalSales = useMemo(() => calculateTotalSales(filteredData), [filteredData]);

    const facturadoCount = useMemo(() => {
        return filteredData.filter((row) => row.estado === "FACTURADO").length;
    }, [filteredData]);

    const noFacturadoCount = useMemo(() => {
        return filteredData.filter((row) => row.estado === "NO FACTURADO").length;
    }, [filteredData]);

    if (loading) {
        return (
            <div className="dashboard">
                <div className="loading-state">
                    <p>Cargando datos...</p>
                </div>
            </div>
        );
    }

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const formatCurrency = (value) => {
        return `$${parseFloat(value || 0).toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const formatCurrencyNoDecimals = (value) => {
        return `$${Math.floor(parseFloat(value || 0)).toLocaleString("es-ES")}`;
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h2 className="dashboard-title">📊 Dashboard de Ventas</h2>
            
                <FiltersHeader
                    data={data}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onReset={handleResetFilters}
                />
            </header>

            <section className="dashboard-metrics">
                <div className="metric-card">
                    <h4>Total de Registros</h4>
                    <p>{filteredData.length}</p>
                </div>

                <div className="metric-card">
                    <h4>Total Ventas</h4>
                    <p>{formatCurrencyNoDecimals(totalSales)}</p>
                </div>

                <div className="metric-card">
                    <h4>Facturados</h4>
                    <p>{facturadoCount}</p>
                </div>

                <div className="metric-card">
                    <h4>No Facturados</h4>
                    <p>{noFacturadoCount}</p>
                </div>
            </section>

            <section className="dashboard-content">
                <SalesByGDS data={salesByGDS} ticketsData={ticketsByGDS} />
                <TicketsByAirline data={ticketsByAirline} salesData={salesByAirline} />
                <InvoiceStatus data={invoicesByStatus} />
                <SalesByAdvisor data={salesByAdvisor} ticketsData={ticketsByAdvisor} />
            </section>

            <section className="dashboard-full">
                <PendingInvoices data={pendingInvoices} />
            </section>
        </div>
    );
}

export default Dashboard;
