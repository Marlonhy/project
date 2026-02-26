# Dashboard de Ventas - Excel Charts App

Una aplicación moderna de React + Vite que lee datos de archivos Excel y los visualiza en un dashboard interactivo con gráficos, métricas y tablas filtrables.

## 🎯 Características

### Gráficos Interactivos Mejorados
- **Totales por GDS**: Gráfico de barras horizontal mostrando ventas totales por sistema GDS con toggle para ver cantidad o totales
- **Cantidad de TKTs por Aerolínea / Totales por Aerolínea**: Gráfico de barras con tickets por aerolínea con toggle para cambiar vistas
- **Cantidad de TKTs por Estado**: Gráfico circular (Pie) mostrando distribución de facturas (Facturado vs No Facturado)

### Sistema de Filtros Avanzado
Filtra todos los datos y gráficos simultáneamente por:
- Mes
- Asesor
- Fechas (Inicio y Fin)
- GDS
- Aerolínea
- Botón para limpiar todos los filtros

### Métricas en Tiempo Real
- Total de registros filtrados
- Total Ventas (sin decimales)
- Cantidad de facturados
- Cantidad de no facturados

### Listado de Pendientes
Tabla visual mejorada que muestra todos los datos pendientes por facturar con:
- MES, TKT, AEROLINEA, FECHA DE EMISIÓN
- TOTAL de venta
- ASESOR responsable
- GDS utilizado
- Scroll automático para visualizar todos los registros

## 📦 Dependencias

### Dependencias Principales
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "recharts": "^3.7.0",
  "sass": "^1.97.3"
}
```

### Stack Tecnológico
- **Vite**: Build tool de alta velocidad
- **React 19**: Framework UI moderno
- **Recharts**: Librería de gráficos profesionales
- **SASS**: Pre-procesador CSS avanzado
- **XLSX**: Lectura de archivos Excel

## 🚀 Inicio Rápido

### Instalación
```bash
cd excel-charts-app
npm install
```

### Ejecutar en Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5174`

### Compilar para Producción
```bash
npm run build
```

### Lint y Validación
```bash
npm run lint
```

## 📁 Estructura del Proyecto

```
excel-charts-app/
├── public/
│   └── data/
│       └── datos.xlsx          # Archivo de datos
├── src/
│   ├── components/
│   │   ├── Charts/             # Componentes de gráficos
│   │   │   ├── SalesByGDS.jsx         # Gráfico horizontal con toggle
│   │   │   ├── TicketsByAirline.jsx   # Gráfico con toggle
│   │   │   ├── InvoiceStatus.jsx      # Pie chart circular
│   │   │   ├── SalesByStatus.jsx      # Gráfico (no usado)
│   │   │   └── *.scss                 # Estilos SCSS
│   │   ├── FiltersHeader/      # Componente de filtros
│   │   │   ├── FiltersHeader.jsx
│   │   │   └── FiltersHeader.scss
│   │   └── PendingInvoices/    # Tabla de datos pendientes
│   │       ├── PendingInvoices.jsx
│   │       └── PendingInvoices.scss
│   ├── hooks/
│   │   └── useExcel.js         # Hook para lectura de Excel
│   ├── pages/
│   │   ├── Dashboard.jsx       # Componente principal
│   │   └── Dashboard.scss
│   ├── styles/
│   │   └── main.scss           # Estilos globales SCSS
│   ├── utils/
│   │   ├── chartUtils.js       # Funciones para cálculo de datos
│   │   ├── dataUtils.js        # Utilidades de datos
│   │   ├── filterUtils.js      # Lógica de filtrado
│   │   └── dateUtils.js        # Utilidades de fechas
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── eslint.config.js
├── index.html
└── README.md
```

## 🎨 Diseño y Estilos

### Colores Principales
- **Azul**: #3b82f6 (acciones principales)
- **Verde**: #10b981 (elementos positivos)
- **Rojo**: #ef4444 (alertas/negativos)
- **Ámbar**: #f59e0b (advertencias)
- **Gris oscuro**: #1f2937 (textos)

### Características de Diseño
- Gradiente de fondo azul a gris suave
- Tarjetas elevadas con sombras y bordes redondeados
- Tipografía clara con system fonts optimizados
- Responsive Design para todos los tamaños de pantalla
- Transiciones y hover effects suaves

## 📊 Funciones de Utilidad (chartUtils.js)

### Cálculos Disponibles
- `calculateSalesByGDS(data)`: Agrupa y suma ventas por GDS
- `calculateTicketsByGDS(data)`: Cuenta cantidad de TKTs por GDS
- `calculateSalesByAirline(data)`: Agrupa y suma ventas por aerolínea
- `calculateTicketsByAirline(data)`: Cuenta TKTs por aerolínea
- `calculateInvoicesByStatus(data)`: Cuenta facturas por estado
- `calculateSalesByInvoiceStatus(data)`: Suma ventas por estado de factura
- `getPendingInvoices(data)`: Obtiene datos pendientes por facturar
- `calculateTotalSales(data)`: Calcula total de ventas

## 🔄 Flujo de Datos

1. **Lectura de Excel**: `useExcel.js` carga datos desde `/public/data/datos.xlsx`
2. **Normalización**: Los datos se normalizan (conversión de fechas, números)
3. **Filtrado**: `filterUtils.js` aplica filtros en tiempo real
4. **Cálculos**: `chartUtils.js` calcula datos para gráficos
5. **Visualización**: Los componentes renderean gráficos y tablas dinámicamente

## 💡 Características de Filtrado

Todos los gráficos y datos se actualizan automáticamente cuando cambias los filtros:
- **Reactivo**: Cambios instantáneos en gráficos y métricas
- **Combinable**: Puedes usar múltiples filtros simultáneamente
- **Reseteables**: Botón "Limpiar filtros" restaura el estado inicial
- **Inteligente**: Los filtros se aplican a todos los datos y cálculos

## 🧮 Formato de Datos Excel Esperado

Las siguientes columnas son requeridas en el archivo Excel (`datos.xlsx`):
- `MES`: Mes de la transacción
- `TKT`: Número de ticket
- `AEROLINEA`: Nombre de la aerolínea
- `FECHA DE EMISION`: Fecha de emisión del ticket
- `TARIFA NETA`: Tarifa neta
- `TOTAL`: Total de la venta
- `GDS`: Sistema de reservas utilizado
- `ASESOR`: Asesor responsable
- `ESTADO`: Estado de factura (FACTURADO o NO FACTURADO)
- `PASAJERO`: Nombre del pasajero

## 🎛️ Gráficos Interactivos Detallados

### Totales por GDS / Cantidad de TKTs por GDS
- Gráfico horizontal (layout vertical)
- Toggle para cambiar entre vista de totales y cantidad
- Valores mostrados al lado derecho de cada barra
- Nombres de GDS en una sola línea (sin truncado)
- Botón "Totales" activo por defecto

### Cantidad de TKTs por Aerolínea / Totales por Aerolínea
- Gráfico vertical con nombres de aerolíneas en horizontal
- Toggle para cambiar entre vista de cantidad y totales
- Valores mostrados arriba de cada barra
- Denominación dinámica según vista activa
- Botón "Cantidad" activo por defecto

### Cantidad de TKTs por Estado
- Gráfico circular (Pie) con dos segmentos
- Colores: Verde para FACTURADO, Rojo para NO FACTURADO
- Leyenda y etiquetas visibles
- Información al pasar el mouse

## 📈 Validación y Errores

- Validación de datos Excel en lectura
- Manejo de fechas inválidas o ausentes
- Estados de carga con feedback visual
- Mensajes cuando no hay datos disponibles

## 🔧 Configuración Vite

Vite está configurado con:
- Plugin de React (@vitejs/plugin-react)
- Hot Module Replacement (HMR) para desarrollo rápido
- Build optimizado para producción

## 📋 Changelog Reciente

### Version 2.0 (Actual)
- Refactorización completa de gráficos
- Posicionamiento mejorado de valores en gráficos
- Nombres dinámicos según vista (Totales/Cantidad)
- Botones unificados con nomenclatura consistente
- Tabla mejorada con mejor visualización de columnas
- Eliminación de gráficos redundantes
- Optimización de dependencias

### Version 1.0
- Dashboard inicial con 5 gráficos
- Sistema de filtros completo
- Tabla de datos pendientes
- Métricas principales

## 🐛 Conocidos

- Los nombres muy largos de GDS pueden necesitar más espacio horizontal en pantallas pequeñas
- Scroll horizontal de tabla en pantallas <1024px puede ser necesario

## 📞 Desarrollo

El proyecto está configurado con ESLint para mantener la calidad del código:

```bash
npm run lint      # Ejecutar linter
```

### Edición de Estilos

Todos los estilos están en SCSS. La estructura es:
- `src/styles/main.scss`: Estilos globales
- `src/components/**/*.scss`: Estilos de componentes
- `src/pages/**/*.scss`: Estilos de páginas

### Agregar Nuevos Datos

Reemplaza el archivo `/public/data/datos.xlsx` con tu archivo Excel considerando el formato esperado.

---

**Última actualización**: Febrero 2026  
**Versión**: 2.0  
**Estado**: Producción
