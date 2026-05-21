const componentName = document.currentScript.dataset.name;

class MySelect extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                .select {
                    width: 240px;
                    padding: 12px;
                    border: 1px solid #cccccc;
                    border-radius: 8px;
                    font-family: Arial, sans-serif;
                }

                .select__title {
                    margin-bottom: 8px;
                    font-weight: 700;
                }

                .select__search {
                    box-sizing: border-box;
                    width: 100%;
                    margin-bottom: 8px;
                    padding: 6px;
                }

                .select__option {
                    display: block;
                    margin-bottom: 4px;
                }
            </style>

            <div class="select">
                <div class="select__title">Мой Select</div>

                <input class="select__search" type="text" placeholder="Поиск">

                <label class="select__option">
                    <input type="checkbox" value="option-1">
                    Опция 1
                </label>

                <label class="select__option">
                    <input type="checkbox" value="option-2">
                    Опция 2
                </label>

                <label class="select__option">
                    <input type="checkbox" value="option-3">
                    Опция 3
                </label>
            </div>
        `;
    }
}

customElements.define(componentName, MySelect);
