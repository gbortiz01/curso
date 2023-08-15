const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
const contenedorProductos = document.querySelector("#contenedor-productos");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");


function cargarProductosCarrito(){

    if(productosEnCarrito){

        carritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        contenedorProductos.innerHTML = "";
    
    productosEnCarrito.forEach(producto => {
    
        const div = document.createElement ("div");
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
        <p>${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p>${producto.precio} * ${producto.cantidad} </p>
        </div><button class="carrito-producto-eliminar" id= ${producto.id} ><i class="bi bi-trash3"></i> Eliminar</i></button>  </div>
        `;
    
        contenedorProductos.append(div);
    
    })
    } else {
        carritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    
    }
    
actualizarBotonesEliminar ();
    
}

cargarProductosCarrito();


function actualizarBotonesEliminar (){

    botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
   
    })
}

function eliminarDelCarrito(e){
    const idBoton = parseInt(e.currentTarget.id);
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);

    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito) );
}