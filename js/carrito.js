document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos todas las imágenes de las frutas
    const productos = document.querySelectorAll(".productes div");
  
    // Referencias al carrito y al total
    const carrito = document.getElementById("carrito");
    const totalCompra = document.getElementById("preuFinal");
  
    // Inicializamos el total
    let total = 0;
  
    productos.forEach((producto) => {
      producto.addEventListener("click", function () {
        // Obtenemos el nombre, precio y tipo del producto
        const nombre = this.querySelector("p").textContent.split(" :")[0];
        const precioTexto = this.querySelector("p").textContent.match(/[\d,.]+/)[0];
        const precioPorUnidad = parseFloat(precioTexto.replace(",", "."));
  
        // Preguntamos al usuario la cantidad deseada
        const cantidad = parseFloat(prompt(`¿Cuántos ${nombre}s deseas comprar?`));
  
        if (!isNaN(cantidad) && cantidad > 0) {
          // Calculamos el precio total del producto
          let subtotal = precioPorUnidad * cantidad;
  
          // Añadimos al total general
          total += subtotal;
  
          // Mostramos el producto en el carrito
          const nuevoProducto = document.createElement("p");
          nuevoProducto.textContent = `${nombre} ${cantidad} ${
            nombre === "Piña" || nombre === "Aguacate" ? "ud" : "kg"
          } x ${precioTexto}€ = ${subtotal.toFixed(2).replace(".", ",")}€`;
          carrito.appendChild(nuevoProducto);
  
          // Actualizamos el total
          totalCompra.textContent = `${total.toFixed(2).replace(".", ",")}€`;
  
          // Confirmamos si desea continuar comprando
          const continuar = confirm("¿Quieres añadir más productos?");
          if (!continuar) {
            alert("Gracias por tu compra.");
          }
        } else {
          alert("Por favor, introduce una cantidad válida.");
        }
      });
    });
  });
  