const vue_app = Vue.createApp({
    data() {
        return {
            jobs: [],
        };
    },
    created() {
        fetch('assets/js/portfolio.json')
            .then(response => response.json())
            .then(json => {
                console.log("Fetched jobs:", json);
                this.jobs = json;
            })
            .catch(error => console.error('Error fetching portfolio data:', error));
    },
    watch: {
        jobs(newVal, oldVal) {
            // Wait for the DOM to update before reinitializing glightbox
            this.$nextTick(() => {
                if (window.GLightbox) {
                    // Reinitialize glightbox for new elements
                    GLightbox({ selector: '.glightbox' });
                }
            });
        }
    }
});

vue_app.mount("#vue_app");
