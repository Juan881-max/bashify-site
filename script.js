document.addEventListener('DOMContentLoaded', () => {
    // 1. Desplazamiento Suave para Enlaces de Navegación (y otros enlaces con #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento de salto instantáneo por defecto

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Utiliza scrollIntoView con comportamiento 'smooth'
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Desplaza hasta el inicio del elemento
                });

                // Opcional: Actualizar la URL sin saltar
                // history.pushState(null, null, targetId);
            }
        });
    });

    // 2. Animación al Hacer Scroll usando Intersection Observer
    // Permite detectar cuando un elemento entra o sale del viewport (área visible)

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll'); // Selecciona todos los elementos con esta clase

    const observerOptions = {
        threshold: 0.1, // Porcentaje del elemento que debe ser visible para activar la animación (10%)
        rootMargin: '0px 0px -50px 0px' // Ajusta el área de detección (activa 50px antes de llegar al final del viewport)
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento está visible
                entry.target.classList.add('is-visible'); // Añade la clase para mostrarlo y animarlo
                // Opcional: Dejar de observar el elemento si solo quieres que se anime una vez
                // observer.unobserve(entry.target);
            } else {
                 // Opcional: Quitar la clase si quieres que la animación se reinicie al salir del viewport
                 // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Observa cada elemento que tiene la clase .animate-on-scroll
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});