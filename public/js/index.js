import { baseDeDatos } from "./baseDeDatos.js";
import { renderizarProductos } from "./funciones.js";
import { vaciarCarrito, cargarCarritoDeLocalStorage, calcularTotal, renderizarCarrito } from "./carrito.js";

const DOMbotonVaciar = document.querySelector('#boton-vaciar');
//console.log(baseDeDatos);
renderizarProductos(baseDeDatos);
// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
// Inicio
cargarCarritoDeLocalStorage();
calcularTotal();
renderizarCarrito();