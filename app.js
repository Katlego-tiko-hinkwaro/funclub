document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".custom-cursor");

    if (cursor) {
        document.addEventListener("mousemove", (event) => {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        });

        document.querySelectorAll("a, button, .service-card, .catalog-card, .select-container").forEach((item) => {
            item.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
            item.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
        });
    }

    const navToggle = document.querySelector(".nav-toggle");
    const navOverlay = document.querySelector(".nav-overlay");

    if (navToggle && navOverlay) {
        navToggle.addEventListener("click", () => {
            const isOpen = navOverlay.classList.toggle("open");
            navToggle.classList.toggle("nav-active", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navOverlay.querySelectorAll(".nav-link-item").forEach((link) => {
            link.addEventListener("click", () => {
                navOverlay.classList.remove("open");
                navToggle.classList.remove("nav-active");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const revealElements = document.querySelectorAll(".scroll-reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add("active"));
    }

    const catalogFilterButtons = document.querySelectorAll(".catalog-filter-btn");
    const catalogCards = document.querySelectorAll(".catalog-card");

    catalogFilterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selected = button.dataset.cat;

            catalogFilterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            catalogCards.forEach((card) => {
                const category = card.dataset.category;
                const shouldShow = selected === "all" || category === selected;
                card.style.display = shouldShow ? "block" : "none";
            });
        });
    });

    const contactForm = document.getElementById("mainContactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Branding request received!");
            contactForm.reset();
        });
    }

    const track = document.querySelector(".carousel-track");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (track && nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: 320, behavior: "smooth" });
        });

        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -320, behavior: "smooth" });
        });
    }
});