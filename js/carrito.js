document.addEventListener("DOMContentLoaded", () => {
  const productos = document.querySelectorAll(".productes div");
  const carrito = document.getElementById("carrito");
  const totalCompra = document.getElementById("preuFinal");

  let total = 0;
  let cartItems = {}; // Objeto para rastrear los productos en el carrito

  productos.forEach((producto) => {
    producto.addEventListener("click", () => {
      const [nombre, precioTexto] = producto.querySelector("p").textContent.split(" :");
      const precioPorUnidad = parseFloat(precioTexto.match(/[\d,.]+/)[0].replace(",", "."));

      const cantidad = parseInt(prompt(`¿Cuántos ${nombre}s deseas comprar?`));

      if (cantidad > 0) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        if (cartItems[nombre]) {
          cartItems[nombre].cantidad += cantidad;
          cartItems[nombre].subtotal += precioPorUnidad * cantidad;
        } else {
          // Si es un nuevo producto, lo añadimos al carrito
          cartItems[nombre] = {
            cantidad: cantidad,
            precioPorUnidad: precioPorUnidad,
            subtotal: precioPorUnidad * cantidad,
          };
        }

        total += precioPorUnidad * cantidad;

        actualizarCarrito(); // Actualiza la vista del carrito

        if (!confirm("¿Quieres añadir más productos?")) {
          alert("Gracias por tu compra.");
        }
      } else {
        alert("Por favor, introduce una cantidad válida.");
      }
    });
  });

  // Función para actualizar el carrito en la interfaz
  function actualizarCarrito() {
    carrito.innerHTML = ""; // Limpiamos el carrito antes de actualizarlo

    Object.keys(cartItems).forEach((nombre) => {
      const item = cartItems[nombre];

      // Crear elemento HTML para el producto en el carrito
      const itemHTML = document.createElement("p");
      itemHTML.innerHTML = `${nombre} ${item.cantidad} ${["Piña", "Aguacate"].includes(nombre) ? "ud" : "kg"} x 
      ${item.precioPorUnidad.toFixed(2).replace(".", ",")}€ = ${item.subtotal.toFixed(2).replace(".", ",")}€ 
      <span class="delete-item" data-nombre="${nombre}" style="cursor:pointer; color:red;">
      <i class="fas fa-trash"></i></span>`;

      carrito.appendChild(itemHTML);

      // Evento para eliminar UNA unidad del producto al hacer clic en la basura
      itemHTML.querySelector(".delete-item").addEventListener("click", function () {
        eliminarUnidad(nombre);
      });
    });

    // Actualizar el total de la compra
    totalCompra.textContent = `${total.toFixed(2).replace(".", ",")}€`;
  }

  // Función para eliminar UNA unidad de un producto del carrito
  function eliminarUnidad(nombre) {
    if (cartItems[nombre]) {
      total -= cartItems[nombre].precioPorUnidad; // Restar una unidad al total
      cartItems[nombre].cantidad -= 1; // Restar una unidad a la cantidad
      cartItems[nombre].subtotal -= cartItems[nombre].precioPorUnidad; // Actualizar el subtotal

      // Si la cantidad llega a 0, eliminar completamente el producto
      if (cartItems[nombre].cantidad <= 0) {
        delete cartItems[nombre];
      }

      actualizarCarrito(); // Actualizar la vista del carrito
    }
  }
});
