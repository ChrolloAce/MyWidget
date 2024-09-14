(function () {

// Initial variables and configuration
const PRICE_REGULAR = 26;
const PRICE_CRYSTAL = 39;
const MINIMUM_PRICE = 400;

let items = [];
let totalCost = 0;
let previousPage = null;
let userInfo = {};

function initInterface() {
    // Clear the existing content and apply styles to the body
    document.body.innerHTML = '';
    Object.assign(document.body.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
    });

    // Create the container element for the form
    const container = document.createElement('div');
    Object.assign(container.style, {
        width: '95%',
        maxWidth: '800px',
        backgroundColor: '#f1f1f1',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        margin: '80px auto 30px auto',
    });
    container.id = 'container';
    document.body.appendChild(container);

    // Create and style the header
    const header = document.createElement('h1');
    header.textContent = 'Start New Invoice';
    Object.assign(header.style, {
        color: '#0C1729',
        fontSize: '36px',
    });
    container.appendChild(header);

    // Create and style the description paragraph
    const description = document.createElement('p');
    description.textContent = 'Please enter your contact information to proceed.';
    Object.assign(description.style, {
        color: '#0C1729',
        fontSize: '18px',
        marginBottom: '30px',
    });
    container.appendChild(description);

    // Create the form container
    const form = document.createElement('div');
    Object.assign(form.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    });
    container.appendChild(form);

    // Name input field
    const nameInput = createInputField('Name', 'text');
    form.appendChild(nameInput);

    // Phone input field
    const phoneInput = createInputField('Phone Number', 'tel');
    form.appendChild(phoneInput);

    // Email input field
    const emailInput = createInputField('Email', 'email');
    form.appendChild(emailInput);

    // Continue button
    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'Continue';
    styleButton(continueBtn);
    form.appendChild(continueBtn);

    // Event listener for the Continue button to validate input and navigate to the next page
    continueBtn.addEventListener('click', function () {
        // Retrieve user input values
        userInfo.name = nameInput.querySelector('input').value;
        userInfo.phone = phoneInput.querySelector('input').value;
        userInfo.email = emailInput.querySelector('input').value;

        // Validate the inputs
        if (userInfo.name && userInfo.phone && userInfo.email) {
            previousPage = initInterface; // Store the current page function for "Back" navigation
            createInvoicePage(container); // Proceed to invoice creation
        } else {
            alert('Please fill in all fields.'); // Prompt the user to complete all fields
        }
    });
}

function createInputField(labelText, type) {
    const fieldDiv = document.createElement('div');
    fieldDiv.style.display = 'flex';
    fieldDiv.style.flexDirection = 'column';
    fieldDiv.style.alignItems = 'flex-start';
    
    const label = document.createElement('label');
    label.textContent = labelText;
    label.style.color = '#0C1729';
    label.style.marginBottom = '5px';
    label.style.fontSize = '18px';
    fieldDiv.appendChild(label);
    
    const input = document.createElement('input');
    input.type = type;
    input.style.width = '100%';
    input.style.padding = '10px';
    input.style.marginBottom = '10px';
    input.style.border = '1px solid #ddd';
    input.style.borderRadius = '5px';
    input.style.fontSize = '18px';
    fieldDiv.appendChild(input);
    
    return fieldDiv;
}

function navigateToSelectionPage(container) {
    container.innerHTML = '';  // Clear the container

    const header = document.createElement('h2');
    header.textContent = 'Choose Type';
    header.style.color = '#0C1729';
    header.style.marginBottom = '30px';
    header.style.fontSize = '28px';
    container.appendChild(header);

    const typeContainer = document.createElement('div');
    typeContainer.style.display = 'flex';
    typeContainer.style.justifyContent = 'center';
    typeContainer.style.gap = '20px';
    container.appendChild(typeContainer);

    // Add kitchen and bathroom buttons with images
    const kitchenBtn = createImageButton('Kitchen', 'kitchen-img.jpg');
    const bathroomBtn = createImageButton('Bathroom', 'bathroom-img.jpg');
    typeContainer.appendChild(kitchenBtn);
    typeContainer.appendChild(bathroomBtn);

    kitchenBtn.addEventListener('click', function () {
        selectKitchenType(container);
    });

    bathroomBtn.addEventListener('click', function () {
        selectBathroomType(container);
    });
}

// Function to create the invoice page
function createInvoicePage(container) {
    previousPage = initInterface;
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Current Invoice';
    header.style.color = '#0C1729';
    header.style.marginBottom = '30px';
    header.style.fontSize = '28px';
    container.appendChild(header);

    // Add New Item Button
    const addItemBtn = document.createElement('button');
    addItemBtn.textContent = 'Add New Item';
    styleButton(addItemBtn);
    container.appendChild(addItemBtn);

    // Item List
    const itemListDiv = document.createElement('div');
    itemListDiv.id = 'itemList';
    itemListDiv.style.marginTop = '30px';
    itemListDiv.style.textAlign = 'left';
    itemListDiv.innerHTML = '<h3 style="color: #0C1729;">Items:</h3><p style="color: #777;">No items added yet.</p>';
    container.appendChild(itemListDiv);

    // Update the item list immediately upon creating the page
    updateItemList(container);

    addItemBtn.addEventListener('click', function () {
        previousPage = createInvoicePage.bind(null, container);
        navigateToSelectionPage(container);
    });

    // Finalize Invoice Button
    const finalizeBtn = document.createElement('button');
    finalizeBtn.textContent = 'Finalize Invoice';
    styleButton(finalizeBtn);
    finalizeBtn.style.marginTop = '30px';
    container.appendChild(finalizeBtn);

    finalizeBtn.addEventListener('click', function () {
        finalizeInvoice(container);
    });
}

// Helper function to create image buttons
function createImageButton(text, imageUrl) {
    const button = document.createElement('div');
    button.style.position = 'relative';
    button.style.width = '250px';  // Reduced width
    button.style.height = '250px';  // Reduced height
    button.style.border = '2px solid #000000';  // Black border
    button.style.borderRadius = '15px';  // Reduced border radius
    button.style.overflow = 'hidden';
    button.style.cursor = 'pointer';
    button.style.textAlign = 'center';
    button.style.display = 'flex';
    button.style.flexDirection = 'column';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    button.style.backgroundImage = `url(${imageUrl})`;
    button.style.backgroundSize = 'cover';
    button.style.backgroundPosition = 'center';
    button.style.marginBottom = '20px';  // Reduced margin

    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.bottom = '0';
    overlay.style.width = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';  // Black overlay
    overlay.style.color = 'white';
    overlay.style.padding = '15px';  // Reduced padding
    overlay.style.fontSize = '18px';  // Smaller font size
    overlay.style.fontWeight = 'bold';
    overlay.style.textAlign = 'center';
    overlay.textContent = text;
    button.appendChild(overlay);

    return button;
}

// Helper function to create image buttons with a rectangular aspect ratio
function createRectangularImageButton(text, imageUrl) {
    const button = document.createElement('div');
    button.style.position = 'relative';
    button.style.width = '400px';  // Adjust width for rectangular shape
    button.style.height = '300px';  // Adjust height for rectangular shape
    button.style.border = '2px solid #000000';  // Black border
    button.style.borderRadius = '15px';  // Slightly rounded corners
    button.style.overflow = 'hidden';
    button.style.cursor = 'pointer';
    button.style.textAlign = 'center';
    button.style.display = 'flex';
    button.style.flexDirection = 'column';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    button.style.backgroundImage = `url(${imageUrl})`;
    button.style.backgroundSize = 'cover';
    button.style.backgroundPosition = 'center';
    button.style.marginBottom = '20px';  // Adjusted margin

    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.bottom = '0';
    overlay.style.width = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';  // Black overlay
    overlay.style.color = 'white';
    overlay.style.padding = '15px';  // Reduced padding
    overlay.style.fontSize = '18px';  // Smaller font size
    overlay.style.fontWeight = 'bold';
    overlay.style.textAlign = 'center';
    overlay.textContent = text;
    button.appendChild(overlay);

    return button;
}

function selectKitchenType(container) {
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Choose Kitchen Counter Shape';
    header.style.color = '#0C1729';
    header.style.marginBottom = '30px';
    header.style.fontSize = '28px';
    container.appendChild(header);

    const kitchenOptions = document.createElement('div');
    kitchenOptions.style.display = 'flex';
    kitchenOptions.style.flexWrap = 'wrap';
    kitchenOptions.style.justifyContent = 'center';
    kitchenOptions.style.gap = '20px';
    container.appendChild(kitchenOptions);

    // Updated Island Image
    const islandBtn = createRectangularImageButton(
        'Island',
        'https://i.ibb.co/Hrr8ztS/Pour-Directional.png'
    );

    // Updated Counter Image
    const counterBtn = createRectangularImageButton(
        'Regular Counter',
        'https://i.ibb.co/gw8Bxw2/counter.png'
    );

    // Updated Bar Top Image
    const barTopBtn = createRectangularImageButton(
        'Bar Top',
        'https://i.ibb.co/yS5gzGd/Marble-2.png'
    );

    kitchenOptions.appendChild(islandBtn);
    kitchenOptions.appendChild(counterBtn);
    kitchenOptions.appendChild(barTopBtn);

    islandBtn.addEventListener('click', function () {
        selectShapeAndCalculate('Island', container);
    });

    counterBtn.addEventListener('click', function () {
        selectShapeAndCalculate('Regular Counter', container);
    });

    barTopBtn.addEventListener('click', function () {
        selectShapeAndCalculate('Bar Top', container);
    });
}

function startShapeConfiguration(shape, type, container) {
    let shapeData = {
        hasBacksplash: false,
        backsplashHeight: 0,
        measurements: [],
        finishType: ''
    };

    // Start the first step
    promptBacksplash(shape, type, container, shapeData);
}

 function selectShapeAndCalculate(type, container) {
    previousPage = selectKitchenType.bind(null, container);
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = `Select a Shape for ${type}`;
    header.style.color = '#0C1729';
    header.style.marginBottom = '30px';
    header.style.fontSize = '28px';
    container.appendChild(header);

    const shapeDiv = document.createElement('div');
    shapeDiv.style.display = 'flex';
    shapeDiv.style.flexWrap = 'wrap';
    shapeDiv.style.justifyContent = 'center';
    shapeDiv.style.gap = '30px';

    const shapes = getShapesForType(type);
    shapes.forEach(shape => {
        const shapeBtn = createImageButton(shape.name, shape.imageUrl);
        shapeDiv.appendChild(shapeBtn);

        shapeBtn.addEventListener('click', function () {
            startShapeConfiguration(shape, type, container); // Updated to call the new function
        });
    });

    container.appendChild(shapeDiv);
}


    // Function to prompt user for measurements and finish selection
  // Function to prompt user for measurements and backsplash option
function promptMeasurements(shape, type, container) {
    previousPage = selectShapeAndCalculate.bind(null, type, container);
    container.innerHTML = '';

    // Add the shape image at the top
    const imageDiv = document.createElement('div');
    imageDiv.style.textAlign = 'center';
    imageDiv.style.marginBottom = '20px';
    

    const header = document.createElement('h2');
    header.textContent = `${shape.name} - ${type}`;
    header.style.color = '#0C1729';
    header.style.marginBottom = '30px';
    header.style.fontSize = '32px'; // Bigger header
    container.appendChild(header);

    const imageDiv = document.createElement('div');
    imageDiv.style.textAlign = 'center';
    imageDiv.style.marginBottom = '30px';

    const shapeImage = document.createElement('img');
    shapeImage.src = shape.imageUrl;
    shapeImage.style.maxWidth = '100%';
    shapeImage.style.height = 'auto';
    shapeImage.style.margin = '0 auto';
    shapeImage.style.borderRadius = '15px';
    shapeImage.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    imageDiv.appendChild(shapeImage);
    container.appendChild(imageDiv);

    const formDiv = document.createElement('div');
    formDiv.style.display = 'flex';
    formDiv.style.flexDirection = 'column';
    formDiv.style.alignItems = 'center';
    formDiv.style.gap = '20px';
    formDiv.style.marginTop = '30px';
    container.appendChild(formDiv);

    // Add input fields for shape measurements
    shape.measurements.forEach((measurement, index) => {
        const label = document.createElement('label');
        label.textContent = `Measurement ${index + 1} (inches):`;
        label.style.color = '#0C1729';
        label.style.marginBottom = '5px';
        label.style.fontSize = '20px';
        formDiv.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.id = `measurement${index + 1}`;
        input.style.width = '80%';
        input.style.padding = '10px';
        input.style.marginBottom = '10px';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '5px';
        input.style.fontSize = '20px';
        formDiv.appendChild(input);
    });

    // Visual representation of the backsplash option
    const backsplashLabel = document.createElement('label');
    backsplashLabel.textContent = 'Do you have a backsplash?';
    backsplashLabel.style.color = '#0C1729';
    backsplashLabel.style.fontSize = '22px'; // Bigger font for backsplash label
    backsplashLabel.style.marginBottom = '10px';
    formDiv.appendChild(backsplashLabel);

    const backsplashImage = document.createElement('img');
    backsplashImage.src = 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66da50fe3525014ab3c7deb3_Backsplash%20(1).png';
    backsplashImage.style.width = '150px';
    backsplashImage.style.height = 'auto';
    backsplashImage.style.cursor = 'pointer';
    backsplashImage.style.border = '2px solid #ddd';
    backsplashImage.style.borderRadius = '5px';
    backsplashImage.style.marginBottom = '10px';
    backsplashImage.style.transition = 'all 0.3s ease';
    formDiv.appendChild(backsplashImage);

    const backsplashHeightLabel = document.createElement('label');
    backsplashHeightLabel.textContent = 'Backsplash Height (inches):';
    backsplashHeightLabel.style.display = 'none';
    backsplashHeightLabel.style.color = '#0C1729';
    backsplashHeightLabel.style.fontSize = '20px';
    formDiv.appendChild(backsplashHeightLabel);

    const backsplashHeightInput = document.createElement('input');
    backsplashHeightInput.type = 'number';
    backsplashHeightInput.id = 'backsplashHeight';
    backsplashHeightInput.style.width = '80%';
    backsplashHeightInput.style.padding = '10px';
    backsplashHeightInput.style.marginBottom = '10px';
    backsplashHeightInput.style.border = '1px solid #ddd';
    backsplashHeightInput.style.borderRadius = '5px';
    backsplashHeightInput.style.fontSize = '20px';
    backsplashHeightInput.style.display = 'none';
    formDiv.appendChild(backsplashHeightInput);

    let hasBacksplash = false; // Backsplash toggle state

    // Toggle backsplash height input when image is clicked
    backsplashImage.addEventListener('click', function () {
        hasBacksplash = !hasBacksplash;
        if (hasBacksplash) {
            backsplashHeightLabel.style.display = 'block';
            backsplashHeightInput.style.display = 'block';
            backsplashImage.style.border = '2px solid #0264D9'; // Highlight the image when selected
        } else {
            backsplashHeightLabel.style.display = 'none';
            backsplashHeightInput.style.display = 'none';
            backsplashImage.style.border = '2px solid #ddd'; // Unhighlight the image
        }
    });

    // Finish Selection
    const finishLabel = document.createElement('label');
    finishLabel.textContent = 'Select Finish:';
    finishLabel.style.color = '#0C1729';
    finishLabel.style.marginBottom = '5px';
    finishLabel.style.fontSize = '20px';
    formDiv.appendChild(finishLabel);

    const finishSelect = document.createElement('select');
    finishSelect.style.width = '80%';
    finishSelect.style.padding = '10px';
    finishSelect.style.border = '1px solid #ddd';
    finishSelect.style.borderRadius = '5px';
    finishSelect.style.fontSize = '20px';
    const regularOption = document.createElement('option');
    regularOption.value = 'regular';
    regularOption.textContent = 'Regular Pour - $26/sq ft';
    finishSelect.appendChild(regularOption);

    const crystalOption = document.createElement('option');
    crystalOption.value = 'crystal';
    crystalOption.textContent = 'Crystal Top Finish - $39/sq ft';
    finishSelect.appendChild(crystalOption);

    formDiv.appendChild(finishSelect);

    // Calculate Button
    const calculateBtn = document.createElement('button');
    calculateBtn.textContent = 'Add Item';
    styleButton(calculateBtn);
    formDiv.appendChild(calculateBtn);

    calculateBtn.addEventListener('click', function () {
        calculateAndAddItem(shape, finishSelect.value, container, type, hasBacksplash, backsplashHeightInput.value);
    });
}

    function calculateAndAddItem(shape, finishType, container, type, hasBacksplash, backsplashHeight) {
    console.log('Add Item button clicked');
    const measurements = shape.measurements.map((_, index) => parseFloat(document.getElementById(`measurement${index + 1}`).value));

    console.log('Measurements:', measurements);

    if (measurements.some(isNaN)) {
        alert('Please enter valid measurements.');
        return;
    }

    // Determine depth automatically based on type
    const depth = type === 'Kitchen' ? 25 : 22;

    // Calculate square footage based on shape formula
    let squareFootage = shape.formula(measurements, depth);
    
    // Add backsplash square footage if applicable
    if (hasBacksplash && backsplashHeight) {
        const backsplashArea = measurements[0] * (parseFloat(backsplashHeight) / 12); // Assuming backsplash is only along the first measurement
        squareFootage += backsplashArea;
    }
    
    console.log('Square Footage:', squareFootage);

    const pricePerSqFt = finishType === 'regular' ? PRICE_REGULAR : PRICE_CRYSTAL;
    const cost = squareFootage * pricePerSqFt;
    console.log('Cost:', cost);

    // Add to items list
    items.push({
        type: `${shape.name} - ${shape.type}`,
        squareFootage: squareFootage.toFixed(2),
        finish: finishType,
        cost: cost.toFixed(2)
    });

    // Update the total cost
    totalCost += cost;

    console.log('Total Cost:', totalCost);

    // Redirect back to the invoice page and show the updated item list
    createInvoicePage(container);
}

  // Function to update the item list without showing square footage to the client
// Function to update the item list with the option to remove items
function updateItemList(container) {
    let itemListDiv = document.getElementById('itemList');

    // Recreate itemListDiv if it doesn't exist
    if (!itemListDiv) {
        itemListDiv = document.createElement('div');
        itemListDiv.id = 'itemList';
        itemListDiv.style.marginTop = '30px';
        container.appendChild(itemListDiv);
    }

    itemListDiv.innerHTML = '<h3 style="color: #0C1729;">Items:</h3>';

    if (items.length === 0) {
        itemListDiv.innerHTML += '<p style="color: #777;">No items added yet.</p>';
    } else {
        items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.display = 'flex';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.padding = '10px';
            itemDiv.style.marginBottom = '15px';
            itemDiv.style.borderBottom = '1px solid #ddd';
            itemDiv.style.color = '#0C1729';

            const itemText = document.createElement('span');
            // Don't display square footage, only the item type and finish
            itemText.textContent = `${index + 1}. ${item.type} - ${item.finish} Finish - $${item.cost}`;
            itemDiv.appendChild(itemText);

            // 'X' button to remove item
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            removeBtn.style.color = '#ffffff';
            removeBtn.style.backgroundColor = '#ff0000';  // Red color for the remove button
            removeBtn.style.border = 'none';
            removeBtn.style.cursor = 'pointer';
            removeBtn.style.padding = '5px 10px';
            removeBtn.style.borderRadius = '5px';
            removeBtn.addEventListener('click', function () {
                removeItem(index);
            });
            itemDiv.appendChild(removeBtn);

            itemListDiv.appendChild(itemDiv);
        });

        const totalDiv = document.createElement('div');
        totalDiv.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
        totalDiv.style.marginTop = '20px';
        totalDiv.style.fontWeight = 'bold';
        totalDiv.style.fontSize = '22px';
        totalDiv.style.color = '#0264D9';
        itemListDiv.appendChild(totalDiv);
    }
}

    
// Function to remove an item
function removeItem(index) {
    totalCost -= parseFloat(items[index].cost);  // Deduct cost from total
    items.splice(index, 1);  // Remove item from array
    updateItemList(document.querySelector('#itemList').parentElement);  // Refresh item list
}



    // Function to finalize the invoice
    function finalizeInvoice(container) {
        if (totalCost < MINIMUM_PRICE) {
            totalCost = MINIMUM_PRICE;
        }

        alert(`Finalized Invoice Total: $${totalCost.toFixed(2)}`);
        items = [];
        totalCost = 0;
        createInvoicePage(container);
    }

    // Helper function to get shapes for a specific type
    function getShapesForType(type) {
        const shapes = [];

        if (type === 'Bar Top') {
            shapes.push({
                name: 'Bar Top Shape 1',
                type: 'Bar Top',
                measurements: ['1', '2'],
                formula: (measurements, depth) => ((measurements[0] * depth) / 144),
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66cd29da863bba73ecdd7c48_1.png'
            });
            shapes.push({
                name: 'Bar Top Shape 2',
                type: 'Bar Top',
                measurements: ['1', '2', '3'],
                formula: (measurements, depth) => ((measurements[0] + measurements[1] + measurements[2]) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66cd29dac853b0040a720e2f_2.png'
            });
            shapes.push({
                name: 'Bar Top Shape 3',
                type: 'Bar Top',
                measurements: ['1', '2', '3', '4'],
                formula: (measurements, depth) => ((measurements[0] + measurements[1] + measurements[2] + measurements[3]) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66cd29daa8b359b5742e69e6_3.png'
            });
            shapes.push({
                name: 'Bar Top Shape 4',
                type: 'Bar Top',
                measurements: ['1', '2', '3', '4', '5', '6', '7'],
                formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66cd29da78d4aad4898351b9_6.png'
            });
            shapes.push({
                name: 'Bar Top Shape 5',
                type: 'Bar Top',
                measurements: ['1', '2', '3', '4', '5'],
                formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66cd29da26c4c2321fa2207c_4.png'
            });
            shapes.push({
                name: 'Bar Top Shape 6',
                type: 'Bar Top',
                measurements: ['1', '2', '3', '4', '5', '6'],
                formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce3a7df416f1b9ceda636b_3.png'
            });
        } else if (type === 'Regular Counter') {
            shapes.push({
                name: 'Regular Counter Shape 1',
                type: 'Regular Counter',
                measurements: ['1', '2'],
                formula: (measurements, depth) => ((measurements[0] * depth) / 144),
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce3a7d61151fe7d2e11e25_4.png'
            });
            shapes.push({
                name: 'Regular Counter Shape 2',
                type: 'Regular Counter',
                measurements: ['1', '2', '3'],
                formula: (measurements, depth) => ((measurements[0] + measurements[1] + measurements[2]) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce262e24b34ce34eeea96f_16.png'
            });
            shapes.push({
                name: 'Regular Counter Shape 3',
                type: 'Regular Counter',
                measurements: ['1', '2', '3', '4'],
                formula: (measurements, depth) => ((measurements[0] + measurements[1] + measurements[2] + measurements[3]) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce2631822e5ef6600d57b5_15.png'
            });
            shapes.push({
                name: 'Regular Counter Shape 4',
                type: 'Regular Counter',
                measurements: ['1', '2', '3', '4', '5', '6'],
                formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce26336c9e655d195ab278_14.png'
            });
            shapes.push({
                name: 'Regular Counter Shape 5',
                type: 'Regular Counter',
                measurements: ['1', '2'],
                formula: (measurements, depth) => ((measurements[0] * depth) / 144),
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce26346e73f1177f42d0a1_10.png'
            });
        } else if (type === 'Island') {
            shapes.push({
                name: 'Island Shape 1',
                type: 'Island',
                measurements: ['1', '2'],
                formula: (measurements, depth) => ((measurements[0] * depth) / 144),
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce3a7d6cb02e60f269ed30_2.png'
            });
            shapes.push({
                name: 'Island Shape 2',
                type: 'Island',
                measurements: ['1', '2', '3', '4', '5'],
                formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce476ab04bef486aefc05d_12.png'
            });
            shapes.push({
                name: 'Island Shape 3',
                type: 'Island',
                measurements: ['1', '2', '3'],
                formula: (measurements, depth) => ((measurements[0] + measurements[1] + measurements[2]) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce476a2a1b510869802adb_11.png'
            });
        } else if (type === 'Bathroom') {
            shapes.push({
                name: 'Bathroom Shape 1',
                type: 'Bathroom',
                measurements: ['1', '2'],
                formula: (measurements, depth) => ((measurements[0] * depth) / 144),
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce47006c1716fbc6bc27d0_16.png'
            });
            shapes.push({
                name: 'Bathroom Shape 2',
                type: 'Bathroom',
                measurements: ['1', '2'],
                formula: (measurements, depth) => ((measurements[0] * depth) / 144),
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce4701a818f9798be73baf_10.png'
            });
            shapes.push({
                name: 'Bathroom Shape 3',
                type: 'Bathroom',
                measurements: ['1', '2', '3', '4', '5', '6'],
                formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce4701502de95299763252_IN.png'
            });
        }

        return shapes;
    }

    // Helper function to style buttons
  // Adjust the button style
// Helper function to style buttons
function styleButton(button) {
    button.style.padding = '14px';
    button.style.backgroundColor = '#0264D9';  // Blue color for contrast
    button.style.color = '#ffffff';  // White text
    button.style.border = 'none';  // Remove borders
    button.style.borderRadius = '10px';  // Rounded corners for modern look
    button.style.cursor = 'pointer';
    button.style.fontSize = '18px';
    button.style.fontWeight = 'bold';
    button.style.width = '80%';
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';  // Slight shadow

    button.addEventListener('mouseenter', function () {
        button.style.backgroundColor = '#004C99';  // Darker blue on hover
    });

    button.addEventListener('mouseleave', function () {
        button.style.backgroundColor = '#0264D9';  // Return to original color
    });
}

// Styling the container to look cleaner and more centered
function styleContainer(container) {
    container.style.width = '90%';
    container.style.maxWidth = '800px';
    container.style.backgroundColor = '#ffffff';
    container.style.padding = '40px';
    container.style.borderRadius = '10px';  // Rounded corners
    container.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';  // Soft shadow
    container.style.margin = '20px auto';
    container.style.textAlign = 'center';
}

    // Helper function to create image buttons
    function createImageButton(text, imageUrl) {
        const button = document.createElement('div');
        button.style.position = 'relative';
        button.style.width = '250px';  // Reduced width
        button.style.height = '250px';  // Reduced height
        button.style.border = '2px solid #000000';  // Black border
        button.style.borderRadius = '15px';  // Reduced border radius
        button.style.overflow = 'hidden';
        button.style.cursor = 'pointer';
        button.style.textAlign = 'center';
        button.style.display = 'flex';
        button.style.flexDirection = 'column';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
        button.style.backgroundImage = `url(${imageUrl})`;
        button.style.backgroundSize = 'cover';
        button.style.backgroundPosition = 'center';
        button.style.marginBottom = '20px';  // Reduced margin

        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.bottom = '0';
        overlay.style.width = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';  // Black overlay
        overlay.style.color = 'white';
        overlay.style.padding = '15px';  // Reduced padding
        overlay.style.fontSize = '18px';  // Smaller font size
        overlay.style.fontWeight = 'bold';
        overlay.style.textAlign = 'center';
        overlay.textContent = text;
        button.appendChild(overlay);

        return button;
    }


// Add this new code at the end of your script

// Function to start the sequence of steps (backsplash, measurements, finish)
function selectShapeAndStartSequence(shape, container) {
    // Clear the container
    container.innerHTML = '';

    // Step 1: Ask if it has a backsplash
    promptBacksplashMeasurements(function(hasBacksplash) {
        // Step 2: Prompt for measurements (one by one)
        promptShapeMeasurements(shape, container, hasBacksplash, function(measurements) {
            // Step 3: Prompt for finish selection
            promptFinishSelection(function(finishType) {
                // Handle completion of the flow
                console.log('Backsplash:', hasBacksplash);
                console.log('Measurements:', measurements);
                console.log('Finish Type:', finishType);

                // You can now process or calculate based on user input
                alert('Shape sequence completed!');
            });
        });
    });
}

// Function to prompt the user for backsplash measurement
function promptBacksplash(shape, type, container, shapeData) {
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Does this shape have a backsplash?';
    header.style.color = '#0C1729';
    header.style.marginBottom = '20px';
    header.style.fontSize = '24px';
    container.appendChild(header);

    // Add the image
    const imageDiv = document.createElement('div');
    imageDiv.style.textAlign = 'center';
    imageDiv.style.marginBottom = '20px';

    const backsplashImage = document.createElement('img');
    backsplashImage.src = 'https://i.ibb.co/XjdF26x/Backsplash.png';
    backsplashImage.alt = 'Backsplash';
    backsplashImage.style.maxWidth = '100%';
    backsplashImage.style.height = 'auto';
    imageDiv.appendChild(backsplashImage);

    // Add professional explanatory text under the image
    const description = document.createElement('p');
    description.textContent = 'A backsplash is a vertical extension of your countertop that protects the wall behind it from spills and splashes. Typically, it stands at 4 inches in height and adds both functionality and aesthetic appeal to your kitchen.';
    description.style.color = '#0C1729';
    description.style.fontSize = '16px';
    description.style.marginTop = '10px';
    imageDiv.appendChild(description);

    container.appendChild(imageDiv);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.gap = '20px'; // Increase margin between buttons
    container.appendChild(buttonContainer);

    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Yes';
    styleColoredButton(yesBtn, '#28a745'); // Green color for 'Yes'
    buttonContainer.appendChild(yesBtn);

    const noBtn = document.createElement('button');
    noBtn.textContent = 'No';
    styleColoredButton(noBtn, '#dc3545'); // Red color for 'No'
    buttonContainer.appendChild(noBtn);

    yesBtn.addEventListener('click', function () {
        shapeData.hasBacksplash = true;
        promptBacksplashHeight(shape, type, container, shapeData);
    });

    noBtn.addEventListener('click', function () {
        shapeData.hasBacksplash = false;
        promptMeasurements(shape, type, container, shapeData);
    });
}


function styleColoredButton(button, backgroundColor) {
    button.style.padding = '14px';
    button.style.backgroundColor = backgroundColor;  // Use provided color
    button.style.color = '#ffffff';  // White text
    button.style.border = 'none';  // Remove borders
    button.style.borderRadius = '10px';  // Rounded corners for modern look
    button.style.cursor = 'pointer';
    button.style.fontSize = '18px';
    button.style.fontWeight = 'bold';
    button.style.margin = '10px';  // Add margin for spacing
    button.style.width = '150px';  // Set fixed width
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';  // Slight shadow

    // Hover effect
    button.addEventListener('mouseenter', function () {
        button.style.opacity = '0.8';  // Slightly reduce opacity on hover
    });

    button.addEventListener('mouseleave', function () {
        button.style.opacity = '1';  // Return to original opacity
    });
}



    
function promptBacksplash(shape, type, container, shapeData) {
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Does this shape have a backsplash?';
    header.style.color = '#0C1729';
    header.style.marginBottom = '20px';
    header.style.fontSize = '24px';
    container.appendChild(header);

    // Add the image
    const imageDiv = document.createElement('div');
    imageDiv.style.textAlign = 'center';
    imageDiv.style.marginBottom = '20px';

    const backsplashImage = document.createElement('img');
    backsplashImage.src = 'https://i.ibb.co/XjdF26x/Backsplash.png';
    backsplashImage.alt = 'Backsplash';
    backsplashImage.style.maxWidth = '100%';
    backsplashImage.style.height = 'auto';
    imageDiv.appendChild(backsplashImage);

    // Add explanatory text under the image
    const description = document.createElement('p');
    description.textContent = 'A backsplash is the vertical extension out of your countertop that connects everything. It is usually 4 inches in height.';
    description.style.color = '#0C1729';
    description.style.fontSize = '16px';
    description.style.marginTop = '10px';
    imageDiv.appendChild(description);

    container.appendChild(imageDiv);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.gap = '20px'; // Increase margin between buttons
    container.appendChild(buttonContainer);

    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Yes';
    styleColoredButton(yesBtn, '#28a745'); // Green color for 'Yes'
    buttonContainer.appendChild(yesBtn);

    const noBtn = document.createElement('button');
    noBtn.textContent = 'No';
    styleColoredButton(noBtn, '#dc3545'); // Red color for 'No'
    buttonContainer.appendChild(noBtn);

    yesBtn.addEventListener('click', function () {
        shapeData.hasBacksplash = true;
        promptBacksplashHeight(shape, type, container, shapeData);
    });

    noBtn.addEventListener('click', function () {
        shapeData.hasBacksplash = false;
        promptMeasurements(shape, type, container, shapeData);
    });
}

function promptBacksplash(shape, type, container, shapeData) {
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Does this shape have a backsplash?';
    header.style.color = '#0C1729';
    header.style.marginBottom = '20px';
    header.style.fontSize = '24px';
    container.appendChild(header);

    // Add the image
    const imageDiv = document.createElement('div');
    imageDiv.style.textAlign = 'center';
    imageDiv.style.marginBottom = '20px';

    const backsplashImage = document.createElement('img');
    backsplashImage.src = 'https://i.ibb.co/XjdF26x/Backsplash.png';
    backsplashImage.alt = 'Backsplash';
    backsplashImage.style.maxWidth = '100%';
    backsplashImage.style.height = 'auto';
    imageDiv.appendChild(backsplashImage);

   const description = document.createElement('p');
description.textContent = 'A backsplash is the vertical extension out of your countertop that connects everything. It is usually 4 inches in height.';
description.style.color = '#0C1729';
description.style.fontSize = '16px';
description.style.marginTop = '10px';
imageDiv.appendChild(description);

    container.appendChild(imageDiv);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.gap = '20px'; // Increase margin between buttons
    container.appendChild(buttonContainer);

    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Yes';
    styleColoredButton(yesBtn, '#28a745'); // Green color for 'Yes'
    buttonContainer.appendChild(yesBtn);

    const noBtn = document.createElement('button');
    noBtn.textContent = 'No';
    styleColoredButton(noBtn, '#dc3545'); // Red color for 'No'
    buttonContainer.appendChild(noBtn);

    yesBtn.addEventListener('click', function () {
        shapeData.hasBacksplash = true;
        promptBacksplashHeight(shape, type, container, shapeData);
    });

    noBtn.addEventListener('click', function () {
        shapeData.hasBacksplash = false;
        promptMeasurements(shape, type, container, shapeData);
    });
}

function promptMeasurements(shape, type, container, shapeData) {
    container.innerHTML = '';

    // Add the shape image at the top
    const imageDiv = document.createElement('div');
    imageDiv.style.textAlign = 'center';
    imageDiv.style.marginBottom = '20px';

    const shapeImage = document.createElement('img');
    shapeImage.src = shape.imageUrl;
    shapeImage.alt = shape.name;
    shapeImage.style.maxWidth = '100%';
    shapeImage.style.height = 'auto';
    shapeImage.style.borderRadius = '15px';
    shapeImage.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    imageDiv.appendChild(shapeImage);

    container.appendChild(imageDiv);
    
    const header = document.createElement('h2');
    header.textContent = 'Enter Measurements (in inches)';
    header.style.color = '#0C1729';
    header.style.marginBottom = '20px';
    header.style.fontSize = '24px';
    container.appendChild(header);

    const formDiv = document.createElement('div');
    formDiv.style.display = 'flex';
    formDiv.style.flexDirection = 'column';
    formDiv.style.alignItems = 'center';
    formDiv.style.gap = '10px';
    container.appendChild(formDiv);

    const measurementInputs = [];

    shape.measurements.forEach((measurement, index) => {
        const label = document.createElement('label');
        label.textContent = `Measurement ${index + 1}:`;
        label.style.color = '#0C1729';
        label.style.marginBottom = '5px';
        label.style.fontSize = '18px';
        formDiv.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.style.width = '80%';
        input.style.padding = '10px';
        input.style.marginBottom = '10px';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '5px';
        input.style.fontSize = '18px';
        formDiv.appendChild(input);

        measurementInputs.push(input);
    });

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    styleButton(nextBtn);
    formDiv.appendChild(nextBtn);

    nextBtn.addEventListener('click', function () {
        const measurements = measurementInputs.map(input => parseFloat(input.value));
        if (measurements.some(value => isNaN(value) || value <= 0)) {
            alert('Please enter valid measurements.');
        } else {
            shapeData.measurements = measurements;
            promptFinishType(shape, type, container, shapeData);
        }
    });
}

function promptFinishType(shape, type, container, shapeData) {
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Select Finish Type';
    header.style.color = '#0C1729';
    header.style.marginBottom = '20px';
    header.style.fontSize = '24px';
    container.appendChild(header);

    const finishSelect = document.createElement('select');
    finishSelect.style.width = '80%';
    finishSelect.style.padding = '10px';
    finishSelect.style.border = '1px solid #ddd';
    finishSelect.style.borderRadius = '5px';
    finishSelect.style.fontSize = '18px';
    finishSelect.style.marginBottom = '20px';

    const crystalOption = document.createElement('option');
    crystalOption.value = 'crystal';
    crystalOption.textContent = 'Crystal Top Finish - $39/sq ft';
    finishSelect.appendChild(crystalOption);

    const graniteOption = document.createElement('option');
    graniteOption.value = 'granite';
    graniteOption.textContent = 'Granite Finish - $29/sq ft';
    finishSelect.appendChild(graniteOption);

    container.appendChild(finishSelect);

    const finishBtn = document.createElement('button');
    finishBtn.textContent = 'Calculate and Add Item';
    styleButton(finishBtn);
    container.appendChild(finishBtn);

    finishBtn.addEventListener('click', function () {
        shapeData.finishType = finishSelect.value;
        calculateAndAddItem(shape, shapeData, type, container);
    });
}

function calculateAndAddItem(shape, shapeData, type, container) {
    const measurements = shapeData.measurements;

    // Determine depth automatically based on type
    const depth = type === 'Kitchen' ? 25 : 22;

    // Calculate square footage based on shape formula
    let squareFootage = shape.formula(measurements, depth);

    // Add backsplash square footage if applicable
    if (shapeData.hasBacksplash && shapeData.backsplashHeight > 0) {
        const backsplashArea = measurements[0] * (shapeData.backsplashHeight / 12); // Assuming backsplash is only along the first measurement
        squareFootage += backsplashArea;
    }

    // Update pricing based on finish type
    let pricePerSqFt;
    if (shapeData.finishType === 'granite') {
        pricePerSqFt = 29;
    } else if (shapeData.finishType === 'crystal') {
        pricePerSqFt = 39;
    } else {
        pricePerSqFt = PRICE_REGULAR; // Default price if not specified
    }

    const cost = squareFootage * pricePerSqFt;

    // Add to items list
    items.push({
        type: `${shape.name} - ${shape.type}`,
        squareFootage: squareFootage.toFixed(2),
        finish: shapeData.finishType,
        cost: cost.toFixed(2)
    });

    // Update the total cost
    totalCost += cost;

    // Redirect back to the invoice page and show the updated item list
    createInvoicePage(container);
}

    
    
    
// Function to ask for measurements, one by one with different slides
function promptShapeMeasurements(shape, container, hasBacksplash, callback) {
    let currentMeasurement = 0;
    const measurements = [];

    // Clear the container for new content
    container.innerHTML = '';

    function showNextMeasurement() {
        if (currentMeasurement >= shape.measurements.length) {
            // All measurements are done, proceed to the next step
            callback(measurements);
            return;
        }

        // Clear the container for the new slide
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = `Enter measurement for Side ${currentMeasurement + 1}`;
        container.appendChild(header);

        const img = document.createElement('img');
        img.src = shape.measurementImages[currentMeasurement];  // Assuming each shape has an image per measurement
        img.style.width = '100%';
        img.style.border = '2px solid red';  // Red outline to highlight
        container.appendChild(img);

        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Measurement for Side ${currentMeasurement + 1} (in inches)`;
        container.appendChild(input);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.style.marginTop = '10px';
        container.appendChild(nextButton);

       nextButton.addEventListener('click', function() {
    const value = parseFloat(input.value);
    if (isNaN(value) || value <= 0) {  // Validate input
        alert('Please enter a valid number greater than 0.');
    } else {
        measurements.push(value);
        currentMeasurement++;
        showNextMeasurement();
    }
});

    }

    // Start the measurement flow
    showNextMeasurement();
}

// Function to ask for finish (Regular or Crystal)
function promptFinishSelection(callback) {
    const container = document.querySelector('#container');  // Assuming you have a main container

    // Clear the container for new content
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Which finish would you like?';
    container.appendChild(header);

    const regularButton = document.createElement('button');
    regularButton.textContent = 'Regular Finish - $26/sq ft';
    regularButton.style.margin = '10px';
    container.appendChild(regularButton);

    const crystalButton = document.createElement('button');
    crystalButton.textContent = 'Crystal Top Finish - $39/sq ft';
    crystalButton.style.margin = '10px';
    container.appendChild(crystalButton);

    regularButton.addEventListener('click', function() {
        callback('regular');
    });

    crystalButton.addEventListener('click', function() {
        callback('crystal');
    });
}

    // Initialize the interface
    initInterface();



})();
