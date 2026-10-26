// Typing effect
const words = ["Web Developer", "Creative Designer", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.querySelector(".typing-text");

function typingEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingElement.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typingEffect, 1800);
            return;
        }
    } else {
        typingElement.textContent = currentWord.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typingEffect, deleting ? 55 : 90);
}

typingEffect();

/* Mobile navigation */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

/* Source code viewer */
const sourceModal = document.getElementById("sourceModal");
const sourceCode = document.getElementById("sourceCode");
const sourceTabs = document.querySelectorAll(".source-tab");
const sourceButtons = document.querySelectorAll(".source-btn");
const closeModal = document.querySelector(".close-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");
const copyButton = document.querySelector(".copy-code");

const sourceFiles = {
    html: window.SOURCE_HTML || "",
    css: window.SOURCE_CSS || "",
    js: window.SOURCE_JS || ""
};

function showSource(tabName) {
    if (!sourceCode) return;

    sourceTabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.tab === tabName);
    });

    sourceCode.textContent = sourceFiles[tabName] || "Source code unavailable.";
    sourceCode.parentElement.scrollTop = 0;
}

function openSourceModal() {
    if (!sourceModal) return;

    sourceModal.classList.add("open");
    sourceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    showSource("html");
}

function closeSourceModal() {
    if (!sourceModal) return;

    sourceModal.classList.remove("open");
    sourceModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

sourceButtons.forEach((button) => {
    button.addEventListener("click", openSourceModal);
});

sourceTabs.forEach((tab) => {
    tab.addEventListener("click", () => showSource(tab.dataset.tab));
});

closeModal?.addEventListener("click", closeSourceModal);
modalBackdrop?.addEventListener("click", closeSourceModal);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sourceModal?.classList.contains("open")) {
        closeSourceModal();
    }
});

copyButton?.addEventListener("click", async () => {
    const text = sourceCode?.textContent || "";

    try {
        await navigator.clipboard.writeText(text);
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(() => {
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 1400);
    } catch {
        copyButton.textContent = "Select & copy";
    }
});
