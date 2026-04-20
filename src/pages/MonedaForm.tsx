import React, { useState } from "react";

export const MonedaForm = () => {
  const [form, setForm] = useState({
    descripcionLarga: "",
    descripcionCorta: "",
    simbolo: "",
    codigoSBS: "",
    nacionalidad: "",
    tipoMoneda: false,
    monedaCambio: "",
    relacionCambio: "directa",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", form);
  };

  const handleCancel = () => {
    setForm({
      descripcionLarga: "",
      descripcionCorta: "",
      simbolo: "",
      codigoSBS: "",
      nacionalidad: "",
      tipoMoneda: false,
      monedaCambio: "",
      relacionCambio: "directa",
    });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Mantenimiento de Moneda</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Descripción Larga:</label>
          <input
            type="text"
            name="descripcionLarga"
            value={form.descripcionLarga}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Descripción Corta:</label>
          <input
            type="text"
            name="descripcionCorta"
            value={form.descripcionCorta}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Símbolo:</label>
          <input
            type="text"
            name="simbolo"
            value={form.simbolo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Código SBS:</label>
          <input
            type="text"
            name="codigoSBS"
            value={form.codigoSBS}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Nacionalidad:</label>
          <select
            name="nacionalidad"
            value={form.nacionalidad}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="PE">Perú</option>
            <option value="US">Estados Unidos</option>
            <option value="EU">Europa</option>
          </select>
        </div>

        <div>
          <label>Tipo de Moneda:</label>
          <label>  
            <input
              type="checkbox"
              name="tipoMoneda"
              checked={form.tipoMoneda}
              onChange={handleChange}
            />
            VAC
          </label>
        </div>

        <div>
          <label>Moneda de Cambio:</label>
          <select
            name="monedaCambio"
            value={form.monedaCambio}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="USD">Dólar</option>
            <option value="PEN">Sol</option>
            <option value="EUR">Euro</option>
          </select>
        </div>

        <div>
          <label>Relación de Cambio:</label>
          <label>
            <input
              type="radio"
              name="relacionCambio"
              value="directa"
              checked={form.relacionCambio === "directa"}
              onChange={handleChange}
            />
            Directa
          </label>

          <label>
            <input
              type="radio"
              name="relacionCambio"
              value="inversa"
              checked={form.relacionCambio === "inversa"}
              onChange={handleChange}
            />
            Inversa
          </label>
        </div>

        <div style={{ marginTop: "15px" }}>
          <button type="submit">Guardar</button>
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};