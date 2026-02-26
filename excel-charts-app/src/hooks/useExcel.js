import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function excelDateToJSDate(excelDate){
    if (!excelDate) {
        return null;
    }

    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const jsDate = new Date(
        excelEpoch.getTime() + excelDate * 86400 * 1000
    );

    return jsDate;
}

function normalizeRow(row) {
    return {
        mes: row["MES"],
        tkt: row["TKT"],
        aerolinea: row["AEROLINEA"],
        fechaEmision: excelDateToJSDate(row["FECHA DE EMISION"]),
        tarifaNeta: row["TARIFA NETA"],
        total: row["TOTAL"],
        gds: row["GDS"],
        asesor: row["ASESOR"],
        estado: row["ESTADO"],
        pasajero: row["PASAJERO"]
    };
}

function useExcel() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/datos.xlsx")
            .then((response) => response.arrayBuffer())
            .then((buffer) => {
                const workbook = XLSX.read(buffer, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const jsonData = XLSX.utils.sheet_to_json(sheet);

                const normalizedData = jsonData.map(normalizeRow);

                setData(normalizedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error leyendo el Excel:", error);
                setLoading(false);
            });
    }, []);

    return { data, loading };
}

export default useExcel;
