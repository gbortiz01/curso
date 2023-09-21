document.addEventListener("DOMContentLoaded", function () {
  const contenedorProductos = document.getElementById("contenedor-productos");
  const filtroBotones = document.querySelectorAll(".boton-filtro");
  const carritoCantidadElement = document.getElementById("carrito-cantidad");

  let productos = [];

  fetch("../producto.json")
    .then((response) => response.json())
    .then((data) => {
      productos = data;
      mostrarProductos(productos);

      filtroBotones.forEach((boton) => {
        boton.addEventListener("click", () => {
          const categoriaSeleccionada = boton.id;
          filtrarProductosPorCategoria(categoriaSeleccionada);
        });
      });
    });

  function mostrarProductos(productos) {
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("producto");
      productoDiv.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalle">
          <h3 class="producto-titulo">${producto.titulo}</h3>
          <p class="producto-precio">$${producto.precio}</p>
          <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
      `;
      contenedorProductos.appendChild(productoDiv);
      productoDiv.querySelector(".producto-agregar").addEventListener("click", () => {
        agregarAlCarrito(producto);
      });
    });
  }

  function filtrarProductosPorCategoria(categoria) {
    if (categoria === "Todos") {
      mostrarProductos(productos);
    } else {
      const productosFiltrados = productos.filter((producto) => producto.categoria.nombre === categoria);
      mostrarProductos(productosFiltrados);
    }
  }
  

  const agregarAlCarrito = (producto) => {
    Toastify({
      text: "¡Producto agregado!",
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
      onClick: () => {},
    }).showToast();
  
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistenteIndex = carrito.findIndex((item) => item.id === producto.id);
  
    if (productoExistenteIndex !== -1) {
      carrito[productoExistenteIndex].cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoUI();
  };
  
  const actualizarCarritoUI = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    carritoCantidadElement.textContent = cantidadTotal;
  };


  
});


