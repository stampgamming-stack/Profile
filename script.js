// ===== Cursor Follower (Desktop only) =====
const cursor = document.getElementById('cursor');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const revealItems = document.querySelectorAll('.reveal-item');

    revealItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if element is in viewport
        if (rect.top < windowHeight - 80) {
            // Add staggered delay based on index within same section
            setTimeout(() => {
                item.classList.add('revealed');
            }, index * 80);
        }
    });
}

// Initial check on load
window.addEventListener('load', () => {
    revealOnScroll();
});

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===== Background Parallax on Scroll =====
const geometricBg = document.getElementById('geometricBg');
const circles = document.querySelectorAll('.circle');
const lines = document.querySelectorAll('.line');

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Move circles with different speeds
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 0.05;
                const rotation = scrollY * 0.02 * (index % 2 === 0 ? 1 : -1);
                circle.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
            });

            // Move lines with scroll
            lines.forEach((line, index) => {
                const speed = (index + 1) * 0.08;
                const direction = index % 2 === 0 ? 1 : -1;
                line.style.transform = `translateY(${scrollY * speed * direction}px)`;
            });

            ticking = false;
        });
        ticking = true;
    }
});

// ===== Mouse Parallax for Background =====
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Disable on mobile

    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    circles.forEach((circle, index) => {
        const speed = (index + 1) * 6;
        const currentTransform = circle.style.transform || '';
        const scrollPart = currentTransform.match(/translateY\([^)]+\)/) || [''];
        circle.style.transform = `${scrollPart[0]} translate(${x * speed}px, ${y * speed}px)`;
    });

    lines.forEach((line, index) => {
        const speed = (index + 1) * 4;
        const currentTransform = line.style.transform || '';
        const scrollPart = currentTransform.match(/translateY\([^)]+\)/) || [''];
        line.style.transform = `${scrollPart[0]} translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Nav Active State =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text-primary)';
        }
    });
});

// ===== Image Frame Hover Effect =====
const imageFrame = document.querySelector('.image-frame');
if (imageFrame) {
    imageFrame.addEventListener('mouseenter', function () {
        this.style.borderColor = 'var(--accent-gold)';
        this.style.boxShadow = '0 25px 70px rgba(201, 169, 98, 0.15)';
    });

    imageFrame.addEventListener('mouseleave', function () {
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });
}

// ===== Social Card Tilt Effect =====
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        if (window.innerWidth < 768) return;

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translateY(-6px) perspective(800px) rotateY(${x * 0.03}deg) rotateX(${-y * 0.03}deg)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// ===== Interest Items Animation =====
document.querySelectorAll('.interest-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Console Message =====
console.log('%c S ', 'background: #c9a962; color: #0a0a0f; font-size: 32px; font-weight: 300; font-family: serif; padding: 10px 20px;');
console.log('%cSTAMP | INFP 5w4', 'color: #7b9fd4; font-size: 12px; letter-spacing: 3px;');
