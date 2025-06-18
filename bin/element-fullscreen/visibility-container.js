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
                this.disableEventListeners();
        });
    }

    enableEventListeners() {
        document.addEventListener('scroll', this);
        window.addEventListener('resize', this);
        this.target.addEventListener('fullscreenchange', this);
    }

    disableEventListeners() {
        document.removeEventListener('scroll', this);
        window.removeEventListener('resize', this);
        this.target.removeEventListener('fullscreenchange', this);
    }

    handleEvent(event) {
        let log = document.createElement('div');
        log.innerText = `EVENT(${event.type})`;
        this.target.appendChild(log);
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    #template = `
<link rel="stylesheet" href="visibility-container.css">
<div id=root>
    <div id=target>
    </div>
</div>`
}
