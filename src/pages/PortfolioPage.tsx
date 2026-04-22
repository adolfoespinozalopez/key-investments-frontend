import { AgGridReact } from "ag-grid-react";

export const PortfolioPage = () => {
  const rowData = [
    { instrumento: "Bono Perú 2030", valor: 100000, moneda: "USD" },
    { instrumento: "Acción AAPL", valor: 50000, moneda: "USD" }
  ];

  const columnDefs = [
    { field: "instrumento" },
    { field: "valor" },
    { field: "moneda" }
  ];

  return (
    <div>
      <h2>Portafolio</h2>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};
