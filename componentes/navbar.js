const iconoCarrito = document.querySelector('.container-cart-icon');
const contenedorProductosCarrito = document.querySelector('.container-cart-products');

iconoCarrito.addEventListener('click', () => {
  contenedorProductosCarrito.classList.toggle('hidden-cart');
});

const infoProducto = document.querySelector('.cart-product');
const filaProducto = document.querySelector('.row-product');
const contenedorItems = document.querySelector('.container-items');
let todosLosProductos = [];
const valorTotal = document.querySelector('.total-pagar');
const contadorProductos = document.querySelector('#contador-productos');
const carritoVacio = document.querySelector('.cart-empty');
const totalCarrito = document.querySelector('.cart-total');

contenedorItems.addEventListener('click', e => {
  if (e.target.classList.contains('btn-add-cart')) {
    const producto = e.target.parentElement;
    const info = {
      cantidad: 1,
      titulo: producto.querySelector('h2').textContent,
      precio: producto.querySelector('p').textContent,
    };
    const existe = todosLosProductos.some(item => item.titulo === info.titulo);
    if (existe) {
      const productos = todosLosProductos.map(item => {
        if (item.titulo === info.titulo) {
          item.cantidad++;
          return item;
        } else {
          return item;
        }
      });
      todosLosProductos = [...productos];
    } else {
      todosLosProductos = [...todosLosProductos, info];
    }
    mostrarHTMLCarrito();
  }
});

filaProducto.addEventListener('click', e => {
  if (e.target.classList.contains('icon-close')) {
    const producto = e.target.parentElement;
    const titulo = producto.querySelector('p').textContent;
    todosLosProductos = todosLosProductos.filter(item => item.titulo !== titulo);
    mostrarHTMLCarrito();
  }
});

const mostrarHTMLCarrito = () => {
  if (!todosLosProductos.length) {
    carritoVacio.classList.remove('hidden');
    filaProducto.classList.add('hidden');
    totalCarrito.classList.add('hidden');
  } else {
    carritoVacio.classList.add('hidden');
    filaProducto.classList.remove('hidden');
    totalCarrito.classList.remove('hidden');
  }
  filaProducto.innerHTML = '';
  let total = 0;
  let totalProductos = 0;
  todosLosProductos.forEach(item => {
    const contenedorProducto = document.createElement('div');
    contenedorProducto.classList.add('cart-product');
    contenedorProducto.innerHTML = `
      <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${item.cantidad}</span>
        <p class="titulo-producto-carrito">${item.titulo}</p>
        <span class="precio-producto-carrito">${item.precio}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    `;
    filaProducto.append(contenedorProducto);
    total = total + parseInt(item.cantidad * item.precio.slice(1));
    totalProductos = totalProductos + item.cantidad;
  });
  valorTotal.innerText = `$${total}`;
  contadorProductos.innerText = totalProductos;
};