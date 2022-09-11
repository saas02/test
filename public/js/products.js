
import { addProductCart, LANGUAGE, CASH } from "./cart.js";

const DOMitems = document.querySelector('#products');

function getProductsDb() {
    const url = "./dbProducts.json";

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
}


async function loadProducts() {
    
    const products = await getProductsDb();

    let html = "";
    products.forEach(product => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('col-3', 'product-container');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card', 'product');
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', product.image);
        // Data
        const miNodoData = document.createElement('div');
        miNodoData.classList.add('card-body');
            // Tittle Data
            const miNodoTitulo = document.createElement('h5');
            miNodoTitulo.classList.add('card-title');
            miNodoTitulo.textContent = product.name;
            const miNodoTituloInfo = document.createElement('p');
            miNodoTituloInfo.classList.add('card-text');
            miNodoTituloInfo.textContent = product.extraInfo;
            const miNodoTituloPrice = document.createElement('p');
            miNodoTituloPrice.classList.add('card-text');
            
            var formatPrice = new Intl.NumberFormat(LANGUAGE, {
                style:"currency", 
                currency:CASH
            });

            miNodoTituloPrice.textContent = formatPrice.format(product.price) + "/ Unidad";
            
        // Boton 
        const miNodoBoton = document.createElement('span');
        miNodoBoton.classList.add('btn', 'btn-primary', 'btn-cart');
        miNodoBoton.textContent = 'Añadir al carrito';
        miNodoBoton.setAttribute('marcador', product.id);
        miNodoBoton.addEventListener('click', addProductCart.bind(event, product.id));
        // Insertamos
        
        miNodoData.appendChild(miNodoImagen);
        miNodoData.appendChild(miNodoTitulo);
        miNodoData.appendChild(miNodoTituloInfo);
        miNodoData.appendChild(miNodoTituloPrice);
        miNodoData.appendChild(miNodoBoton);
        
        miNodoCardBody.appendChild(miNodoData);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
         
    });        

}

export {
    loadProducts,
    getProductsDb
};