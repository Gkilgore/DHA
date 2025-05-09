const vue_app = Vue.createApp({
    data() {
        return {
            jobs: [],
            currentPage: 1,
            jobsPerPage: 12,
            activeFilter: '*'
        };
    },
    computed: {
        filteredJobs() {
            if (this.activeFilter === '*') {
                return this.jobs;
            } else {
                const filterClass = this.activeFilter.replace('.', '');
                return this.jobs.filter(job => job.filter === filterClass);
            }
        },
        paginatedJobs() {
            const start = (this.currentPage - 1) * this.jobsPerPage;
            return this.filteredJobs.slice(start, start + this.jobsPerPage);
        },
        totalPages() {
            return Math.ceil(this.filteredJobs.length / this.jobsPerPage) || 1;
        }
    },
    methods: {
        setFilter(filter) {
            this.activeFilter = filter;
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.$nextTick(() => {
                    if (window.GLightbox) {
                        GLightbox({ selector: '.glightbox' });
                    }
                    this.reinitIsotope();
                });
            }
        },
        reinitIsotope() {
            const container = document.querySelector('.portfolio-container');
            if (container && window.imagesLoaded && window.Isotope) {
                imagesLoaded(container, () => {
                    const iso = window.Isotope.data(container);
                    if (iso) {
                        iso.reloadItems();
                        iso.layout();
                    } else {
                        // Initialize Isotope if not already initialized
                        new Isotope(container, {
                            itemSelector: '.portfolio-item',
                            layoutMode: 'masonry',
                            masonry: { columnWidth: '.portfolio-item' }
                        });
                    }
                });
            }
        }
    },
    created() {
        fetch('assets/js/portfolio.json')
            .then(response => response.json())
            .then(json => {
                this.jobs = json;
            })
            .catch(error => console.error('Error:', error));
    },
    watch: {
        activeFilter() {
            this.currentPage = 1;
            this.$nextTick(() => {
                this.reinitIsotope();
            });
        },
        jobs() {
            this.$nextTick(() => {
                if (window.GLightbox) {
                    GLightbox({ selector: '.glightbox' });
                }
                this.reinitIsotope();
            });
        }
    }
});

vue_app.mount("#vue_app");