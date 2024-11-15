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

        const form = document.createElement('div');
        form.className = 'form-group';
        form.innerHTML = `
            <label>Enter Square Footage:</label>
            <input type="number" id="sqft" placeholder="e.g., 500">
        `;
        app.appendChild(form);

        const buttonGroup = createElement('div', 'button-group');
        app.appendChild(buttonGroup);

        const addItemButton = createElement('button', 'button', 'Add Items');
        addItemButton.addEventListener('click', () => showItemModal());
        buttonGroup.appendChild(addItemButton);

        const saveButton = createElement('button', 'button', 'Save Room');
        saveButton.addEventListener('click', () => {
            const sqft = parseFloat(document.getElementById('sqft').value) || 0;
            rooms.push({ sqft, items: [] });
            setupRoomQuestions();
        });
        buttonGroup.appendChild(saveButton);

        const backButton = createElement('button', 'button', 'Back');
        backButton.addEventListener('click', setupRoomQuestions);
        buttonGroup.appendChild(backButton);
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

        modalItems.forEach(item => {
            const itemImage = createElement('img');
            itemImage.src = item.imageUrl;
            itemImage.alt = item.name;
            itemImage.title = item.name;
            itemImage.addEventListener('click', () => {
                document.body.removeChild(modal);
                handleItemSelection(item);
            });
            modalContent.appendChild(itemImage);
        });

        document.body.appendChild(modal);
    }

    function handleItemSelection(item) {
        if (!item.requiresInput) {
            rooms[rooms.length - 1].items.push({ name: item.name, cost: additionalCosts[item.key] || 0 });
            return addRoom(); // Return to room setup
        }

        const modal = createElement('div', 'modal');
        const modalContent = createElement('div', 'modal-content');
        modal.appendChild(modalContent);

        const closeButton = createElement('button', 'close-btn', '×');
        closeButton.addEventListener('click', () => document.body.removeChild(modal));
        modalContent.appendChild(closeButton);

        const form = document.createElement('div');
        form.className = 'form-group';
        modalContent.appendChild(form);

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
        });

        const saveButton = createElement('button', 'button', 'Save Item');
        saveButton.addEventListener('click', () => {
            const itemData = { name: item.name };
            item.inputFields.forEach(field => {
                itemData[field.key] = document.getElementById(field.key).value || 0;
            });
            rooms[rooms.length - 1].items.push(itemData);
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
