// Creo array objeto de productos.
const Product = [
    {
        id: 1,
        name: 'Arroz',
        price: 1100,
        stock: 5
    },
    {
        id: 2,
        name: 'Pollo',
        price: 6500,
        stock: 10
    },
    {
        id: 3,
        name: 'Leche',
        price: 1200,
        stock: 20
    },
    {
        id: 4,
        name: 'Cereal',
        price: 950,
        stock: 10
    }
];


// Array para el carrito.
let cart = [];

// Función para mostrar la lista de productos y el contenido del carrito.
const showProducts = () => {
    let productList = "Lista de productos disponibles:\n";
    Product.forEach(product => {
        productList += `ID: ${product.id}, Producto: ${product.name}, Precio: $${product.price}, Stock: ${product.stock}\n`;
    });

    // Mostrar el contenido del carrito y el total.
    let cartInfo = "Carrito:\n";
    cart.forEach(item => {
        cartInfo += `${item.name} - Cantidad: ${item.quantity}\n`;
    });
    cartInfo += `Total: $${calculateTotal()}`;

    alert(productList + "\n" + cartInfo);
};

// Función para agregar un producto al carrito.
const addToCart = (productId, quantity) => {
    const product = Product.find(p => p.id === productId);

    if (product && product.stock >= quantity) {
        // Restar stock del producto.
        product.stock -= quantity;

        // Verificar si el producto ya está en el carrito.
        const cartItem = cart.find(item => item.id === productId);
        
        if (cartItem) {
            // Si ya está en el carrito, aumentar la cantidad.
            cartItem.quantity += quantity;
            cartItem.totalPrice += product.price * quantity;
        } else {
            // Si no está en el carrito, agregarlo.
            cart.push({
                ...product,
                quantity: quantity,
                totalPrice: product.price * quantity
            });
        }
    } else {
        alert('No hay suficiente stock para agregar este producto.');
    }
};

// Función para calcular el total del carrito.
const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
};

// Función para mostrar el contenido del carrito.
const showCart = () => {
    let cartContent = "Contenido del carrito:\n";
    cart.forEach(item => {
        cartContent += `${item.name} - Cantidad: ${item.quantity}, Precio: $${item.price}, Subtotal: $${item.totalPrice}\n`;
    });
    cartContent += `Total: $${calculateTotal()}`;
    alert(cartContent);
};

// Función para solicitar producto y cantidad al usuario.
const main = () => {
    let continueShopping = true;
    while (continueShopping) {
        showProducts(); // Mostrar la lista de productos al usuario
        const productId = parseInt(prompt("Ingrese el ID del producto que desea agregar al carrito (presione 0 para finalizar):"));
        if (productId === 0) {
            continueShopping = false;
        } else if (productId >= 1 && productId <= 4) {
            const quantity = parseInt(prompt("Ingrese la cantidad que desea agregar:"));
            addToCart(productId, quantity);
        } else {
            alert('ID de producto no válido. Por favor, ingrese un ID entre 1 y 4.');
        }
    }
    showCart(); // Mostrar el contenido final del carrito.
};


// Llamo a la funcion para que el usuario ingrese el producto.
main();
