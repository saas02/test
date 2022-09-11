import { increaseQuantity, decreaseQuantity, countDuplicatesId, deleteAllIds } from "./general.js";
import { getProductsDb } from "./products.js";

const CART_PRODUCTOS = "cartProductsId";
const LANGUAGE = "es-CO";
const CASH = "COP";

function addProductCart(idProduct) {
    
    let arrayProductsId = [];

    let localStorageItems = localStorage.getItem(CART_PRODUCTOS);

    if (localStorageItems === null) {
        arrayProductsId.push(idProduct);
        localStorage.setItem(CART_PRODUCTOS, arrayProductsId);
    } else {
        let productsId = localStorage.getItem(CART_PRODUCTOS);
        if (productsId.length > 0) {
            productsId += "," + idProduct;
        } else {
            productsId = idProduct;
        }
        localStorage.setItem(CART_PRODUCTOS, productsId);
        let message = "Producto Añadido.";    
        document.getElementsByClassName("products-message")[0].innerHTML = message;        
        setTimeout(function(){ 
            document.getElementsByClassName("products-message")[0].innerHTML = '';
        }, 1000);
    }
    
    loadProductCart();
}

async function loadProductCart() {
    const products = await getProductsDb();

    // Convertimos el resultado del localStorage en un array
    const localStorageItems = localStorage.getItem(CART_PRODUCTOS);

    let html = "";    
    document.getElementsByClassName("cart-products")[0].innerHTML = html;

    if (!localStorageItems) {
        html = `
          <div class="cart-product empty">
              <p>Carrito vacio.</p>
          </div>
        `;
        document.getElementsByClassName("cart-products")[0].innerHTML = html;
    } else {
        const idProductsSplit = localStorageItems.split(",");
        const DOMitems = document.querySelector('#cart-products');
        // Eliminamos los IDs duplicaos
        const idProductsCart = Array.from(new Set(idProductsSplit));

        idProductsCart.forEach(id => {
            products.forEach(product => {
                if (id == product.id) {
                    const quantity = countDuplicatesId(id, idProductsSplit);
                    const totalPrice = product.price * quantity;

                    const miNodo = document.createElement('div');
                    miNodo.classList.add('cart-product');

                    // Imagen
                    const miNodoImagen = document.createElement('img');
                    miNodoImagen.setAttribute('src', product.image);
                    miNodoImagen.setAttribute('alt', product.name);

                    // Data
                    const miNodoData = document.createElement('div');
                    miNodoData.classList.add('cart-product-info');

                    const miNodoDataInfo = document.createElement('span');
                    miNodoDataInfo.classList.add('quantity');
                    miNodoDataInfo.textContent = quantity;

                    const miNodoDataInfoP = document.createElement('p');
                    miNodoDataInfoP.textContent = product.name;

                    const miNodoDataInfoPrice = document.createElement('p');                    

                    var formatPrice = new Intl.NumberFormat(LANGUAGE, {
                        style:"currency", 
                        currency:CASH
                    });
                    miNodoDataInfoPrice.textContent = formatPrice.format(totalPrice);
                        /* start p quantity */
                        const miNodoChangeQuantity = document.createElement('p');
                        miNodoChangeQuantity.classList.add('change-quantity');                        
                            /* start delete  boton*/
                            const miNodoBotonDel = document.createElement('span');
                            miNodoBotonDel.textContent = '-';
                            miNodoBotonDel.addEventListener('click', decreaseQuantity.bind(event, product.id));                    
                            /* end delete  boton*/

                            const miNodoSpaceDiv = document.createElement('span');
                            miNodoSpaceDiv.textContent = ' '; 

                            /* start add  boton*/
                            const miNodoBotonAdd = document.createElement('span');
                            miNodoBotonAdd.textContent = '+';
                            miNodoBotonAdd.addEventListener('click', increaseQuantity.bind(event, product.id)); 
                            /* end delete  boton*/
                        /* end p quantity */
                    
                    /* start element delete */
                    const miNodoDelete = document.createElement('p');
                    miNodoDelete.classList.add('cart-product-delete');
                    const miNodoBotonDeleteAll = document.createElement('button');
                    miNodoBotonDeleteAll.textContent = 'Eliminar';
                    miNodoBotonDeleteAll.addEventListener('click', deleteProductCart.bind(event, product.id));
                    miNodoDelete.appendChild(miNodoBotonDeleteAll);
                    /* end element delete */    

                    miNodoChangeQuantity.appendChild(miNodoBotonDel);
                    miNodoChangeQuantity.appendChild(miNodoSpaceDiv);
                    miNodoChangeQuantity.appendChild(miNodoBotonAdd);
                    
                    miNodoData.appendChild(miNodoDataInfoP);
                    miNodoData.appendChild(miNodoDataInfoPrice);
                    miNodoData.appendChild(miNodoDataInfo);
                    miNodoData.appendChild(miNodoChangeQuantity);
                    miNodoData.appendChild(miNodoDelete);

                    miNodo.appendChild(miNodoImagen);
                    miNodo.appendChild(miNodoData);
                    DOMitems.appendChild(miNodo);
                }
            });
        });
    }

    //document.getElementsByClassName("cart-products")[0].innerHTML = html;
}

function deleteProductCart(idProduct) {
    const idProductsCart = localStorage.getItem(CART_PRODUCTOS);
    const arrayIdProductsCart = idProductsCart.split(",");
    const resultIdDelete = deleteAllIds(idProduct, arrayIdProductsCart);

    if (resultIdDelete) {
        let count = 0;
        let idsString = "";

        resultIdDelete.forEach(id => {
            count++;
            if (count < resultIdDelete.length) {
                idsString += id + ",";
            } else {
                idsString += id;
            }
        });
        localStorage.setItem(CART_PRODUCTOS, idsString);
    }

    const idsLocalStorage = localStorage.getItem(CART_PRODUCTOS);
    if (!idsLocalStorage) {
        localStorage.removeItem(CART_PRODUCTOS);
    }

    loadProductCart();
}

export {
    addProductCart,
    loadProductCart,
    deleteProductCart,
    CART_PRODUCTOS,
    LANGUAGE,
    CASH
};