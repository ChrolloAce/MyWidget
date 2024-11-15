(function () {
    const pricingOptions = {
        economical: 1.5,
        standard: 2.0,
        premium: 3.0
    };

    const additionalCosts = {
        bathtubFee: 250,
        stairStepFee: 50,
        darkWallFee: 0.5,
        holeFee: 10,
        cabinetHandleFee: 10
    };

    let rooms = [];
    let totalCost = 0;

    const modalItems = [
        {
            name: 'Stair Steps',
            imageUrl: 'https://i.ibb.co/0CwdQP2/stairs.png',
            key: 'stairs',
            requiresInput: true,
            inputFields: [{ label: 'Quantity', type: 'number', key: 'quantity' }]
        },
        {
            name: 'Bathtub',
            imageUrl: 'https://i.ibb.co/Lv2R1ys/bathrub.png',
            key: 'bathtub',
            requiresInput: false
        },
        {
            name: 'Cabinets',
            imageUrl: 'https://i.ibb.co/8K4BLS1/cabinets.png',
            key: 'cabinets',
            requiresInput: true,
            inputFields: [
                { label: 'Height (in inches)', type: 'number', key: 'height' },
                { label: 'Width (in inches)', type: 'number', key: 'width' },
                { label: 'Depth (in inches)', type: 'number', key: 'depth' },
                { label: 'Paint Option', type: 'select', key: 'paint', options: ['Inside', 'Outside', 'Both'] }
            ]
        }
    ];

    // Create CSS styles dynamically
    function injectStyles() {
        const styles = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Montserrat', sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }

            .container {
                width: 100%;
                max-width: 900px;
                background: #fff;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                text-align: center;
            }

            h1, h2 {
                text-align: center;
                margin-bottom: 20px;
            }

            .button {
                display: inline-block;
                padding: 12px 20px;
                margin: 10px;
                background-color: #00D0FF;
                color: #fff;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
                text-align: center;
                transition: 0.3s ease-in-out;
            }

            .button:hover {
                background-color: #0078a6;
            }

            .button-group {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 15px;
            }

            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }

            .modal-content {
                background: #fff;
                padding: 30px;
                border-radius: 10px;
                width: 80%;
                max-width: 600px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                text-align: center;
            }

            .modal-content h2 {
                margin-bottom: 20px;
            }

            .modal-content img {
                width: 100px;
                height: auto;
                border-radius: 8px;
                margin: 10px;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            .painted-option-btn.selected {
    background-color: #00D0FF;
    color: white;
    font-weight: bold;
    border: 2px solid #004C99;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

            .modal-content img:hover {
                transform: scale(1.1);
            }

            .form-group {
                text-align: left;
                margin-bottom: 20px;
            }

            .form-group label {
                display: block;
                font-weight: bold;
                margin-bottom: 8px;
            }

            .form-group input, .form-group select {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 8px;
            }

            .modal-buttons {
                margin-top: 20px;
            }

            .close-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background: red;
                color: #fff;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
                border-radius: 50%;
                font-size: 16px;
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    function createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    function initInterface() {
        const app = document.createElement('div');
        app.className = 'container';
        app.id = 'app';
        document.body.innerHTML = '';
        document.body.appendChild(app);

        const header = createElement('h1', null, 'Painting Quote Software');
        app.appendChild(header);

        const startButton = createElement('button', 'button', 'Begin Quote');
        startButton.addEventListener('click', setupRoomQuestions);
        app.appendChild(startButton);
    }

    function setupRoomQuestions() {
        const app = document.getElementById('app');
        app.innerHTML = '<h2>Room Setup</h2>';

        const buttonGroup = createElement('div', 'button-group');
        app.appendChild(buttonGroup);

        const addRoomButton = createElement('button', 'button', 'Add Room');
        addRoomButton.addEventListener('click', () => addRoom());
        buttonGroup.appendChild(addRoomButton);

        const viewSummaryButton = createElement('button', 'button', 'View Summary');
        viewSummaryButton.addEventListener('click', viewSummary);
        buttonGroup.appendChild(viewSummaryButton);
    }

   function addRoom() {
    const app = document.getElementById('app');
    app.innerHTML = '<h2>Add Room</h2>';

    // Ensure a new room is initialized if none exists
    if (!rooms[rooms.length - 1] || !rooms[rooms.length - 1].sqft) {
        rooms.push({ sqft: 0, items: [], paintingOption: null });
    }

    // Painting Options
    const header = createElement('h3', null, 'Select a Painting Option');
    app.appendChild(header);

    const buttonGroup = createElement('div', 'button-group');
    Object.entries(pricingOptions).forEach(([key, option]) => {
        const button = createElement(
            'button',
            'button painting-option-btn',
            `${key.charAt(0).toUpperCase() + key.slice(1)} - $${option.pricePerSqFt}/sqft`
        );

        // Safely access the `includes` array
        const includesText = option.includes ? option.includes.join(', ') : 'No details available';
        button.innerHTML += `<br><small>Includes: ${includesText}</small>`;

        button.addEventListener('click', () => {
            // Update selected option and visually highlight
            rooms[rooms.length - 1].paintingOption = { key, ...option };
            document.querySelectorAll('.painting-option-btn').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
        buttonGroup.appendChild(button);
    });
    app.appendChild(buttonGroup);

    // Square Footage Input
    const form = document.createElement('div');
    form.className = 'form-group';
    form.innerHTML = `
        <label>Enter Square Footage:</label>
        <input type="number" id="sqft" placeholder="e.g., 500">
    `;
    app.appendChild(form);

    // Add Items Button
    const addItemButton = createElement('button', 'button', 'Add Items');
    addItemButton.addEventListener('click', showItemModal);
    app.appendChild(addItemButton);

    // Save Room Button
    const saveButton = createElement('button', 'button', 'Save Room');
    saveButton.addEventListener('click', () => {
        const sqft = parseFloat(document.getElementById('sqft').value) || 0;
        rooms[rooms.length - 1].sqft = sqft;
        setupRoomQuestions();
    });
    app.appendChild(saveButton);

    // Back Button
    const backButton = createElement('button', 'button', 'Back');
    backButton.addEventListener('click', setupRoomQuestions);
    app.appendChild(backButton);
}



   function showItemModal() {
    const modal = createElement('div', 'modal');
    const modalContent = createElement('div', 'modal-content');
    modal.appendChild(modalContent);

    const closeButton = createElement('button', 'close-btn', '×');
    closeButton.addEventListener('click', () => document.body.removeChild(modal));
    modalContent.appendChild(closeButton);

    const header = createElement('h2', null, 'Add an Item');
    modalContent.appendChild(header);

    const itemContainer = createElement('div', 'item-container'); // For styling
    modalContent.appendChild(itemContainer);

    modalItems.forEach(item => {
        const itemDiv = createElement('div', 'item-div');
        itemDiv.style.border = '3px solid black';
        itemDiv.style.margin = '10px';
        itemDiv.style.padding = '5px';
        itemDiv.style.display = 'inline-block';
        itemDiv.style.textAlign = 'center';

        const itemImage = createElement('img');
        itemImage.src = item.imageUrl;
        itemImage.alt = item.name;
        itemImage.style.width = '100px';
        itemImage.style.height = '100px';
        itemImage.style.cursor = 'pointer';

        const itemName = createElement('div', null, item.name);
        itemName.style.marginTop = '5px';
        itemName.style.fontWeight = 'bold';

        itemDiv.appendChild(itemImage);
        itemDiv.appendChild(itemName);

        itemDiv.addEventListener('click', () => {
            document.body.removeChild(modal);
            handleItemSelection(item);
        });

        itemContainer.appendChild(itemDiv);
    });

    document.body.appendChild(modal);
}

 function handleItemSelection(item) {
    if (!item.requiresInput) {
        // Directly add items without inputs (like Bathtub)
        const currentRoom = rooms[rooms.length - 1];
        if (!currentRoom) return alert('Please create a room first.');
        currentRoom.items.push({ name: item.name, cost: additionalCosts[item.key] || 0, quantity: 1 });
        addRoom(); // Return to room setup
        return;
    }

    const modal = createElement('div', 'modal');
    const modalContent = createElement('div', 'modal-content');
    modal.appendChild(modalContent);

    const closeButton = createElement('button', 'close-btn', '×');
    closeButton.addEventListener('click', () => document.body.removeChild(modal));
    modalContent.appendChild(closeButton);

    const header = createElement('h2', null, `Add Details for ${item.name}`);
    modalContent.appendChild(header);

    const form = createElement('div', 'form-group');
    modalContent.appendChild(form);

    const inputs = {};
    item.inputFields.forEach(field => {
        const label = createElement('label', null, field.label);
        form.appendChild(label);

        const input = createElement(field.type === 'select' ? 'select' : 'input');
        if (field.type === 'number') {
            input.type = 'number';
            input.placeholder = 'Enter value';
        } else if (field.type === 'select') {
            field.options.forEach(option => {
                const opt = createElement('option', null, option);
                input.appendChild(opt);
            });
        }
        input.id = field.key;
        form.appendChild(input);

        inputs[field.key] = input; // Store references to inputs for later
    });

    const saveButton = createElement('button', 'button', 'Save Item');
    saveButton.addEventListener('click', () => {
        const itemData = { name: item.name, quantity: 1 };
        item.inputFields.forEach(field => {
            itemData[field.key] = inputs[field.key].value || 0;
        });

        const currentRoom = rooms[rooms.length - 1];
        if (!currentRoom) return alert('Please create a room first.');
        currentRoom.items.push(itemData);
        document.body.removeChild(modal);
        addRoom();
    });
    modalContent.appendChild(saveButton);

    document.body.appendChild(modal);
}



    function viewSummary() {
        const app = document.getElementById('app');
        app.innerHTML = '<h2>Summary</h2>';

        rooms.forEach((room, index) => {
            const roomSummary = createElement('div', 'room-summary');
            roomSummary.innerHTML = `
                <h3>Room ${index + 1}</h3>
                <p>Square Footage: ${room.sqft}</p>
                <p>Items:</p>
                <ul>
                    ${room.items.map(item => `<li>${item.name} (${JSON.stringify(item)})</li>`).join('')}
                </ul>
            `;
            app.appendChild(roomSummary);
        });

        const backButton = createElement('button', 'button', 'Back');
        backButton.addEventListener('click', setupRoomQuestions);
        app.appendChild(backButton);
    }

    injectStyles();
    initInterface();
})();
