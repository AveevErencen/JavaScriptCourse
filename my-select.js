const componentName = document.currentScript.dataset.name;

class MySelect extends HTMLElement {
    #shadow;
    #selectButton;
    #selectPopup;
    #selectPopupSearch;
    #optionsBox;
    #options = [];

    connectedCallback() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#createTemplate();
        this.#selectButton.addEventListener('click', this.#openPopup);
    }

    #createTemplate() {
        const optionElements = Array.from(this.querySelectorAll('option'));

        this.#options = optionElements.map((option) => ({
            value: option.value,
            text: option.textContent,
        }));

        optionElements.forEach((option) => option.remove());

        const template = document.createElement('template');

        template.innerHTML = `
            <style>
                :host {
                    position: relative;
                    display: inline-block;
                    min-width: 260px;
                    font-family: Arial, sans-serif;
                    color: #334155;
                    --select-popup-background: #ffffff;
                }

                .select {
                    position: relative;
                }

                .select-button {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 10px 12px;
                    border: 1px solid #cbd5e1;
                    border-radius: 6px;
                    background: #ffffff;
                    color: #334155;
                    font-size: 14px;
                    cursor: pointer;
                    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
                }

                .select-button::after {
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-right: 2px solid #64748b;
                    border-bottom: 2px solid #64748b;
                    transform: rotate(45deg) translateY(-2px);
                }

                .select-popup {
                    display: none;
                    position: absolute;
                    top: calc(100% + 6px);
                    left: 0;
                    z-index: 1;
                    box-sizing: border-box;
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    background: var(--select-popup-background, #ffffff);
                    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.16);
                }

                .select-popup.open {
                    display: block;
                }

                .select-popup-search {
                    box-sizing: border-box;
                    width: 100%;
                    margin-bottom: 8px;
                    padding: 8px 10px;
                    border: 1px solid #cbd5e1;
                    border-radius: 4px;
                    font-size: 14px;
                    outline: none;
                }

                .select-popup-search:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.16);
                }

                .select-popup-options {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .option {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                }

                .option:hover {
                    background: #f1f5f9;
                }
            </style>

            <div class="select">
                <button class="select-button">Выберите опции</button>

                <div class="select-popup">
                    <input class="select-popup-search" placeholder="Search...">
                    <div class="select-popup-options"></div>
                </div>
            </div>
        `;

        this.#shadow.append(template.content.cloneNode(true));

        this.#selectButton = this.#shadow.querySelector('.select-button');
        this.#selectPopup = this.#shadow.querySelector('.select-popup');
        this.#selectPopupSearch = this.#shadow.querySelector('.select-popup-search');
        this.#optionsBox = this.#shadow.querySelector('.select-popup-options');

        this.#optionsBox.replaceWith(this.#renderOptions(this.#options));
        this.#optionsBox = this.#shadow.querySelector('.select-popup-options');
    }

    #renderOptions(options) {
        const template = document.createElement('template');

        template.innerHTML = '<div class="select-popup-options"></div>';

        const optionsBox = template.content.querySelector('.select-popup-options');

        options.forEach((option) => {
            const optionTemplate = document.createElement('template');

            optionTemplate.innerHTML = `
                <label class="option" data-value="${option.value}">
                    <input type="checkbox">
                    ${option.text}
                </label>
            `;

            optionsBox.append(optionTemplate.content.cloneNode(true));
        });

        return optionsBox;
    }

    #openPopup = () => {
        this.#selectPopup.classList.toggle('open');
    };
}

customElements.define(componentName, MySelect);
