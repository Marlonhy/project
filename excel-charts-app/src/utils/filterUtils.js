import { isWithinDateRange } from "./dateUtils";

export function applyFilters(data, filters) {
    return data.filter((row) => (
        (!filters.mes || row.mes === filters.mes) &&
        (!filters.aerolinea || row.aerolinea === filters.aerolinea) &&
        (!filters.gds || row.gds === filters.gds) &&
        (!filters.asesor || row.asesor === filters.asesor) &&
        (!filters.estado || row.estado === filters.estado) &&
        isWithinDateRange(
            row.fechaEmision,
            filters.fechaInicio,
            filters.fechaFin
        )
    ));
}
