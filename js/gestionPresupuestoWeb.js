import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
  let elemento = document.getElementById(idElemento);
  elemento.innerHTML = "";
  elemento.append(valor);
}

function mostrarGastoWeb() {}
function mostrarGastosAgrupadosWeb() {}

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
