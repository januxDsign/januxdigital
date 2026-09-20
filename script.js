// ==========================================
// 0. THEME MANAGEMENT (Dark / Light Mode)
// ==========================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    
    const savedTheme = localStorage.getItem('janux_theme');
    const isMobile = window.innerWidth <= 968;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (isMobile) {
        setTheme(systemPrefersDark ? 'dark' : 'light');
    } else {
        setTheme('dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('janux_theme', theme);
    }
}

initTheme();

// ==========================================
// 1. DATABASE OBJECTS
// ==========================================
const servicesData = {
    'logo': { 
        title: 'Logo & Brand Identity', price: '$69', 
        desc: 'Complete branding solutions including primary and secondary logos, color palettes, typography selection, and comprehensive brand guidelines to establish a strong, memorable identity.',
        benefits: ['Multiple custom initial concepts', 'Vector source files (AI, EPS, SVG)', 'Comprehensive brand style guide', 'Full commercial copyright ownership']
    },
    'flyer': { 
        title: 'Flyer Design', price: '$49', 
        desc: 'Eye-catching promotional flyers designed for maximum impact. Available in single-sided or double-sided layouts to perfectly fit your marketing campaign, event announcement, or product launch.',
        benefits: ['High-resolution print-ready files', 'Engaging layout tailored to your audience', 'Custom graphics and typography', 'Optimized for digital sharing'] 
    },
    'billboard': { 
        title: 'Billboard Design', price: '$189', 
        desc: 'High-impact, large-format visual designs tailored for outdoor advertising. We create scalable, high-contrast graphics optimized for readability at a distance to ensure your message grabs attention.',
        benefits: ['Large-format high DPI scaling', 'Legibility optimization for distance', 'Striking visuals for fast attention', 'Exact bleed and margin setup for printers'] 
    },
    'rollup': { 
        title: 'Rollup Banner', price: '$89', 
        desc: 'Portable, professional, and visually engaging vertical banners (standard single-sided). Perfect for events, exhibitions, storefronts, and conferences, delivered with exact print-ready specifications.',
        benefits: ['Standard and custom dimension sizing', 'Eye-level visual hierarchy planning', 'High-quality CMYK color profiles', 'Ready-to-print PDF deliverables']
    }, 
    'booth': { 
        title: 'Trade Show Booth', price: '$249', 
        desc: 'Immersive and professional spatial branding, including large-scale backdrops, podium wraps, and multi-panel promotional displays designed to attract foot traffic and showcase your brand effectively.',
        benefits: ['Seamless multi-panel designs', 'Brand-consistent environment styling', 'High-impact 3D-friendly layouts', 'Detailed print-vendor specifications'] 
    },
    'cards': { 
        title: 'Business Cards', price: '$29', 
        desc: 'Custom, premium business card designs crafted to leave a lasting professional impression. Available in single or double-sided layouts, with strategic spacing for special finishes like foil or embossing.',
        benefits: ['Double-sided modern layouts', 'QR code generation and placement', 'Foil and spot-UV prep files', 'Multiple employee variations included']
    },
    'brochure': { 
        title: 'Brochures', price: '$99', 
        desc: 'Informative and beautifully laid-out marketing materials. Choose from classic bi-fold, versatile tri-fold, z-fold, or comprehensive multi-page booklet designs to elegantly present your products and services.',
        benefits: ['Bi-fold, tri-fold, or multi-page formats', 'Clean grid-based typography', 'Custom icon and graphic elements', 'Print-ready and web-ready formatting']
    },
    'stationery': { 
        title: 'Stationeries', price: '$79', 
        desc: 'Cohesive corporate stationery suites, including custom letterheads, envelopes, and compliment slips, ensuring a unified and professional aesthetic across all your physical business correspondence.',
        benefits: ['Letterhead, envelope, and folder designs', 'MS Word template conversions', 'Consistent brand asset application', 'Sleek, minimalist corporate aesthetics'] 
    },
    'poster': { 
        title: 'Poster Design', price: '$79', 
        desc: 'Striking and creative single-sided posters designed to communicate your event, promotion, or campaign boldly. Delivered in standard print dimensions (A4, A3, A2) or custom sizes.',
        benefits: ['Bold, artistic, and modern themes', 'A-series and custom poster sizing', 'High-resolution photo editing', 'Event-specific visual storytelling']
    },
    'web': { 
        title: 'Web Assets', price: '$9', 
        desc: 'Custom digital graphics tailored for your online presence. This includes website hero banners, social media ad creatives, profile covers, blog graphics, and cohesive UI icon sets.',
        benefits: ['Optimized for web loading speeds', 'RGB color perfection for screens', 'Social media banner variations', 'Ad-compliant text-to-image ratios']
    },
    'info': { 
        title: 'Infographics', price: '$119', 
        desc: 'Visually compelling data visualization. We transform complex information, statistics, and step-by-step processes into easy-to-understand, highly shareable vertical or horizontal graphic layouts.',
        benefits: ['Custom vector illustrations', 'Logical data flow and hierarchy', 'Brand-matched color palettes', 'Web and presentation-ready formats']
    },
    'pack': { 
        title: 'Packaging', price: '$129', 
        desc: 'Creative, brand-aligned packaging designs. Whether you need 3D box layouts, product labels, stand-up pouches, or wrappers, we craft functional designs directly onto your manufacturers die-lines.',
        benefits: ['Custom dielines and structural layout design', 'Print-ready CMYK files with exact bleed margins', 'Photorealistic 3D mockups for presentation', 'Brand-aligned visual aesthetics and typography']
    },
    'cv': { 
        title: 'Resume/CV', price: '$49', 
        desc: 'Professional, clean, and modern layout designs for your resume and cover letter. We offer high-impact single-page designs or structured multi-page formats to properly highlight your career milestones.',
        benefits: ['Clean, ATS-friendly modern layouts', 'Strategic visual hierarchy to highlight key skills', 'Delivered in fully editable Word and PDF formats', 'Customized to your specific industry standards'] 
    },
    'word': { 
        title: 'Word Doc./ Template', price: '$89', 
        desc: 'Professional formatting and branding for your corporate documents. We can build custom, reusable Microsoft Word templates from scratch, or completely refresh, format, and redesign your existing documents for a polished look.',
        benefits: ['Fully editable and reusable Microsoft Word templates', 'Custom branded headers, footers, and cover pages', 'Automated table of contents and defined text styles', 'Locked structural elements to protect brand integrity']
    },
    'ppt': { 
        title: 'PowerPoint Presentation', price: '$89', 
        desc: 'Engaging and professionally structured slide decks. We design custom master slide templates, incorporate impactful infographics, and format your raw content to elevate your pitches, reports, and corporate presentations.',
        benefits: ['Engaging, custom-designed slide layouts', 'Bespoke infographics and data visualization', 'Configured Master Slides for easy future editing', 'Seamless, professional animations and transitions']
    }
};

const footerDocsData = {
    'faq': `
        <h2 style="font-size: 2.5rem; margin-bottom: 30px; color: var(--text-main);">Frequently Asked <span style="color: var(--accent-green);">Questions.</span></h2>
        <div style="color: var(--text-muted); line-height: 1.8; text-align: left;">
            <h3 style="color: var(--accent-green); font-size: 0.9rem; margin-top: 30px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">General & Services</h3>
            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 20px; margin-bottom: 5px;">What types of graphic design services do you provide?</h4>
            <p style="margin-bottom: 15px;">We offer a comprehensive range of digital and print design services, including logo design, brand identity creation, social media graphics, website assets, marketing collateral (flyers, brochures, business cards), and custom illustrations.</p>
            
            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">Do you handle the actual printing of the designs?</h4>
            <p style="margin-bottom: 15px;">We are a digital design studio, meaning we specialize in the creation of the artwork. We will provide you with high-quality, print-ready files that you can take to the printer of your choice. We are happy to recommend trusted printing partners if needed.</p>

            <h3 style="color: var(--accent-green); font-size: 0.9rem; margin-top: 40px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">Process & Timelines</h3>
            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 20px; margin-bottom: 5px;">How does the design process usually work?</h4>
            <p style="margin-bottom: 15px;">Once you accept our project quote, we require a 50% deposit to get started. We then gather your requirements and begin drafting initial concepts. We will present these concepts to you for feedback, complete up to two rounds of revisions based on your input, and then prepare the final files once the remaining balance is paid.</p>

            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">How long will my project take?</h4>
            <p style="margin-bottom: 15px;">Timelines vary widely depending on the scope and complexity of the project. A basic logo might take 1–2 weeks, while a full branding package could take 4–6 weeks. We will provide an estimated completion date in your initial proposal. Keep in mind that quick turnaround times rely on timely feedback and approvals from you.</p>

            <h3 style="color: var(--accent-green); font-size: 0.9rem; margin-top: 40px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">Pricing, Payments & Cancellations</h3>
            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 20px; margin-bottom: 5px;">What are your payment terms?</h4>
            <p style="margin-bottom: 15px;">We require a conditionally refundable 50% deposit before any design work begins. The remaining 50% balance is due upon project completion, just before the final high-resolution files are transferred to you.</p>

            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">What happens if I need to cancel the project? Do I get a refund?</h4>
            <p style="margin-bottom: 15px;">If you cancel the project before any design work has commenced, your 50% deposit is fully refundable. If you cancel the project after we have completed the majority of the work and sent you initial drafts or proofs for feedback, we will refund 25% of your initial deposit. The remainder of the deposit is retained to cover the time, labor, and resources already invested in your project.</p>

            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">Are there any hidden costs?</h4>
            <p style="margin-bottom: 15px;">No. We outline all costs in the initial proposal. The only time your cost will increase is if you request additional work outside the original scope (scope creep), require extra rounds of revisions beyond the two included, or wish to purchase the native source files. We will always notify you and get your approval before adding any extra charges.</p>

            <h3 style="color: var(--accent-green); font-size: 0.9rem; margin-top: 40px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">Revisions & Feedback</h3>
            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 20px; margin-bottom: 5px;">What if I don’t like the initial design concepts?</h4>
            <p style="margin-bottom: 15px;">Design is a collaborative process. Our standard projects include up to two (2) rounds of revisions. If the initial concepts aren't hitting the mark, we will use your detailed feedback during these revision rounds to pivot and refine the design until it aligns with your vision.</p>

            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">What if I need more than two rounds of revisions?</h4>
            <p style="margin-bottom: 15px;">We are happy to continue refining the design until it is perfect. Any revisions requested beyond the two included rounds will simply be billed at our standard hourly rate.</p>

            <h3 style="color: var(--accent-green); font-size: 0.9rem; margin-top: 40px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">Deliverables & Ownership</h3>
            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 20px; margin-bottom: 5px;">What file formats will I receive at the end of the project?</h4>
            <p style="margin-bottom: 15px;">Depending on the project type, we typically deliver flattened, high-resolution files ready for their intended use. This usually includes JPEG and PNG files for digital use, and print-ready PDF files with crop marks and bleed for physical printing.</p>

            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">Will I receive the original source files?</h4>
            <p style="margin-bottom: 15px;">Standard delivery includes the final exported files. Native working files (.ai, .psd, .indd) remain the property of Janux Digital. If you want to own the source files so another designer can edit them in the future, they can be purchased for an additional release fee.</p>

            <h4 style="color: var(--text-main); font-size: 1.1rem; margin-top: 25px; margin-bottom: 5px;">Who owns the copyright to the final designs?</h4>
            <p style="margin-bottom: 15px;">Once the final 50% invoice is paid in full, you are granted exclusive rights and a license to use the final, flattened deliverables for their intended commercial or personal purpose. We only retain the right to display the completed work in our design portfolio and marketing materials.</p>
        </div>
    `,
    'terms': `
        <h2 style="font-size: 2.5rem; margin-bottom: 30px; color: var(--text-main);">Terms & <span style="color: var(--accent-green);">Conditions.</span></h2>
        <div style="color: var(--text-muted); line-height: 1.8; text-align: left;">
            <p style="margin-bottom: 30px;">These Terms and Conditions ("Terms") govern the provision of graphic design services by Janux Digital ("we", "us", or "our") to the client ("you" or "Client"). By requesting a quote, paying an invoice, or engaging Janux Digital for services, you agree to be bound by these Terms.</p>
            
            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">1. Scope of Services</h4>
            <p style="margin-bottom: 15px;">Janux Digital will provide graphic design services as outlined in the accepted quotation, proposal, or statement of work (the "Project"). Any additional work requested outside the original scope will be subject to a separate quotation or billed at our standard hourly rate.</p>
            
            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">2. Quotations and Payment Terms</h4>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Validity:</strong> Quotations are valid for 14 days from the date of issue.</p>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Deposit:</strong> A conditionally refundable deposit of 50% of the total project cost is required before any design work commences.</p>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Final Payment:</strong> The remaining 50% balance is due upon completion of the Project. Final high-resolution and/or source files will not be released to the Client until full payment has been received.</p>
            <p style="margin-bottom: 15px;"><strong style="color: var(--text-main);">Late Fees:</strong> Invoices outstanding for more than 14 days will incur a late fee of 5% of the outstanding balance per month.</p>

            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">3. Revisions and Alterations</h4>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Included Revisions:</strong> Unless specified otherwise in the Project proposal, our standard pricing includes up to two (2) rounds of revisions on the initial design concepts.</p>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Extra Revisions:</strong> Additional revisions beyond the included rounds will be billed at our standard hourly rate.</p>
            <p style="margin-bottom: 15px;"><strong style="color: var(--text-main);">Scope Creep:</strong> Significant changes to the original design brief or project scope after work has commenced will be treated as a new project and quoted accordingly.</p>

            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">4. Client Responsibilities</h4>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Assets:</strong> You must provide all necessary text, images, branding guidelines, and other materials required for the Project in a timely manner.</p>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Copyright of Provided Materials:</strong> You guarantee that any elements of text, graphics, photos, designs, trademarks, or other artwork provided to Janux Digital for inclusion in the design are owned by you, or that you have permission from the rightful owner to use them.</p>
            <p style="margin-bottom: 15px;"><strong style="color: var(--text-main);">Approvals:</strong> You are responsible for thoroughly reviewing all design proofs for accuracy, spelling, and layout before giving final approval. Janux Digital is not responsible for errors found after the final files have been approved and delivered.</p>

            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">5. Intellectual Property and Copyright</h4>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Ownership Upon Completion:</strong> Upon receipt of full payment, you are granted exclusive rights and a license to use the final, flattened deliverables (e.g., PDFs, JPEGs, PNGs) for their intended purpose.</p>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Source Files:</strong> Unless explicitly stated in the quotation, native working files (e.g., Adobe Illustrator .ai, Photoshop .psd, InDesign .indd) remain the property of Janux Digital. If you require the source files, they can be purchased for an additional release fee.</p>
            <p style="margin-bottom: 15px;"><strong style="color: var(--text-main);">Portfolio Rights:</strong> Janux Digital retains the right to display the completed Project and any preliminary concepts in our portfolio, on our website, on social media, and in marketing materials, unless a strict Non-Disclosure Agreement (NDA) is signed prior to the Project's commencement.</p>

            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">6. Project Delays and Abandonment</h4>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">Timely Feedback:</strong> If you fail to provide necessary feedback, approvals, or content within 30 days of a request, Janux Digital reserves the right to close the Project.</p>
            <p style="margin-bottom: 15px;"><strong style="color: var(--text-main);">Reactivation:</strong> If a project is closed due to Client delays, a reactivation fee may apply to resume work, and the remaining balance for work completed up to that point will become immediately due.</p>

            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">7. Cancellation and Refunds</h4>
            <p style="margin-bottom: 10px;"><strong style="color: var(--text-main);">By the Client:</strong> You may cancel the Project at any time by providing written notice. Refunds on the initial 50% deposit are determined by the progress of the Project at the time of cancellation:</p>
            <ul style="margin-bottom: 15px; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>Cancellation before work begins:</strong> If you cancel before any design work has commenced, your 50% deposit is fully refundable.</li>
                <li style="margin-bottom: 8px;"><strong>Cancellation after drafts are provided:</strong> If you cancel the Project after the majority of the work has been completed and initial drafts, proofs, or designs have been provided to you for feedback, Janux Digital will refund only 25% of your initial deposit. We will retain the remaining 75% of the deposit to compensate for the time, labor, and resources invested up to that point.</li>
            </ul>
            <p style="margin-bottom: 15px;"><strong style="color: var(--text-main);">By Janux Digital:</strong> We reserve the right to terminate a project if the Client breaches these Terms, is abusive, or if a working relationship breaks down. In such cases, we will hand over any work completed up to the point of termination and issue a refund or invoice based on the pro-rata work completed.</p>

            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">8. Liability and Warranties</h4>
            <p style="margin-bottom: 15px;">Janux Digital provides its services "as is" and makes no warranties, express or implied, regarding the commercial success or performance of the designs. We will not be liable for any indirect, special, or consequential damages, including loss of profits, data, or business, arising out of or in connection with our services. Our total liability shall not exceed the total amount paid by you for the specific Project.</p>

            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">9. Governing Law</h4>
            <p style="margin-bottom: 15px;">These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Janux Digital is registered, without regard to its conflict of law principles.</p>

            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-top: 30px; margin-bottom: 10px;">10. Contact Information</h4>
            <p style="margin-bottom: 10px;">For any questions or concerns regarding these terms, please contact us at:</p>
            <ul style="list-style: none; padding: 0; margin-bottom: 20px;">
                <li style="margin-bottom: 5px;"><strong style="color: var(--text-main);">Company:</strong> Janux Digital</li>
                <li style="margin-bottom: 5px;"><strong style="color: var(--text-main);">Email:</strong> januxdig@gmail.com</li>
                <li style="margin-bottom: 5px;"><strong style="color: var(--text-main);">Phone:</strong> +94713071106</li>
            </ul>
        </div>
    `
};

// ==========================================
// 2. UI & MODAL FUNCTIONS
// ==========================================
function openServiceXpop(serviceId) {
    const data = servicesData[serviceId];
    const modalBody = document.getElementById('service-xpop-body');
    const benefitsHtml = data.benefits.map(benefit => `<li><span class="check-circle">✓</span> ${benefit}</li>`).join('');
    
    modalBody.innerHTML = `
        <div class="service-xpop-text-only">
            <div class="xpop-details-top">
                <h2 style="margin-top:0; margin-bottom: 15px;">${data.title}</h2>
                <p class="desc" style="margin-bottom: 35px;">${data.desc}</p>
                
                <div class="why-choose-us">
                    <span class="xpop-action-label">WHY CHOOSE THIS SERVICE:</span>
                    <ul class="why-list">
                        ${benefitsHtml}
                    </ul>
                    
                    <a href="https://dribbble.com/janaka-wijerathna/collections" class="xpop-portfolio-btn" onclick="closeServiceXpop()">
                        View My Portfolio ↗
                    </a>
                </div>
            </div>

            <div class="xpop-modern-price-card">
                <div class="price-card-left">
                    <span class="price-sub">Starting Price</span>
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

function closeServiceXpop(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('service-xpop-modal').classList.remove('active');
    document.body.style.overflow = 'auto'; 
}

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

function toggleFloatingContact() {
    const contactWrap = document.getElementById('floating-contact');
    const chatbotWrap = document.getElementById('chatbot-widget');
    
    contactWrap.classList.toggle('active');
    
    // Push the chatbot up if the contact menu is opened
    if (chatbotWrap) {
        if (contactWrap.classList.contains('active')) {
            chatbotWrap.classList.add('contact-expanded');
        } else {
            chatbotWrap.classList.remove('contact-expanded');
        }
    }
}

function toggleAccordion(btn) {
    btn.classList.toggle('active');
    const body = btn.nextElementSibling;
    if (body.style.maxHeight) {
        body.style.maxHeight = null;
        btn.querySelector('span').innerText = '+';
    } else {
        body.style.maxHeight = body.scrollHeight + "px";
        btn.querySelector('span').innerText = '-';
    }
}

// ==========================================
// 3. SCROLL LOGIC & WIDGET VISIBILITY
// ==========================================
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const floatingContact = document.getElementById("floating-contact");
const ctaBanner = document.querySelector(".cta-banner");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) { 
        scrollToTopBtn.classList.add("visible");
    } else {
        scrollToTopBtn.classList.remove("visible");
    }

    if (floatingContact && ctaBanner) {
        const ctaOffset = ctaBanner.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;
        const chatbotWidget = document.getElementById("chatbot-widget");
        
        if (ctaOffset < triggerPoint) {
            // Hide the Let's Talk button and drop the chatbot into the corner
            floatingContact.classList.add("hide-near-bottom");
            if(chatbotWidget) {
                chatbotWidget.classList.add("shift-down");
                chatbotWidget.classList.remove("contact-expanded"); // Prevent overlap
            }
        } else {
            // Bring Let's Talk back and push chatbot up
            floatingContact.classList.remove("hide-near-bottom");
            if(chatbotWidget) {
                chatbotWidget.classList.remove("shift-down");
                // Re-apply height if the contact menu was left open
                if (floatingContact.classList.contains('active')) {
                    chatbotWidget.classList.add('contact-expanded');
                }
            }
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
}

// ==========================================
// 4. GLOBAL INITIALIZATION
// ==========================================
function initAllScripts() {
    
    // Testimonials Swiper
    var mySwiper = new Swiper(".mySwiper", {
        slidesPerView: 3, 
        spaceBetween: 8,  
        loop: true,
        speed: 800, 
        autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        grabCursor: true,
        breakpoints: {
            768: { slidesPerView: 3, spaceBetween: 15 }, 
            1024: { slidesPerView: 4, spaceBetween: 20 },
        },
    });

    // Logo Ticker Swiper
    var logoSwiper = new Swiper(".logoSwiper", {
        slidesPerView: 3, 
        spaceBetween: 15, 
        loop: true,
        speed: 5000,
        autoplay: { delay: 0, disableOnInteraction: false },
        allowTouchMove: false,
        breakpoints: {
            640: { slidesPerView: 4, spaceBetween: 20 }, 
            768: { slidesPerView: 5, spaceBetween: 30 }, 
            1024: { slidesPerView: 6, spaceBetween: 30 },
        },
    });

    // Statistics Counters
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

    // Mobile Hamburger Menu
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

    // Work Experience Cards
    const expCards = document.querySelectorAll('.exp-hover-card');
    expCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn-view-profile')) {
                this.classList.toggle('tap-active');
            }
        });
    });
}

// Execution Wrapper
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllScripts);
} else {
    initAllScripts();
}

// ==========================================
// 5. AI CHATBOT FUNCTIONALITY (Backend Connected)
// ==========================================
let chatHistory = [];

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-widget');
    chatbot.classList.toggle('active');
    if (chatbot.classList.contains('active')) {
        document.getElementById('chatbot-input').focus();
    }
}

function appendChatBubble(text, sender) {
    const container = document.getElementById('chatbot-messages');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = text;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
}

async function handleChatSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('chatbot-input');
    const userMsg = input.value.trim();
    if (!userMsg) return;

    // Display User Message
    appendChatBubble(userMsg, 'user');
    input.value = '';

    // Typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble bot';
    typingBubble.id = 'bot-typing';
    typingBubble.textContent = 'Thinking...';
    document.getElementById('chatbot-messages').appendChild(typingBubble);

    try {
        // Fetch response from your backend server
        // (Change the URL if you host your backend elsewhere)
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                history: chatHistory,
                message: userMsg
            })
        });

        const data = await response.json();
        document.getElementById('bot-typing')?.remove();

        if (data.response) {
            appendChatBubble(data.response, 'bot');
            
            // Save to history for context
            chatHistory.push({ role: 'user', text: userMsg });
            chatHistory.push({ role: 'bot', text: data.response });
        } else {
            appendChatBubble("Sorry, I'm having trouble connecting right now.", 'bot');
        }

    } catch (error) {
        console.error('Chat error:', error);
        document.getElementById('bot-typing')?.remove();
        appendChatBubble("I'm currently offline. Please email januxdig@gmail.com directly.", 'bot');
    }

}
