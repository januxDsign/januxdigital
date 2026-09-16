// ==========================================
// 1. DATABASE OBJECTS
// ==========================================

const servicesData = {
    'logo': { 
        title: 'Logo & Brand Identity', price: '$150', 
        desc: 'Complete branding solutions to establish a strong, memorable identity.' 
    },
    'flyer': { 
        title: 'Flyer Design', price: '$45', 
        desc: 'Eye-catching flyer designs for marketing campaigns and events.' 
    },
    'billboard': { 
        title: 'Billboard Design', price: '$200', 
        desc: 'High-impact large-format designs optimized for readability.' 
    },
    'rollup': { 
        title: 'Rollup Banner', price: '$80', 
        desc: 'Professional standalone banners for trade shows and retail spaces.' 
    },
    'booth': { 
        title: 'Trade Show Booth', price: '$250', 
        desc: 'Comprehensive visual design for event booths and backdrops.' 
    },
    'cards': { 
        title: 'Business Cards', price: '$30', 
        desc: 'Premium, custom business card layouts ready for print.' 
    },
    'brochure': { 
        title: 'Brochures', price: '$100', 
        desc: 'Multi-page informational layouts that present products with clarity.' 
    },
    'stationery': { 
        title: 'Stationeries', price: '$75', 
        desc: 'Unified corporate stationery kits including letterheads and envelopes.' 
    },
    'poster': { 
        title: 'Poster Design', price: '$50', 
        desc: 'Creative and artistic poster layouts for events and retail.' 
    },
    'web': { 
        title: 'Web Assets', price: '$90', 
        desc: 'Digital asset packages including social media headers and ad banners.' 
    },
    'info': { 
        title: 'Infographics', price: '$120', 
        desc: 'Transforming complex data into visually engaging, easy-to-understand graphics.' 
    }
};

const footerDocsData = {
    'faq': `<h2 style="font-size: 2.5rem; margin-bottom: 30px;">Frequently Asked <span style="color: var(--accent-green);">Questions.</span></h2><div style="color: var(--text-muted); line-height: 1.8; text-align: left;"><h4 style="color: #fff; font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">How do we start a project?</h4><p>Simply reach out via email or WhatsApp. We will discuss your requirements, establish a timeline, and begin the creative process.</p><h4 style="color: #fff; font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">What is your turnaround time?</h4><p>Turnaround times vary based on project complexity. Standard graphic assets usually take 2-4 days, while comprehensive branding guidelines may take up to 2 weeks.</p><h4 style="color: #fff; font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">Do you offer revisions?</h4><p>Absolutely. All of my design packages include a set number of revisions to ensure you are 100% satisfied with the final product before handoff.</p></div>`,
    'terms': `<h2 style="font-size: 2.5rem; margin-bottom: 30px;">Terms & <span style="color: var(--accent-green);">Conditions.</span></h2><div style="color: var(--text-muted); line-height: 1.8; text-align: left;"><p style="margin-bottom: 25px;">By engaging with Janux Digital design services, you agree to the following standard operating terms:</p><h4 style="color: #fff; font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">1. Payment Terms</h4><p>A standard 50% deposit is required before any creative work begins. The remaining balance will be invoiced and is due upon approval of the final design, prior to the release of source files.</p><h4 style="color: #fff; font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">2. Intellectual Property</h4><p>Upon receipt of full and final payment, complete commercial usage rights and ownership of the final design assets are transferred to the client. I reserve the right to display the finalized work within my personal design portfolio.</p><h4 style="color: #fff; font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">3. Project Cancellations</h4><p>If a project is cancelled by the client after creative work has commenced, the initial deposit remains non-refundable to cover the time, research, and creative labor already invested.</p></div>`
};

// ==========================================
// 2. MODAL FUNCTIONS (Global Scope)
// ==========================================

// Open Service xpop (Text & Price Only)
function openServiceXpop(serviceId) {
    const data = servicesData[serviceId];
    const modalBody = document.getElementById('service-xpop-body');
    
    modalBody.innerHTML = `
        <div class="service-xpop-text-only">
            
            <!-- Top Section: Text & Benefits -->
            <div class="xpop-details-top">
                <h2 style="margin-top:0; margin-bottom: 15px;">${data.title}</h2>
                <p class="desc" style="margin-bottom: 35px;">${data.desc}</p>
                
                <div class="why-choose-us">
                    <span class="xpop-action-label" style="margin-bottom: 25px; color: var(--accent-green);">WHY CHOOSE THIS SERVICE:</span>
                    <ul class="why-list">
                        <li><span class="check-circle">✓</span> Premium, custom designs tailored to your brand</li>
                        <li><span class="check-circle">✓</span> Fast turnaround with reliable communication</li>
                        <li><span class="check-circle">✓</span> Source files and commercial rights included</li>
                        <li><span class="check-circle">✓</span> Revisions to ensure 100% satisfaction</li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Section: Modern Sticky Price Card -->
            <div class="xpop-modern-price-card">
                <div class="price-card-left">
                    <span class="price-sub">Starting Investment</span>
                </div>
                <div class="price-card-right">
                    <span class="price-big">${data.price}</span>
                </div>
            </div>
            
        </div>
    `;
    
    document.getElementById('service-xpop-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

// Close Service xpop
function closeServiceXpop(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('service-xpop-modal').classList.remove('active');
    document.body.style.overflow = 'auto'; // Restores background scrolling
}

// Footer Documents Modals
function openFooterXpop(docType, event) {
    event.preventDefault(); 
    document.getElementById('footer-xpop-body').innerHTML = footerDocsData[docType];
    document.getElementById('footer-xpop-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeFooterXpop(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('footer-xpop-modal').classList.remove('active');
    document.body.style.overflow = 'auto'; 
}

// Toggle Floating Contact Widget
function toggleFloatingContact() {
    document.getElementById('floating-contact').classList.toggle('active');
}

// ==========================================
// SCROLL TO TOP LOGIC
// ==========================================
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    // Shows the button after scrolling down 400px
    if (window.scrollY > 400) { 
        scrollToTopBtn.classList.add("visible");
    } else {
        scrollToTopBtn.classList.remove("visible");
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Creates a gliding animation instead of instantly snapping
    });
}

// ==========================================
// 3. BULLETPROOF INITIALIZATION
// ==========================================

function initAllScripts() {
    
    // 1. Testimonials Swiper
    var mySwiper = new Swiper(".mySwiper", {
        slidesPerView: 1, /* FIX: Shows only 1 slide on mobile */
        spaceBetween: 15,
        loop: true,
        speed: 800, 
        autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        grabCursor: true,
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 }, /* Tablets show 2 */
            1024: { slidesPerView: 3, spaceBetween: 30 }, /* Desktops show 3 */
        },
    });

    // 2. Continuous Logo Ticker
    var logoSwiper = new Swiper(".logoSwiper", {
        slidesPerView: 2, /* FIX: Shows 4 logos at a time on mobile */
        spaceBetween: 10, /* Slightly reduced space so 4 fit nicely on small screens */
        loop: true,
        speed: 5000,
        autoplay: { delay: 0, disableOnInteraction: false },
        allowTouchMove: false,
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 6, spaceBetween: 30 },
        },
    });

    // 3. Number Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 40; 
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // 4. Mobile Hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinksMobile = document.querySelectorAll('nav ul li a');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            if(hamburger) hamburger.classList.remove('active');
            if(navMenu) navMenu.classList.remove('active');
        });
    });

    // 5. Mobile Tap-to-Hover for Work Experience Cards
    const expCards = document.querySelectorAll('.exp-hover-card');
    expCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent the click from triggering if they are tapping the "View Profile" button
            if (!e.target.closest('.btn-view-profile')) {
                this.classList.toggle('tap-active');
            }
        });
    });
}

// Ensure scripts run whether the DOM is already loaded or is still loading
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllScripts);
} else {
    initAllScripts();
}