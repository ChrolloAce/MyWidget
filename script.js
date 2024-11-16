

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

let quoteDetails = {
    jobType: null, // residential or commercial
    floors: null, // over or under 2 floors (residential) or over 10 feet height (commercial)
    requiresInsurance: false,
    propertyStatus: null, // vacant or occupied
    additionalCosts: 0
}
function generalQuestions() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    // Logo
    addLogo(app);

    const header = createElement('h2', null, 'General Questions');
    app.appendChild(header);

    const formContainer = createElement('div', 'form-container');
    formContainer.style.position = 'relative';
    formContainer.style.paddingBottom = '80px'; // To avoid overlap with the button
    formContainer.style.marginTop = '20px'; // Extra space at the top
    formContainer.style.gap = '20px'; // Gap between elements
    app.appendChild(formContainer);

    // Job Type
    const jobTypeGroup = createElement('div', 'form-group');
    jobTypeGroup.style.marginBottom = '20px'; // Add spacing
    const jobTypeLabel = createElement('label', null, 'Is this a commercial or residential job?');
    const jobTypeSelect = createElement('select');
    ['Select', 'Residential', 'Commercial'].forEach(option => {
        const opt = createElement('option', null, option);
        opt.value = option.toLowerCase();
        jobTypeSelect.appendChild(opt);
    });

    jobTypeSelect.addEventListener('change', () => {
        quoteDetails.jobType = jobTypeSelect.value;
        showJobSpecificQuestions(formContainer);
    });

    jobTypeGroup.appendChild(jobTypeLabel);
    jobTypeGroup.appendChild(jobTypeSelect);
    formContainer.appendChild(jobTypeGroup);

    // Continue Button
    const continueButton = createElement('button', 'button', 'Continue');
    continueButton.style.position = 'absolute';
    continueButton.style.bottom = '10px';
    continueButton.style.left = '50%';
    continueButton.style.transform = 'translateX(-50%)';
    continueButton.disabled = true;

    continueButton.addEventListener('click', setupRoomQuestions);
    app.appendChild(continueButton);

    function showJobSpecificQuestions(parent) {
        const existingQuestions = document.getElementById('job-specific-questions');
        if (existingQuestions) existingQuestions.remove();

        const jobSpecificQuestions = createElement('div', 'form-group');
        jobSpecificQuestions.id = 'job-specific-questions';
        jobSpecificQuestions.style.marginTop = '20px';
        parent.appendChild(jobSpecificQuestions);

        // Residential or Commercial Specific Questions
        if (quoteDetails.jobType === 'residential') {
            const floorsLabel = createElement('label', null, 'Is it over 2 floors or under?');
            const floorsSelect = createElement('select');
            ['Select', 'Over 2 Floors', 'Under 2 Floors'].forEach(option => {
                const opt = createElement('option', null, option);
                opt.value = option.toLowerCase();
                floorsSelect.appendChild(opt);
            });

            floorsSelect.addEventListener('change', () => {
                quoteDetails.floors = floorsSelect.value;
                validateQuestions();
            });

            jobSpecificQuestions.appendChild(floorsLabel);
            jobSpecificQuestions.appendChild(floorsSelect);
        } else if (quoteDetails.jobType === 'commercial') {
            const heightLabel = createElement('label', null, 'Is it over 10 feet height?');
            const heightSelect = createElement('select');
            ['Select', 'Yes', 'No'].forEach(option => {
                const opt = createElement('option', null, option);
                opt.value = option.toLowerCase();
                heightSelect.appendChild(opt);
            });

            heightSelect.addEventListener('change', () => {
                quoteDetails.floors = heightSelect.value === 'yes' ? 'Over 10 Feet' : 'Under 10 Feet';
                validateQuestions();
            });

            jobSpecificQuestions.appendChild(heightLabel);
            jobSpecificQuestions.appendChild(heightSelect);
        }

        // Insurance Checkbox
        const insuranceGroup = createElement('div', 'form-group');
        insuranceGroup.style.display = 'flex';
        insuranceGroup.style.alignItems = 'center';
        insuranceGroup.style.marginTop = '20px';
        insuranceGroup.style.gap = '10px';

        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkbox-wrapper-31';

        const insuranceCheckbox = createElement('input', null, null, { type: 'checkbox', id: 'insurance-checkbox' });
        insuranceCheckbox.addEventListener('change', () => {
            quoteDetails.requiresInsurance = insuranceCheckbox.checked;
            validateQuestions();
        });

        checkboxWrapper.appendChild(insuranceCheckbox);

        // Add the SVG for the checkbox styling
        checkboxWrapper.innerHTML += `
            <svg viewBox="0 0 35.6 35.6">
                <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
            </svg>
        `;

        const insuranceLabel = createElement('label', null, 'Does the job require insurance?', { for: 'insurance-checkbox' });

        insuranceGroup.appendChild(checkboxWrapper);
        insuranceGroup.appendChild(insuranceLabel);
        jobSpecificQuestions.appendChild(insuranceGroup);

        // Vacant or Occupied
        const propertyStatusGroup = createElement('div', 'form-group');
        propertyStatusGroup.style.marginTop = '20px';

        const propertyStatusLabel = createElement('label', null, 'Is the property vacant or occupied?');
        const propertyStatusSelect = createElement('select');
        ['Select', 'Vacant', 'Occupied'].forEach(option => {
            const opt = createElement('option', null, option);
            opt.value = option.toLowerCase();
            propertyStatusSelect.appendChild(opt);
        });

        propertyStatusSelect.addEventListener('change', () => {
            quoteDetails.propertyStatus = propertyStatusSelect.value;
            validateQuestions();
        });

        propertyStatusGroup.appendChild(propertyStatusLabel);
        propertyStatusGroup.appendChild(propertyStatusSelect);
        jobSpecificQuestions.appendChild(propertyStatusGroup);

        function validateQuestions() {
            continueButton.disabled = !(quoteDetails.jobType && quoteDetails.floors && quoteDetails.propertyStatus);
        }
    }
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


    
   function createElement(tag, className, textContent, attributes = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
}

function initInterface() {
    const app = document.createElement('div');
    app.className = 'container';
    app.id = 'app';
    document.body.innerHTML = '';
    document.body.appendChild(app);

    addLogo(app);

    const header = createElement('h1', null, 'Painting Quote Software');
    app.appendChild(header);

    const startButton = createElement('button', 'button', 'Begin Quote');
    startButton.addEventListener('click', generalQuestions);
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

    app.style.overflowY = 'auto';
    app.style.paddingBottom = '50px';
}

// Company and Client Details
const companyDetails = {
    name: "Paint Mana Jireh",
    owner: "Penelope Lopez",
    phone: "786-663-5210",
    email: "office@paintmanajireh.com",
};

const clientDetails = {
    name: "John Doe",
    address: "123 Main Street, Anywhere, USA",
    phone: "555-555-5555",
    email: "johndoe@example.com",
};

// Generate Invoice with PDFMake
function generateInvoiceWithPdfMake() {
    // Prepare the content for the invoice
    const invoiceItems = rooms.map((room, index) => [
        `Room ${index + 1} (${room.paintingOption.key})`,
        `${room.sqft} sqft`,
        `${room.paintingOption.description}`,
        `$${calculateRoomCost(room).toFixed(2)}`
    ]);

    const totalCost = calculateFinalPrice();

    // PDFMake document definition
    const dd = {
        content: [
            {
                columns: [
                    {
                        image: 'logo',
                        width: 100
                    },
                    {
                        text: [
                            { text: 'Paint Mana Jireh\n', style: 'header' },
                            { text: 'INVOICE\n', style: 'header' },
                            { text: `Date: ${new Date().toLocaleDateString()}`, style: 'subheader' }
                        ],
                        alignment: 'right'
                    }
                ]
            },
            { text: '\n' },
            {
                columns: [
                    {
                        text: [
                            { text: 'From:\n', style: 'subheader' },
                            `${companyDetails.name}\n`,
                            `Owner: ${companyDetails.owner}\n`,
                            `Phone: ${companyDetails.phone}\n`,
                            `Email: ${companyDetails.email}\n`
                        ]
                    },
                    {
                        text: [
                            { text: 'To:\n', style: 'subheader' },
                            `${clientDetails.name}\n`,
                            `${clientDetails.address}\n`,
                            `Phone: ${clientDetails.phone}\n`,
                            `Email: ${clientDetails.email}\n`
                        ],
                        alignment: 'right'
                    }
                ]
            },
            { text: '\n' },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto', 'auto', 'auto'],
                    body: [
                        [
                            { text: 'Room', style: 'tableHeader' },
                            { text: 'Square Footage', style: 'tableHeader' },
                            { text: 'Painting Option', style: 'tableHeader' },
                            { text: 'Cost', style: 'tableHeader' }
                        ],
                        ...invoiceItems,
                        [{ text: 'Total', colSpan: 3, alignment: 'right', bold: true }, {}, {}, `$${totalCost.toFixed(2)}`]
                    ]
                },
                layout: {
                    fillColor: function (rowIndex) {
                        return rowIndex === 0 ? '#f3f3f3' : null;
                    }
                }
            },
            { text: '\n' },
            { text: 'Thank you for your business!', style: 'footer' }
        ],
        images: {
            logo: 'https://i.ibb.co/twrVpYV/66c3ffee32324b40f8096a84-Untitled-26.png'
        },
        styles: {
            header: { fontSize: 20, bold: true },
            subheader: { fontSize: 14, bold: true },
            tableHeader: { bold: true, fontSize: 12, color: '#333' },
            footer: { fontSize: 12, italics: true }
        }
    };

    // Generate the PDF and open it
    pdfMake.createPdf(dd).download('invoice.pdf');
}

function addInvoiceButton(app) {
    const invoiceButton = createElement('button', 'button', 'Convert to Invoice');
    invoiceButton.addEventListener('click', generateInvoiceWithPdfMake);
    app.appendChild(invoiceButton);
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

    const damagesHeader = createElement('h3', null, 'Damages');
    modalContent.appendChild(damagesHeader);

    const damagesGrid = createElement('div', 'grid-container');
    modalContent.appendChild(damagesGrid);

    const extrasHeader = createElement('h3', null, 'Extras');
    modalContent.appendChild(extrasHeader);

    const extrasGrid = createElement('div', 'grid-container');
    modalContent.appendChild(extrasGrid);

    modalItems.forEach(item => {
        const itemCard = createElement('div', 'item-card');
        itemCard.style.border = '2px solid #ddd';
        itemCard.style.borderRadius = '8px';
        itemCard.style.padding = '10px';
        itemCard.style.textAlign = 'center';

        const itemImage = createElement('img');
        itemImage.src = item.imageUrl;
        itemImage.alt = item.name;
        itemImage.style.width = '100px';
        itemImage.style.height = '100px';

        const itemName = createElement('p', null, item.name);

        itemCard.appendChild(itemImage);
        itemCard.appendChild(itemName);
        itemCard.addEventListener('click', () => handleItemSelection(item, currentRoom));

        if (['crackRepairs', 'wallHoles', 'darkWalls'].includes(item.key)) {
            damagesGrid.appendChild(itemCard);
        } else {
            extrasGrid.appendChild(itemCard);
        }
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
            roomCost += room.sqft * room.paintingOption.price;
        }

        room.items.forEach(item => {
            roomCost += item.cost * (item.quantity || 1);
        });

        return total + roomCost;
    }, quoteDetails.additionalCosts);
}

function calculateAdditionalCosts() {
    let additionalCosts = 0;

    if (quoteDetails.requiresInsurance) {
        additionalCosts += 200; // Insurance Fee
    }

    if (quoteDetails.propertyStatus === 'occupied') {
        const totalSqFt = rooms.reduce((total, room) => total + room.sqft, 0);
        additionalCosts += totalSqFt * 0.25; // Extra fee per sqft for occupied property
    }

    quoteDetails.additionalCosts = additionalCosts;
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

// Update Summary Page
function viewSummary() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.style.overflowY = 'auto'; // Enable scrolling
    app.style.paddingBottom = '20px'; // Extra padding for the bottom

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

    addInvoiceButton(app); // Add the invoice button

    const addRoomButton = createElement('button', 'button', 'Add Another Room');
    addRoomButton.addEventListener('click', () => addRoom());
    app.appendChild(addRoomButton);
}

    initInterface();
})();
