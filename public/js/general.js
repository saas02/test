import { loadProductCart, CART_PRODUCTOS } from "./cart.js";

function increaseQuantity(idProduct) {
    const idProductsCart = localStorage.getItem(CART_PRODUCTOS);
    const arrayIdProductsCart = idProductsCart.split(",");
    arrayIdProductsCart.push(idProduct);

    let count = 0;
    let idsString = "";
    arrayIdProductsCart.forEach(id => {
        count++;
        if (count < arrayIdProductsCart.length) {
            idsString += id + ",";
        } else {
            idsString += id;
        }
    });
    localStorage.setItem(CART_PRODUCTOS, idsString);
    loadProductCart();
}

function decreaseQuantity(idProduct) {
    const idProductsCart = localStorage.getItem(CART_PRODUCTOS);
    const arrayIdProductsCart = idProductsCart.split(",");

    const deleteItem = idProduct.toString();
    let index = arrayIdProductsCart.indexOf(deleteItem);
    if (index > -1) {
        arrayIdProductsCart.splice(index, 1);
    }

    let count = 0;
    let idsString = "";
    arrayIdProductsCart.forEach(id => {
        count++;
        if (count < arrayIdProductsCart.length) {
            idsString += id + ",";
        } else {
            idsString += id;
        }
    });
    localStorage.setItem(CART_PRODUCTOS, idsString);
    loadProductCart();
}

function countDuplicatesId(value, arrayIds) {
    let count = 0;
    arrayIds.forEach(id => {
        if (value == id) {
            count++;
        }
    });
    return count;
}

function deleteAllIds(id, arrayIds) {
    return arrayIds.filter(itemId => {
        return itemId != id;
    });
}

export {
    increaseQuantity,
    decreaseQuantity,
    countDuplicatesId,
    deleteAllIds
};

