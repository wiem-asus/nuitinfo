// ===== CONFIGURATION EMAILJS =====
const EMAILJS_CONFIG = {
    serviceID: 'service_bbvcq7t',
    templateID: 'template_xm7tiwg',
    publicKey: '8yirvKyjd71BTf4Yu'
};

// Initialisation d'EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

// ===== ÉLÉMENTS DU DOM =====
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const popupOverlay = document.getElementById('popupOverlay');
const popupClose = document.getElementById('popupClose');
const charCounter = document.getElementById('charCounter');
const title = document.getElementById('mainTitle');
const customCursor = document.getElementById('customCursor');
const eggNotification = document.getElementById('eggNotification');
const eggCountDisplay = document.getElementById('eggCount');

// ===== COMPTEUR EASTER EGGS =====
let easterEggsFound = 0;
const easterEggsTotal = 7;

function unlockEasterEgg(message) {
    if (easterEggsFound < easterEggsTotal) {
        easterEggsFound++;
        eggCountDisplay.textContent = easterEggsFound;
        showEggNotification(message);
        
        if (easterEggsFound === easterEggsTotal) {
            showEggNotification('🏆 TOUS LES EASTER EGGS TROUVÉS! Tu es un champion!');
            activateUltimateMode();
        }
    }
}

function showEggNotification(message) {
    eggNotification.textContent = message;
    eggNotification.classList.add('show');
    
    setTimeout(() => {
        eggNotification.classList.remove('show');
    }, 3000);
}

// ===== CURSEUR PERSONNALISÉ =====
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    customCursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    customCursor.classList.remove('active');
});

// ===== PARTICULES ANIMÉES =====
function createParticles() {
    const particles = document.getElementById('particles');
    const emojis = ['✨', '⭐', '💫', '🌟', '✨', '🎨', '🎭', '🎪'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        particle.style.animationDelay = Math.random() + 's';
        
        particles.appendChild(particle);
        
        setTimeout(() => particle.remove(), 8000);
    }, 500);
}

createParticles();

// ===== COMPTEUR DE CARACTÈRES =====
messageInput.addEventListener('input', () => {
    const count = messageInput.value.length;
    charCounter.textContent = `${count} caractères`;
    
    if (count > 500) {
        charCounter.style.color = '#e74c3c';
    } else if (count > 300) {
        charCounter.style.color = '#f39c12';
    } else {
        charCounter.style.color = '#999';
    }
});

// ===== VALIDATION EN TEMPS RÉEL =====
function validateField(input, errorId, validationFn) {
    const errorElement = document.getElementById(errorId);
    const formGroup = input.parentElement;
    
    input.addEventListener('blur', () => {
        const error = validationFn(input.value);
        if (error) {
            formGroup.classList.add('error');
            errorElement.textContent = error;
        } else {
            formGroup.classList.remove('error');
            errorElement.textContent = '';
        }
    });
    
    input.addEventListener('input', () => {
        if (formGroup.classList.contains('error')) {
            const error = validationFn(input.value);
            if (!error) {
                formGroup.classList.remove('error');
                errorElement.textContent = '';
            }
        }
    });
}

validateField(nameInput, 'nameError', (value) => {
    if (!value.trim()) return 'Le nom est requis';
    if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
    return null;
});

validateField(emailInput, 'emailError', (value) => {
    if (!value.trim()) return 'L\'email est requis';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Format d\'email invalide';
    return null;
});

validateField(subjectInput, 'subjectError', (value) => {
    if (!value.trim()) return 'Le sujet est requis';
    if (value.trim().length < 3) return 'Le sujet doit contenir au moins 3 caractères';
    return null;
});

validateField(messageInput, 'messageError', (value) => {
    if (!value.trim()) return 'Le message est requis';
    if (value.trim().length < 10) return 'Le message doit contenir au moins 10 caractères';
    if (value.length > 1000) return 'Le message est trop long (max 1000 caractères)';
    return null;
});

// ===== SOUMISSION DU FORMULAIRE =====
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const errors = [];
    if (!nameInput.value.trim()) errors.push('nom');
    if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) errors.push('email');
    if (!subjectInput.value.trim()) errors.push('sujet');
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) errors.push('message');
    
    if (errors.length > 0) {
        alert('⚠️ Veuillez remplir correctement tous les champs requis');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = '✨ Envoi en cours...';
    
    try {
        const templateParams = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        };
        
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );
        
        console.log('✅ Email envoyé avec succès!', response);
        
        showSuccessPopup();
        
        form.reset();
        charCounter.textContent = '0 caractères';
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi:', error);
        alert('Oups ! Une erreur est survenue. Réessaye dans quelques instants. 🔄');
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Envoyer la magie';
    }
});

// ===== POPUP DE SUCCÈS =====
function showSuccessPopup() {
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    createConfetti();
    createFireworks();
}

popupClose.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== CONFETTIS =====
function createConfetti() {
    const confettiCount = 100;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = '1';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '99999';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 3000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 20);
    }
}

// ===== FEUX D'ARTIFICE =====
function createFireworks() {
    const fireworks = document.getElementById('fireworks');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = Math.random() * 100 + '%';
            const y = Math.random() * 100 + '%';
            
            for (let j = 0; j < 20; j++) {
                const spark = document.createElement('div');
                spark.style.position = 'absolute';
                spark.style.left = x;
                spark.style.top = y;
                spark.style.width = '4px';
                spark.style.height = '4px';
                spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                spark.style.borderRadius = '50%';
                
                fireworks.appendChild(spark);
                
                const angle = (Math.PI * 2 * j) / 20;
                const velocity = 50 + Math.random() * 50;
                
                spark.animate([
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px)`, opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                }).onfinish = () => spark.remove();
            }
        }, i * 300);
    }
}

// ===== EASTER EGGS =====

// 1. CODE SIMPLIFIÉ - 2x HAUT + 2x BAS
let simpleCode = [];
const simpleSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
let simpleCodeFound = false;

document.addEventListener('keydown', (e) => {
    simpleCode.push(e.key);
    simpleCode = simpleCode.slice(-4);
    
    if (JSON.stringify(simpleCode) === JSON.stringify(simpleSequence) && !simpleCodeFound) {
        simpleCodeFound = true;
        activatePartyMode();
        unlockEasterEgg('🎮 Easter Egg #1: Code Secret débloqué! ↑↑↓↓');
    }
});

// 2. CLICS SUR LE TITRE
let titleClickCount = 0;
let titleClickTimer = null;
let titleEggFound = false;

title.addEventListener('click', () => {
    titleClickCount++;
    
    if (titleClickTimer) clearTimeout(titleClickTimer);
    
    if (titleClickCount === 5 && !titleEggFound) {
        titleEggFound = true;
        activateNeonMode();
        unlockEasterEgg('🎯 Easter Egg #2: Mode Néon activé!');
        titleClickCount = 0;
    }
    
    titleClickTimer = setTimeout(() => {
        titleClickCount = 0;
    }, 2000);
});

// 3. MOT MAGIQUE DANS LE MESSAGE
let magicWordFound = false;
let konamiWordFound = false;

messageInput.addEventListener('input', () => {
    const text = messageInput.value.toLowerCase();
    
    if (text.includes('magic') && !magicWordFound) {
        magicWordFound = true;
        activateMagicMode();
        unlockEasterEgg('🎨 Easter Egg #3: Mode Magique débloqué!');
    }
    
    if (text.includes('konami') && !konamiWordFound) {
        konamiWordFound = true;
        activateDiscoMode();
        unlockEasterEgg('🕺 Easter Egg #4: Mode Disco activé!');
    }
});

// 4. SECOUER LA SOURIS
let mouseShakeCount = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let shakeEggFound = false;

document.addEventListener('mousemove', (e) => {
    const deltaX = Math.abs(e.clientX - lastMouseX);
    const deltaY = Math.abs(e.clientY - lastMouseY);
    
    if (deltaX > 50 || deltaY > 50) {
        mouseShakeCount++;
        
        if (mouseShakeCount > 30 && !shakeEggFound) {
            shakeEggFound = true;
            createExplosion(e.clientX, e.clientY);
            unlockEasterEgg('💥 Easter Egg #5: Explosion de souris!');
        }
    }
    
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

// 5. DOUBLE-CLIC SUR EMOJIS
const emoji1 = document.getElementById('emoji1');
const emoji2 = document.getElementById('emoji2');
let emojiEggFound = false;

const emojiList = ['🎭', '🎪', '🎨', '🎬', '🎤', '🎧', '🎸', '🎹', '🎺', '🎻'];

emoji1.addEventListener('dblclick', () => {
    emoji1.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
    if (!emojiEggFound) {
        emojiEggFound = true;
        unlockEasterEgg('🎭 Easter Egg #6: Emojis magiques!');
    }
});

emoji2.addEventListener('dblclick', () => {
    emoji2.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
});

// 6. HOVER PROLONGÉ SUR LE BOUTON
let hoverTimer = null;
let hoverEggFound = false;

submitBtn.addEventListener('mouseenter', () => {
    hoverTimer = setTimeout(() => {
        if (!hoverEggFound) {
            hoverEggFound = true;
            submitBtn.innerHTML = '🚀 TURBO MODE ACTIVÉ! 🚀';
            unlockEasterEgg('⚡ Easter Egg #7: Turbo Mode débloqué!');
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="btn-text">Envoyer la magie</span><span class="btn-icon">🚀</span>';
            }, 2000);
        }
    }, 3000);
});

submitBtn.addEventListener('mouseleave', () => {
    if (hoverTimer) clearTimeout(hoverTimer);
});

// ===== MODES SPÉCIAUX =====
function activatePartyMode() {
    document.body.classList.add('party-mode');
    setTimeout(() => document.body.classList.remove('party-mode'), 5000);
}

function activateNeonMode() {
    document.body.classList.add('neon-mode');
    setTimeout(() => document.body.classList.remove('neon-mode'), 5000);
}

function activateDiscoMode() {
    document.body.classList.add('disco-mode');
    setTimeout(() => document.body.classList.remove('disco-mode'), 5000);
}

function activateMagicMode() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    let colorIndex = 0;
    
    const interval = setInterval(() => {
        document.body.style.background = `linear-gradient(135deg, ${colors[colorIndex % colors.length]}, ${colors[(colorIndex + 1) % colors.length]})`;
        colorIndex++;
    }, 200);
    
    setTimeout(() => {
        clearInterval(interval);
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 5000);
}

function activateUltimateMode() {
    document.body.style.animation = 'rainbow 1s linear infinite, shake 0.5s infinite';
    createConfetti();
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

function createExplosion(x, y) {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = (5 + Math.random() * 10) + 'px';
        particle.style.height = (5 + Math.random() * 10) + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '99999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 100 + Math.random() * 100;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

console.log('🎨 Formulaire de contact ULTRA chargé!');
console.log('🎮 Trouve les 7 Easter Eggs cachés...');
console.log('💡 Indices: Konami, clics, mots magiques, souris, emojis, et plus!');