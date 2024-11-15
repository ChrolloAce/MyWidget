(function () {
    // Constants for Pricing
    const PRICING_OPTIONS = {
        economical: 1.5,
        standard: 2.0,
        premium: 3.0,
    };

    const EXTRA_COSTS = {
        darkWalls: 0.5,
        texturedWalls: 0.75,
        insurance: 200,
        furnitureCoverage: {
            standard: 50,
            complex: 100,
        },
    };

    let rooms = [];
    let totalCost = 0;

    // Inject CSS Styles Globally
    (function injectStyles() {
        const styles = `
            body {
                font-family: 'Montserrat', sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .container {
                width: 95%;
                max-width: 1200px;
                background: #fff;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                margin: 20px;
            }
            h1, h2 {
                color: #333;
                text-align: center;
            }
            .button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                background: #00D0FF;
                color: #fff;
                font-size: 16px;
                margin: 10px;
            }
            .button:hover {
                background: #007ACC;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                font-size: 14px;
                margin-bottom: 5px;
                display: block;
                color: #555;
            }
            .form-group input, .form-group select {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 14px;
            }
            .room-list {
                margin-top: 20px;
            }
            .room {
                background: #f0f0f0;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .room .remove-button {
                background: #ff5555;
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                color: #fff;
                font-size: 12px;
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(styles));
        document.head.appendChild(styleElement);
    })();

    // Helper Function to Create Elements
    function createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    // Initialize Main Interface
    function initInterface() {
        const container = createElement('div', 'container');
        document.body.innerHTML = '';
        document.body.appendChild(container);

        const header = createElement('h1', null, 'Painting Service Quote');
        container.appendChild(header);

        const description = createElement('p', null, 'Add rooms and select options to calculate your painting quote.');
        container.appendChild(description);

        const addRoomButton = createElement('button', 'button', 'Add Room');
        container.appendChild(addRoomButton);

        addRoomButton.addEventListener('click', () => addRoom(container));

        if (rooms.length > 0) {
            const roomList = createElement('div', 'room-list');
            container.appendChild(roomList);

            rooms.forEach((room, index) => {
                const roomDiv = createElement('div', 'room');
                roomDiv.textContent = `Room ${index + 1}: ${room.size} sq. ft. - ${room.package} package`;
                const removeButton = createElement('button', 'remove-button', 'Remove');
                roomDiv.appendChild(removeButton);
                roomList.appendChild(roomDiv);

                removeButton.addEventListener('click', () => {
                    rooms.splice(index, 1);
                    calculateTotalCost();
                    initInterface();
                });
            });

            const totalCostText = createElement('p', null, `Total Estimated Cost: $${totalCost.toFixed(2)}`);
            container.appendChild(totalCostText);

            const getQuoteButton = createElement('button', 'button', 'Get Final Quote');
            container.appendChild(getQuoteButton);

            getQuoteButton.addEventListener('click', () => finalizeQuote(container));
        }
    }

    // Add Room Flow
    function addRoom(container) {
        container.innerHTML = '';
        const header = createElement('h2', null, 'Add a Room');
        container.appendChild(header);

        const form = createElement('div', null);
        container.appendChild(form);

        const sizeInput = createFormInput(form, 'Room Size (sq. ft.)', 'number');
        const packageInput = createFormSelect(form, 'Package', ['Economical', 'Standard', 'Premium']);

        const nextButton = createElement('button', 'button', 'Add Room');
        container.appendChild(nextButton);

        nextButton.addEventListener('click', () => {
            const size = parseFloat(sizeInput.value);
            const packageType = packageInput.value.toLowerCase();
            if (isNaN(size) || size <= 0) {
                alert('Please enter a valid room size.');
                return;
            }

            const cost = size * PRICING_OPTIONS[packageType];
            rooms.push({ size, package: packageType, cost });
            calculateTotalCost();
            initInterface();
        });

        const backButton = createElement('button', 'button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => initInterface());
    }

    // Create Form Input
    function createFormInput(container, label, type) {
        const formGroup = createElement('div', 'form-group');
        const formLabel = createElement('label', null, label);
        const input = createElement('input');
        input.type = type;
        formGroup.appendChild(formLabel);
        formGroup.appendChild(input);
        container.appendChild(formGroup);
        return input;
    }

    // Create Form Select
    function createFormSelect(container, label, options) {
        const formGroup = createElement('div', 'form-group');
        const formLabel = createElement('label', null, label);
        const select = createElement('select');
        options.forEach(option => {
            const optionElement = createElement('option', null, option);
            select.appendChild(optionElement);
        });
        formGroup.appendChild(formLabel);
        formGroup.appendChild(select);
        container.appendChild(formGroup);
        return select;
    }

    // Calculate Total Cost
    function calculateTotalCost() {
        totalCost = rooms.reduce((total, room) => total + room.cost, 0);
    }

    // Finalize Quote
    function finalizeQuote(container) {
        container.innerHTML = '';
        const header = createElement('h2', null, 'Final Quote');
        container.appendChild(header);

        const summary = createElement('p', null, `Your final estimated cost is $${totalCost.toFixed(2)}.`);
        container.appendChild(summary);

        const backButton = createElement('button', 'button', 'Back to Home');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => initInterface());
    }

    // Initialize the Interface
    initInterface();
})();
