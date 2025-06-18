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
            entries.forEach(entry => {
                let log = document.createElement('div');
                log.innerText = `IntersectionObserver() visibility(${this.target.checkVisibility()}), intersecting(${entry.isIntersecting}), percent(${this.calculateVisibilityPercentage(entry.boundingClientRect)})`;
                this.target.appendChild(log);
            })
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
        log.innerText = `EVENT(${event.type}) visibility(${this.target.checkVisibility()}), percent(${this.calculateVisibilityPercentage(this.target.getBoundingClientRect())})`;
        this.target.appendChild(log);
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    calculateVisibilityPercentage(bounds) {
        let boundsArea = (bounds.right - bounds.left) * (bounds.bottom - bounds.top);
        if (!boundsArea)
            return "NaN";
        let viewportBounds = new DOMRect(window.visualViewport.offsetLeft, window.visualViewport.offsetTop, window.visualViewport.width, window.visualViewport.height);
        let maxLeft = Math.max(bounds.left, viewportBounds.left);
        let minRight = Math.min(bounds.right, viewportBounds.right);
        let maxTop = Math.max(bounds.top, viewportBounds.top);
        let minBottom = Math.min(bounds.bottom, viewportBounds.bottom);
        let intersectionArea = (minRight - maxLeft) * (minBottom - maxTop);
        return intersectionArea / boundsArea;
    }

    #template = `
<link rel="stylesheet" href="visibility-container.css">
<div id=root>
    <div id=target>
    </div>
</div>`
}
