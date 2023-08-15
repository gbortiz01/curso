const productList = [
    { id:1, 
     imagen: "https://dqz5dwjvgn3kd.cloudfront.net/5nz897tnk/5nz897tnk-25-front-600x600.png",
     titulo: "Remera Unisex con Logo",
     categoria:{
        nombre:"Remeras",
        id:"Remeras",},
      precio: 4000 },
    { id:2,
     imagen: "https://dqz5dwjvgn3kd.cloudfront.net/5oeh6lsu5/5oeh6lsu5-25-front-600x600.png",
     titulo: "Remera Aprender",
     categoria:{
        nombre:"Remeras",
        id:"Remeras",},
      precio: 4000 }, 
    { id:3,
     imagen: "//http2.mlstatic.com/D_NQ_NP_850115-MLA27068879470_032018-O.webp",
     titulo: " Body Bebe",
     categoria:{
        nombre:"Body",
        id:"Body",},
     precio: 4500 },
    { id:4, 
    imagen: "https://http2.mlstatic.com/D_NQ_NP_979145-MLA27068901253_032018-O.webp",
     titulo: "Body mangas largas ", 
     categoria:{
        nombre:"Body",
        id:"Body",},
     precio: 4720 },
    { id:5,
     imagen: "https://http2.mlstatic.com/D_NQ_NP_741856-MLA70857724290_082023-O.webp",
     titulo: "Buzo Cálido",
      categoria:{
        nombre:"Buzos",
        id:"Buzos",},
     precio: 14000 },
    { id:6,
     imagen: "https://http2.mlstatic.com/D_NQ_NP_879630-MLA70151439200_062023-O.webp",
     titulo: "Buzo Estampado", 
     categoria:{
        nombre:"Buzos",
        id:"Buzos",},
     precio: 12500 },
  ];
 
const contenedorProductos = document.querySelector ("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");


function cargarproductList(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
     <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="producto-detalle">
        <h3 class="producto-titulo">${producto.titulo}</h3>
        <p class="producto-precio">${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}">Agregar</button>
    </div>
    `;

    contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();

}

cargarproductList(productList);

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

    botonesCategoria.forEach(boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

if(e.currentTarget.id !== "Todos"){
    const productoCategoria = productList.find(producto => producto.categoria.id === e.currentTarget.id);
    tituloPrincipal.innerText = productoCategoria.categoria.nombre;

    const productosBoton = productList.filter(producto => producto.categoria.id === e.currentTarget.id);
cargarproductList(productosBoton);
}else{
    tituloPrincipal.innerText = "Todos los Productos";
    cargarproductList(productList);
}
})
});

function actualizarBotonesAgregar (){

    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("producto-en-carrito");

if(productosEnCarritoLS) {
     productosEnCarrito = JSON.parseInt(localStorage.getItem("productos-en-carrito"));
    actualizarNumero();
} else {

    productosEnCarrito = [];
}


function agregarAlCarrito(e){

    const idBoton = parseInt(e.currentTarget.id);

    const productoAgregado = productList.find (producto => producto.id === idBoton)
    console.log(productoAgregado);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }
    else{

        const productoNuevo = { ...productoAgregado, cantidad: 1 };
        productosEnCarrito.push(productoNuevo);

    }
    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumero (){

        let nuevoNumero = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
        numero.innerText = nuevoNumero;
    }





  
  