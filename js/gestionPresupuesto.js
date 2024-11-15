// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
//Cathaysa Navarro Benítez.
let gastos = [];
let idGasto = 0;
let presupuesto = 0;

//actualizarPresupuesto();
//mostrarPresupuesto();

/*let valor1 = 23.44,
  valor2 = 12.88,
  valor3 = 22.8,
  valor4 = 62.22,
  valor5 = 304.75,
  valor6 = 195.88;
//pruebas para la función CrearGasto.
let gasto1 = new CrearGasto("Compra carne", valor1, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", valor2, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", valor3, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", valor4, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", valor5, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", valor6, "2021-10-06", "transporte", "seguros");
anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

console.log(filtrarGastos({ fechaDesde: "2021-09-26" }));*/

//Función para actualizar el presupuesto
function actualizarPresupuesto(dinero) {
  if (dinero >= 0) {
    presupuesto = dinero;
    return presupuesto;
  } else {
    console.error("La cantidad introducida no es válida");
    return -1;
  }
}
//Función para mostrar presupuesto
function mostrarPresupuesto() {
  return "Tu presupuesto actual es de " + presupuesto + " €";
}
//FUNCIÓN CONSTRUCTORA CREAR GASTO:
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  this.descripcion = descripcion;
  //comprobación de si el valor tiene un tipo correcto.
  this.valor = typeof valor === "number" && valor >= 0 ? valor : 0;
  console.log(this.valor);
  //verificación de la fecha
  if (fecha && !isNaN(Date.parse(fecha))) {
    this.fecha = Date.parse(fecha);
  } else {
    this.fecha = Date.now();
  }
  //el array de etiquetas comienza vacío
  this.etiquetas = etiquetas.length > 0 ? etiquetas : [];

  //mostrar todos los datos introducidos por pantalla
  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
  };
  //mostrar todos los gastos completos
  this.mostrarGastoCompleto = function () {
    let fechaLocalizada = new Date(this.fecha).toLocaleString(); // Formato de fecha localizado
    let textoEtiquetas = this.etiquetas.map((etiqueta) => `- ${etiqueta}`).join("\n"); // Formato de etiquetas
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocalizada}\nEtiquetas:\n${textoEtiquetas}\n`;
  };
  //mostrar la nueva descripción
  this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  };
  //actualizamos valor
  this.actualizarValor = function (nuevoValor) {
    if (typeof nuevoValor === "number" && nuevoValor >= 0) {
      this.valor = nuevoValor;
    }
  };
  //función para añadir etiquetas
  this.anyadirEtiquetas = function (...nuevasEtiquetas) {
    for (let i = 0; i < nuevasEtiquetas.length; i++) {
      let etiqueta = nuevasEtiquetas[i];

      if (!this.etiquetas.includes(etiqueta)) {
        this.etiquetas.push(etiqueta);
      }
    }
  };
  //actualizamos la fecha
  this.actualizarFecha = function (nuevaFecha) {
    if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) {
      this.fecha = Date.parse(nuevaFecha);
    }
  };
  //función para borrar las etiquetas
  this.borrarEtiquetas = function (...borrarEtiquetas) {
    for (let i = 0; i < borrarEtiquetas.length; i++) {
      let etiqueta = borrarEtiquetas[i];
      let index = this.etiquetas.indexOf(etiqueta); //Buscar la etiqueta en el Array
      if (index !== -1) {
        this.etiquetas.splice(index, 1); //elimina la etiqueda si existe
      }
    }
  };
  //función para obtener el periodo de agrupación
  this.obtenerPeriodoAgrupacion = function (periodo) {
    let nuevoPeriodo = new Date(fecha);
    let anyo = nuevoPeriodo.getFullYear();
    let mes = nuevoPeriodo.getMonth() + 1;
    let dia = nuevoPeriodo.getDate();

    //If para comprobar los meses y días menores de 10;
    if (mes < 10) {
      mes = "0" + mes;
    }
    if (dia < 10) {
      dia = "0" + dia;
    }
    // if para mostrar la fecha, según lo pedido en el parámetro
    if (periodo === "anyo") {
      return anyo;
    } else if (periodo === "mes") {
      return anyo + "-" + mes;
    } else if (periodo === "dia") {
      return anyo + "-" + mes + "-" + dia;
    }
  };
}
//Función listar gastos
function listarGastos() {
  return gastos;
}

//Función añadir gastos
function anyadirGasto(gasto) {
  gasto.id = idGasto;

  idGasto++;

  gastos.push(gasto);
}

//Función borrar gastos.
function borrarGasto(id) {
  for (let i = 0; i < gastos.length; i++) {
    if (gastos[i].id === id) {
      gastos.splice(i, 1); //Elimina el gasto de la posición i

      console.log(`Gasto con ID ${id} ha sido eliminado`);
      return;
    }
  }
  console.log(`El gasto con el ID ${id} no ha sido encontrado`); //comprobar si funciona.
}

//función Calcular el total de los gastos
function calcularTotalGastos() {
  let total = 0;
  for (let i = 0; i < gastos.length; i++) {
    total += gastos[i].valor;
  }
  return total;
}

//Función calcular balance presupuestario
function calcularBalance() {
  let computo = presupuesto - calcularTotalGastos();

  return computo;
}
//función para filtrar los gastos
function filtrarGastos(filtro) {
  return gastos.filter(function (gasto) {
    if (filtro.fechaDesde) {
      if (gasto.fecha < Date.parse(filtro.fechaDesde)) {
        return false;
      }
    }
    if (filtro.fechaHasta) {
      if (gasto.fecha > Date.parse(filtro.fechaHasta)) {
        return false;
      }
    }
    if (filtro.valorMinimo) {
      if (gasto.valor < filtro.valorMinimo) {
        return false;
      }
    }
    if (filtro.valorMaximo) {
      if (gasto.valor > filtro.valorMaximo) {
        return false;
      }
    }
    if (filtro.descripcionContiene) {
      if (!gasto.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) {
        return false;
      }
    }

    if (filtro.etiquetasTiene) {
      let etiquetasGasto = gasto.etiquetas.map((etiqueta) => etiqueta.toLowerCase());
      let etiquetasFiltro = filtro.etiquetasTiene.map((etiqueta) => etiqueta.toLowerCase());
      let tieneEtiqueta = etiquetasFiltro.some((etiqueta) => etiquetasGasto.includes(etiqueta));
      if (!tieneEtiqueta) {
        return false;
      }
    }
    return true;
  });
}
//función para agrupar todos los componentes de un gasto
function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
  let gastosFiltrados = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta });
  return gastosFiltrados.reduce(function (acc, gasto) {
    let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);

    if (acc[periodoAgrupacion]) {
      acc[periodoAgrupacion] += gasto.valor;
    } else {
      acc[periodoAgrupacion] = gasto.valor;
    }
    return acc;
  }, {});
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  mostrarPresupuesto,
  actualizarPresupuesto,
  CrearGasto,
  listarGastos,
  anyadirGasto,
  borrarGasto,
  calcularTotalGastos,
  calcularBalance,
  filtrarGastos,
  agruparGastos,
};
