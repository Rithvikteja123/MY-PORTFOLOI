// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// get scroll value
lenis.on('scroll', (e) => {
    // maybe tie some manual animations here if needed
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hover states for cursor
const hoverElements = document.querySelectorAll('a, button, .sticker, .assignment-card, .about-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});


// Typing Animation
const typedTextElement = document.getElementById('typed-text');
const textToType = "I build fast, practical, and clean web applications.";
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        typedTextElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50); // Typing speed
    } else {
        // Add flashing cursor at the end
        typedTextElement.innerHTML += '<span class="cursor-blink">|</span>';
        // Flashing cursor CSS logic handled via inline style or tiny animation below
        const blinker = document.querySelector('.cursor-blink');
        setInterval(() => {
            blinker.style.opacity = blinker.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
}
// Start typing after a short delay
setTimeout(typeWriter, 500);

// Random tilt for stickers in CSS
document.querySelectorAll('.sticker').forEach(sticker => {
    // Random value between 0 and 1 for the CSS var
    sticker.style.setProperty('--rand', Math.random());
});

// GSAP Animations
// 1. Hero Notes fly in from the sides playfully
gsap.from('.sticky-note', {
    x: () => (Math.random() > 0.5 ? 1 : -1) * (window.innerWidth / 2 + 200),
    y: () => (Math.random() > 0.5 ? 1 : -1) * (window.innerHeight / 2 + 200),
    rotation: () => Math.random() * 180 - 90,
    scale: 1.5,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "back.out(2)",
    delay: 0.2
});

// 2. About Card Pop
gsap.from('.about-card', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    rotation: -5,
    duration: 1,
    ease: "power3.out"
});



// 4. Projects Cards Dynamic Pop
gsap.from('.assignment-card', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
    },
    y: 100,
    scale: 0.5,
    rotation: () => Math.random() * 10 - 5,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "back.out(1.7)",
    clearProps: "all"
});

// 5. Certificate Book Logic
let globalZ = 100;
window.turnPage = function(event, page) {
    if(event.target.tagName.toLowerCase() === 'a') return;
    
    const book = page.closest('.cert-book');
    
    if (page.classList.contains('flipped')) {
        page.classList.remove('flipped');
        page.style.zIndex = globalZ++;
    } else {
        page.classList.add('flipped');
        page.style.zIndex = globalZ++;
    }
    
    const flippedPages = book.querySelectorAll('.flipped').length;
    if (flippedPages > 0) {
        book.classList.add('opened');
    } else {
        book.classList.remove('opened');
    }
};

// Theme Toggle (Terminal Mode)
const themeBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement; // using body for attribute

themeBtn.addEventListener('click', () => {
    const isTerminal = document.body.getAttribute('data-theme') === 'terminal';
    
    if (isTerminal) {
        document.body.removeAttribute('data-theme');
        themeBtn.innerHTML = '<i class="fas fa-terminal"></i> <span class="toggle-text">Terminal Mode</span>';
    } else {
        document.body.setAttribute('data-theme', 'terminal');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i> <span class="toggle-text">Notebook Mode</span>';
    }
});
