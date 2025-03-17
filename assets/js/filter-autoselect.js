document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");

    if (filterParam) {
        // Remove existing active class
        document.querySelector(".portfolio-flters .filter-active")?.classList.remove("filter-active");

        // Find and activate the selected filter
        const filterItem = document.querySelector(`.portfolio-flters li[data-filter='.${filterParam}']`);
        if (filterItem) {
            filterItem.classList.add("filter-active");

            // Apply the filter to Isotope
            const portfolioContainer = document.querySelector(".portfolio-container");
            if (portfolioContainer && window.Isotope) {
                const iso = new Isotope(portfolioContainer, {
                    itemSelector: ".portfolio-item",
                    layoutMode: "masonry",
                });

                // Trigger filter
                iso.arrange({ filter: `.${filterParam}` });
            }
        }
    }
});
