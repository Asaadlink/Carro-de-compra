document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos todas las imágenes de las frutas
  const productos = document.querySelectorAll(".productes div");
  
  // Referencias al carrito y al total
  const carrito = document.getElementById("carrito");
  const totalCompra = document.getElementById("preuFinal");
  
  // Inicializamos el total
  let total = 0;
  
  productos.forEach((producto) => {
    producto.addEventListener("click", () => {
      // Obtenemos el nombre, precio y tipo del producto
      const [nombre, precioTexto] = producto.querySelector("p").textContent.split(" :");
      const precioPorUnidad = parseFloat(precioTexto.match(/[\d,.]+/)[0].replace(",", "."));
      
      // Preguntamos al usuario la cantidad deseada
      const cantidad = parseFloat(prompt(`¿Cuántos ${nombre}s deseas comprar?`));
      
      if (cantidad > 0) {
        // Calculamos el precio total del producto
        const subtotal = precioPorUnidad * cantidad;
        
        // Añadimos al total general
        total += subtotal;
        
        // Mostramos el producto en el carrito
        carrito.innerHTML += `<p>${nombre} ${cantidad} ${
          ["Piña", "Aguacate"].includes(nombre) ? "ud" : "kg"
        } x ${precioTexto}€ = ${subtotal.toFixed(2).replace(".", ",")}€</p>`;
        
        // Actualizamos el total
        totalCompra.textContent = `${total.toFixed(2).replace(".", ",")}€`;
        
        // Confirmamos si desea continuar comprando
        if (!confirm("¿Quieres añadir más productos?")) {
          alert("Gracias por tu compra.");
        }
      } else {
        // Mensaje de error si la cantidad no es válida
        alert("Por favor, introduce una cantidad válida.");
      }
    });
  });
});
