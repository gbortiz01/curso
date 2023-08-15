console.log("=== pre entrega n° 2 ===");

const salir = 4;
const descuento = 10;
const productos = [
  { id:1,  categoria: "Remera", nombre: "Remera Logo", precio: 3250 },
  { id:2, categoria: "Remera", nombre: "Remera Tour", precio: 4280 },
  { id:3, categoria: "Body", nombre: " Body", precio: 9500 },
  { id:4, categoria: "Body", nombre: "Body ", precio: 7450 },
  { id:5, categoria: "Buzo", nombre: "Buzo Cálido", precio: 5700 },
  { id:6, categoria: "Buzo", nombre: "Buzo Estampado", precio: 5600 },
];
const carrito = [];
const historial = [];
const user = [];
const verRemeras = () => {
    let mensaje = 'Lista de productos: \n';
    productos.forEach(el => {
        if(el.categoria === "Remera")
    mensaje = mensaje + `${el.id}-${el.nombre} $${el.precio} \n`
    });

   const opcion = parseInt(prompt(mensaje));
   const productoSeleccionado = productos.find(productos =>productos.id === opcion)
   carrito.push(productoSeleccionado)
   alert("Se agrego al carrito de forma exitosa")
   console.log (opcion);
}
const Body = () => {
    let mensaje = 'Lista de productos: \n';
    productos.forEach(el => {
        if(el.categoria === "Pantalon")
    mensaje = mensaje + `${el.id}-${el.nombre} $${el.precio} \n`
    });

    const opcion = parseInt(prompt(mensaje));
    const productoSeleccionado = productos.find(productos =>productos.id === opcion)
    carrito.push(productoSeleccionado)
    alert("Se agrego al carrito de forma exitosa")
    console.log (opcion);
}
const verBuzo = () => {
    let mensaje = 'Lista de productos: \n';
    productos.forEach(el => {
        if(el.categoria === "Buzo")
    mensaje = mensaje + `${el.id}-${el.nombre} $${el.precio} \n`
    });

    const opcion = parseInt(prompt(mensaje));
    const productoSeleccionado = productos.find(productos =>productos.id === opcion)
    carrito.push(productoSeleccionado)
    alert("Se agrego al carrito de forma exitosa")
    console.log (opcion);
}
const verProductos = () =>{
    let opcion = parseInt(prompt( ' Elige la opcion que desea: \n 1- Remera \n 2- Pantalon \n 3- Buzos \n 4- Volver Atras'));
    while (opcion != salir){
        switch (opcion){
            case 1: 
                    verRemeras();
                    break
            case 2:
                    Body();
                    break
            case 3:
                    verBuzo();
                    break
            case 4: opcion();
            break
            default:
                alert("Opcion Invalida");
                break
    
        }
        opcion = parseInt(prompt( ' Elige la opcion que desea: \n 1- Remera \n 2- Pantalon \n 3- Buzos \n 4- Volver Atras'));
    }
}
const verCarrito = () => {
    let mensaje = 'Tu Compra: \n';
    const numeroCompra = Math.round(Math.random() * 1000000 + 600000);
    carrito.forEach(el => {
    mensaje = mensaje + `${el.id}-${el.nombre} $${el.precio} \n`
    });
   const total = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0)
   mensaje += `TOTAL                $${total}`;
   mensaje += "\n ¿Desea confirmar Compra?(si/no)";
    const respuesta = prompt(mensaje);
    if(respuesta.toLowerCase() === "si"){
        const nombre = prompt("Ingresa tu nombre");
        const email = prompt("Ingrese un E-mail");
        const direccion = parseInt(prompt("Ingrese el domicilio completo donde quiere recibir su compra:"));
    
        historial.push({
          numero: numeroCompra,
          nombre: nombre,
          email: email,
          direccion: direccion,
    })
    console.log(...historial);
    alert (`Felicitaciones ${nombre}  tu compra fue realizada con exito \n N° de transaccion: " ${numeroCompra} \n guarda el numero para recibir el producto`)
    carrito.splice(); 
    }
}

const metodoPago = () => {
    let mensaje = 'Muchas gracias por su compra: \n';
    carrito.forEach(el => {
    mensaje = mensaje + `${el.id}-${el.nombre} $${el.precio} \n`
    });
   const total = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0)
   mensaje += `TOTAL                $${total}`;
   mensaje += "\n Seleccione su metodo de pago: (Efectivo / Tarjeta)" 
   const respuesta = prompt (mensaje);
   if (respuesta.toLowerCase() == "efectivo"){
    const resultadodescuento = total * descuento / 100 ;
    const resultado = total - resultadodescuento;
    alert("Felicitaciones obtuviste 10% de descuento por seleccionar efectivo. \n usted abonara $ " + resultado);
   } else{
    let mensaje = 'Usted selecciono tarjeta, por el momento solo contamos 3 cuotas.'
    const resultado = (total / 3).toFixed(2);
    historial.push({
        Banco: prompt("Ingrese nombre de su Banco"),
        tarjeta: parseInt(prompt("Por favor introduce los numeros de su tarjeta")),
        vencimiento: parseInt(prompt("Por favor introduce fecha de Vecimiento")),
    })
    console.log(historial);
    alert("El pago se efectuo exitosamente. Se realizaran tres cuotas de: $" + resultado) + " .";
   }
}

alert("Bienvenido a la tienda de Las Pastillas del Abuelo.");
let opcion = parseInt(prompt( ' Elige la opcion que desea: \n 1- Ver Productos \n 2- Ver Carrito \n 3- Metodo de pago \n 4- Salir'));
while (opcion != salir){
    switch (opcion){
        case 1: 
               verProductos();
                break
        case 2:
                verCarrito();
                break
        case 3:
                metodoPago();
                break
        default:
            alert("Opcion Invalida");
            break

    }
    opcion = parseInt(prompt( ' Elige la opcion que desea: \n 1- Ver Productos \n 2- Ver Carrito \n 3- Metodo de pago \n 4- Salir'));
}
alert ("Gracias por tu compra.¡Esperamos volver a verte! ");
console.log("Gracias por tu compra. ¡Esperamos volver a verte!");
carrito.splice();