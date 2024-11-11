(function () {
    // Constants and Configuration
    const PRICE_PER_SQFT_WALLS = 1.5;
    const PRICE_PER_SQFT_CEILING = 1.2;
    const PRICE_PER_LIN_FOOT_BASEBOARDS = 0.5;
    const MINIMUM_PRICE = 150;

    let items = [];
    let totalCost = 0;
    let previousPage = null;
    let userInfo = {};

    let paintingSelections = {
        roomType: '',
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
        popcornRemoval: 100,
        patching: 50,
        primer: 30
    };
    const colors = {
        'White': '#FFFFFF',
        'Gray': '#D3D3D3',
        'Charcoal': '#333333',
        'Beige': '#F5F5DC',
        'Blue': '#1E90FF',
        'Green': '#32CD32'
    };

    // Inject CSS Styles
    (function injectStyles() {
        const styles = `
            /* General Reset */
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
                background-color: #f9f9f9;
                font-family: 'Montserrat', sans-serif;
                color: #333;
            }

            /* Main Container Styling */
            .container {
                width: 100%;
                max-width: 700px;
                background-color: #ffffff;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
                text-align: center;
            }

            /* Logo Styling */
            .logo {
                max-width: 180px;
                margin-bottom: 30px;
            }

            /* Header Styles */
            h1, h2 {
                color: #333;
                font-weight: bold;
            }

            h1 {
                font-size: 32px;
                margin-bottom: 10px;
            }

            h2 {
                font-size: 24px;
                margin: 20px 0;
            }

            /* Paragraph Styling */
            p {
                font-size: 18px;
                margin: 20px 0;
                line-height: 1.6;
                color: #666;
            }

            /* Button Group Styling */
            .button-group {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 20px;
                margin-top: 30px;
            }

            /* Form Styling */
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

            select, input[type="checkbox"], .extra-services label {
                font-size: 16px;
            }

            /* Extra Services Grid */
            .extra-services {
                display: grid;
                grid-template-columns: 1fr;
                gap: 15px;
                text-align: left;
                margin-top: 20px;
            }

            /* Button Styling */
            .button {
                padding: 14px 20px;
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

            /* Back Button */
            .back-button {
                background-color: #666;
                color: #FFFFFF;
            }

            .back-button:hover {
                background-color: #555;
            }

            /* Centering Content */
            .centered {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            /* Checkbox Styling */
            .extra-services label {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                font-size: 16px;
                color: #333;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .container {
                    padding: 20px;
                }
                h1 {
                    font-size: 28px;
                }
                h2 {
                    font-size: 20px;
                }
                .button-group {
                    grid-template-columns: 1fr;
                }
            }
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
        const container = createElement('div', 'container centered');
        document.body.innerHTML = '';
        document.body.appendChild(container);

        const logo = createElement('img', 'logo');
        logo.src = 'https://i.ibb.co/jLhmxkV/66c3ffee32324b40f8096a84-Untitled-26.png';
        logo.alt = 'Company Logo';
        container.appendChild(logo);

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

        const logo = createElement('img', 'logo');
        logo.src = 'https://i.ibb.co/jLhmxkV/66c3ffee32324b40f8096a84-Untitled-26.png';
        logo.alt = 'Company Logo';
        container.appendChild(logo);

        const header = createElement('h2', null, `Customize Your ${paintingSelections.roomType}`);
        container.appendChild(header);

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

        const calculateBtn = createElement('button', 'button', 'Calculate Cost');
        container.appendChild(calculateBtn);

        calculateBtn.addEventListener('click', () => {
            calculateTotalCost();
            showQuote(container);
        });

        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            if (previousPage) previousPage();
        });
    }

    function calculateTotalCost() {
        totalCost = 0;

        if (paintingSelections.wallsIncluded) {
            totalCost += PRICE_PER_SQFT_WALLS * paintingSelections.numWalls * 100;
        }
        if (paintingSelections.ceilingIncluded) {
            totalCost += PRICE_PER_SQFT_CEILING * 100;
        }
        if (paintingSelections.baseboardsIncluded) {
            totalCost += PRICE_PER_LIN_FOOT_BASEBOARDS * 40;
        }

        paintingSelections.extraServices.forEach(service => {
            totalCost += extraServices[service];
        });

        totalCost = Math.max(totalCost, MINIMUM_PRICE);
        totalCost = Math.ceil(totalCost);
    }

    function showQuote(container) {
        container.innerHTML = '';

        const logo = createElement('img', 'logo');
        logo.src = 'https://i.ibb.co/jLhmxkV/66c3ffee32324b40f8096a84-Untitled-26.png';
        logo.alt = 'Company Logo';
        container.appendChild(logo);

        const header = createElement('h2', null, 'Your Quote');
        container.appendChild(header);

        const totalText = createElement('p', null, `Total Price: $${Math.ceil(totalCost)}`);
        totalText.style.fontSize = '32px';
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
