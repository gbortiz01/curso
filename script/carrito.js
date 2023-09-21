let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {

  const carritoVacio = document.querySelector("#carrito-vacio");
  const carritoAcciones = document.querySelector("#carrito-acciones");
  const carritoComprado = document.querySelector("#carrito-comprado");
  const contenedorProductos = document.querySelector("#contenedor-productos");
  let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
  const contenedorTotal = document.querySelector("#total");
  const botonComprar = document.querySelector("#carrito-acciones-comprar");
  const resumenCompra = document.querySelector("#resumen-compra");
  const botonImprimir = document.querySelector("#imprimir-resumen");


  const cargarProductosCarrito = () => {
    if ( productosEnCarrito && productosEnCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");

        contenedorProductos.innerHTML = "";
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="producto-imagen-carrito" src="${producto.imagen}" alt=${producto.titulo}>
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>    
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id=${producto.id}><i class="bi bi-trash3"></i> Eliminar</button>
            `;
            contenedorProductos.append(div);
            botonVaciar.addEventListener("click", vaciarCarrito);
            botonComprar.addEventListener("click", comprarCarrito);
          
        });
        } 
        else {
        contenedorTotal.style.display = "none";
         botonVaciar.style.display = "none";
        botonComprar.style.display = "none";
        carritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
          
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

const actualizarBotonesEliminar = () => {
  botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  botonEliminar.forEach(boton => {
      boton.addEventListener("click", eliminarDelCarrito);
  });
};

  const eliminarDelCarrito = (e) => {
      Toastify({
          text: "¡Se eliminó exitosamente!",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
              background: "linear-gradient(to right, #000000, #e5e5e5)",
              borderRadius: "2rem",
          },
          onClick: function () {}
      }).showToast();

      const idBoton = parseInt(e.currentTarget.id);
      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

      if (index !== -1) {
          productosEnCarrito.splice(index, 1);

          localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
          cargarProductosCarrito(); 
          location.reload();
      };
  };

  const vaciarCarrito = () => {
      Swal.fire({
          title: '¿Estás seguro?',
          icon: 'question',
          html: 'Se eliminarán todos los elementos agregados a su carrito',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '¡Sí!',
          cancelButtonText: '¡No!',
      }).then((result) => {
          if (result.isConfirmed) {
              productosEnCarrito = [];
              localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
              location.reload();
          }
      });
  }

  const actualizarTotal = () => {
      const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
      contenedorTotal.innerText = `Total: $${totalCalculado.toFixed(2)}`;
  }


  const comprarCarrito = () => {
    botonComprar.addEventListener("click", comprarCarrito);
          Swal.fire({
          title: '¡Muchas gracias por elegirnos!',
          text: 'Esperamos volver a verte.',
          imageUrl: 'https://www.pastillas.com.ar/images/logo.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
      });
      mostrarResumenDeCompra();
      productosEnCarrito = [];
      localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));

      carritoVacio.classList.add("disabled");
      contenedorProductos.classList.add("disabled");
      carritoAcciones.classList.add("disabled");
     
  }
  
  botonComprar.addEventListener("click", comprarCarrito);

  const mostrarResumenDeCompra = () => {
      const numeroPedido = Math.round(Math.random() * 1000000 + 600000);
      const productosCompradosHTML = productosEnCarrito.map(producto => {
          return `<li>${producto.cantidad}x ${producto.titulo} - $${producto.precio * producto.cantidad}</li>`;
      }).join('');

      const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
      const resumenHTML = `
          <h2>Resumen de la Compra</h2>
          <p>Número de Pedido: <strong>${numeroPedido}</strong></p>
          <p>Productos seleccionados:</p>
          <ul>${productosCompradosHTML}</ul>
          <p>Total de la Compra: <strong>$${totalCalculado.toFixed(2)}</strong></p>
          <p> <strong>¡IMPORTANTE!</strong></p>
          <p>Por el momento solo contamos con pago en efectivo en el local. Puedes acercarte a partir de las 48hs en Siempreviva 1111 C.A.B.A. con tu N° de pedido.</p>
      `;
      resumenCompra.innerHTML = resumenHTML;
    botonImprimir.style.display = "block";
    botonImprimir.addEventListener("click", () => {
        window.print();
      });
    resumenCompra.classList.remove("disabled");
      }      
    cargarProductosCarrito();
});
