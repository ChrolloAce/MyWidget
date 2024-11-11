(function () {
    const pricingOptions = {
        option1: { pricePerSqFt: 2.3, includes: ['Walls', 'Ceilings', 'Baseboards'] },
        option2: { pricePerSqFt: 2.0, includes: ['Walls', 'Ceilings'] },
        option3: { pricePerSqFt: 1.3, includes: ['Walls'] }
    };
    const additionalCosts = {
        door: 80,
        crackRepair: 50,
        wallHoleFix: 10,
        extraSqFtRate: 2.7
    };

    let totalCost = 0;
    let selectedOption = null;
    let squareFootage = 0;
    let additionalItems = { doors: 0, cracks: 0, wallHoles: 0 };

    (function injectStyles() {
        const styles = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background-color: #f4f4f4;
                font-family: 'Montserrat', sans-serif;
                color: #333;
            }

            .container {
                width: 90%;
                max-width: 700px;
                background-color: #ffffff;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
                text-align: center;
            }

            .logo {
                max-width: 180px;
                margin-bottom: 30px;
            }

            h1, h2 {
                color: #333;
                font-weight: bold;
            }

            h1 {
                font-size: 28px;
                margin-bottom: 10px;
            }

            h2 {
                font-size: 22px;
                margin: 20px 0;
            }

            p {
                font-size: 16px;
                margin: 20px 0;
                line-height: 1.6;
                color: #666;
            }

            .button-group, .extra-services {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }

            .button {
                padding: 12px;
                background-color: #00D0FF;
                color: #FFFFFF;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: all 0.3s ease;
            }

            .button:hover {
                background-color: #00a8c3;
            }

            .back-button {
                background-color: #666;
                color: #FFFFFF;
            }

            .back-button:hover {
                background-color: #555;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
                margin-bottom: 25px;
            }

            label {
                font-size: 16px;
                color: #333;
                margin-bottom: 5px;
            }

            input[type="number"], select {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 16px;
            }

            .summary p {
                text-align: left;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(styles));
        document.head.appendChild(styleElement);
    })();

    function createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    function initInterface() {
        const container = createElement('div', 'container');
        document.body.innerHTML = '';
        document.body.appendChild(container);

        const logo = createElement('img', 'logo');
        logo.src = 'https://i.ibb.co/jLhmxkV/66c3ffee32324b40f8096a84-Untitled-26.png';
        logo.alt = 'Company Logo';
        container.appendChild(logo);

        const header = createElement('h1', null, 'Get Your Painting Quote');
        container.appendChild(header);

        const description = createElement('p', null, 'Choose a package for the best pricing. Selecting multiple options is recommended for maximum value!');
        container.appendChild(description);

        const optionsGroup = createElement('div', 'button-group');
        container.appendChild(optionsGroup);

        Object.entries(pricingOptions).forEach(([key, option], index) => {
            const button = createElement('button', 'button', `Option ${index + 1} - $${option.pricePerSqFt} per sq ft`);
            optionsGroup.appendChild(button);

            button.addEventListener('click', () => {
                selectedOption = option;
                selectAdditionalOptions(container);
            });
        });
    }

    function selectAdditionalOptions(container) {
        container.innerHTML = '';
        
        const header = createElement('h2', null, 'Add Additional Options');
        container.appendChild(header);

        const sqFtGroup = createElement('div', 'form-group');
        const sqFtLabel = createElement('label', null, 'Enter Square Footage:');
        const sqFtInput = createElement('input');
        sqFtInput.type = 'number';
        sqFtInput.placeholder = 'e.g., 1500';
        sqFtGroup.appendChild(sqFtLabel);
        sqFtGroup.appendChild(sqFtInput);
        container.appendChild(sqFtGroup);

        const addItemSection = createElement('div', 'extra-services');
        const items = [
            { label: 'Doors', key: 'doors', cost: additionalCosts.door },
            { label: 'Cracks', key: 'cracks', cost: additionalCosts.crackRepair },
            { label: 'Wall Holes', key: 'wallHoles', cost: additionalCosts.wallHoleFix }
        ];
        items.forEach(item => {
            const label = createElement('label', null, `${item.label} ($${item.cost} each):`);
            const input = createElement('input');
            input.type = 'number';
            input.placeholder = '0';
            input.style.width = '60px';
            addItemSection.appendChild(label);
            addItemSection.appendChild(input);

            input.addEventListener('input', () => {
                additionalItems[item.key] = parseInt(input.value) || 0;
            });
        });
        container.appendChild(addItemSection);

        const calculateBtn = createElement('button', 'button', 'Calculate Quote');
        container.appendChild(calculateBtn);

        calculateBtn.addEventListener('click', () => {
            squareFootage = parseInt(sqFtInput.value) || 0;
            calculateTotalCost();
            showQuote(container);
        });

        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', initInterface);
    }

    function calculateTotalCost() {
        totalCost = squareFootage * selectedOption.pricePerSqFt;
        totalCost += additionalItems.doors * additionalCosts.door;
        totalCost += additionalItems.cracks * additionalCosts.crackRepair;
        totalCost += additionalItems.wallHoles * additionalCosts.wallHoleFix;
        totalCost = Math.max(totalCost, 150);  // Enforce minimum price of $150
    }

    function showQuote(container) {
        container.innerHTML = '';
        
        const header = createElement('h2', null, 'Your Painting Quote');
        container.appendChild(header);

        const summary = createElement('div', 'summary');
        summary.innerHTML = `
            <p><strong>Square Footage:</strong> ${squareFootage} sq ft</p>
            <p><strong>Selected Package:</strong> $${selectedOption.pricePerSqFt} per sq ft</p>
            <p><strong>Doors:</strong> ${additionalItems.doors} ($${additionalItems.doors * additionalCosts.door})</p>
            <p><strong>Cracks:</strong> ${additionalItems.cracks} ($${additionalItems.cracks * additionalCosts.crackRepair})</p>
            <p><strong>Wall Holes:</strong> ${additionalItems.wallHoles} ($${additionalItems.wallHoles * additionalCosts.wallHoleFix})</p>
            <p><strong>Total Cost:</strong> $${Math.ceil(totalCost)}</p>
        `;
        container.appendChild(summary);

        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);
        backButton.addEventListener('click', initInterface);
    }

    initInterface();
})();
