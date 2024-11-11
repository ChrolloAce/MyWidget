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

    let rooms = [];
    let totalCost = 0;

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
                width: 100%;
                max-width: 800px;
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
                margin-bottom: 20px;
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
                margin-bottom: 20px;
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

            .room-summary {
                text-align: left;
                background-color: #f8f8f8;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            }

            .room-summary h3 {
                font-size: 18px;
                margin-bottom: 10px;
                color: #333;
            }

            .room-summary p {
                margin-bottom: 5px;
                color: #555;
            }

            .add-room-btn {
                margin-top: 20px;
                background-color: #28a745;
            }

            .add-room-btn:hover {
                background-color: #218838;
            }

            .summary-total {
                margin-top: 20px;
                font-size: 24px;
                font-weight: bold;
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

        const header = createElement('h1', null, 'Room Painting Quote Tool');
        container.appendChild(header);

        const addRoomBtn = createElement('button', 'button add-room-btn', 'Add a Room');
        container.appendChild(addRoomBtn);

        addRoomBtn.addEventListener('click', () => addRoom(container));

        if (rooms.length > 0) {
            rooms.forEach((room, index) => displayRoomSummary(container, room, index));
            displayTotalCost(container);
        }
    }

    function addRoom(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Add a Room');
        container.appendChild(header);

        const room = {
            id: rooms.length + 1,
            package: null,
            squareFootage: 0,
            additionalItems: { doors: 0, cracks: 0, wallHoles: 0 }
        };

        // Package Selection
        const packageGroup = createElement('div', 'button-group');
        container.appendChild(packageGroup);

        Object.entries(pricingOptions).forEach(([key, option], index) => {
            const button = createElement('button', 'button', `Option ${index + 1} - $${option.pricePerSqFt} per sq ft`);
            packageGroup.appendChild(button);

            button.addEventListener('click', () => {
                room.package = option;
            });
        });

        // Square Footage
        const sqFtGroup = createElement('div', 'form-group');
        const sqFtLabel = createElement('label', null, 'Enter Square Footage:');
        const sqFtInput = createElement('input');
        sqFtInput.type = 'number';
        sqFtInput.placeholder = 'e.g., 1500';
        sqFtGroup.appendChild(sqFtLabel);
        sqFtGroup.appendChild(sqFtInput);
        container.appendChild(sqFtGroup);

        sqFtInput.addEventListener('input', () => {
            room.squareFootage = parseInt(sqFtInput.value) || 0;
        });

        // Additional Items
        const additionalItemsGroup = createElement('div', 'extra-services');
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
            additionalItemsGroup.appendChild(label);
            additionalItemsGroup.appendChild(input);

            input.addEventListener('input', () => {
                room.additionalItems[item.key] = parseInt(input.value) || 0;
            });
        });
        container.appendChild(additionalItemsGroup);

        // Save Room Button
        const saveRoomBtn = createElement('button', 'button add-room-btn', 'Save Room');
        container.appendChild(saveRoomBtn);

        saveRoomBtn.addEventListener('click', () => {
            rooms.push(room);
            initInterface();
        });

        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', initInterface);
    }

    function calculateRoomCost(room) {
        let cost = room.squareFootage * room.package.pricePerSqFt;
        cost += room.additionalItems.doors * additionalCosts.door;
        cost += room.additionalItems.cracks * additionalCosts.crackRepair;
        cost += room.additionalItems.wallHoles * additionalCosts.wallHoleFix;
        return Math.max(cost, 150); // Minimum price per room
    }

    function displayRoomSummary(container, room, index) {
        const roomDiv = createElement('div', 'room-summary');
        roomDiv.innerHTML = `
            <h3>Room ${index + 1}</h3>
            <p><strong>Package:</strong> $${room.package.pricePerSqFt} per sq ft</p>
            <p><strong>Square Footage:</strong> ${room.squareFootage} sq ft</p>
            <p><strong>Doors:</strong> ${room.additionalItems.doors}</p>
            <p><strong>Cracks:</strong> ${room.additionalItems.cracks}</p>
            <p><strong>Wall Holes:</strong> ${room.additionalItems.wallHoles}</p>
            <p><strong>Cost:</strong> $${Math.ceil(calculateRoomCost(room))}</p>
        `;
        container.appendChild(roomDiv);
    }

    function displayTotalCost(container) {
        totalCost = rooms.reduce((total, room) => total + calculateRoomCost(room), 0);
        const totalDiv = createElement('div', 'summary-total', `Total Cost: $${Math.ceil(totalCost)}`);
        container.appendChild(totalDiv);
    }

    initInterface();
})();
