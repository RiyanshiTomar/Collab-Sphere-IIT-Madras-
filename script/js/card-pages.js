document.addEventListener('DOMContentLoaded', function() {
    // Create additional background circles
    const bgAnimation = document.querySelector('.bg-animation');
    for (let i = 0; i < 5; i++) {
        const circle = document.createElement('div');
        circle.classList.add('bg-circle');
        const size = Math.random() * 300 + 100;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${posX}%`;
        circle.style.top = `${posY}%`;
        circle.style.animationDelay = `${delay}s`;
        bgAnimation.appendChild(circle);
    }

    // Animate feature cards on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation state
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initialize
});