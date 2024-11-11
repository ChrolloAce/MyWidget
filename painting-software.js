(function () {
    // Constants and Configuration
    const PRICE_PER_SQFT_WALLS = 2;
    const PRICE_PER_SQFT_CEILING = 1.5;
    const PRICE_PER_SQFT_BASEBOARDS = 0.5;
    const MINIMUM_PRICE = 200;

    let items = [];
    let totalCost = 0;
    let previousPage = null;
    let userInfo = {};

    let paintingSelections = {
        roomType: '',            // 'Kitchen', 'Bathroom', 'Bedroom', etc.
        wallsIncluded: false,
        ceilingIncluded: false,
        baseboardsIncluded: false,
        wallColor: '',
        ceilingColor: '',
        extraServices: [],
        numWalls: 4
    };

    const roomTypes = ['Kitchen', 'Bathroom', 'Bedroom', 'Living Room', 'Office'];

    const extraServices = {
        popcornRemoval: 150,   // Flat fee for removing popcorn ceiling
        patching: 100,         // Flat fee for patching holes
        primer: 50,            // Flat fee for applying primer
    };

    const colors = {
        'White': '#FFFFFF',
        'Light Gray': '#D3D3D3',
        'Charcoal': '#333333',
        'Beige': '#F5F5DC',
        'Blue': '#1E90FF',
        'Green': '#32CD32'
    };

    // Inject CSS Styles Globally
    (function injectStyles() {
        const styles = `
        /* Add the styling details here similar to the previous example */
        `;

        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(styles));
        document.head.appendChild(styleElement);
    })();

    // Helper Functions
    function createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    // Initialization Function
    function initInterface() {
        const container = createElement('div', 'container');
        document.body.innerHTML = '';
        document.body.appendChild(container);

        const header = createElement('h1', null, 'Get a Painting Quote');
        container.appendChild(header);

        const description = createElement('p', null, 'Choose the type of room you need painted.');
        container.appendChild(description);

        const typeContainer = createElement('div', 'button-group');
        container.appendChild(typeContainer);

        roomTypes.forEach(type => {
            const typeBtn = createElement('button', 'button', type);
            typeContainer.appendChild(typeBtn);

            typeBtn.addEventListener('click', () => {
                paintingSelections.roomType = type;
                previousPage = initInterface;
                selectRoomOptions(container);
            });
        });
    }

    function selectRoomOptions(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, `Customize Your ${paintingSelections.roomType}`);
        container.appendChild(header);

        // Select walls, ceiling, baseboards
        const options = [
            { label: 'Include Walls', key: 'wallsIncluded' },
            { label: 'Include Ceiling', key: 'ceilingIncluded' },
            { label: 'Include Baseboards', key: 'baseboardsIncluded' }
        ];

        options.forEach(option => {
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = option.key;
            checkBox.checked = paintingSelections[option.key];

            const label = createElement('label', null, option.label);
            label.htmlFor = option.key;

            container.appendChild(checkBox);
            container.appendChild(label);
            container.appendChild(document.createElement('br'));

            checkBox.addEventListener('change', () => {
                paintingSelections[option.key] = checkBox.checked;
            });
        });

        // Wall and Ceiling Color Selection
        const colorSection = createElement('div', 'color-section');
        container.appendChild(colorSection);

        const wallColorLabel = createElement('label', null, 'Wall Color:');
        colorSection.appendChild(wallColorLabel);

        const wallColorSelect = createElement('select');
        Object.entries(colors).forEach(([colorName, hex]) => {
            const option = createElement('option', null, colorName);
            option.value = colorName;
            wallColorSelect.appendChild(option);
        });
        colorSection.appendChild(wallColorSelect);

        wallColorSelect.addEventListener('change', () => {
            paintingSelections.wallColor = wallColorSelect.value;
        });

        // Extra Services
        const extraServicesContainer = createElement('div', 'extra-services');
        container.appendChild(extraServicesContainer);

        Object.entries(extraServices).forEach(([service, price]) => {
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = service;

            const label = createElement('label', null, `${service} (+$${price})`);
            label.htmlFor = service;

            extraServicesContainer.appendChild(checkBox);
            extraServicesContainer.appendChild(label);
            extraServicesContainer.appendChild(document.createElement('br'));

            checkBox.addEventListener('change', () => {
                if (checkBox.checked) {
                    paintingSelections.extraServices.push(service);
                } else {
                    paintingSelections.extraServices = paintingSelections.extraServices.filter(
                        s => s !== service
                    );
                }
            });
        });

        // Button to calculate cost
        const calculateBtn = createElement('button', 'button', 'Calculate Cost');
        container.appendChild(calculateBtn);

        calculateBtn.addEventListener('click', () => {
            calculateTotalCost();
            showQuote(container);
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            if (previousPage) previousPage();
        });
    }

    function calculateTotalCost() {
        totalCost = 0;

        if (paintingSelections.wallsIncluded) {
            totalCost += PRICE_PER_SQFT_WALLS * paintingSelections.numWalls * 100; // 100 sq ft per wall example
        }
        if (paintingSelections.ceilingIncluded) {
            totalCost += PRICE_PER_SQFT_CEILING * 100; // Fixed size ceiling example
        }
        if (paintingSelections.baseboardsIncluded) {
            totalCost += PRICE_PER_SQFT_BASEBOARDS * 40; // 40 linear feet example
        }

        // Additional services cost
        paintingSelections.extraServices.forEach(service => {
            totalCost += extraServices[service];
        });

        totalCost = Math.max(totalCost, MINIMUM_PRICE);
        totalCost = Math.ceil(totalCost);
    }

    function showQuote(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Your Quote');
        container.appendChild(header);

        const totalText = createElement('p', null, `Total Price: $${Math.ceil(totalCost)}`);
        totalText.style.fontSize = '36px';
        totalText.style.fontWeight = 'bold';
        container.appendChild(totalText);

        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            if (previousPage) previousPage();
        });
    }

    initInterface();
})();
