(() => {
const componentName = document.currentScript.dataset.name;

class MyCard extends HTMLElement {
    static observedAttributes = ['header', 'sub-header'];

    #shadow;
    #header;
    #subHeader;

    connectedCallback() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#createTemplate();
        this.#updateHeader();
        this.#updateSubHeader();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'header') {
            this.#updateHeader();
        }

        if (name === 'sub-header') {
            this.#updateSubHeader();
        }
    }

    #createTemplate() {
        const template = document.createElement('template');

        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    max-width: 420px;
                    margin-top: 24px;
                    font-family: Arial, sans-serif;
                    color: #334155;
                }

                .card {
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    background: #ffffff;
                    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
                }

                .card-header {
                    padding: 14px 16px;
                    border-bottom: 1px solid #e2e8f0;
                    background: #f8fafc;
                }

                .card-title {
                    font-size: 18px;
                    font-weight: 700;
                }

                .card-subtitle {
                    margin-top: 4px;
                    color: #64748b;
                    font-size: 14px;
                }

                .card-content {
                    padding: 16px;
                }
            </style>

            <section class="card">
                <header class="card-header">
                    <div class="card-title">Default header</div>
                    <div class="card-subtitle">Default sub-header</div>
                </header>

                <div class="card-content">
                    <slot></slot>
                </div>
            </section>
        `;

        this.#shadow.append(template.content.cloneNode(true));

        this.#header = this.#shadow.querySelector('.card-title');
        this.#subHeader = this.#shadow.querySelector('.card-subtitle');
    }

    #updateHeader() {
        if (this.#header) {
            this.#header.textContent = this.getAttribute('header') || 'Default header';
        }
    }

    #updateSubHeader() {
        if (this.#subHeader) {
            this.#subHeader.textContent = this.getAttribute('sub-header') || 'Default sub-header';
        }
    }
}

customElements.define(componentName, MyCard);
})();
