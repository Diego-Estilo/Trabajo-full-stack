// Base de datos de juegos
const juegos = [
    {
        id: 1,
        titulo: 'Cyberpunk 2077',
        genero: 'accion',
        precio: 59.99,
        imagen: '🎮',
        descripcion: 'Un futuro distópico te espera en esta aventura de rol de acción.',
        calificacion: '★★★★★'
    },
    {
        id: 2,
        titulo: 'Elden Ring',
        genero: 'rpg',
        precio: 59.99,
        imagen: '⚔️',
        descripcion: 'Adéntrate en un mundo de fantasía lleno de desafíos épicos.',
        calificacion: '★★★★★'
    },
    {
        id: 3,
        titulo: 'The Legend of Zelda',
        genero: 'aventura',
        precio: 59.99,
        imagen: '🗡️',
        descripcion: 'La aventura clásica que todos esperaban en la nueva generación.',
        calificacion: '★★★★★'
    },
    {
        id: 4,
        titulo: 'Hollow Knight',
        genero: 'accion',
        precio: 14.99,
        imagen: '🦗',
        descripcion: 'Un juego de acción metroidvania desafiante y adictivo.',
        calificacion: '★★★★☆'
    },
    {
        id: 5,
        titulo: 'Baldur\'s Gate 3',
        genero: 'rpg',
        precio: 59.99,
        imagen: '🐉',
        descripcion: 'La máxima expresión del RPG de fantasía medieval con miles de opciones.',
        calificacion: '★★★★★'
    },
    {
        id: 6,
        titulo: 'Uncharted 4',
        genero: 'aventura',
        precio: 39.99,
        imagen: '🗺️',
        descripcion: 'La conclusión épica de la saga Uncharted con gráficos espectaculares.',
        calificacion: '★★★★★'
    },
    {
        id: 7,
        titulo: 'Dark Souls 3',
        genero: 'accion',
        precio: 49.99,
        imagen: '💀',
        descripcion: 'El desafío definitivo para jugadores experimentados.',
        calificacion: '★★★★★'
    },
    {
        id: 8,
        titulo: 'The Witcher 3',
        genero: 'rpg',
        precio: 39.99,
        imagen: '🐺',
        descripcion: 'Una epopeya de fantasía con miles de horas de contenido.',
        calificacion: '★★★★★'
    },
    {
        id: 9,
        titulo: 'Tomb Raider',
        genero: 'aventura',
        precio: 29.99,
        imagen: '👩‍🔬',
        descripcion: 'Acompaña a Lara en una emocionante aventura arqueológica.',
        calificacion: '★★★★☆'
    }
];

let carrito = [];
let juegosFiltrados = [];
let generoActual = 'todos';

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    mostrarJuegos(juegos);
    juegosFiltrados = [...juegos];

    // Evento para el carrito
    document.querySelector('.carrito-icon').addEventListener('click', abrirCarrito);
});

// Mostrar juegos en la grid
function mostrarJuegos(juegosAMostrar) {
    const juegosGrid = document.getElementById('juegosGrid');
    juegosGrid.innerHTML = '';

    juegosAMostrar.forEach(juego => {
        const juegosCard = document.createElement('div');
        juegosCard.className = 'juego-card';
        juegosCard.innerHTML = `
            <div class="juego-imagen">${juego.imagen}</div>
            <div class="juego-info">
                <div class="juego-titulo">${juego.titulo}</div>
                <div class="juego-genero">${juego.genero.toUpperCase()}</div>
                <div class="juego-descripcion">${juego.descripcion}</div>
                <div class="juego-calificacion">${juego.calificacion}</div>
                <div class="juego-precio">$${juego.precio.toFixed(2)}</div>
                <button class="btn-comprar" onclick="agregarAlCarrito(${juego.id})">Agregar al Carrito</button>
            </div>
        `;
        juegosGrid.appendChild(juegosCard);
    });
}

// Filtrar por género
function filtrarGenero(genero) {
    generoActual = genero;

    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('activo');
    });
    event.target.classList.add('activo');

    // Filtrar juegos
    if (genero === 'todos') {
        juegosFiltrados = [...juegos];
    } else {
        juegosFiltrados = juegos.filter(j => j.genero === genero);
    }

    mostrarJuegos(juegosFiltrados);
}

// Agregar al carrito
function agregarAlCarrito(juegoId) {
    const juego = juegos.find(j => j.id === juegoId);
    const itemExistente = carrito.find(item => item.id === juegoId);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            ...juego,
            cantidad: 1
        });
    }

    actualizarCarrito();
    mostrarNotificacion(`${juego.titulo} agregado al carrito!`);
}

// Actualizar contador del carrito
function actualizarCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.querySelector('.carrito-count').textContent = totalItems;
}

// Abrir carrito
function abrirCarrito() {
    const modal = document.getElementById('carritoModal');
    const carritoItems = document.getElementById('carritoItems');
    
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #999;">Tu carrito está vacío</p>';
    } else {
        carritoItems.innerHTML = carrito.map(item => `
            <div class="carrito-item">
                <div class="carrito-item-nombre">
                    <div style="font-weight: bold;">${item.titulo}</div>
                    <div style="font-size: 0.9rem; color: #999;">Cantidad: ${item.cantidad}</div>
                </div>
                <div class="carrito-item-precio">$${(item.precio * item.cantidad).toFixed(2)}</div>
                <button class="carrito-item-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </div>
        `).join('');
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('carritoTotal').textContent = total.toFixed(2);

    modal.classList.add('show');
}

// Cerrar carrito
function cerrarCarrito() {
    document.getElementById('carritoModal').classList.remove('show');
}

// Eliminar del carrito
function eliminarDelCarrito(juegoId) {
    carrito = carrito.filter(item => item.id !== juegoId);
    actualizarCarrito();
    abrirCarrito();
    mostrarNotificacion('Juego eliminado del carrito');
}

// Cerrar modal al hacer click fuera
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('carritoModal');
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarCarrito();
        }
    });
});

// Suscribirse al newsletter
function suscribirse(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    mostrarNotificacion(`¡Suscripción exitosa! Revisa tu email en ${email}`);
    e.target.reset();
}

// Función para scroll suave
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    notificacion.textContent = mensaje;

    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

// Cargar los juegos al iniciar
window.addEventListener('load', () => {
    mostrarJuegos(juegos);
});
