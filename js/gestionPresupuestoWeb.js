import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
  let elemento = document.getElementById(idElemento);
  elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
  let eGasto = document.createElement("div");
  eGasto.classList.add("gasto");

  let descGasto = document.createElement("div");
  descGasto.classList.add("gasto-descripcion");
  descGasto.innerHTML = gasto.descripcion;
  eGasto.append(descGasto);

  let fechGasto = document.createElement("div");
  fechGasto.classList.add("gasto-fecha");
  fechGasto.innerHTML = new Date(gasto.fecha).toLocaleString();
  eGasto.append(fechGasto);

  let valGasto = document.createElement("div");
  valGasto.classList.add("gasto-valor");
  valGasto.innerHTML = gasto.valor;
  eGasto.append(valGasto);

  let etiGasto = document.createElement("div");
  etiGasto.classList.add("gasto-etiquetas");

  for (let etiqueta of gasto.etiquetas) {
    let borrarEtiquetas = new BorrarEtiquetasHandle(gasto, etiqueta);
    let etiquetasGasto = document.createElement("span");
    etiquetasGasto.addEventListener("click", borrarEtiquetas);
    etiquetasGasto.classList.add("gasto-etiquetas-etiqueta");
    etiquetasGasto.innerHTML = etiqueta + " ";
    etiGasto.append(etiquetasGasto);
  }
  eGasto.append(etiGasto);
  let elemento = document.getElementById(idElemento);
  elemento.append(eGasto);
  console.log(eGasto);

  let botonEditar = document.createElement("button");
  botonEditar.innerHTML = "Editar";
  botonEditar.classList.add("gasto-editar");
  botonEditar.addEventListener("click", new EditarHandle(gasto));
  eGasto.append(botonEditar);

  let botonBorrar = document.createElement("button");
  botonBorrar.innerHTML = "Borrar";
  botonBorrar.classList.add("gasto-borrar");
  botonBorrar.addEventListener("click", new BorrarHandle(gasto));
  eGasto.append(botonBorrar);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let agrupacion = document.createElement("div");
  agrupacion.classList.add("agrupacion");
  let cabecera = document.createElement("H1");
  cabecera.innerHTML = `Gastos agrupados por ${periodo}`;
  agrupacion.append(cabecera);

  for (let [key, value] of Object.entries(agrup)) {
    let grupoDatos = document.createElement("div");
    grupoDatos.classList.add("agrupacion-dato");

    let grupoClave = document.createElement("span");
    grupoClave.classList.add("agrupacion-dato-clave");
    grupoClave.innerHTML = key + " ";
    grupoDatos.append(grupoClave);

    let grupoValor = document.createElement("span");
    grupoValor.classList.add("agrupacion-dato-valor");
    grupoValor.innerHTML = value;
    grupoDatos.append(grupoValor);

    agrupacion.append(grupoDatos);
  }
  console.log(agrupacion);

  let elemento = document.getElementById(idElemento);
  elemento.append(agrupacion);
}

function repintar() {
  mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
  mostrarDatoEnId("gastos-totales", "Tu gasto total actual es de " + gestionPresupuesto.calcularTotalGastos());
  mostrarDatoEnId("balance-total", "Tu balance actual es de " + gestionPresupuesto.calcularBalance());
  borrarContenido("listado-gastos-completo");
  for (const gasto of gestionPresupuesto.listarGastos()) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}

function borrarContenido(idElemento) {
  const elemento = document.getElementById(idElemento);
  elemento.innerHTML = "";
}

//manejadora del boton actualizar presupuesto
function actualizarPresupuestoWeb() {
  let nuevoPresupuesto = prompt("Introduce el nuevo presupuesto");
  nuevoPresupuesto = Number(nuevoPresupuesto);
  gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
  repintar();
}

function nuevoGastoWeb() {
  let nuevaDescripcion = prompt("Introduce una nueva descripción");
  let nuevoValor = prompt("Introduce un nuevo valor");
  nuevoValor = Number(nuevoValor);
  let nuevaFecha = prompt("Introduce una nueva fecha");
  let nuevasEtiquetas = prompt("Introduce una nueva etiqueta");
  nuevasEtiquetas = nuevasEtiquetas.split(",");
  let gasto = new gestionPresupuesto.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevasEtiquetas);
  gestionPresupuesto.anyadirGasto(gasto);
  repintar();
}
function EditarHandle(gasto) {
  this.gasto = gasto;
  this.handleEvent = function (event) {
    let nuevaDescripcion = prompt("Introduce una nueva descripción");
    let nuevoValor = prompt("Introduce un nuevo valor");
    nuevoValor = Number(nuevoValor);
    let nuevaFecha = prompt("Introduce una nueva fecha con formato aaaa-mm-dd");
    let nuevasEtiquetas = prompt("Introduce una nueva etiqueta");
    nuevasEtiquetas = nuevasEtiquetas.split(",");

    gasto.actualizarDescripcion(nuevaDescripcion);
    gasto.actualizarValor(nuevoValor);
    gasto.actualizarFecha(nuevaFecha);
    gasto.borrarEtiquetas(...gasto.etiquetas);
    gasto.anyadirEtiquetas(...nuevasEtiquetas);

    repintar();
  };
}
function BorrarHandle(gasto) {
  this.gasto = gasto;

  this.handleEvent = function (event) {
    gestionPresupuesto.borrarGasto(gasto.id);
    repintar();
  };
}
function BorrarEtiquetasHandle(gasto, etiqueta) {
  this.gasto = gasto;
  this.etiqueta = etiqueta;

  this.handleEvent = function (event) {
    gasto.borrarEtiquetas(etiqueta);
    repintar();
  };
}

export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
  repintar,
  actualizarPresupuestoWeb,
  nuevoGastoWeb,
  EditarHandle,
  BorrarHandle,
  BorrarEtiquetasHandle,
};
