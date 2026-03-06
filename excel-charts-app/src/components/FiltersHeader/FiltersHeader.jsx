import { useState, useRef, useEffect } from "react";
import { getUniqueValues } from "../../utils/dataUtils";
import "./FiltersHeader.scss";

/**
 * Componente FiltersHeader
 * Renderiza un panel de filtros con selección múltiple para:
 * - Meses, Asesores, GDS, Aerolíneas
 * - Rango de fechas (inicio y fin)
 * - Botón para limpiar todos los filtros
 * 
 * Props:
 * - originalData: Dataset completo sin filtrar (para mostrar todas las opciones disponibles)
 * - filteredData: Dataset filtrado (usado en el Dashboard pero no aquí)
 * - filters: Estado actual de los filtros (objeto con arrays)
 * - onFilterChange: Función callback para actualizar los filtros
 * - onReset: Función callback para limpiar todos los filtros
 */
function FiltersHeader({ originalData, filteredData, filters, onFilterChange, onReset }) {
    // Estado para controlar qué dropdown está abierto
    const [openDropdown, setOpenDropdown] = useState(null);
    // Referencia al contenedor para detectar clicks fuera
    const containerRef = useRef(null);

    /**
     * Hook useEffect: Detecta clicks fuera del componente y cierra los dropdowns
     * Agrega un event listener global de mousedown
     * Si el click es fuera del componente, cierra el dropdown abierto
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Obtener todos los valores únicos del dataset original para mostrar todas las opciones disponibles
    const allMeses = getUniqueValues(originalData || [], "mes");
    const allAsesores = getUniqueValues(originalData || [], "asesor");
    const allGDS = getUniqueValues(originalData || [], "gds");
    const allAerolineas = getUniqueValues(originalData || [], "aerolinea");

    /**
     * Maneja la selección múltiple de elementos en los dropdowns
     * @param {string} key - Clave del filtro (ej: "mes", "asesor")
     * @param {string} value - Valor a agregar/remover
     * 
     * Si el valor ya está en la lista de filtros, lo remueve
     * Si no está, lo agrega a la lista
     */
    const handleMultiSelect = (key, value) => {
        const currentValues = filters[key] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];
        onFilterChange(key, newValues);
    };

    /**
     * Abre o cierra el dropdown del filtro seleccionado
     * @param {string} dropdown - Nombre del dropdown a toggle
     */
    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    /**
     * Maneja el click en "Limpiar filtros"
     * Cierra el dropdown y ejecuta la función onReset del padre
     */
    const handleReset = () => {
        setOpenDropdown(null);
        onReset();
    };

    /**
     * Componente MultiSelectDropdown
     * Renderiza un dropdown con checkboxes para selección múltiple
     * 
     * Props:
     * - label: Texto del botón principal del dropdown
     * - options: Array de opciones a mostrar
     * - onSelect: Función a ejecutar cuando se selecciona/deselecciona un item
     * - currentValues: Array de valores actualmente seleccionados
     */
    const MultiSelectDropdown = ({ label, values, options, onSelect, currentValues }) => (
        <div className="multi-select-container">
            {/* Botón principal que abre/cierra el dropdown */}
            <button
                className="dropdown-button"
                onClick={() => toggleDropdown(label)}
            >
                {label}
                {/* Muestra el contador de elementos seleccionados */}
                <span className="count">
                    {currentValues && currentValues.length > 0 ? ` (${currentValues.length})` : ""}
                </span>
                {/* Flecha que rota según si el dropdown está abierto */}
                <span className={`arrow ${openDropdown === label ? "open" : ""}`}>▼</span>
            </button>
            
            {/* Menú desplegable con checkboxes */}
            {openDropdown === label && (
                <div className="dropdown-menu">
                    {options.map((value) => (
                        <label key={value} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={currentValues && currentValues.includes(value)}
                                onChange={() => onSelect(value)}
                            />
                            <span>{value}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <header className="filters-container" ref={containerRef}>
            <div className="filters-row">
                {/* Dropdown para filtrar por Meses */}
                <MultiSelectDropdown
                    label="Meses"
                    options={allMeses}
                    onSelect={(value) => handleMultiSelect("mes", value)}
                    currentValues={filters.mes}
                />

                {/* Dropdown para filtrar por Asesores */}
                <MultiSelectDropdown
                    label="Asesores"
                    options={allAsesores}
                    onSelect={(value) => handleMultiSelect("asesor", value)}
                    currentValues={filters.asesor}
                />

                {/* Dropdown para filtrar por GDS */}
                <MultiSelectDropdown
                    label="GDS"
                    options={allGDS}
                    onSelect={(value) => handleMultiSelect("gds", value)}
                    currentValues={filters.gds}
                />

                {/* Dropdown para filtrar por Aerolíneas */}
                <MultiSelectDropdown
                    label="Aerolíneas"
                    options={allAerolineas}
                    onSelect={(value) => handleMultiSelect("aerolinea", value)}
                    currentValues={filters.aerolinea}
                />

                {/* Contenedor para los filtros de rango de fechas */}
                <div className="date-range">
                    {/* Filtro de Fecha Inicio */}
                    <div>
                        <input
                            type="date"
                            value={filters.fechaInicio}
                            onChange={(e) =>
                                onFilterChange("fechaInicio", e.target.value)
                            }
                            title="Fecha inicio"
                        />
                    </div>

                    {/* Filtro de Fecha Fin */}
                    <div>
                        <input
                            type="date"
                            value={filters.fechaFin}
                            onChange={(e) =>
                                onFilterChange("fechaFin", e.target.value)
                            }
                            title="Fecha fin"
                        />
                    </div>
                </div>

                {/* Botón para limpiar todos los filtros */}
                <button type="button" className="reset-button" onClick={handleReset}>
                    Limpiar filtros
                </button>
            </div>
        </header>
    );
}

export default FiltersHeader;
