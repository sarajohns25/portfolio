console.log("Portfolio website loaded successfully!");


/* ==========================================
   INTERACTIVE PROJECT SELECTOR
========================================== */

const projectButtons = document.querySelectorAll(".map-node");

const projectPanels = document.querySelectorAll(".project-panel");

const projectPlaceholder = document.getElementById("project-placeholder");

projectButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedProject = button.dataset.project;

        // Remove active state from every circle
        projectButtons.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        // Activate the selected circle
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        // Hide every project panel
        projectPanels.forEach((panel) => {
            panel.hidden = true;
        });

        // Hide the initial instruction
        projectPlaceholder.hidden = true;

        // Show only the selected project
        const selectedPanel = document.getElementById(
            `panel-${selectedProject}`
        );

        if (selectedPanel) {
            selectedPanel.hidden = false;

            // Bring the selected project into view
            selectedPanel.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });
        }

    });

});
