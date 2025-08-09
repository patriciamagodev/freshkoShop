// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    
    const productContainer = document.getElementById('product-container');
    const whatsappNumber = '584120880801'; // ¡IMPORTANTE! Reemplaza con tu número

    // Función para obtener los productos del archivo JSON
    async function fetchProducts() {
        try {
            const response = await fetch('products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
            productContainer.innerHTML = "<p>No se pudieron cargar los productos. Intenta de nuevo más tarde.</p>";
        }
    }

    // Función para renderizar los productos en el HTML
    function renderProducts(products) {
        productContainer.innerHTML = ''; // Limpiar el contenedor por si acaso

        products.forEach(product => {
            const productCard = document.createElement('article');
            productCard.className = 'product-card';

            // Construir el enlace de WhatsApp para cada producto
            const message = encodeURIComponent(`¡Hola! Estoy interesado en el producto: ${product.name} - Precio: $${product.price.toFixed(2)}`);
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <a href="${whatsappLink}" target="_blank" class="cta-button-product">Comprar por WhatsApp</a>
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    }

    // Iniciar la carga de productos
    fetchProducts();
});