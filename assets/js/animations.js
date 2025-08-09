const animatedEls = document.querySelectorAll(".animated");
const heroAnimatedEls = document.querySelectorAll(".hero-animated");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            // Set staggered delay for each element
            entry.target.style.setProperty("--delay", `${i * 0.1}s`);
            
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                
                // Re-enable pointer events after animation completes
                entry.target.addEventListener(
                    "transitionend",
                    function handler(event) {
                        if (event.propertyName === "opacity") {
                            entry.target.style.pointerEvents = "auto";
                            entry.target.removeEventListener("transitionend", handler);
                        }
                    }
                );
            } else {
                entry.target.classList.remove("show");
                entry.target.style.pointerEvents = "none";
            }
        });
    },
    { threshold: 0.1 }
);

// Observe for hero animations as well
const heroObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            // Set staggered delay for hero elements
            entry.target.style.setProperty("--delay", `${i * 0.2}s`);
            
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    },
    { threshold: 0.1 }
);

// Observe all animated elements
animatedEls.forEach((el) => observer.observe(el));
heroAnimatedEls.forEach((el) => heroObserver.observe(el));