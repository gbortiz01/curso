const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

let productList = [];
let productosEnCarrito = [];

async function cargarProductos() {
  try {
    const response = await fetch("../producto.json");
    const data = await response.json();
    productList = data;
    cargarproductList(productList);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

function cargarproductList(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
     <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="producto-detalle">
        <h3 class="producto-titulo">${producto.titulo}</h3>
        <p class="producto-precio">$${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}">Agregar</button>
    </div>
    `;

    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

botonesCategoria.forEach(boton => {
  boton.addEventListener("click", e => {
    botonesCategoria.forEach(boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id !== "Todos") {
      const productosBoton = productList.filter(
        producto => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = e.currentTarget.textContent;
      cargarproductList(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los Productos";
      cargarproductList(productList);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

function agregarAlCarrito(e) {
  Toastify({
    text: "¡Se agregó exitosamente!",
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
    onClick: function () {},
  }).showToast();

  const idBoton = parseInt(e.currentTarget.id);

  const productoAgregado = productList.find(producto => producto.id === idBoton);

  if (productosEnCarrito.some(producto => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumero();

  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumero() {
  let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numero.innerText = nuevoNumero;
}

cargarProductos();

const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumero();
}




  
  