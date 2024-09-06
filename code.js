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
        addTabs();  // Ensure the tabs are added to the top of the page

        document.body.innerHTML = '';  // Clear existing content
        document.body.style.display = 'flex';
        document.body.style.flexDirection = 'column';
        document.body.style.alignItems = 'center';
        document.body.style.minHeight = '100vh';
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.fontFamily = 'Arial, sans-serif';

        const container = document.createElement('div');
        container.style.width = '95%';
        container.style.maxWidth = '800px';
        container.style.backgroundColor = '#ffffff';
        container.style.padding = '40px';
        container.style.borderRadius = '15px';
        container.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
        container.style.textAlign = 'center';
        container.style.margin = '80px auto 30px auto';  // Adjust margin to prevent overlap with tabs
        container.style.flexGrow = '1';
        document.body.appendChild(container);

        const header = document.createElement('h1');
        header.textContent = 'Start New Quote';
        header.style.color = '#0C1729';
        header.style.marginBottom = '20px';
        header.style.fontSize = '36px';
        container.appendChild(header);

        const description = document.createElement('p');
        description.textContent = 'Please enter your contact information to proceed.';
        description.style.color = '#0C1729';
        description.style.fontSize = '18px';
        description.style.marginBottom = '30px';
        container.appendChild(description);

        // Form to collect contact information
        const form = document.createElement('div');
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        form.style.alignItems = 'center';
        form.style.gap = '20px';
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

        continueBtn.addEventListener('click', function () {
            userInfo.name = nameInput.querySelector('input').value;
            userInfo.phone = phoneInput.querySelector('input').value;
            userInfo.email = emailInput.querySelector('input').value;

            if (userInfo.name && userInfo.phone && userInfo.email) {
                previousPage = initInterface;
                createInvoicePage(container);
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Helper function to create input fields
    function createInputField(labelText, inputType) {
        const fieldDiv = document.createElement('div');
        fieldDiv.style.width = '80%';

        const label = document.createElement('label');
        label.textContent = labelText;
        label.style.color = '#0C1729';
        label.style.fontSize = '18px';
        label.style.marginBottom = '10px';
        fieldDiv.appendChild(label);

        const input = document.createElement('input');
        input.type = inputType;
        input.style.width = '100%';
        input.style.padding = '10px';
        input.style.marginTop = '5px';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '5px';
        input.style.fontSize = '18px';
        fieldDiv.appendChild(input);

        return fieldDiv;
    }

    // Function to add tabs at the top
    function addTabs() {
        const tabs = document.createElement('div');
        tabs.id = 'tabs-container';  // Assign an ID for easier styling/debugging
        tabs.style.width = '100%';
        tabs.style.backgroundColor = '#000000';  // Black background for a sleek look
        tabs.style.color = '#ffffff';  // White text
        tabs.style.padding = '15px 20px';  // Adjusted padding
        tabs.style.position = 'fixed';  // Fixed position to always stay on top
        tabs.style.top = '0';
        tabs.style.left = '0';
        tabs.style.zIndex = '1000';
        tabs.style.display = 'flex';
        tabs.style.justifyContent = 'space-around';
        tabs.style.alignItems = 'center';
        tabs.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';  // Nice shadow for depth
        tabs.style.fontFamily = 'Arial, sans-serif';
        tabs.style.fontSize = '18px';
        tabs.style.fontWeight = 'bold';  // Make text bold

        // About Us Tab
        const aboutUsTab = document.createElement('div');
        aboutUsTab.textContent = 'About Us';
        styleTab(aboutUsTab);
        aboutUsTab.addEventListener('click', function () {
            showAboutUs();
        });
        tabs.appendChild(aboutUsTab);

        // Quote Tab (changing Invoice to Quote)
        const quoteTab = document.createElement('div');
        quoteTab.textContent = 'Quote';
        styleTab(quoteTab);
        quoteTab.addEventListener('click', initInterface);
        tabs.appendChild(quoteTab);

        // Back Tab
        const backTab = document.createElement('div');
        backTab.textContent = 'Back';
        styleTab(backTab);
        backTab.addEventListener('click', function () {
            if (previousPage) {
                previousPage();
            }
        });
        tabs.appendChild(backTab);

        // Append the tabs to the body at the very top
        document.body.prepend(tabs);
    }

    // Style for tabs
    function styleTab(tab) {
        tab.style.cursor = 'pointer';
        tab.style.fontSize = '18px';
        tab.style.fontWeight = 'bold';
        tab.style.padding = '10px 20px';
        tab.style.borderRadius = '5px';  // Slightly rounded for a modern look
        tab.style.transition = 'all 0.3s ease';
        tab.addEventListener('mouseenter', function () {
            tab.style.backgroundColor = '#0264D9';  // Add hover effect
        });
        tab.addEventListener('mouseleave', function () {
            tab.style.backgroundColor = 'transparent';  // Return to default on mouse leave
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
            selectType(container);
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

    // Function to handle type selection (Kitchen/Bathroom)
    function selectType(container) {
        previousPage = createInvoicePage.bind(null, container);
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = 'Choose a Room Type';
        header.style.color = '#0C1729';
        header.style.marginBottom = '30px';
        header.style.fontSize = '28px';
        container.appendChild(header);

        const choiceDiv = document.createElement('div');
        choiceDiv.style.display = 'flex';
        choiceDiv.style.justifyContent = 'space-around';
        choiceDiv.style.gap = '40px';
        choiceDiv.style.flexWrap = 'wrap';

        const kitchenBtn = createImageButton(
            'Kitchen',
            'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ccf4e697630121dd1ee09d_2.png'
        );
        const bathroomBtn = createImageButton(
            'Bathroom',
            'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ccf4e642c5166829b52585_1.png'
        );

        choiceDiv.appendChild(kitchenBtn);
        choiceDiv.appendChild(bathroomBtn);
        container.appendChild(choiceDiv);

        kitchenBtn.addEventListener('click', function () {
            selectKitchenType(container);
        });

        bathroomBtn.addEventListener('click', function () {
            selectShapeAndCalculate('Bathroom', container);
        });
    }

    function selectKitchenType(container) {
        previousPage = selectType.bind(null, container);
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = 'Choose a Kitchen Counter Type';
        header.style.color = '#0C1729';
        header.style.marginBottom = '30px';
        header.style.fontSize = '28px';
        container.appendChild(header);

        const kitchenOptions = document.createElement('div');
        kitchenOptions.style.display = 'flex';
        kitchenOptions.style.flexWrap = 'wrap';
        kitchenOptions.style.justifyContent = 'center';
        kitchenOptions.style.gap = '30px';

        // Adding the new cover images
        const islandBtn = createImageButton(
            'Island',
            'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce3a7d6cb02e60f269ed30_2.png'
        );
        const counterBtn = createImageButton(
            'Regular Counter',
            'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce3a7d61151fe7d2e11e25_4.png'
        );
        const barTopBtn = createImageButton(
            'Bar Top',
            'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce3a7df416f1b9ceda636b_3.png'
        );

        kitchenOptions.appendChild(islandBtn);
        kitchenOptions.appendChild(counterBtn);
        kitchenOptions.appendChild(barTopBtn);

        container.appendChild(kitchenOptions);

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

    // Function to handle shape selection and calculations
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
                promptMeasurements(shape, type, container);
            });
        });

        container.appendChild(shapeDiv);
    }

    // Function to prompt user for measurements and finish selection
  // Function to prompt user for measurements and backsplash option
// Function to prompt user for measurements and finish selection
function promptMeasurements(shape, type, container) {
    previousPage = selectShapeAndCalculate.bind(null, type, container);
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = `${shape.name} - ${type}`;
    header.style.color = '#0C1729';
    header.style.marginBottom = '30px';
    header.style.fontSize = '28px';
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

    // Explanation text under the image
    const explanation = document.createElement('p');
    explanation.textContent = 'Measure out each side of the countertop and input them below in inches.';
    explanation.style.color = '#0C1729';
    explanation.style.fontSize = '16px';
    explanation.style.marginBottom = '30px';
    container.appendChild(explanation);

   const formDiv = document.createElement('div');
formDiv.style.display = 'flex';
formDiv.style.flexDirection = 'column';  // Stack elements vertically for clarity
formDiv.style.alignItems = 'center';
formDiv.style.gap = '20px';  // Adds spacing between fields
container.appendChild(formDiv);

// Explanation for measurement input
const measurementInstruction = document.createElement('p');
measurementInstruction.textContent = 'Measure out each side of the countertop and input them below in inches.';
measurementInstruction.style.color = '#0C1729';
measurementInstruction.style.fontSize = '16px';
measurementInstruction.style.textAlign = 'center';
formDiv.appendChild(measurementInstruction);

// Create a container for measurement inputs (horizontal layout)
const measurementsContainer = document.createElement('div');
measurementsContainer.style.display = 'flex';
measurementsContainer.style.justifyContent = 'center';  // Center the measurement inputs
measurementsContainer.style.flexWrap = 'wrap';  // Allow multiple inputs on one row
measurementsContainer.style.gap = '10px';  // Gap between inputs
formDiv.appendChild(measurementsContainer);

shape.measurements.forEach((measurement, index) => {
    const measurementGroup = document.createElement('div');
    measurementGroup.style.display = 'flex';
    measurementGroup.style.flexDirection = 'column';  // Vertical label and input
    measurementGroup.style.alignItems = 'center';
    measurementGroup.style.gap = '5px';

    const label = document.createElement('label');
    label.textContent = `Side ${index + 1}:`;  // More compact labeling
    label.style.color = '#0C1729';
    label.style.fontSize = '16px';
    label.style.marginBottom = '5px';
    measurementGroup.appendChild(label);

    const input = document.createElement('input');
    input.type = 'number';
    input.id = `measurement${index + 1}`;
    input.style.width = '80px';  // Compact input size
    input.style.padding = '10px';
    input.style.border = '1px solid #ddd';
    input.style.borderRadius = '5px';
    input.style.fontSize = '16px';
    measurementGroup.appendChild(input);

    measurementsContainer.appendChild(measurementGroup);  // Add each group to the main container
});

// Finish Selection section
const finishSelectionGroup = document.createElement('div');
finishSelectionGroup.style.display = 'flex';
finishSelectionGroup.style.flexDirection = 'column';
finishSelectionGroup.style.alignItems = 'center';
finishSelectionGroup.style.gap = '10px';
formDiv.appendChild(finishSelectionGroup);

const finishLabel = document.createElement('label');
finishLabel.textContent = 'Select Finish:';
finishLabel.style.color = '#0C1729';
finishLabel.style.fontSize = '20px';
finishSelectionGroup.appendChild(finishLabel);

const finishSelect = document.createElement('select');
finishSelect.style.width = '80%';
finishSelect.style.padding = '10px';
finishSelect.style.border = '1px solid #ddd';
finishSelect.style.borderRadius = '5px';
finishSelect.style.fontSize = '18px';

const regularOption = document.createElement('option');
regularOption.value = 'regular';
regularOption.textContent = 'Regular Pour - $26/sq ft';
finishSelect.appendChild(regularOption);

const crystalOption = document.createElement('option');
crystalOption.value = 'crystal';
crystalOption.textContent = 'Crystal Top Finish - $39/sq ft';
finishSelect.appendChild(crystalOption);

finishSelectionGroup.appendChild(finishSelect);

// Add the 'Add Item' button
const calculateBtn = document.createElement('button');
calculateBtn.textContent = 'Add Item';
styleButton(calculateBtn);  // Assume this is the existing button styling function
formDiv.appendChild(calculateBtn);

// Event listener for the calculate button
calculateBtn.addEventListener('click', function () {
    calculateAndAddItem(shape, finishSelect.value, container, type);
});

}


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
    button.style.padding = '14px';  // Slightly increased padding
    button.style.backgroundColor = '#0264D9';  // Blue background
    button.style.color = '#ffffff';  // White text
    button.style.border = '2px solid #000000';  // Black border for contrast
    button.style.borderRadius = '10px';  // More rounded border
    button.style.cursor = 'pointer';
    button.style.fontSize = '18px';  // Slightly larger font size
    button.style.fontWeight = 'bold';
    button.style.margin = '10px 0';  // Adjusted margin
    button.style.width = '80%';  // Full width for larger buttons
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';  // Increased shadow for depth

    button.addEventListener('mouseenter', function () {
        button.style.backgroundColor = '#004C99';  // Darker blue on hover
    });

    button.addEventListener('mouseleave', function () {
        button.style.backgroundColor = '#0264D9';  // Return to original color
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

    // Initialize the interface
    initInterface();
})();
