(function () {
 const pricingOptions = {
    economical: { price: 1.4, description: 'Includes: Walls only' },
    standard: { price: 2.0, description: 'Includes: Walls and Ceilings' },
    premium: { price: 2.3, description: 'Includes: Walls, Ceilings, and Baseboards' }
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
        name: 'Doors & Trims',
        imageUrl: 'https://i.ibb.co/xF22Yn3/dioor.png',
        key: 'doors',
        requiresInput: true,
        inputFields: [{ label: 'Number of Doors', type: 'number', key: 'quantity' }],
        costPerItem: 80
    },
    {
        name: 'Crack Repairs',
        imageUrl: 'https://i.ibb.co/xF22Yn3/wallcrack.png',
        key: 'crackRepairs',
        requiresInput: true,
        inputFields: [{ label: 'Number of Cracks', type: 'number', key: 'quantity' }],
        costPerItem: 50
    },
    {
        name: 'Wall Holes Fix',
        imageUrl: 'https://i.ibb.co/bKtQCs3/wallhole.png',
        key: 'wallHoles',
        requiresInput: true,
        inputFields: [{ label: 'Number of Wall Holes', type: 'number', key: 'quantity' }],
        costPerItem: 10
    },
    {
        name: 'Wallpaper Removal',
        imageUrl: 'https://i.ibb.co/3WJgncJ/Wallpaper-removal.png',
        key: 'wallpaper',
        requiresInput: true,
        inputFields: [{ label: 'Number of Walls', type: 'number', key: 'quantity' }],
        costPerItem: 25
    },
    {
        name: 'Dark Walls',
        imageUrl: 'https://i.ibb.co/1fYxFbm/DarkWall.png',
        key: 'darkWalls',
        requiresInput: true,
        inputFields: [{ label: 'Number of Dark Walls', type: 'number', key: 'quantity' }],
        costPerItem: 15
    },
    {
        name: 'Bathtub',
        imageUrl: 'https://i.ibb.co/Lv2R1ys/bathrub.png',
        key: 'bathtub',
        requiresInput: false,
        costPerItem: 250
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
        ],
        costPerItem: 200
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

    // Logo
    addLogo(app);

    const header = createElement('h2', null, 'Add Room');
    app.appendChild(header);

    // Temporary room object to hold room data
    let currentRoom = {
        sqft: 0,
        items: [],
        paintingOption: null
    };

    // Painting Package Selection with Collapsible Behavior
    const packageContainer = createElement('div', 'package-container');
    app.appendChild(packageContainer);

    const packageOptions = {
        economical: { price: 1.5, description: 'Includes: Walls only' },
        standard: { price: 2.0, description: 'Includes: Walls and Ceilings' },
        premium: { price: 3.0, description: 'Includes: Walls, Ceilings, and Baseboards' }
    };

    if (currentRoom.paintingOption) {
        // If a package is already selected, show only the selected package
        renderSelectedPackage(packageContainer, currentRoom.paintingOption, packageOptions, () => {
            renderPackageSelection(packageContainer, packageOptions, currentRoom);
        });
    } else {
        // Show all packages for initial selection
        renderPackageSelection(packageContainer, packageOptions, currentRoom);
    }

    // Square Footage Input
    const sqftGroup = createElement('div', 'form-group');
    const sqftLabel = createElement('label', null, 'Enter Square Footage:');
    const sqftInput = createElement('input');
    sqftInput.type = 'number';
    sqftInput.placeholder = 'e.g., 1500';
    sqftInput.addEventListener('input', () => {
        currentRoom.sqft = parseInt(sqftInput.value) || 0;
    });
    sqftGroup.appendChild(sqftLabel);
    sqftGroup.appendChild(sqftInput);
    app.appendChild(sqftGroup);

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
        if (currentRoom.sqft === 0) {
            alert('Please enter the square footage.');
            return;
        }
        rooms.push(currentRoom); // Finalize the room
        viewSummary(); // Navigate to the summary
    });
    app.appendChild(saveButton);

    // Back Button
    const backButton = createElement('button', 'button', 'Back');
    backButton.addEventListener('click', setupRoomQuestions);
    app.appendChild(backButton);
}



function renderPackageSelection(container, packageOptions, currentRoom) {
    container.innerHTML = ''; // Clear existing content
    Object.entries(packageOptions).forEach(([key, option]) => {
        const packageCard = createElement('div', 'package-card');
        packageCard.style.border = '2px solid black';
        packageCard.style.margin = '10px';
        packageCard.style.padding = '15px';

        const title = createElement('h4', null, `${key.charAt(0).toUpperCase() + key.slice(1)} - $${option.price}/sqft`);
        packageCard.appendChild(title);

        const description = createElement('p', null, option.description);
        packageCard.appendChild(description);

        const selectButton = createElement('button', 'button', 'Select Package');
        selectButton.addEventListener('click', () => {
            currentRoom.paintingOption = { key, ...option };
            renderSelectedPackage(container, currentRoom.paintingOption, packageOptions, () => {
                renderPackageSelection(container, packageOptions, currentRoom);
            });
        });
        packageCard.appendChild(selectButton);

        container.appendChild(packageCard);
    });
}

function renderSelectedPackage(container, selectedPackage, packageOptions, changeCallback) {
    container.innerHTML = ''; // Clear existing content

    const packageCard = createElement('div', 'package-card');
    packageCard.style.border = '2px solid black';
    packageCard.style.margin = '10px';
    packageCard.style.padding = '15px';
    packageCard.style.backgroundColor = '#e0f7fa'; // Highlight selected package

    const title = createElement('h4', null, `${selectedPackage.key.charAt(0).toUpperCase() + selectedPackage.key.slice(1)} - $${selectedPackage.price}/sqft`);
    packageCard.appendChild(title);

    const description = createElement('p', null, selectedPackage.description);
    packageCard.appendChild(description);

    const changeButton = createElement('button', 'button', 'Change Package');
    changeButton.addEventListener('click', changeCallback);
    packageCard.appendChild(changeButton);

    container.appendChild(packageCard);
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

        const itemImage = createElement('img');
        itemImage.src = item.imageUrl;
        itemImage.alt = item.name;
        itemImage.style.width = '100px';
        itemImage.style.height = '100px';

        const itemName = createElement('div', null, item.name);
        itemDiv.appendChild(itemImage);
        itemDiv.appendChild(itemName);

        itemDiv.addEventListener('click', () => handleItemSelection(item, currentRoom));
        itemContainer.appendChild(itemDiv);
    });

    document.body.appendChild(modal);
}




function handleItemSelection(item, currentRoom) {
    if (!item.requiresInput) {
        currentRoom.items.push({ name: item.name, cost: item.costPerItem || 0, quantity: 1 });
        return; // Close modal
    }

    const modal = document.querySelector('.modal-content');
    modal.innerHTML = `<h2>Add Details for ${item.name}</h2>`;
    const form = createElement('div', 'form-group');
    modal.appendChild(form);

    const inputs = {};
    item.inputFields.forEach(field => {
        const label = createElement('label', null, field.label);
        const input = createElement(field.type === 'select' ? 'select' : 'input');
        if (field.type === 'number') input.type = 'number';
        if (field.type === 'select') field.options.forEach(opt => input.appendChild(createElement('option', null, opt)));
        inputs[field.key] = input;
        form.appendChild(label);
        form.appendChild(input);
    });

    const saveButton = createElement('button', 'button', 'Save Item');
    saveButton.addEventListener('click', () => {
        const newItem = { name: item.name, cost: item.costPerItem || 0 };
        item.inputFields.forEach(field => {
            newItem[field.key] = inputs[field.key].value || '';
        });
        currentRoom.items.push(newItem);
        document.body.removeChild(document.querySelector('.modal'));
    });
    modal.appendChild(saveButton);
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
            roomCost += (room.sqft || 0) * (room.paintingOption.price || 0);
        }
        room.items.forEach(item => {
            roomCost += (item.cost || 0) * (item.quantity || 1);
        });
        return total + roomCost;
    }, 0);
}



function displayMaterialsAndFinalPrice(app) {
    const materialsSection = createElement('div', 'materials-summary');
    materialsSection.style.border = '2px dotted #000';
    materialsSection.style.borderRadius = '10px';
    materialsSection.style.padding = '15px';
    materialsSection.style.marginTop = '20px';
    materialsSection.style.backgroundColor = '#f9f9f9'; // Slightly greyish-white

    const materialsHeader = createElement('h3', null, 'Materials');
    materialsHeader.style.fontWeight = 'bold';
    materialsHeader.style.textAlign = 'center';
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
function calculateRoomCost(room) {
    let roomCost = 0;

    // Calculate cost for painting
    if (room.paintingOption) {
        roomCost += (room.sqft || 0) * (room.paintingOption.price || 0);
    }

    // Calculate cost for items
    room.items.forEach(item => {
        roomCost += (item.cost || 0) * (item.quantity || 1);
    });

    return roomCost;
}

function viewSummary() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    addLogo(app);

    const header = createElement('h2', null, 'Summary');
    app.appendChild(header);

    if (rooms.length === 0) {
        const emptyMessage = createElement('p', null, 'No rooms added yet.');
        app.appendChild(emptyMessage);
    } else {
        rooms.forEach((room, index) => {
            const roomSummary = createElement('div', 'room-summary');
            roomSummary.style.border = '2px solid #000';
            roomSummary.style.borderRadius = '10px';
            roomSummary.style.margin = '10px';
            roomSummary.style.padding = '10px';

            const roomHeader = createElement('h3', null, `Room ${index + 1}`);
            roomSummary.appendChild(roomHeader);

            const sqftText = createElement('p', null, `Square Footage: ${room.sqft}`);
            roomSummary.appendChild(sqftText);

            const paintingOption = createElement('p', null, `Painting Option: ${room.paintingOption?.key || "None"}`);
            roomSummary.appendChild(paintingOption);

            const itemsHeader = createElement('p', null, 'Items:');
            roomSummary.appendChild(itemsHeader);

            const itemList = createElement('ul');
            room.items.forEach(item => {
                const itemLi = createElement('li', null, `${item.name} - Quantity: ${item.quantity}`);
                itemList.appendChild(itemLi);
            });
            roomSummary.appendChild(itemList);

            app.appendChild(roomSummary);
        });

        displayMaterialsAndFinalPrice(app);
    }

    const addRoomButton = createElement('button', 'button', 'Add Another Room');
    addRoomButton.addEventListener('click', () => addRoom());
    app.appendChild(addRoomButton);
}







    injectStyles();
    initInterface();
})();
