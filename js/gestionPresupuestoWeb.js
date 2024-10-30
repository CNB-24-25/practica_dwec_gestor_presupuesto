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

function mostrarGastosAgrupadosWeb(idElemento, agrup, period) {
  let agrupacion = document.createElement("div");
  agrupacion.classList.add("agrupacion");
  let cabecera = documento.createElement("H1");
  cabecera.innerHTML = `Gastos agrupados por ${periodo}`;
  agrupacion.append(cabecera);

  for (let [key, value] of Object.entries(agrup)) {
    let grupoDatos = document.createElement("div");
    grupoDatos.classList.add("agrupacion-dato");

    let grupoClave = document.createElement("span");
    grupoClave.classList.add("agrupacion-dato-clave");
    grupoClave.innerHTML = key;
    grupoClave.append(grupoClave);

    let grupoValor = document.createElement("span");
    grupoValor.classList.add("agrupacion-dato-valor");
    grupoValor.innerHTML = value;
    grupoValor.append(grupoValor);
  }

  let agruGasto = document.createElement("div");
  etiGasto.classList.add("agrupacion-gasto");

  let elemento = document.getElementById(idElemento);
  agrupacion.append(agruGasto);
}

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
