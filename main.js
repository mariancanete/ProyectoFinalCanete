const productList = document.getElementById("productList");
const carrito = document.getElementById("SeeCart");
const showContainer = document.getElementById("cartContainer");
const totalPriceElement = document.getElementById("totalPrice");

let cart = [];

const updateTotalPrice = () => {
    let total = cart.reduce((sum, item) => sum + item.precio, 0);
    totalPriceElement.innerText = `Total: $${total}`;
};

const updateCartIcon = () => {
    carrito.innerText = `🛒 (${cart.length})`;
};

const addProductToCart = (product) => {
    const listProduct = document.getElementById("listProduct");
    const listElement = document.createElement("li");

    listElement.innerText = `${product.nombre} - $${product.precio}`;
    listProduct.append(listElement);

    updateTotalPrice();
    updateCartIcon();
};

const createBuyButton = () => {
    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";
    buyButton.className = "button";
    buyButton.addEventListener("click", () => {
        alert("Compra realizada con éxito!");
        cart = [];
        document.getElementById("listProduct").innerHTML = "";
        updateTotalPrice();
        updateCartIcon();
    });
    document.getElementById("cartContainer").appendChild(buyButton);
};

products.forEach((product) => {
    let content = document.createElement("div");
    content.className = "prod";
    content.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.img}" class="imag" >
        <h2>$ ${product.price} </h2>  
        <p class=""> Stock: <span class="stock">${product.stock}</span></p>
    `;

    productList.append(content);

    let buy = document.createElement("button");
    buy.innerText = "Agregar al carrito";
    buy.className = "button";
    content.append(buy);

    buy.addEventListener("click", () => {
        if (product.stock > 0) {
            product.stock--;
            content.querySelector(".stock").innerText = product.stock;

            const cartItem = {
                id: product.id,
                nombre: product.name,
                img: product.img,
                precio: product.price,
                stock: product.stock,
            };

            cart.push(cartItem);
            addProductToCart(cartItem);
        } else {
            alert("No hay suficiente stock");
        }
    });
});

carrito.addEventListener("click", () => {
    const cartContainer = document.getElementById("cartContainer");
    if (cartContainer.style.display === "block") {
        cartContainer.style.display = "none";
    } else {
        cartContainer.style.display = "block";
        createBuyButton();
    }
});

const style = document.createElement('style');
style.innerHTML = `
    #SeeCart {
        position: fixed;
        right: 20px;
        top: 20px;
    }

    #cartContainer {
        position: fixed;
        right: 20px;
        top: 60px;
        display: none;
        border: 1px solid #ccc;
        padding: 10px;
        background: #fff;
    }

    #totalPrice {
        font-weight: bold;
        margin-top: 10px;
    }

    .button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 4px;
    }
`;
document.head.appendChild(style);
