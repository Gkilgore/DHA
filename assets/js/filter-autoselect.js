document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        // 1. Initialize Isotope once and store it in a global variable
        const portfolioContainer = document.querySelector(".portfolio-container");
        const iso = new Isotope(portfolioContainer, {
            itemSelector: ".portfolio-item",
            layoutMode: "masonry",
        });

        // 2. Set up click listeners on each filter button
        document.querySelectorAll('.portfolio-flters li').forEach(item => {
            item.addEventListener('click', function (e) {
                // Remove 'filter-active' from the current active element
                document.querySelector('.portfolio-flters .filter-active').classList.remove('filter-active');
                // Add 'filter-active' to the clicked element
                e.currentTarget.classList.add('filter-active');

                // Get the filter value from data-filter attribute
                let filterValue = e.currentTarget.getAttribute('data-filter');
                // Apply the filter using the same Isotope instance
                iso.arrange({ filter: filterValue });
            });
        });

        // 3. Check URL for a filter parameter and apply it
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get("filter"); // e.g., filter=filter-score
        if (filterParam) {
            // Remove the default active class
            document.querySelector('.portfolio-flters .filter-active').classList.remove('filter-active');

            // Build the data-filter value (e.g., ".filter-score")
            const filterValue = `.${filterParam}`;
            // Find the matching filter button and add active class
            const filterItem = document.querySelector(`.portfolio-flters li[data-filter='${filterValue}']`);
            if (filterItem) {
                filterItem.classList.add('filter-active');
            }
            // Apply the filter using the same Isotope instance
            iso.arrange({ filter: filterValue });
        }
    }, 1000);
});