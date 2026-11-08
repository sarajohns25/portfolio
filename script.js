
console.log("Portfolio website loaded successfully!");

/* =========================================
   THE VAULT — INTERACTION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const vaultLock = document.getElementById("vaultLock");
    const vaultGate = document.getElementById("vaultGate");
    const vaultStatus = document.getElementById("vaultStatus");
    const vaultHint = document.getElementById("vaultHint");
    const vaultContents = document.getElementById("vaultContents");
    const closeVaultButton = document.getElementById("closeVault");

    const projectButtons = document.querySelectorAll(".vault-chamber");
    const projectPanels = document.querySelectorAll(".project-panel");
    const projectsSection = document.getElementById("projects");

    let vaultUnlocked = false;
    let isUnlocking = false;
    let unlockTimer = null;
    let revealTimer = null;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const scrollBehavior = prefersReducedMotion.matches ? "auto" : "smooth";

    function updateVaultStatus(message) {
        if (!vaultStatus) return;

        vaultStatus.innerHTML = `
            <span class="status-indicator"></span>
            ${message}
        `;
    }

    function resetProjects() {
        projectPanels.forEach((panel) => {
            panel.hidden = true;
        });

        projectButtons.forEach((button) => {
            button.classList.remove("active");
            button.setAttribute("aria-pressed", "false");
        });
    }

    /* Unlock the vault */

    if (vaultLock && vaultGate && vaultContents) {
        vaultLock.addEventListener("click", () => {
            if (vaultUnlocked || isUnlocking) return;

            isUnlocking = true;
            vaultLock.disabled = true;
            vaultLock.setAttribute("aria-expanded", "true");
            vaultGate.classList.add("unlocked");

            updateVaultStatus("VERIFYING ACCESS...");

            if (vaultHint) {
                vaultHint.textContent = "AUTHENTICATING...";
            }

            const delay = prefersReducedMotion.matches ? 0 : 1100;

            unlockTimer = window.setTimeout(() => {
                updateVaultStatus("ACCESS GRANTED");

                if (vaultHint) {
                    vaultHint.textContent = "ARCHIVE UNLOCKED";
                }

                const fadeDelay = prefersReducedMotion.matches ? 0 : 550;

                vaultGate.style.opacity = "0";
                vaultGate.style.transform = "scale(0.94)";

                revealTimer = window.setTimeout(() => {
                    vaultGate.hidden = true;
                    vaultContents.hidden = false;

                    vaultUnlocked = true;
                    isUnlocking = false;
                }, fadeDelay);
            }, delay);
        });
    }

    /* Open project chambers */

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!vaultUnlocked) return;

            const selectedProject = button.dataset.project;
            const selectedPanel = document.getElementById(
                `panel-${selectedProject}`
            );

            if (!selectedPanel) return;

            resetProjects();

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
            selectedPanel.hidden = false;

            selectedPanel.scrollIntoView({
                behavior: scrollBehavior,
                block: "start"
            });
        });
    });

    /* Close the archive */

    if (closeVaultButton && vaultLock && vaultGate && vaultContents) {
        closeVaultButton.addEventListener("click", () => {
            if (!vaultUnlocked) return;

            window.clearTimeout(unlockTimer);
            window.clearTimeout(revealTimer);

            resetProjects();

            vaultContents.hidden = true;

            vaultGate.hidden = false;
            vaultGate.style.opacity = "1";
            vaultGate.style.transform = "scale(1)";
            vaultGate.classList.remove("unlocked");

            vaultLock.disabled = false;
            vaultLock.setAttribute("aria-expanded", "false");

            vaultUnlocked = false;
            isUnlocking = false;

            updateVaultStatus("ARCHIVE LOCKED");

            if (vaultHint) {
                vaultHint.textContent = "A little curiosity won't hurt.";
            }

            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: scrollBehavior,
                    block: "start"
                });
            }
        });
    }

    console.log("The Vault is ready.");
});


/* =========================================
   POETRY — SWITCH BETWEEN PERSPECTIVES
========================================= */

const poetryTabs = document.querySelectorAll(".poetry-tab");
const poetryPanels = document.querySelectorAll(".poetry-panel");

poetryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const selectedPoem = tab.dataset.poem;

        poetryTabs.forEach((item) => {
            const active = item.dataset.poem === selectedPoem;

            item.classList.toggle("active", active);
            item.setAttribute("aria-selected", String(active));
        });

        poetryPanels.forEach((panel) => {
            panel.hidden = panel.id !== `${selectedPoem}-poem`;
        });
    });
});


/* =========================================
   POETRY BOOK — INTERACTIVE PAGE TURNING
========================================= */

const poetryBook = document.getElementById("poetryBook");

if (poetryBook) {
    const cover = document.getElementById("bookCover");
    const openBook = document.getElementById("openBook");
    const closeButton = document.getElementById("closeBook");
    const nextButton = document.getElementById("nextPage");
    const previousButton = document.getElementById("previousPage");

    const pageContent = document.getElementById("bookPageContent");
    const pageTitle = document.getElementById("bookPageTitle");
    const pageDescription = document.getElementById("bookPageDescription");
    const chapter = document.getElementById("bookChapter");
    const leftNumber = document.getElementById("leftPageNumber");
    const rightNumber = document.getElementById("rightPageNumber");
    const pageCounter = document.getElementById("pageCounter");
    const hint = document.getElementById("bookHint");

    const bookElements = [
        cover,
        openBook,
        closeButton,
        nextButton,
        previousButton,
        pageContent,
        pageTitle,
        pageDescription,
        chapter,
        leftNumber,
        rightNumber,
        pageCounter,
        hint
    ];

    if (bookElements.every(Boolean)) {
        const pages = [
            {
                image: "assets/poetry/heart-remembered-1.png",
                chapter: "CHAPTER I · THE HEART",
                title: "What My Heart Remembered",
                description: "The first perspective. A feeling that stayed long after the moment passed.",
                number: "1"
            },
            {
                image: "assets/poetry/heart-remembered-2.png",
                chapter: "CHAPTER I · THE HEART",
                title: "What My Heart Remembered",
                description: "Some memories remain, even when everything else changes.",
                number: "2"
            },
            {
                image: "assets/poetry/eyes-never-said-1.png",
                chapter: "CHAPTER II · THE EYES",
                title: "What My Eyes Never Said",
                description: "The other perspective. Everything felt, but never spoken.",
                number: "3"
            },
            {
                image: "assets/poetry/eyes-never-said-2.png",
                chapter: "CHAPTER II · THE EYES",
                title: "What My Eyes Never Said",
                description: "The things hidden behind every glance.",
                number: "4"
            },
            {
                image: "assets/poetry/eyes-never-said-3.png",
                chapter: "CHAPTER II · THE EYES",
                title: "What My Eyes Never Said",
                description: "An ending made of all the words left unsaid.",
                number: "5"
            },
            {
                image: "assets/poetry/metaphor-quote.png",
                chapter: "A SMALL INTERLUDE",
                title: "Things Words Couldn't Hold",
                description: "Sometimes the truth needs a different language.",
                number: "6"
            }
        ];

        let currentPage = 0;
        let isAnimating = false;
        let isOpen = false;

        function renderPage() {
            const page = pages[currentPage];

            pageContent.classList.add("turning");

            window.setTimeout(() => {
                chapter.textContent = page.chapter;
                pageTitle.textContent = page.title;
                pageDescription.textContent = page.description;

                leftNumber.textContent = page.number;
                rightNumber.textContent = page.number;
                pageCounter.textContent = `${currentPage + 1} / ${pages.length}`;

                pageContent.replaceChildren();

                const image = document.createElement("img");
                image.src = page.image;
                image.alt = page.title;
                image.loading = "eager";

                pageContent.appendChild(image);

                pageContent.classList.remove("turning");
                isAnimating = false;

                previousButton.disabled = currentPage === 0;
                nextButton.disabled = currentPage === pages.length - 1;
            }, 220);
        }

        function openTheBook() {
            if (isOpen) return;

            isOpen = true;
            currentPage = 0;
            poetryBook.classList.add("book-is-open");

            cover.classList.add("opening");
            hint.hidden = true;

            window.setTimeout(() => {
                openBook.classList.add("visible");
                openBook.setAttribute("aria-hidden", "false");
                renderPage();
            }, 300);
        }

        function closeTheBook() {
            if (!isOpen) return;

            isOpen = false;
            poetryBook.classList.remove("book-is-open");
            openBook.classList.remove("visible");
            openBook.setAttribute("aria-hidden", "true");

            window.setTimeout(() => {
                cover.classList.remove("opening");
                hint.hidden = false;
                currentPage = 0;
                pageCounter.textContent = "Cover";
                previousButton.disabled = true;
                nextButton.disabled = false;
            }, 450);
        }

        function turnPage(direction) {
            if (!isOpen || isAnimating) return;

            const nextPage = currentPage + direction;

            if (nextPage < 0 || nextPage >= pages.length) return;

            isAnimating = true;
            currentPage = nextPage;
            renderPage();
        }

        cover.addEventListener("click", openTheBook);
        closeButton.addEventListener("click", closeTheBook);
        nextButton.addEventListener("click", () => turnPage(1));
        previousButton.addEventListener("click", () => turnPage(-1));
    }
}


/* =========================================
   CONTACT — ROTARY TELEPHONE INTERACTION
========================================= */

(() => {
    const receiver = document.getElementById("phoneReceiver");
    const dialFeedback = document.getElementById("dialFeedback");
    const contactReveal = document.getElementById("contactReveal");
    const phoneLight = document.getElementById("phoneLight");

    if (!receiver || !contactReveal) return;

    let isConnected = false;

    receiver.addEventListener("click", () => {
        isConnected = !isConnected;

        receiver.classList.toggle("lifted", isConnected);
        receiver.setAttribute("aria-expanded", String(isConnected));

        contactReveal.classList.toggle("visible", isConnected);
        contactReveal.setAttribute("aria-hidden", String(!isConnected));

        if (phoneLight) {
            phoneLight.classList.toggle("connected", isConnected);
        }

        if (dialFeedback) {
            dialFeedback.textContent = isConnected
                ? "LINE CONNECTED"
                : "PICK UP THE RECEIVER TO CONNECT";
        }

        // Smoothly scroll to the revealed contact details
        if (isConnected) {
            setTimeout(() => {
                contactReveal.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 300);
        }
    });

    console.log("Rotary telephone initialized successfully.");
})();

/* ==========================================
   EDUCATION — AUTOMATIC SCROLL ANIMATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const educationSection = document.querySelector("#education");

    if (!educationSection || !("IntersectionObserver" in window)) return;

    const educationObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    educationSection.classList.add("is-unrolled");
                    observer.unobserve(educationSection);
                }
            });
        },
        {
            threshold: 0.25
        }
    );

    educationObserver.observe(educationSection);
});
