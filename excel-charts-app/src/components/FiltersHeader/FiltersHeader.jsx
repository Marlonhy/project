import { getUniqueValues } from "../../utils/dataUtils";
import "./FiltersHeader.scss";

function FiltersHeader({ data, filters, onFilterChange, onReset }) {
    return (
        <header className="filters-container">
            <select
                value={filters.mes}
                onChange={(e) =>
                    onFilterChange("mes", e.target.value)
                }
            >
                <option value="">Todos los meses</option>
                {getUniqueValues(data, "mes").map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <select
                value={filters.asesor}
                onChange={(e) =>
                    onFilterChange("asesor", e.target.value)
                }
            >
                <option value="">Todos los asesores</option>
                {getUniqueValues(data, "asesor").map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <div>
                <label>Fecha inicio</label>
                <input
                    type="date"
                    value={filters.fechaInicio}
                    onChange={(e) =>
                        onFilterChange("fechaInicio", e.target.value)
                    }
                />
            </div>

            <div>
                <label>Fecha fin</label>
                <input
                    type="date"
                    value={filters.fechaFin}
                    onChange={(e) =>
                        onFilterChange("fechaFin", e.target.value)
                    }
                />
            </div>

            <select
                value={filters.gds}
                onChange={(e) =>
                    onFilterChange("gds", e.target.value)
                }
            >
                <option value="">Todos los GDS</option>
                {getUniqueValues(data, "gds").map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <select
                value={filters.aerolinea}
                onChange={(e) =>
                    onFilterChange("aerolinea", e.target.value)
                }
            >
                <option value="">Todas las aerolíneas</option>
                {getUniqueValues(data, "aerolinea").map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            
            <button type="button" onClick={onReset}>
                Limpiar filtros
            </button>
        </header>
    );
}

export default FiltersHeader;
