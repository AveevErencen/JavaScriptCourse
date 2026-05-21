const componentName = document.currentScript.dataset.name;

class MySelect extends HTMLElement {
    #selectButton;
    #selectPopup;
    #selectPopupSearch;
    #optionsBox;
    #options = [];

    connectedCallback() {
        this.#createTemplate();
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
            <div class="select">
                <button class="select-button">Выберите опции</button>

                <div class="select-popup">
                    <input class="select-popup-search" placeholder="Search...">
                    <div class="select-popup-options"></div>
                </div>
            </div>
        `;

        this.append(template.content.cloneNode(true));

        this.#selectButton = this.querySelector('.select-button');
        this.#selectPopup = this.querySelector('.select-popup');
        this.#selectPopupSearch = this.querySelector('.select-popup-search');
        this.#optionsBox = this.querySelector('.select-popup-options');

        this.#optionsBox.replaceWith(this.#renderOptions(this.#options));
        this.#optionsBox = this.querySelector('.select-popup-options');
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
}

customElements.define(componentName, MySelect);
