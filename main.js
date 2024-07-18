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
    let buyButton = document.getElementById("buyButton");
    if (!buyButton) {
        buyButton = document.createElement("button");
        buyButton.innerText = "Comprar";
        buyButton.className = "button";
        buyButton.id = "buyButton";
        buyButton.addEventListener("click", () => {
            Swal.fire({
                title: "Gracias por su compra!",
                text: "En breve recibiras un codigo de seguimiento.",
                icon: "success",
            }).then(() => {
                cart = [];
                document.getElementById("listProduct").innerHTML = "";
                updateTotalPrice();
                updateCartIcon();
            });
        });
        document.getElementById("cartContainer").appendChild(buyButton);
    }
};


const loadProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=10');
        const products = await response.json();
        console.log(products);
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
};

const displayProducts = (products) => {
    products.forEach((product) => {
        let content = document.createElement("div");
        content.className = "prod";
        content.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" class="imag" >
            <h2>$ ${product.price * 1000} ARS</h2>  
            <p class=""> Stock: <span class="stock">10</span></p>
        `;

        productList.append(content);

        let buy = document.createElement("button");
        buy.innerText = "Agregar al carrito";
        buy.className = "button";
        content.append(buy);

        buy.addEventListener("click", () => {
            let stock = parseInt(content.querySelector(".stock").innerText);
            if (stock > 0) {
                stock--;
                content.querySelector(".stock").innerText = stock;

                const cartItem = {
                    id: product.id,
                    nombre: product.title,
                    img: product.image,
                    precio: product.price * 1000,
                    stock: stock,
                };

                cart.push(cartItem);
                addProductToCart(cartItem);
            } else {
                alert("No hay suficiente stock");
            }
        });
    });
};


carrito.addEventListener("click", () => {
    if (showContainer.style.display === "block") {
        showContainer.style.display = "none";
    } else {
        showContainer.style.display = "block";
        createBuyButton();
    }
});

loadProducts();
