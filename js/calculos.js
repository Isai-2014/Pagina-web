// asignar valores constantes y llamar el id del su etiqueta de html
const habitaciones = document.getElementById("tipoHabitacion");
const personas = document.getElementById("personas");
const tipoPagoSelect = document.getElementById("tipoPago");
const calcularButton = document.getElementById("Tarifa");
const cancelarButton = document.getElementById("CANCELAR");
const resultado = document.getElementById("resultado");
const resultado1 = document.getElementById("resultado1");
const calendario = document.getElementById("llegada");

// evento de clic al boton de calcular Tarifa
  calcularButton.addEventListener("click", () => {

// evento que previene que se recarge la pagina sola
event.preventDefault();

    // Optener los valores que el usuario elija
    const tipoHabitacion = habitaciones.value;
    const cantidadPersonas = parseInt(personas.value);
    const tipoPago = tipoPagoSelect.value;

    // Definir los precios y porcentajes
    const precios = {
        Clasica: 150,
        Doble: 275,
        Suite: 450,
        PersonaAdicional: 90,
    };
    const ivaPorcentaje = 12;
    const inguatPorcentaje = 10;

    // Calcular la tarifa 
    let tarifaBase = precios[tipoHabitacion];

    // Añadir un extra por cada persona adicional
    if (cantidadPersonas > 0 ) {
        tarifaBase += (cantidadPersonas) * precios.PersonaAdicional;
    }

    // Calcular el IVA
    const iva = (tarifaBase * ivaPorcentaje) / 100;

    // Calcular la tarifa de INGUAT
    const inguat = (tarifaBase * inguatPorcentaje) / 100;


    // Calcular la tarifa final
    const tarifaFinal = tarifaBase + iva + inguat;

    // Mostrar los cálculos en el elemento resultado
    resultado.innerHTML = `Calculo del IVA (12%): Q${iva.toFixed(2)}<br>
                           Calculo de INGUAT (10%): Q${inguat.toFixed(2)}<br>
                           Tarifa Final: Q${tarifaFinal.toFixed(2)}`;
  
// Proceso de pago si este es seleccionado
if (tipoPago === "Efectivo") {
  // Generardor de un código de habitación aleatorio
  const min = 1000; // El número mínimo de 4 dígitos (1000)
  const max = 9999; // El número máximo de 4 dígitos (9999)
  const Generador = Math.floor(Math.random() * (max - min + 1)) + min;

  // Mostrar el código de habitación en el elemento "resultado1"
  resultado1.innerHTML = "Su código de habitacion es: " + Generador;
  
  // Mostrar el resultado en pantalla
  resultado.innerHTML += "<br>favor de presentar este codigo en el momento de su llegada.";

  // Mostrar el resumen
  document.getElementById("resumenReserva").style.display = "block";

// Actualizar el resumen con los valores calculados
document.getElementById("tipoResumen").textContent = tipoHabitacion;
document.getElementById("personasResumen").textContent = cantidadPersonas;
document.getElementById("tarifaBaseResumen").textContent = `Q${tarifaBase.toFixed(2)}`;
document.getElementById("ivaResumen").textContent = `Q${iva.toFixed(2)}`;
document.getElementById("inguatResumen").textContent = `Q${inguat.toFixed(2)}`;
document.getElementById("tarifaFinalResumen").textContent = `Q${tarifaFinal.toFixed(2)}`;

}

if (tipoPago === "Tarjeta") {
  // Simular un proceso de pago con tarjeta (usar número de carnet como tarjeta)
  const numeroCarnet = prompt("Ingrese el número de carnet:");
  if (numeroCarnet) {

    // Mostrar el resumen
  document.getElementById("resumenReserva").style.display = "block";

  // Actualizar el resumen con los valores calculados
  document.getElementById("tipoResumen").textContent = tipoHabitacion;
  document.getElementById("personasResumen").textContent = cantidadPersonas;
  document.getElementById("tarifaBaseResumen").textContent = `Q${tarifaBase.toFixed(2)}`;
  document.getElementById("ivaResumen").textContent = `Q${iva.toFixed(2)}`;
  document.getElementById("inguatResumen").textContent = `Q${inguat.toFixed(2)}`;
  document.getElementById("tarifaFinalResumen").textContent = `Q${tarifaFinal.toFixed(2)}`;
  
      resultado.innerHTML += "<br>Proceso realizado con éxito.";
  }
}
});
 
//boton de cancelar pedido
cancelarButton.addEventListener("click", () => {
  // Mostrar un mensaje de reservacion cancelada en el elemento "resultado"
  resultado.innerHTML = "Reservacion cancelada";

  // Restablecer los valores de los campos y elementos a sus valores iniciales o vacíos
  habitaciones.value = ""; 
  personas.value = ""; 
  tipoPagoSelect.value = ""; 
  resultado1.innerHTML = ""; 
  
  // Ocultar el resumen
  document.getElementById("resumenReserva").style.display = "none";
});