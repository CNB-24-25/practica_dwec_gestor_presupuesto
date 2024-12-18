import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
  let elemento = document.getElementById(idElemento);
  elemento.textContent = valor;
}
//función que crea un gasto web, a través de una construcción de nodos en JS
function mostrarGastoWeb(idElemento, gasto) {
  let eGasto = document.createElement("div");
  eGasto.classList.add("gasto");
  //Div gasto descripcion
  let descGasto = document.createElement("div");
  descGasto.classList.add("gasto-descripcion");
  descGasto.innerHTML = gasto.descripcion;
  eGasto.append(descGasto);
  //div gasto fecha
  let fechGasto = document.createElement("div");
  fechGasto.classList.add("gasto-fecha");
  fechGasto.innerHTML = new Date(gasto.fecha).toLocaleString();
  eGasto.append(fechGasto);
  //Div gasto valor
  let valGasto = document.createElement("div");
  valGasto.classList.add("gasto-valor");
  valGasto.innerHTML = gasto.valor;
  eGasto.append(valGasto);
  //div gasto etiquetas
  let etiGasto = document.createElement("div");
  etiGasto.classList.add("gasto-etiquetas");
  //listado de etiquetas con SPAN
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

  //boton editar
  let botonEditar = document.createElement("button");
  botonEditar.innerHTML = "Editar";
  botonEditar.classList.add("gasto-editar");
  botonEditar.addEventListener("click", new EditarHandle(gasto));
  eGasto.append(botonEditar);

  //boton borrar
  let botonBorrar = document.createElement("button");
  botonBorrar.innerHTML = "Borrar";
  botonBorrar.classList.add("gasto-borrar");
  botonBorrar.addEventListener("click", new BorrarHandle(gasto));
  eGasto.append(botonBorrar);

  //Boton editar formulario

  let botonEditarFormulario = document.createElement("button");
  botonEditarFormulario.innerHTML = "Editar gasto formulario";
  botonEditarFormulario.classList.add("gasto-editar-formulario");
  botonEditarFormulario.addEventListener("click", new EditarHandleFormulario(gasto));
  eGasto.append(botonEditarFormulario);
}
// Función que agrupa todos los gastos web, a través de una sucesión de elementos creados a partir de códido JS, en nodos.
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

//función que muestra los datos añadidos en el HTML
function repintar() {
  mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
  mostrarDatoEnId("gastos-totales", "Tu gasto total actual es de " + gestionPresupuesto.calcularTotalGastos());
  mostrarDatoEnId("balance-total", "Tu balance actual es de " + gestionPresupuesto.calcularBalance());
  borrarContenido("listado-gastos-completo");
  for (const gasto of gestionPresupuesto.listarGastos()) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}
//función que recupera un elemento por ID y borra su contenido
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

//Función para introducir un nuevo gasto a través de los prompt
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

//Objeto con función manejadora de eventos que se asigna a un botón, al pulsarlo salta la función.
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

//objeto constructor de eventos
function EditarHandleFormulario(gasto) {
  this.gasto = gasto;
  //this.eGasto = eGasto;

  this.handleEvent = function (event) {
    //recupero el formulario
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    //rescatamos los datos ya añadidos.

    formulario.descripcion.value = gasto.descripcion;
    formulario.valor.value = gasto.valor;
    formulario.fecha.value = new Date(gasto.fecha).toISOString().substring(0, 10);
    formulario.etiquetas.value = gasto.etiquetas;

    let botonEditarGasto = event.currentTarget;
    botonEditarGasto.disabled = true;

    botonEditarGasto.parentNode.append(formulario);

    //botón cancelar
    var botonCancelar = formulario.querySelector("button.cancelar");

    //crear objeto para llamar al evento addEventListener
    let nuevoObjeto = new BotonCancelarHandle(formulario, botonEditarGasto);

    let submitNuevo = new BotonSubmitHandle(gasto);

    //crear eventos con el addEventListener
    formulario.addEventListener("submit", submitNuevo);
    botonCancelar.addEventListener("click", nuevoObjeto);
  };
}

//Objeto con función manejadora de eventos que se asigna a un botón, al pulsarlo borras un gasto.
function BorrarHandle(gasto) {
  this.gasto = gasto;

  this.handleEvent = function (event) {
    gestionPresupuesto.borrarGasto(gasto.id);
    repintar();
  };
}
//Objeto con función manejadora de eventos que se asigna a un botón, al pulsarlo borras una etiqueta de un gasto
function BorrarEtiquetasHandle(gasto, etiqueta) {
  this.gasto = gasto;
  this.etiqueta = etiqueta;

  this.handleEvent = function (event) {
    gasto.borrarEtiquetas(etiqueta);
    repintar();
  };
}
//botonera para añadir nuevos gastos a través de un formulario
function nuevoGastoWebFormulario() {
  let botonAnyadirGasto = document.getElementById("anyadirgasto-formulario");
  botonAnyadirGasto.disabled = true;
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  var formulario = plantillaFormulario.querySelector("form");
  //botón cancelar
  var botonCancelar = formulario.querySelector("button.cancelar");
  //enlazar el HTML con el formulario creado en JS
  let controlesPrincipales = document.getElementById("controlesprincipales");

  controlesPrincipales.append(formulario);

  //crear objeto para llamar al evento addEventListener
  let nuevoObjeto = new BotonCancelarHandle(formulario, botonAnyadirGasto);
  //crear eventos con el addEventListener
  formulario.addEventListener("submit", manejarBotonSubmit);
  botonCancelar.addEventListener("click", nuevoObjeto);
}

//función manejadora del botón enviar
function manejarBotonSubmit(event) {
  event.preventDefault();
  var formulario = event.currentTarget;
  let descripcion = formulario.descripcion.value;
  let valor = formulario.valor.value;
  valor = Number.parseFloat(valor);
  let fecha = formulario.fecha.value;
  let etiquetas = formulario.etiquetas.value;
  etiquetas = etiquetas.split(",");

  let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
  let botonFormulario = document.getElementById("anyadirgasto-formulario");
  botonFormulario.disabled = false;
  gestionPresupuesto.anyadirGasto(gasto);

  repintar();
}

//función constructora de handleEvent

function BotonSubmitHandle(gasto) {
  this.gasto = gasto;

  this.handleEvent = function (event) {
    event.preventDefault();
    //recupera el formulario
    var formulario = event.currentTarget;
    //recupera los valores de cada input
    let descripcion = formulario.descripcion.value;

    let valor = formulario.valor.value;
    valor = Number.parseFloat(valor);
    let fecha = formulario.fecha.value;
    let etiquetas = formulario.etiquetas.value;
    etiquetas = etiquetas.split(",");

    gasto.actualizarDescripcion(descripcion);
    gasto.actualizarValor(valor);
    gasto.actualizarFecha(fecha);
    gasto.borrarEtiquetas(...gasto.etiquetas);
    gasto.anyadirEtiquetas(...etiquetas);

    repintar();
  };
}
// objeto manejador de eventos con una función dentro (botón cancelar)
function BotonCancelarHandle(formulario, botonAnyadirGasto) {
  this.formulario = formulario;

  this.botonAnyadirGasto = botonAnyadirGasto;

  this.handleEvent = function (event) {
    botonAnyadirGasto.disabled = false;
    formulario.remove();
  };
}

function filtrarGastosWeb(event) {
  event.preventDefault();

  // Recogemos datos del formulario
  let form = event.target;

  let descripcionContiene = form.elements["formulario-filtrado-descripcion"].value;
  let valorMinimo = form.elements["formulario-filtrado-valor-minimo"].value;
  let valorMaximo = form.elements["formulario-filtrado-valor-maximo"].value;
  let fechaDesde = form.elements["formulario-filtrado-fecha-desde"].value;
  let fechaHasta = form.elements["formulario-filtrado-fecha-hasta"].value;
  let etiquetasTiene = form.elements["formulario-filtrado-etiquetas-tiene"].value;

  alert(
    descripcionContiene +
      " " +
      valorMinimo +
      " " +
      " " +
      valorMaximo +
      " " +
      fechaDesde +
      " " +
      fechaHasta +
      " " +
      etiquetasTiene
  );

  // Creamos filtro
  let objetoFiltrado = {};

  if (descripcionContiene !== "") {
    objetoFiltrado.descripcionContiene = descripcionContiene;
  }
  if (valorMinimo !== "") {
    objetoFiltrado.valorMinimo = valorMinimo;
  }
  if (valorMaximo !== "") {
    objetoFiltrado.valorMaximo = valorMaximo;
  }
  if (fechaDesde !== "") {
    objetoFiltrado.fechaDesde = fechaDesde;
  }
  if (fechaHasta !== "") {
    objetoFiltrado.fechaHasta = fechaHasta;
  }
  if (etiquetasTiene !== "") {
    objetoFiltrado.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene);
  }

  // Filtramos
  let gastosFiltrados = gestionPresupuesto.filtrarGastos(objetoFiltrado);

  // Borramos la lista de gastos y mostramos sólo los filtrados
  document.getElementById("listado-gastos-completo").innerHTML = "";

  for (let gasto of gastosFiltrados) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}

export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
  repintar,
  actualizarPresupuestoWeb,
  nuevoGastoWeb,
  nuevoGastoWebFormulario,
  filtrarGastosWeb,
  EditarHandle,
  BorrarHandle,
  BorrarEtiquetasHandle,
};
