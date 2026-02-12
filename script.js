// CONFIGURATION
const groupID = 10261023;
const slideImages = [
    'images/main banner.jpeg',
    'images/washiez car wash.webp',
    'images/application center.webp',
];
let currentSlide = 0;

// 1. ROBLOX MEMBER COUNT
async function fetchMemberCount() {
    const countElement = document.getElementById('member-count');
    try {
        const response = await fetch(`https://groups.roproxy.com/v1/groups/${groupID}`);
        const data = await response.json();
        if (data && data.memberCount) {
            animateValue(countElement, 0, data.memberCount, 2500);
        }
    } catch (err) {
        animateValue(countElement, 0, 1954770, 2000); 
    }
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// 2. HERO IMAGE SLIDER (5 SECONDS)
function rotateHero() {
    const hero = document.getElementById('dashboard');
    currentSlide = (currentSlide + 1) % slideImages.length;
    hero.style.backgroundImage = `linear-gradient(to bottom, rgba(8, 8, 8, 0.2), #080808), url('${slideImages[currentSlide]}')`;
}

// 3. FAQ DROPDOWNS
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.classList.toggle('active');
        const icon = btn.querySelector('.icon');
        icon.innerText = btn.parentElement.classList.contains('active') ? '-' : '+';
    });
});

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    fetchMemberCount();
    setInterval(rotateHero, 5000); // 5-second interval
});


10261023