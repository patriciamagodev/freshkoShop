document.addEventListener('DOMContentLoaded', () => {

    const whatsappNumber = '584120880801';

    // Ahora seleccionamos los contenedores para las diferentes páginas
    const featuredContainer = document.getElementById('featured-container');
    const jerseysContainer = document.getElementById('jerseys-container');
    const pantalonetasContainer = document.getElementById('pantalonetas-container');
    const accesoriosContainer = document.getElementById('accesorios-container');

    async function fetchProducts() {
        try {
            const response = await fetch('products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();

            // Lógica para decidir qué función de renderización llamar
            // Verifica en qué página estamos
            if (document.getElementById('tienda-page')) {
                renderProducts(products); // Renderiza todo el catálogo en la página de tienda
            } else {
                renderFeaturedProducts(products); // Renderiza productos destacados en la página de inicio
            }

        } catch (error) {
            console.error("Error al cargar los productos:", error);
            // Manejo de errores simplificado
            if (featuredContainer) featuredContainer.innerHTML = "<p>No se pudieron cargar los productos.</p>";
            if (jerseysContainer) jerseysContainer.innerHTML = "<p>No se pudieron cargar los productos.</p>";
            if (pantalonetasContainer) pantalonetasContainer.innerHTML = "<p>No se pudieron cargar los productos.</p>";
            if (accesoriosContainer) accesoriosContainer.innerHTML = "<p>No se pudieron cargar los productos.</p>";
        }
    }

    // Nueva función para renderizar productos destacados
    function renderFeaturedProducts(products) {
        if (!featuredContainer) return; // Salir si no estamos en la página de inicio

        featuredContainer.innerHTML = '';
        // Filtra los productos marcados como destacados
        const featured = products.filter(product => product.isFeatured === true);
        
        renderCategory(featured, featuredContainer, whatsappNumber);
    }

    // Función original para renderizar el catálogo completo
    function renderProducts(products) {
        if (!jerseysContainer || !pantalonetasContainer || !accesoriosContainer) return; // Salir si no estamos en la página de tienda
        
        jerseysContainer.innerHTML = '';
        pantalonetasContainer.innerHTML = '';
        accesoriosContainer.innerHTML = '';

        const jerseys = products.filter(product => product.category === 'Jersey');
        const pantalonetas = products.filter(product => product.category === 'Pantaloneta');
        const accesorios = products.filter(product => product.category === 'Accesorios');

        renderCategory(jerseys, jerseysContainer, whatsappNumber);
        renderCategory(pantalonetas, pantalonetasContainer, whatsappNumber);
        renderCategory(accesorios, accesoriosContainer, whatsappNumber);
    }

    function renderCategory(categoryProducts, container, whatsappNumber) {
        categoryProducts.forEach(product => {
            const productCard = document.createElement('article');
            productCard.className = 'product-card';
            const message = encodeURIComponent(`¡Hola! Estoy interesado en el producto: ${product.name} - Precio: $${product.price.toFixed(2)}`);
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <a href="${whatsappLink}" target="_blank" class="cta-button-product">Comprar por WhatsApp</a>
                </div>
            `;
            container.appendChild(productCard);
        });
    }

    fetchProducts();
});