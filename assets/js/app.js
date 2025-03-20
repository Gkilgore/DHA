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
    }
});

vue_app.mount("#vue_app");
