(() => {
const componentName = document.currentScript.dataset.name;

class MyPanel extends HTMLElement {
    #shadow;

    connectedCallback() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#createTemplate();
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

                .panel {
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    background: #ffffff;
                    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
                }

                .panel-header {
                    padding: 14px 16px;
                    border-bottom: 1px solid #e2e8f0;
                    background: #f8fafc;
                    font-size: 18px;
                    font-weight: 700;
                }

                .panel-content {
                    padding: 16px;
                }
            </style>

            <section class="panel">
                <header class="panel-header">
                    ${this.dataset.header || 'Panel'}
                </header>

                <div class="panel-content">
                    <slot></slot>
                </div>
            </section>
        `;

        this.#shadow.append(template.content.cloneNode(true));
    }
}

customElements.define(componentName, MyPanel);
})();
