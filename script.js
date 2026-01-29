document.addEventListener('DOMContentLoaded', () => {

    /* ================= 1. HEADER SCROLL ================= */
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('header--scrolled', window.scrollY > 50);
        });
    }

    /* ================= 2. HERO CAROUSEL ================= */
    const heroSlides = document.querySelectorAll('.hero__slide');
    let heroIndex = 0;

    const showHeroSlide = (index) => {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    };

    if (heroSlides.length > 0) {
        showHeroSlide(0); 
        setInterval(() => {
            heroIndex = (heroIndex + 1) % heroSlides.length;
            showHeroSlide(heroIndex);
        }, 5000);
    }

    /* ================= 3. RESORT ACCORDION ================= */
    const resortCards = document.querySelectorAll('.resort-card');
    resortCards.forEach(card => {
        const cardHeader = card.querySelector('.resort-card__header');
        if (cardHeader) {
            cardHeader.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                resortCards.forEach(c => c.classList.remove('active'));
                if (!isActive) card.classList.add('active');
            });
        }
    });

    /* ================= 4. GERADOR DE CAMPOS DE IDADE ================= */
    const qtySelect = document.getElementById('children-qty');
    const agesWrapper = document.getElementById('ages-wrapper');
    const childrenGrid = document.getElementById('children-grid');

    if (qtySelect) {
        qtySelect.addEventListener('change', function() {
            const qty = parseInt(this.value);
            if (childrenGrid) {
                childrenGrid.innerHTML = ''; 

                if (qty > 0) {
                    if (agesWrapper) agesWrapper.style.display = 'block';
                    for (let i = 1; i <= qty; i++) {
                        const item = document.createElement('div');
                        item.className = 'child-age-item';
                        let options = '';
                        for (let idade = 0; idade <= 12; idade++) {
                            options += `<option value="${idade}">${idade} ${idade === 1 ? 'ano' : 'anos'}</option>`;
                        }
                        item.innerHTML = `
                            <label>Criança ${i}</label>
                            <select name="idade_crianca_${i}" required>${options}</select>
                        `;
                        childrenGrid.appendChild(item);
                    }
                } else {
                    if (agesWrapper) agesWrapper.style.display = 'none';
                }
            }
        });
    }

    /* ================= 5. WHATSAPP / FORMULÁRIO ================= */
    const bookingForm = document.getElementById('booking-form');
    
    const enviarParaWhatsApp = (event) => {
        event.preventDefault();

        const checkin = document.getElementById('checkin')?.value;
        const checkout = document.getElementById('checkout')?.value;
        const adults = document.getElementById('adults')?.value;
        const childrenQty = document.getElementById('children-qty')?.value || "0";

        if (!checkin || !checkout) {
            alert("Por favor, preencha as datas da viagem.");
            return;
        }

        let idadesTexto = 'Nenhuma criança';
        if (childrenGrid && childrenGrid.children.length > 0) {
            const idades = [];
            const selects = childrenGrid.querySelectorAll('select');
            selects.forEach(select => idades.push(select.value + " anos"));
            idadesTexto = idades.join(', ');
        }

        const formatarData = (data) => data.split('-').reverse().join('/');
        const message = `Olá, vim pelo site e gostaria de informações:\n\n*Check-in:* ${formatarData(checkin)}\n*Check-out:* ${formatarData(checkout)}\n*Adultos:* ${adults}\n*Crianças:* ${childrenQty}\n*Idades:* ${idadesTexto}`;

        window.open(`https://wa.me/551732811500?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (bookingForm) bookingForm.addEventListener('submit', enviarParaWhatsApp);

    /* ================= 6. BLOQUEIO DE DATAS ================= */
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput && checkoutInput) {
        const hoje = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('min', hoje);

        checkinInput.addEventListener('change', function() {
            checkoutInput.setAttribute('min', this.value);
            if (checkoutInput.value && checkoutInput.value < this.value) {
                checkoutInput.value = '';
            }
        });
    }

    /* ================= 7. TESTIMONIALS CAROUSEL ================= */
    const track = document.querySelector('.testimonials__track');
    if (track) {
        const testimonialSlides = Array.from(track.children);
        const nextButton = document.querySelector('.btn--next');
        let currentIndex = 0;

        const slidesPerView = () => (window.innerWidth < 768 ? 1 : 3);

        const moveToSlide = (index) => {
            const maxIndex = testimonialSlides.length - slidesPerView();
            currentIndex = index > maxIndex ? 0 : index;
            const cardWidth = testimonialSlides[0].offsetWidth;
            const gap = parseInt(getComputedStyle(track).gap) || 0;
            track.style.transform = `translateX(-${(cardWidth + gap) * currentIndex}px)`;
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
        }

        setInterval(() => moveToSlide(currentIndex + 1), 4000);
    }
});