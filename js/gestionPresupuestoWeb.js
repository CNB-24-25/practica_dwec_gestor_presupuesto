import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
  let elemento = document.getElementById(idElemento);
  elemento.textContent = "";
  elemento.append(valor);
}

function mostrarGastoWeb(idElemento, gasto) {
  let eGasto = document.createElement("div");
  eGasto.classList.add("gasto");
  eGasto.gasto = gasto;

  let descGasto = document.createElement("div");
  descGasto.classList.add("gasto-descripcion");
  descGasto.innerHTML = gasto.descripcion;
  descGasto.append(descGasto);

  let fechGasto = document.createElement("div");
  fechGasto.classList.add("gasto-fecha");
  fechGasto.innerHTML = gasto.fecha;
  eGasto.append(fechGasto);

  let valGasto = document.createElement("div");
  valGasto.classList.add("gasto.valor");
  valGasto.innerHTML = gasto.valor;
  eGasto.append(valGasto);

  let etiGasto = document.createElement("div");
  etiGasto.classList.add("gasto-etiquetas");

  for (let etiqueta of gasto.etiquetas) {
    let etiquetasGasto = document.createElement("span");
    etiquetasGasto.classList.add("gasto-etiquetas-etiqueta");
    etiquetasGasto.innerHTML = etiqueta;
    etiquetasGasto.append(etiquetasGasto);
  }
  eGasto.append(etiGasto);
}
function mostrarGastosAgrupadosWeb() {}

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
