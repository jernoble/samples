class VisibilityContainer extends HTMLElement {
    static {
        customElements.define("visibility-container", VisibilityContainer);
    }

    static get observedAttributes() {
        return [
            "width",
            "height",
        ];
    }

    constructor() {
        super();
    }

    async connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = this.#template;

        this.root = this.shadowRoot.querySelector('#root');
        this.target = this.shadowRoot.querySelector('#target');

        this.target.addEventListener('click', event => {
            this.target.requestFullscreen();
            this.enableEventListeners();
        });

        this.target.addEventListener('fullscreenchange', event => {
            if (document.fullscreenElement !== this.shadowRoot.host)
                setTimeout(() => this.disableEventListeners(), 0);
        });
    }

    enableEventListeners() {
        document.addEventListener('scroll', this);
        window.addEventListener('resize', this);
        this.target.addEventListener('fullscreenchange', this);

        this.observer =  new IntersectionObserver(entries => {
            let log = document.createElement('div');
            log.innerText = `IntersectionObserver() visibility(${this.target.checkVisibility()})`;
            this.target.appendChild(log);
        });
        this.observer.observe(this.target);
    }

    disableEventListeners() {
        document.removeEventListener('scroll', this);
        window.removeEventListener('resize', this);
        this.target.removeEventListener('fullscreenchange', this);

        this.observer.disconnect();
        this.observer = null;
    }

    handleEvent(event) {
        let log = document.createElement('div');
        log.innerText = `EVENT(${event.type}) visibility(${this.target.checkVisibility()})`;
        this.target.appendChild(log);
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    calculateVisibilityPercentage(bounds) {
        return 'NaN';
    }

    #template = `
<link rel="stylesheet" href="visibility-container.css">
<div id=root>
    <div id=target>
    </div>
</div>`
}
