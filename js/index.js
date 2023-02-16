// Productos

const productos = [
    {
        id: 0,
        nombre: 'Camiseta Titular',
        categoria: 'camiseta',
        precio: 12000,
        imagen: "./assets/img/camiseta_arg_titular.jpg",
        descripcion: "Camiseta titular de Argentina en el Mundial de 2022",
        cantidad: 1
    },
    {
        id: 2,
        nombre: 'Camiseta Suplente',
        categoria: 'camiseta',
        precio: 12000,
        imagen: "./assets/img/camiseta-suplente-adidas-argentina-2022-1-1.jpg",
        descripcion: "Camiseta suplente de Argentina en el Mundial de 2022",
        cantidad: 1
    },
    {
        id: 3,
        nombre: 'Buzo de entrenamiento',
        categoria: 'buzo',
        precio: 18000,
        imagen: "./assets/img/buzo_entrenamiento_arg_22.jpg",
        descripcion: "Buzo de entrenamiento de Argentina en el Mundial de 2022",
        cantidad: 1
    },
    {
        id: 4,
        nombre: 'Short titular',
        categoria: 'short',
        precio: 8000,
        imagen: "./assets/img/short-titular-argentina.jpg",
        descripcion: "Short titular de Argentina en el Mundial de 2022",
        cantidad: 1
    },
    {
        id: 5,
        nombre: 'Short suplente',
        categoria: 'short',
        precio: 8000,
        imagen: "./assets/img/short-suplente-argentina.jpg",
        descripcion: "Short suplente de Argentina en el Mundial de 2022",
        cantidad: 1
    }
]

// Traer Ids

const contenedorProductos = document.getElementById('contenedor-productos')

let carrito = []

const contenedorCarrito = document.getElementById('contenedor-carrito')

const contadorCarrito = document.getElementById('contador-carrito')

const precioTotal = document.getElementById('precioTotal')

const botonVaciar = document.getElementById('vaciar-carrito')

const buscar = document.getElementById('buscar')

const finalizarCompra = document.getElementById('finalizar-compra')


// Boton de vaciar carrito

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

// Mostrar carrito

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// Mostrar productos

productos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src=${producto.imagen} class="card-img-top"
    alt=${producto.descripcion}>
<div class="card-body d-flex flex-column justify-content-center">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">$${producto.precio}</p>
    <a href="#" id="agregar${producto.id}" class="btn btn-primary">Agregar al carrito</a>
</div>
`
    contenedorProductos.appendChild(div)
    
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })



})

// Agregar al carrito

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
    const item = productos.find((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito);
    }
    actualizarCarrito()
}

// Actualizar carrito

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar">X</button>
        `

        contenedorCarrito.appendChild(div)
    })

    contadorCarrito.innerText = carrito.length

    precioTotal.innerText= carrito.reduce((acc, prod) => acc +prod.precio * prod.cantidad  ,0)

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Eliminar del carrito

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()

}

// Buscador

document.addEventListener("keyup", e=>{ 
    if (e.target.matches ("#buscar")){

    document.querySelectorAll(".card").forEach(ropa =>{

        ropa.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ?ropa.classList.remove("filtro")
        :ropa.classList.add("filtro")
    })

}
})

// Finalizar compra


finalizarCompra.addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        showConfirmButton: false,
        timer: 5000,
    })
})

// Api temperatura

// let temp = document.querySelector(".temp");
// let summary = document.querySelector(".summary");
// let loc = document.querySelector(".location");
// const kelvin = 273.15

// window.addEventListener("load",() => {
//             const urlBase = "https://api.openweathermap.org/data/2.5/weather?q=Londres, Reino Unido&APPID=5062e01765473f2fd565550753b22a5d"

//             fetch (urlBase)
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log(data);
//                 temp.textContent = 
//                     Math.floor(data.main.temp - kelvin) + "°C";
//                 summary.textContent = data.weather[0].description;
//                 loc.textContent = data.name + ", " + data.sys.country
//             })
//         }
// )
