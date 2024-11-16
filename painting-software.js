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

            @media (max-width: 767px) {
    .container {
        border-radius: 0;
        padding: 20px;
    }

    .room-summary, .material-summary {
        border-radius: 10px;
    }
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


            .logo-section {
    margin-bottom: 20px;
}

.logo {
    display: block;
    margin: 0 auto;
}

.room-summary {
    background-color: #f8f8f8;
    padding: 15px;
    margin: 10px 0;
    border: 2px solid black;
    border-radius: 10px;
}

ul {
    list-style-type: disc;
    margin-left: 20px;
    text-align: left;
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

function addLogo(container) {
    const logoSection = createElement('div', 'logo-section');
    logoSection.style.textAlign = 'center';
    logoSection.style.marginBottom = '20px';

    const logo = createElement('img', 'logo');
    logo.src = 'https://i.ibb.co/jLhmxkV/66c3ffee32324b40f8096a84-Untitled-26.png';
    logo.alt = 'Company Logo';
    logo.style.width = '150px'; // Adjust size
    logo.style.height = 'auto';

    logoSection.appendChild(logo);
    container.appendChild(logoSection);
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

    // Add Logo
    addLogo(app);

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
    app.innerHTML = '';

    const header = createElement('h2', null, 'Add Room');
    app.appendChild(header);

    let currentRoom = rooms[rooms.length - 1] || { sqft: 0, items: [], paintingOption: null };

    const packageContainer = createElement('div', 'package-container');
    app.appendChild(packageContainer);

    // Render Package Selection
    renderPackageSelection(currentRoom, pricingOptions, packageContainer);

    // Square Footage Input
    const sqftGroup = createElement('div', 'form-group');
    const sqftLabel = createElement('label', null, 'Enter Square Footage:');
    const sqftInput = createElement('input');
    sqftInput.type = 'number';
    sqftInput.placeholder = 'e.g., 1500';
    sqftInput.value = currentRoom.sqft || '';
    sqftGroup.appendChild(sqftLabel);
    sqftGroup.appendChild(sqftInput);
    app.appendChild(sqftGroup);

    sqftInput.addEventListener('input', () => {
        currentRoom.sqft = parseInt(sqftInput.value) || 0;
    });

    // Add Items Button
    const addItemButton = createElement('button', 'button', 'Add Items');
    addItemButton.addEventListener('click', () => showItemModal(currentRoom));
    app.appendChild(addItemButton);

    // Save Room Button
    const saveButton = createElement('button', 'button', 'Save Room');
    saveButton.addEventListener('click', () => {
        if (!currentRoom.paintingOption) {
            alert('Please select a painting package.');
            return;
        }
        if (!rooms.includes(currentRoom)) {
            rooms.push(currentRoom); // Add the room only once when saved
        }
        setupRoomQuestions();
    });
    app.appendChild(saveButton);

    // Back Button
    const backButton = createElement('button', 'button', 'Back');
    backButton.addEventListener('click', setupRoomQuestions);
    app.appendChild(backButton);
}


function renderPackage(container, key, option, isSelected) {
    const packageCard = createElement('div', 'package-card');
    packageCard.style.border = '2px solid black';
    packageCard.style.margin = '10px';
    packageCard.style.padding = '15px';
    packageCard.style.backgroundColor = 'white';
    packageCard.style.textAlign = 'center';

    const title = createElement('h4', null, `${key.charAt(0).toUpperCase() + key.slice(1)} - $${option.price}/sqft`);
    packageCard.appendChild(title);

    const description = createElement('p', null, option.description);
    packageCard.appendChild(description);

    if (isSelected) {
        const changeButton = createElement('button', 'button change-package-button', 'Change Package');
        changeButton.addEventListener('click', () => {
            container.innerHTML = ''; // Clear and show all packages to reselect
            Object.entries({
                economical: { price: 1.5, description: 'Includes: Walls only' },
                standard: { price: 2.0, description: 'Includes: Walls and Ceilings' },
                premium: { price: 3.0, description: 'Includes: Walls, Ceilings, and Baseboards' },
            }).forEach(([newKey, newOption]) => renderPackage(container, newKey, newOption, false));
        });
        packageCard.appendChild(changeButton);
    } else {
        const selectButton = createElement('button', 'button', 'Select Package');
        selectButton.addEventListener('click', () => {
            rooms[rooms.length - 1].paintingOption = { key, ...option };
            container.innerHTML = ''; // Clear and render only selected package
            renderPackage(container, key, option, true);
        });
        packageCard.appendChild(selectButton);
    }

    container.appendChild(packageCard);
}

function renderPackageSelection(currentRoom, packageOptions, packageContainer) {
    packageContainer.innerHTML = '';
    Object.entries(packageOptions).forEach(([key, option]) => {
        const packageCard = createElement('div', 'package-card');
        packageCard.style.border = '2px solid black';
        packageCard.style.margin = '10px';
        packageCard.style.padding = '15px';
        packageCard.style.backgroundColor = 'white';

        const title = createElement('h4', null, `${key.charAt(0).toUpperCase() + key.slice(1)} - $${option.price}/sqft`);
        packageCard.appendChild(title);

        const description = createElement('p', null, option.description);
        packageCard.appendChild(description);

        if (currentRoom.paintingOption && currentRoom.paintingOption.key === key) {
            // Display "Change Package" button for selected package
            const changeButton = createElement('button', 'button change-package-button', 'Change Package');
            changeButton.addEventListener('click', () => {
                currentRoom.paintingOption = null; // Reset painting option
                renderPackageSelection(currentRoom, packageOptions, packageContainer); // Rerender all options
            });
            packageCard.appendChild(changeButton);
        } else {
            // Display "Select Package" button for non-selected packages
            const selectButton = createElement('button', 'button', 'Select Package');
            selectButton.addEventListener('click', () => {
                currentRoom.paintingOption = { key, ...option };
                packageContainer.innerHTML = ''; // Clear container and display only the selected package
                renderPackageSelection(currentRoom, packageOptions, packageContainer);
            });
            packageCard.appendChild(selectButton);
        }

        // Append only the selected package or all packages if none is selected
        if (!currentRoom.paintingOption || currentRoom.paintingOption.key === key) {
            packageContainer.appendChild(packageCard);
        }
    });
}




function showItemModal(currentRoom) {
    const modal = createElement('div', 'modal');
    const modalContent = createElement('div', 'modal-content');
    modal.appendChild(modalContent);

    const closeButton = createElement('button', 'close-btn', '×');
    closeButton.addEventListener('click', () => document.body.removeChild(modal));
    modalContent.appendChild(closeButton);

    const header = createElement('h2', null, 'Add an Item');
    modalContent.appendChild(header);

    const itemContainer = createElement('div', 'item-container');
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

        const itemName = createElement('div', null, item.name);
        itemName.style.marginTop = '5px';

        itemDiv.appendChild(itemImage);
        itemDiv.appendChild(itemName);

        itemDiv.addEventListener('click', () => {
            document.body.removeChild(modal);
            handleItemSelection(item, currentRoom); // Update the current room's items
        });

        itemContainer.appendChild(itemDiv);
    });

    document.body.appendChild(modal);
}



 function handleItemSelection(item, currentRoom) {
    if (!item.requiresInput) {
        // Add items without inputs (like Bathtub)
        currentRoom.items.push({ name: item.name, cost: additionalCosts[item.key] || 0, quantity: 1 });
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

        inputs[field.key] = input;
    });

    const saveButton = createElement('button', 'button', 'Save Item');
    saveButton.addEventListener('click', () => {
        const itemData = { name: item.name, quantity: 1 };
        item.inputFields.forEach(field => {
            itemData[field.key] = inputs[field.key].value || 0;
        });

        currentRoom.items.push(itemData); // Update the current room's items
        document.body.removeChild(modal);
    });
    modalContent.appendChild(saveButton);

    document.body.appendChild(modal);
}


function editRoom(index) {
    const roomToEdit = rooms[index];
    if (!roomToEdit) {
        alert('Invalid room selection.');
        return;
    }

    rooms.splice(index, 1);
    rooms.push(roomToEdit);

    addRoom(() => viewSummary());
}
// Helper Functions
function calculateGallons(type) {
    let totalSqFt = rooms.reduce((total, room) => {
        if (room.paintingOption && room.paintingOption.key === type) {
            return total + room.sqft;
        }
        return total;
    }, 0);
    return Math.ceil(totalSqFt / 350);  // Assuming 1 gallon covers 350 sq ft
}

function calculateFinalPrice() {
    return rooms.reduce((total, room) => {
        let roomCost = 0;
        if (room.paintingOption) {
            roomCost += room.sqft * room.paintingOption.price;
        }
        room.items.forEach(item => {
            roomCost += item.cost * (item.quantity || 1);
        });
        return total + roomCost;
    }, 0);
}


function displayMaterialsAndFinalPrice(app) {
    const materialsSection = createElement('div', 'materials-summary');
    materialsSection.style.borderRadius = '10px';
    materialsSection.style.border = '2px dashed #000';
    materialsSection.style.padding = '15px';
    materialsSection.style.marginTop = '20px';
    materialsSection.style.backgroundColor = '#f0f0f0';

    const materialsHeader = createElement('h3', null, 'Materials');
    materialsHeader.style.fontWeight = 'bold';
    materialsSection.appendChild(materialsHeader);

    const wallsGallons = calculateGallons('walls');
    const ceilingGallons = calculateGallons('ceiling');
    const cabinetsGallons = calculateGallons('cabinets');

    const wallsText = createElement('p', null, `Walls (Economical Paint): ${wallsGallons} gallons needed`);
    const ceilingText = createElement('p', null, `Ceiling (Standard Paint): ${ceilingGallons} gallons needed`);
    const cabinetsText = createElement('p', null, `Cabinets (Premium Paint): ${cabinetsGallons} gallons needed`);

    materialsSection.appendChild(wallsText);
    materialsSection.appendChild(ceilingText);
    materialsSection.appendChild(cabinetsText);
    app.appendChild(materialsSection);

    // Final Price
    const finalPrice = calculateFinalPrice();
    const finalPriceText = createElement('p', 'final-price', `Final Price: $${finalPrice.toFixed(2)}`);
    finalPriceText.style.fontWeight = 'bold';
    app.appendChild(finalPriceText);
}
function calculateMaterialUsage() {
    const materialUsage = {
        walls: 0,
        ceiling: 0,
        cabinets: 0,
    };

    rooms.forEach(room => {
        if (room.paintingOption) {
            materialUsage.walls += room.sqft;
            // Add logic for specific options if needed (like ceilings or cabinets)
        }
    });

    return `
        <h3>Materials</h3>
        <p>Walls (Economical Paint): ${Math.ceil(materialUsage.walls / 350)} gallons</p>
    `;
}


function viewSummary() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const header = createElement('h2', null, 'Summary');
    app.appendChild(header);

    if (rooms.length === 0) {
        const emptyMessage = createElement('p', null, 'No rooms added yet.');
        app.appendChild(emptyMessage);
    } else {
        rooms.forEach((room, index) => {
            const roomSummary = createElement('div', 'room-summary');
            roomSummary.style.marginBottom = '20px';
            roomSummary.innerHTML = `
                <h3>Room ${index + 1}</h3>
                <p>Square Footage: ${room.sqft}</p>
                <p>Painting Option: ${room.paintingOption?.key || 'None'}</p>
                <ul>${room.items.map(item => `<li>${item.name} - Quantity: ${item.quantity || 1}</li>`).join('')}</ul>
            `;

            const toolbar = createElement('div', 'room-toolbar');
            const removeButton = createElement('button', 'button', 'Remove');
            removeButton.addEventListener('click', () => {
                rooms.splice(index, 1);
                viewSummary();
            });
            toolbar.appendChild(removeButton);

            const editButton = createElement('button', 'button', 'Edit');
            editButton.addEventListener('click', () => editRoom(index));
            toolbar.appendChild(editButton);

            roomSummary.appendChild(toolbar);
            app.appendChild(roomSummary);
        });

        const materialsSummary = createElement('div', 'materials-summary');
        materialsSummary.innerHTML = calculateMaterialUsage();
        app.appendChild(materialsSummary);

        const totalCost = calculateFinalPrice();
        const finalPriceText = createElement('h3', null, `Final Price: $${totalCost.toFixed(2)}`);
        app.appendChild(finalPriceText);
    }

    const backButton = createElement('button', 'button', 'Back');
    backButton.addEventListener('click', setupRoomQuestions);
    app.appendChild(backButton);
}





    injectStyles();
    initInterface();
})();
