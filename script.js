(function () {
    // Pricing Options
    const pricingOptions = {
        economical: { price: 1.4, description: 'Includes: Walls only' },
        standard: { price: 2.0, description: 'Includes: Walls and Ceilings' },
        premium: { price: 2.3, description: 'Includes: Walls, Ceilings, and Baseboards' },
    };

    // Additional Costs
    const additionalCosts = {
        bathtubFee: 250,
        stairStepFee: 50,
        darkWallFee: 0.5,
        holeFee: 10,
        cabinetHandleFee: 10,
    };

    let rooms = [];
    let totalCost = 0;

    // Modal Items
    const modalItems = [
        {
            name: 'Doors & Trims',
            imageUrl: 'https://i.ibb.co/xF22Yn3/dioor.png',
            key: 'doors',
            requiresInput: true,
            inputFields: [{ label: 'Number of Doors', type: 'number', key: 'quantity' }],
            costPerItem: 80,
        },
        {
            name: 'Crack Repairs',
            imageUrl: 'https://i.ibb.co/xF22Yn3/wallcrack.png',
            key: 'crackRepairs',
            requiresInput: true,
            inputFields: [{ label: 'Number of Cracks', type: 'number', key: 'quantity' }],
            costPerItem: 50,
        },
        {
            name: 'Wall Holes Fix',
            imageUrl: 'https://i.ibb.co/bKtQCs3/wallhole.png',
            key: 'wallHoles',
            requiresInput: true,
            inputFields: [{ label: 'Number of Wall Holes', type: 'number', key: 'quantity' }],
            costPerItem: 10,
        },
        {
            name: 'Wallpaper Removal',
            imageUrl: 'https://i.ibb.co/3WJgncJ/Wallpaper-removal.png',
            key: 'wallpaper',
            requiresInput: true,
            inputFields: [{ label: 'Number of Walls', type: 'number', key: 'quantity' }],
            costPerItem: 25,
        },
        {
            name: 'Dark Walls',
            imageUrl: 'https://i.ibb.co/1fYxFbm/DarkWall.png',
            key: 'darkWalls',
            requiresInput: true,
            inputFields: [{ label: 'Number of Dark Walls', type: 'number', key: 'quantity' }],
            costPerItem: 15,
        },
        {
            name: 'Bathtub',
            imageUrl: 'https://i.ibb.co/Lv2R1ys/bathrub.png',
            key: 'bathtub',
            requiresInput: false,
            costPerItem: 250,
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
                { label: 'Paint Option', type: 'select', key: 'paint', options: ['Inside', 'Outside', 'Both'] },
            ],
            costPerItem: 200,
        },
    ];

    let quoteDetails = {
        jobType: null, // residential or commercial
        floors: null, // over or under 2 floors (residential) or over 10 feet height (commercial)
        requiresInsurance: false,
        propertyStatus: null, // vacant or occupied
        additionalCosts: 0,
    };

    // Helper function to create DOM elements
    function createElement(tag, className, textContent, attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
    }

    // Initialize Interface
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

    // Add Logo
    function addLogo(container) {
        const logoSection = createElement('div', 'logo-section');
        const logo = createElement('img', 'logo');
        logo.src = 'https://i.ibb.co/jLhmxkV/66c3ffee32324b40f8096a84-Untitled-26.png';
        logo.alt = 'Company Logo';
        logoSection.appendChild(logo);
        container.appendChild(logoSection);
    }

    // General Questions
    function generalQuestions() {
        const app = document.getElementById('app');
        app.innerHTML = '';

        addLogo(app);
        const header = createElement('h2', null, 'General Questions');
        app.appendChild(header);

        const formContainer = createElement('div', 'form-container');
        app.appendChild(formContainer);

        // Job Type Dropdown
        const jobTypeGroup = createElement('div', 'form-group');
        const jobTypeLabel = createElement('label', null, 'Is this a commercial or residential job?');
        const jobTypeSelect = createElement('select');
        ['Select', 'Residential', 'Commercial'].forEach((option) => {
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

        const continueButton = createElement('button', 'button', 'Continue');
        continueButton.disabled = true;
        continueButton.addEventListener('click', setupRoomQuestions);
        app.appendChild(continueButton);

        function showJobSpecificQuestions(parent) {
            const existingQuestions = document.getElementById('job-specific-questions');
            if (existingQuestions) existingQuestions.remove();

            const jobSpecificQuestions = createElement('div', 'form-group');
            jobSpecificQuestions.id = 'job-specific-questions';
            parent.appendChild(jobSpecificQuestions);

            // Residential or Commercial Specific Questions
            if (quoteDetails.jobType === 'residential') {
                const floorsLabel = createElement('label', null, 'Is it over 2 floors or under?');
                const floorsSelect = createElement('select');
                ['Select', 'Over 2 Floors', 'Under 2 Floors'].forEach((option) => {
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
                ['Select', 'Yes', 'No'].forEach((option) => {
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

            function validateQuestions() {
                continueButton.disabled = !(quoteDetails.jobType && quoteDetails.floors);
            }
        }
    }

    // Setup Room Questions
    function setupRoomQuestions() {
        const app = document.getElementById('app');
        app.innerHTML = '';

        const header = createElement('h2', null, 'Room Setup');
        app.appendChild(header);

        const buttonGroup = createElement('div', 'button-group');
        const addRoomButton = createElement('button', 'button', 'Add Room');
        addRoomButton.addEventListener('click', () => addRoom());

        const viewSummaryButton = createElement('button', 'button', 'View Summary');
        viewSummaryButton.addEventListener('click', viewSummary);

        buttonGroup.appendChild(addRoomButton);
        buttonGroup.appendChild(viewSummaryButton);
        app.appendChild(buttonGroup);
    }

     // Add Room Functionality
    function addRoom() {
        const app = document.getElementById('app');
        app.innerHTML = '';

        addLogo(app);

        const header = createElement('h2', null, 'Add Room');
        app.appendChild(header);

        let currentRoom = {
            sqft: 0,
            items: [],
            paintingOption: null,
        };

        // Package Selection
        const packageContainer = createElement('div', 'package-container');
        app.appendChild(packageContainer);

        const packageOptions = {
            economical: pricingOptions.economical,
            standard: pricingOptions.standard,
            premium: pricingOptions.premium,
        };

        renderPackageSelection(packageContainer, packageOptions, currentRoom);

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
            rooms.push(currentRoom); // Save the current room
            viewSummary(); // Navigate to summary
        });
        app.appendChild(saveButton);

        // Back Button
        const backButton = createElement('button', 'button', 'Back');
        backButton.addEventListener('click', setupRoomQuestions);
        app.appendChild(backButton);
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



function calculateGallons(type) {
    let totalSqFt = rooms.reduce((total, room) => {
        if (room.paintingOption && room.paintingOption.key === type) {
            return total + room.sqft;
        }
        return total;
    }, 0);
    return Math.ceil(totalSqFt / 350); // 1 gallon covers 350 sq ft
}



function calculateFinalPrice() {
    return rooms.reduce((total, room) => {
        let roomCost = 0;

        // Add cost for painting
        if (room.paintingOption) {
            roomCost += (room.sqft || 0) * (room.paintingOption.price || 0);
        }

        // Add cost for items in the room
        room.items.forEach(item => {
            roomCost += (item.cost || 0) * (item.quantity || 1);
        });

        return total + roomCost;
    }, quoteDetails.additionalCosts);
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




    
// Generate Invoice with PDFMake
function generateInvoiceWithPdfMake() {
    const invoiceItems = rooms.map((room, index) => [
        `Room ${index + 1} (${room.paintingOption.key})`,
        `${room.sqft} sqft`,
        `${room.paintingOption.description}`,
        `$${calculateRoomCost(room).toFixed(2)}`
    ]);

    const totalCost = calculateFinalPrice();

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

    pdfMake.createPdf(dd).download('invoice.pdf');
}

function addInvoiceButton(app) {
    const invoiceButton = createElement('button', 'button', 'Generate Invoice');
    invoiceButton.addEventListener('click', generateInvoiceWithPdfMake);
    app.appendChild(invoiceButton);
}

    
    // Render Package Selection
    function renderPackageSelection(container, packageOptions, currentRoom) {
        container.innerHTML = ''; // Clear existing content
        Object.entries(packageOptions).forEach(([key, option]) => {
            const packageCard = createElement('div', 'package-card');
            const title = createElement('h4', null, `${key.charAt(0).toUpperCase() + key.slice(1)} - $${option.price}/sqft`);
            const description = createElement('p', null, option.description);
            const selectButton = createElement('button', 'button', 'Select Package');
            selectButton.addEventListener('click', () => {
                currentRoom.paintingOption = { key, ...option };
                renderSelectedPackage(container, currentRoom.paintingOption, packageOptions, () => {
                    renderPackageSelection(container, packageOptions, currentRoom);
                });
            });

            packageCard.appendChild(title);
            packageCard.appendChild(description);
            packageCard.appendChild(selectButton);
            container.appendChild(packageCard);
        });
    }

    // Render Selected Package
    function renderSelectedPackage(container, selectedPackage, packageOptions, changeCallback) {
        container.innerHTML = '';
        const packageCard = createElement('div', 'package-card selected-package');
        const title = createElement('h4', null, `${selectedPackage.key.charAt(0).toUpperCase() + selectedPackage.key.slice(1)} - $${selectedPackage.price}/sqft`);
        const description = createElement('p', null, selectedPackage.description);
        const changeButton = createElement('button', 'button', 'Change Package');
        changeButton.addEventListener('click', changeCallback);

        packageCard.appendChild(title);
        packageCard.appendChild(description);
        packageCard.appendChild(changeButton);
        container.appendChild(packageCard);
    }

    // Show Item Modal
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

        modalItems.forEach((item) => {
            const itemCard = createElement('div', 'item-card');
            const itemImage = createElement('img');
            itemImage.src = item.imageUrl;
            itemImage.alt = item.name;
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

    // Handle Item Selection
    function handleItemSelection(item, currentRoom) {
        if (!item.requiresInput) {
            currentRoom.items.push({ name: item.name, cost: item.costPerItem || 0, quantity: 1 });
            document.body.removeChild(document.querySelector('.modal'));
            return;
        }

        const modal = document.querySelector('.modal-content');
        modal.innerHTML = `<h2>Add Details for ${item.name}</h2>`;
        const form = createElement('div', 'form-group');
        modal.appendChild(form);

        const inputs = {};
        item.inputFields.forEach((field) => {
            const label = createElement('label', null, field.label);
            const input = createElement(field.type === 'select' ? 'select' : 'input');
            if (field.type === 'number') input.type = 'number';
            if (field.type === 'select') field.options.forEach((opt) => input.appendChild(createElement('option', null, opt)));
            inputs[field.key] = input;
            form.appendChild(label);
            form.appendChild(input);
        });

        const saveButton = createElement('button', 'button', 'Save Item');
        saveButton.addEventListener('click', () => {
            const newItem = { name: item.name, cost: item.costPerItem || 0 };
            item.inputFields.forEach((field) => {
                newItem[field.key] = inputs[field.key].value || '';
            });
            currentRoom.items.push(newItem);
            document.body.removeChild(document.querySelector('.modal'));
        });
        modal.appendChild(saveButton);
    }

function displayMaterialsAndFinalPrice(app) {
    const materialsSection = createElement('div', 'materials-summary');
    materialsSection.style.border = '2px dotted #000';
    materialsSection.style.borderRadius = '10px';
    materialsSection.style.padding = '15px';
    materialsSection.style.marginTop = '20px';
    materialsSection.style.backgroundColor = '#f9f9f9';

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

    const finalPrice = calculateFinalPrice();
    const finalPriceText = createElement('p', 'final-price', `Final Price: $${finalPrice.toFixed(2)}`);
    finalPriceText.style.fontWeight = 'bold';
    app.appendChild(finalPriceText);
}



    
  // Example of adding the button to your Summary page:
function viewSummary() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.style.overflowY = 'auto';
    app.style.paddingBottom = '20px';

    addLogo(app);

    const header = createElement('h2', null, 'Summary');
    app.appendChild(header);

    // Check if rooms are available
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

            const paintingOption = createElement('p', null, `Painting Option: ${room.paintingOption?.key || 'None'}`);
            roomSummary.appendChild(paintingOption);

            app.appendChild(roomSummary);
        });

        displayMaterialsAndFinalPrice(app);
    }

    addInvoiceButton(app); // Add the invoice button here

    const addRoomButton = createElement('button', 'button', 'Add Another Room');
    addRoomButton.addEventListener('click', () => addRoom());
    app.appendChild(addRoomButton);
}
    // Initialize the application
    initInterface();
})();
