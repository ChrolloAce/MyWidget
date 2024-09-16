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

    // Zip Code input field (newly added)
    const zipCodeInput = createInputField('Zip Code', 'text');
    form.appendChild(zipCodeInput);

        
        // Continue button
        const continueBtn = document.createElement('button');
        continueBtn.textContent = 'Continue';
        styleButton(continueBtn);
        form.appendChild(continueBtn);
    
continueBtn.addEventListener('click', function () {
    // Retrieve user input values
    userInfo.name = nameInput.querySelector('input').value;
    userInfo.phone = phoneInput.querySelector('input').value;
    userInfo.email = emailInput.querySelector('input').value;
    userInfo.zipCode = zipCodeInput.querySelector('input').value;

    // Validate the inputs
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]+$/;
        const zipCodeRegex = /^[0-9]{5}$/;

    if (!userInfo.name || !emailRegex.test(userInfo.email)) {
        alert('Please enter a valid name and email address.');
        return;
    }

    if (!phoneRegex.test(userInfo.phone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    if (!zipCodeRegex.test(userInfo.zipCode)) {
        alert('Please enter a valid 5-digit zip code.');
        return;
    }

    // Proceed if validation passes
    previousPage = initInterface;  // Store the current page function for "Back" navigation
    createInvoicePage(container);  // Proceed to invoice creation
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


function selectBathroomType(container) {
    container.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Choose Bathroom Counter Shape';
    header.style.color = '#0C1729';
    header.style.marginBottom = '30px';
    header.style.fontSize = '28px';
    container.appendChild(header);

    const bathroomOptions = document.createElement('div');
    bathroomOptions.style.display = 'flex';
    bathroomOptions.style.flexWrap = 'wrap';
    bathroomOptions.style.justifyContent = 'center';
    bathroomOptions.style.gap = '30px';
    container.appendChild(bathroomOptions);

    const shapes = getShapesForType('Bathroom');
    shapes.forEach(shape => {
        const shapeBtn = createImageButton(shape.name, shape.imageUrl);
        bathroomOptions.appendChild(shapeBtn);

        shapeBtn.addEventListener('click', function () {
            startShapeConfiguration(shape, 'Bathroom', container); // Proceed to shape configuration
        });
    });

    // Add a back button to go back to the previous page
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    styleButton(backButton);
    backButton.addEventListener('click', function () {
        navigateToSelectionPage(container);
    });
    container.appendChild(backButton);
}


    
   function navigateToSelectionPage(container) {
    container.innerHTML = '';  // Clear the container

    const header = document.createElement('h2');
    header.textContent = 'Choose Type of Countertop';
    header.style.color = '#0C1729';
    header.style.marginBottom = '30px';
    header.style.fontSize = '28px';
    container.appendChild(header);

    const typeContainer = document.createElement('div');
    typeContainer.style.display = 'flex';
    typeContainer.style.flexDirection = 'column'; // Stack on top of each other for mobile
    typeContainer.style.alignItems = 'center'; // Center align the items
    typeContainer.style.gap = '20px';
    container.appendChild(typeContainer);

    // Add kitchen and bathroom buttons with new images
    const kitchenBtn = createImageButton('Kitchen', 'https://i.ibb.co/wWHG4XN/1.png');  // Kitchen image
    const bathroomBtn = createImageButton('Bathroom', 'https://i.ibb.co/xm8PmSF/2.png');  // Bathroom image
    typeContainer.appendChild(kitchenBtn);
    typeContainer.appendChild(bathroomBtn);

    kitchenBtn.addEventListener('click', function () {
        selectKitchenType(container);
    });

    bathroomBtn.addEventListener('click', function () {
        selectBathroomType(container);
    });

    // Add a back button to go back to the previous page (if exists)
    if (previousPage) {
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        styleButton(backButton);
        backButton.addEventListener('click', function () {
            previousPage(container);
        });
        container.appendChild(backButton);
    }
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
    
   function createImageButton(text, imageUrl) {
    const button = document.createElement('div');
    button.style.position = 'relative';
    button.style.width = '300px';  // Increased width for better visibility
    button.style.height = '300px';  // Increased height for better visibility
    button.style.border = '2px solid #000000';  // Black border
    button.style.borderRadius = '15px';  // Rounded corners
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
    overlay.style.padding = '15px';  // Padding for text
    overlay.style.fontSize = '20px';  // Larger font size for better readability
    overlay.style.fontWeight = 'bold';
    overlay.style.textAlign = 'center';
    overlay.textContent = text;
    button.appendChild(overlay);

    return button;
}

    
  function createRectangularImageButton(text, imageUrl) {
    const button = document.createElement('div');
    button.style.position = 'relative';
    button.style.width = '350px';  // Increased width
    button.style.height = '350px';  // Increased height
    button.style.border = '2px solid #000000';  // Black border
    button.style.borderRadius = '15px';  // Rounded corners
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
    overlay.style.padding = '15px';  // Padding for text
    overlay.style.fontSize = '20px';  // Larger font size for better readability
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
    kitchenOptions.style.gap = '30px';
    container.appendChild(kitchenOptions);

    const islandBtn = createRectangularImageButton('Island', 'https://i.ibb.co/Hrr8ztS/Pour-Directional.png');
    const counterBtn = createRectangularImageButton('Regular Counter', 'https://i.ibb.co/gw8Bxw2/counter.png');
    const barTopBtn = createRectangularImageButton('Bar Top', 'https://i.ibb.co/yS5gzGd/Marble-2.png');

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

    // Add a back button to go back to the previous page
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    styleButton(backButton);
    backButton.addEventListener('click', function () {
        navigateToSelectionPage(container);
    });
    container.appendChild(backButton);
}

    
  function startShapeConfiguration(shape, type, container) {
    let shapeData = {
        hasBacksplash: false,
        backsplashHeight: 0,
        backsplashWidth: 0,  // New: Width for backsplash
        measurements: [],
        finishType: ''
    };


       promptMeasurements(shape, type, container, shapeData);  // Ask for measurements first

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
    
    function calculateAndAddItem(shape, shapeData, type, container) {
    const measurements = shapeData.measurements;

    // Determine depth and calculate square footage
    let depth = (type === 'Kitchen' || type === 'Island' || type === 'Bar Top' || type === 'Regular Counter') ? 25 : 22;
    let squareFootage = shape.formula(measurements, depth);

    // Add backsplash square footage if applicable
    if (shapeData.hasBacksplash && shapeData.backsplashHeight > 0) {
        const backsplashArea = measurements[0] * (shapeData.backsplashHeight / 12);
        squareFootage += backsplashArea / 12;
    }

    // Update pricing based on finish type
    let pricePerSqFt = shapeData.finishType === 'crystal' ? 39 : 26;
    if (shapeData.finishType === 'crystal') pricePerSqFt *= 1.5;

    // Calculate cost
    const cost = squareFootage * pricePerSqFt;

    // Add to items with imageUrl
    items.push({
        description: `${shape.name} - ${shape.type} - ${shapeData.finishType}`,
        imageUrl: shape.imageUrl,  // Include image URL here
        squareFootage: squareFootage.toFixed(2),
        cost: cost.toFixed(2)
    });

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
            itemDiv.style.alignItems = 'center'; // Align image and text
            itemDiv.style.padding = '10px';
            itemDiv.style.marginBottom = '15px';
            itemDiv.style.borderBottom = '1px solid #ddd';
            itemDiv.style.color = '#0C1729';

            // Item image
            const itemImage = document.createElement('img');
            itemImage.src = item.imageUrl; // Show the selected shape image
            itemImage.style.width = '60px'; // Smaller thumbnail
            itemImage.style.height = '60px';
            itemImage.style.borderRadius = '8px';
            itemImage.style.marginRight = '15px'; // Space between image and text
            itemDiv.appendChild(itemImage);

            const itemText = document.createElement('span');
            itemText.textContent = `${index + 1}. ${item.description} - $${item.cost}`;
            itemDiv.appendChild(itemText);

            // 'X' button to remove item
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            removeBtn.style.color = '#ffffff';
            removeBtn.style.backgroundColor = '#ff0000'; // Red color for the remove button
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

    if (type === 'Regular Counter') {
        shapes.push({
            name: '2 Sides',
            type: 'Regular Counter',
            measurements: ['1', '2'],
            formula: (measurements, depth) => ((measurements[0] * depth) / 144),
            imageUrl: 'https://i.ibb.co/tPH5VT2/10.png'
        });
        shapes.push({
            name: '5 Sides',
            type: 'Regular Counter',
            measurements: ['1', '2', '3', '4', '5'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/8BsnF1W/11.png'
        });
        shapes.push({
            name: '3 Sides (Style 1)',
            type: 'Regular Counter',
            measurements: ['1', '2', '3'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/hHSRgjk/13.png'
        });
        shapes.push({
            name: '6 Sides',
            type: 'Regular Counter',
            measurements: ['1', '2', '3', '4', '5', '6'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/b7fyPTL/14.png'
        });
        shapes.push({
            name: '3 Sides (Style 2)',
            type: 'Regular Counter',
            measurements: ['1', '2', '3'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/C9t7rzy/15.png'
        });
        shapes.push({
            name: '2 Sides (Style 2)',
            type: 'Regular Counter',
            measurements: ['1', '2'],
            formula: (measurements, depth) => ((measurements[0] * depth) / 144),
            imageUrl: 'https://i.ibb.co/Zf3JzCz/16.png'
        });
    } else if (type === 'Island') {
        shapes.push({
            name: '1 Side',
            type: 'Island',
            measurements: ['1'],
            formula: (measurements, depth) => ((measurements[0] * depth) / 144),
            imageUrl: 'https://i.ibb.co/2WfRSkn/islandsquare.png'
        });
        shapes.push({
            name: '5 Sides',
            type: 'Island',
            measurements: ['1', '2', '3', '4', '5'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/M6dqLGH/islandlong.png'
        });
    } else if (type === 'Bar Top') {
        shapes.push({
            name: '2 Sides',
            type: 'Bar Top',
            measurements: ['1', '2'],
            formula: (measurements, depth) => ((measurements[0] * depth) / 144),
            imageUrl: 'https://i.ibb.co/4PNXrnc/1.png'
        });
        shapes.push({
            name: '3 Sides',
            type: 'Bar Top',
            measurements: ['1', '2', '3'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/bmV9twv/2.png'
        });
        shapes.push({
            name: '4 Sides',
            type: 'Bar Top',
            measurements: ['1', '2', '3', '4'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/MD63PFz/3.png'
        });
        shapes.push({
            name: '5 Sides',
            type: 'Bar Top',
            measurements: ['1', '2', '3', '4', '5'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/j4TL0VK/4.png'
        });
        shapes.push({
            name: '6 Sides',
            type: 'Bar Top',
            measurements: ['1', '2', '3', '4', '5', '6'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/YcXnY2y/5.png'
        });
        shapes.push({
            name: '9 Sides',
            type: 'Bar Top',
            measurements: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/XWQ6Twg/6.png'
        });
    } else if (type === 'Bathroom') {
        shapes.push({
            name: '2 Sides (Rectangle)',
            type: 'Bathroom',
            measurements: ['1', '2'],
            formula: (measurements, depth) => ((measurements[0] * depth) / 144),
            imageUrl: 'https://i.ibb.co/KmS1PKB/recbath.png'
        });
        shapes.push({
            name: '2 Sides (Square)',
            type: 'Bathroom',
            measurements: ['1', '2'],
            formula: (measurements, depth) => ((measurements[0] * depth) / 144),
            imageUrl: 'https://i.ibb.co/1qLTRBc/bathsqaure.png'
        });
        shapes.push({
            name: '6 Sides',
            type: 'Bathroom',
            measurements: ['1', '2', '3', '4', '5', '6'],
            formula: (measurements, depth) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * depth) / 144,
            imageUrl: 'https://i.ibb.co/ScsL4gN/IN.png'
        });
    }

    return shapes;
}

    
        // Helper function to style buttons
      // Adjust the button style
    // Helper function to style buttons
   function styleButton(button) {
    button.style.padding = '14px';
    button.style.backgroundColor = '#0264D9'; // Blue color for contrast
    button.style.color = '#ffffff'; // White text
    button.style.border = 'none'; // Remove borders
    button.style.borderRadius = '10px'; // Rounded corners for a modern look
    button.style.cursor = 'pointer';
    button.style.fontSize = '18px';
    button.style.fontWeight = 'bold';
    button.style.margin = '20px 0'; // More spacing around buttons
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'; // Slight shadow for depth

    button.addEventListener('mouseenter', function () {
        button.style.backgroundColor = '#004C99'; // Darker blue on hover
    });

    button.addEventListener('mouseleave', function () {
        button.style.backgroundColor = '#0264D9'; // Return to original color
    });
}

function styleInputField(input) {
    input.style.width = '100%';  // Full width
    input.style.padding = '18px';  // Increase padding for a more clickable size
    input.style.marginBottom = '20px';  // Space between fields
    input.style.border = '2px solid #ddd';  // Border style for modern appearance
    input.style.borderRadius = '12px';  // Rounded corners
    input.style.fontSize = '18px';  // Larger font size for easier reading
    input.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';  // Soft shadow for depth
    input.style.transition = 'all 0.3s ease';  // Smooth transitions on hover/focus
    input.style.outline = 'none';  // Remove default outline

    // Add hover and focus styles for better interaction
    input.addEventListener('focus', function () {
        input.style.border = '2px solid #0264D9';  // Blue border on focus
    });

    input.addEventListener('blur', function () {
        input.style.border = '2px solid #ddd';  // Back to default
    });
}



    
    // Styling the container to look cleaner and more centered
  function styleContainer(container) {
    container.style.width = '90%';
    container.style.maxWidth = '900px'; // Increase max-width for larger screens
    container.style.backgroundColor = '#ffffff';
    container.style.padding = '50px'; // Increase padding for a cleaner layout
    container.style.borderRadius = '15px'; // Softer corners
    container.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'; // Soft shadow
    container.style.margin = '30px auto'; // Adjust margin for better alignment
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
    header.textContent = 'Enter Backsplash Dimensions';
    header.style.color = '#0C1729';
    header.style.marginBottom = '20px';
    header.style.fontSize = '24px';
    container.appendChild(header);

    // Create input for backsplash width
    const widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.placeholder = 'Enter Backsplash Width (in inches)';
    container.appendChild(widthInput);

    // Create input for backsplash height
    const heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.placeholder = 'Enter Backsplash Height (in inches)';
    container.appendChild(heightInput);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    styleButton(nextBtn);
    container.appendChild(nextBtn);

    nextBtn.addEventListener('click', function () {
        const width = parseFloat(widthInput.value);
        const height = parseFloat(heightInput.value);

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            alert('Please enter valid dimensions for the backsplash.');
            return;
        }

        // Store the backsplash dimensions
        shapeData.hasBacksplash = true;
        shapeData.backsplashWidth = width;
        shapeData.backsplashHeight = height;

        // Proceed to the finish type selection
        promptFinishType(shape, type, container, shapeData);
    });
}

    
    
  function promptMeasurements(shape, type, container, shapeData) {
    container.innerHTML = '';

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

            // Once measurements are entered, prompt for backsplash
            promptBacksplash(shape, type, container, shapeData);
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

    const finishContainer = document.createElement('div');
    finishContainer.style.display = 'flex';
    finishContainer.style.justifyContent = 'center';
    finishContainer.style.gap = '20px';  // Space between the two options
    container.appendChild(finishContainer);

    const finishes = [
        {
            name: 'CrystalTop Finish',
            imageUrl: 'https://i.ibb.co/vH56T17/Pour-Swirl2-min.jpg',
            value: 'crystal'
        },
        {
            name: 'Standard Finish',
            imageUrl: 'https://i.ibb.co/TcYP1FN/Marble-1-min.jpg',
            value: 'standard'
        }
    ];

    let selectedFinishType = null;

    finishes.forEach(finish => {
        const finishDiv = document.createElement('div');
        finishDiv.style.border = '2px solid #ddd';
        finishDiv.style.borderRadius = '10px';
        finishDiv.style.overflow = 'hidden';
        finishDiv.style.cursor = 'pointer';
        finishDiv.style.width = '250px';  // Image width
        finishDiv.style.height = '250px';  // Image height
        finishDiv.style.position = 'relative';

        const img = document.createElement('img');
        img.src = finish.imageUrl;
        img.alt = finish.name;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        finishDiv.appendChild(img);

        const overlay = document.createElement('div');
        overlay.textContent = finish.name;
        overlay.style.position = 'absolute';
        overlay.style.bottom = '0';
        overlay.style.width = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        overlay.style.color = 'white';
        overlay.style.padding = '10px';
        overlay.style.textAlign = 'center';
        overlay.style.fontSize = '16px';
        finishDiv.appendChild(overlay);

        finishDiv.addEventListener('click', function () {
            selectedFinishType = finish.value;
            // Visual feedback for selection
            Array.from(finishContainer.children).forEach(child => {
                child.style.border = '2px solid #ddd';
            });
            finishDiv.style.border = '4px solid #0264D9';
        });

        finishContainer.appendChild(finishDiv);
    });

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    styleButton(nextBtn);
    container.appendChild(nextBtn);

    nextBtn.addEventListener('click', function () {
        if (!selectedFinishType) {
            alert('Please select a finish type.');
            return;
        }
        shapeData.finishType = selectedFinishType;
        promptFinishOptions(shape, type, container, shapeData);
    });
}


// Base Color Selection
function promptBaseAndAddonColors(container, shapeData) {
    const baseColorLabel = document.createElement('label');
    baseColorLabel.textContent = 'Choose a Base Color:';
    baseColorLabel.style.color = '#0C1729';
    baseColorLabel.style.fontSize = '18px';
    baseColorLabel.style.marginBottom = '10px';
    container.appendChild(baseColorLabel);

    const baseColorContainer = document.createElement('div');
    baseColorContainer.style.display = 'flex';
    baseColorContainer.style.justifyContent = 'center';
    baseColorContainer.style.gap = '10px';
    baseColorContainer.style.marginBottom = '20px';
    container.appendChild(baseColorContainer);

    const baseColors = ['White', 'Black', 'Tornado Gray', 'Charcoal Gray', 'Toasted Almond', 'Milk Chocolate', 'Dark Chocolate'];
    let selectedBaseColor = null;

    baseColors.forEach(color => {
        const colorDiv = createColorSquare(color);  // Use helper function for consistent style
        colorDiv.element.addEventListener('click', function () {
            if (selectedBaseColor) {
                selectedBaseColor.element.style.border = '2px solid #ddd';
            }
            selectedBaseColor = colorDiv;
            colorDiv.element.style.border = '4px solid #0264D9';
        });

        baseColorContainer.appendChild(colorDiv.element);
    });

    // Add-on Colors (Now includes base colors as well)
    const addonColorLabel = document.createElement('label');
    addonColorLabel.textContent = 'Choose up to 3 Additional Colors:';
    addonColorLabel.style.color = '#0C1729';
    addonColorLabel.style.fontSize = '18px';
    addonColorLabel.style.marginBottom = '10px';
    container.appendChild(addonColorLabel);

    const addonColorContainer = document.createElement('div');
    addonColorContainer.style.display = 'flex';
    addonColorContainer.style.flexWrap = 'wrap';
    addonColorContainer.style.justifyContent = 'center';
    addonColorContainer.style.gap = '10px';
    addonColorContainer.style.marginBottom = '20px';
    container.appendChild(addonColorContainer);

    const addonColors = baseColors.concat(['Icy White', 'Silver', 'Champagne Gold', 'Bronze', 'Cobalt Blue', 'Pewter Blue', 'Copper']); // Includes base colors
    const selectedAddonColors = [];

    addonColors.forEach(color => {
        const colorDiv = createColorSquare(color);  // Use helper function for consistent style
        let selected = false;

        colorDiv.element.addEventListener('click', function () {
            if (selected) {
                selected = false;
                colorDiv.element.style.border = '2px solid #ddd';
                const index = selectedAddonColors.indexOf(color);
                if (index > -1) selectedAddonColors.splice(index, 1);
            } else if (selectedAddonColors.length < 3) {
                selected = true;
                colorDiv.element.style.border = '4px solid #0264D9';
                selectedAddonColors.push(color);
            }
        });

        addonColorContainer.appendChild(colorDiv.element);
    });

    return { selectedBaseColor, selectedAddonColors };
}






function promptFinishOptions(shape, type, container, shapeData) {
    container.innerHTML = ''; // Clear the container

   
    if (shapeData.finishType === 'crystal') {
        // CrystalTop Pour Options with images
        const header = document.createElement('h2');
        header.textContent = 'Choose Your Crystal Top Finish';
        header.style.color = '#0C1729';
        header.style.marginBottom = '20px';
        header.style.fontSize = '24px';
        container.appendChild(header);

        const patternContainer = document.createElement('div');
        patternContainer.style.display = 'flex';
        patternContainer.style.justifyContent = 'center';
        patternContainer.style.gap = '20px';  // Space between images
        container.appendChild(patternContainer);

        // Update the crystal patterns with Pour Swirl and Directional Pour
        const crystalPatterns = [
            {
                name: 'Pour Swirl',
                imageUrl: 'https://i.ibb.co/vH56T17/Pour-Swirl2-min.jpg',
            },
            {
                name: 'Directional Pour',
                imageUrl: 'https://i.ibb.co/K21MDPq/Pour-Directional-2.jpg',  // Updated with the new image
            }
        ];

        let selectedCrystalPattern = null;

        crystalPatterns.forEach(pattern => {
            const patternDiv = document.createElement('div');
            patternDiv.style.border = '2px solid #ddd';
            patternDiv.style.borderRadius = '10px';
            patternDiv.style.overflow = 'hidden';
            patternDiv.style.cursor = 'pointer';
            patternDiv.style.width = '250px';  // Image width
            patternDiv.style.height = '250px';  // Image height
            patternDiv.style.position = 'relative';

            const img = document.createElement('img');
            img.src = pattern.imageUrl;
            img.alt = pattern.name;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            patternDiv.appendChild(img);

            const overlay = document.createElement('div');
            overlay.textContent = pattern.name;
            overlay.style.position = 'absolute';
            overlay.style.bottom = '0';
            overlay.style.width = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            overlay.style.color = 'white';
            overlay.style.padding = '10px';
            overlay.style.textAlign = 'center';
            overlay.style.fontSize = '16px';
            patternDiv.appendChild(overlay);

            patternDiv.addEventListener('click', function () {
                selectedCrystalPattern = pattern.name;
                // Visual feedback for selection
                Array.from(patternContainer.children).forEach(child => {
                    child.style.border = '2px solid #ddd';
                });
                patternDiv.style.border = '4px solid #0264D9';
            });

            patternContainer.appendChild(patternDiv);
        });

        // Base Color and Mix-in Color selection (same as before)
        const baseColorLabel = document.createElement('label');
        baseColorLabel.textContent = 'Choose a Base Color for Crystal Top:';
        baseColorLabel.style.color = '#0C1729';
        baseColorLabel.style.fontSize = '18px';
        baseColorLabel.style.marginBottom = '10px';
        container.appendChild(baseColorLabel);

        const baseColorContainer = document.createElement('div');
        baseColorContainer.style.display = 'flex';
        baseColorContainer.style.justifyContent = 'center';
        baseColorContainer.style.gap = '10px';
        container.appendChild(baseColorContainer);

        const baseColors = {
            'White': '#FFFFFF',
            'Black': '#000000',
            'Tornado Gray': '#4F4F4F',
            'Charcoal Gray': '#2E2E2E',
            'Toasted Almond': '#D2B48C',
            'Milk Chocolate': '#8B4513',
            'Dark Chocolate': '#5D3A1A'
        };

        let selectedBaseColor = null;

        Object.entries(baseColors).forEach(([colorName, hexCode]) => {
            const colorDiv = document.createElement('div');
            colorDiv.style.width = '100px';
            colorDiv.style.height = '100px';
            colorDiv.style.backgroundColor = hexCode;
            colorDiv.style.border = '2px solid #ddd';
            colorDiv.style.borderRadius = '10px';
            colorDiv.style.cursor = 'pointer';
            colorDiv.style.display = 'flex';
            colorDiv.style.alignItems = 'center';
            colorDiv.style.justifyContent = 'center';

            const label = document.createElement('span');
            label.textContent = colorName;
            label.style.color = '#0C1729';
            label.style.fontSize = '14px';
            label.style.fontWeight = 'bold';
            label.style.backgroundColor = 'rgba(240, 240, 240, 0.8)';  // Gray background
            label.style.padding = '5px';
            label.style.borderRadius = '5px';
            colorDiv.appendChild(label);

            colorDiv.addEventListener('click', function () {
                if (selectedBaseColor) {
                    selectedBaseColor.style.border = '2px solid #ddd';
                }
                selectedBaseColor = colorDiv;
                colorDiv.style.border = '4px solid #0264D9';
            });

            baseColorContainer.appendChild(colorDiv);
        });

        // Crystal Top Mix-in Color Selection
        const crystalColorLabel = document.createElement('label');
        crystalColorLabel.textContent = 'Choose up to 4 Mix-in Colors for Crystal Top:';
        crystalColorLabel.style.color = '#0C1729';
        crystalColorLabel.style.fontSize = '18px';
        crystalColorLabel.style.marginBottom = '10px';
        container.appendChild(crystalColorLabel);

        const crystalColorContainer = document.createElement('div');
        crystalColorContainer.style.display = 'flex';
        crystalColorContainer.style.justifyContent = 'center';
        crystalColorContainer.style.gap = '10px';
        container.appendChild(crystalColorContainer);

        const crystalColors = {
            'Icy White': '#F8F8FF',
            'Silver': '#C0C0C0',
            'Champagne Gold': '#F7E7CE',
            'Bronze': '#CD7F32',
            'Cobalt Blue': '#0047AB',
            'Pewter Blue': '#8BA8B7',
            'Copper': '#B87333'
        };

        const selectedCrystalColors = [];

        Object.entries(crystalColors).forEach(([colorName, hexCode]) => {
            const colorDiv = document.createElement('div');
            colorDiv.style.width = '100px';
            colorDiv.style.height = '100px';
            colorDiv.style.backgroundColor = hexCode;
            colorDiv.style.border = '2px solid #ddd';
            colorDiv.style.borderRadius = '10px';
            colorDiv.style.cursor = 'pointer';
            colorDiv.style.display = 'flex';
            colorDiv.style.alignItems = 'center';
            colorDiv.style.justifyContent = 'center';

            const label = document.createElement('span');
            label.textContent = colorName;
            label.style.color = '#0C1729';
            label.style.fontSize = '14px';
            label.style.fontWeight = 'bold';
            label.style.backgroundColor = 'rgba(240, 240, 240, 0.8)';  // Gray background
            label.style.padding = '5px';
            label.style.borderRadius = '5px';
            colorDiv.appendChild(label);

            let selected = false;

            colorDiv.addEventListener('click', function () {
                if (selected) {
                    selected = false;
                    colorDiv.style.border = '2px solid #ddd';
                    const index = selectedCrystalColors.indexOf(colorName);
                    if (index > -1) selectedCrystalColors.splice(index, 1);
                } else if (selectedCrystalColors.length < 4) {
                    selected = true;
                    colorDiv.style.border = '4px solid #0264D9';
                    selectedCrystalColors.push(colorName);
                }
            });

            crystalColorContainer.appendChild(colorDiv);
        });

        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Add Item';
        styleButton(nextBtn);
        container.appendChild(nextBtn);

        nextBtn.addEventListener('click', function () {
            if (!selectedCrystalPattern || !selectedBaseColor || selectedCrystalColors.length === 0) {
                alert('Please select a finish pattern, base color, and mix-in colors.');
                return;
            }
            shapeData.pattern = selectedCrystalPattern;
            shapeData.baseColor = selectedBaseColor.querySelector('span').textContent;
            shapeData.mixInColors = selectedCrystalColors;
            calculateAndAddItem(shape, shapeData, type, container);
        });
    

    
    } else if (shapeData.finishType === 'standard') {
        // Standard Finish Options
        const header = document.createElement('h2');
        header.textContent = 'Standard Finish Options';
        header.style.color = '#0C1729';
        header.style.marginBottom = '20px';
        header.style.fontSize = '24px';
        container.appendChild(header);

        const description = document.createElement('p');
        description.textContent = 'With our Standard process, you can pick the colors and choose the pattern. Once all colors are complete, we will “tweak” the pattern to your liking.';
        description.style.color = '#0C1729';
        description.style.fontSize = '16px';
        description.style.marginBottom = '20px';
        container.appendChild(description);

        // Pattern Selection
        const patternLabel = document.createElement('label');
        patternLabel.textContent = 'Select Pattern:';
        patternLabel.style.color = '#0C1729';
        patternLabel.style.fontSize = '18px';
        patternLabel.style.marginBottom = '10px';
        container.appendChild(patternLabel);

        const patternContainer = document.createElement('div');
        patternContainer.style.display = 'flex';
        patternContainer.style.justifyContent = 'center';
        patternContainer.style.gap = '20px';
        container.appendChild(patternContainer);

        const patterns = [
            {
                name: 'Quartz',
                imageUrl: 'https://i.ibb.co/g4K3B0S/Flowing-Granite-1-min.jpg'
            },
            {
                name: 'Marble',
                imageUrl: 'https://i.ibb.co/xhXzYRr/Marble-1-min.jpg'
            },
            {
                name: 'Flowing Granite',
                imageUrl: 'https://i.ibb.co/fC1H2yj/Flowing-Granite-min.jpg'
            }
        ];

        let selectedPattern = null;

        patterns.forEach(pattern => {
            const patternDiv = document.createElement('div');
            patternDiv.style.border = '2px solid #ddd';
            patternDiv.style.borderRadius = '10px';
            patternDiv.style.overflow = 'hidden';
            patternDiv.style.cursor = 'pointer';
            patternDiv.style.width = '250px';  // Image width
            patternDiv.style.height = '250px';  // Image height
            patternDiv.style.position = 'relative';

            const img = document.createElement('img');
            img.src = pattern.imageUrl;
            img.alt = pattern.name;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            patternDiv.appendChild(img);

            const overlay = document.createElement('div');
            overlay.textContent = pattern.name;
            overlay.style.position = 'absolute';
            overlay.style.bottom = '0';
            overlay.style.width = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            overlay.style.color = 'white';
            overlay.style.padding = '10px';
            overlay.style.textAlign = 'center';
            overlay.style.fontSize = '16px';
            patternDiv.appendChild(overlay);

            patternDiv.addEventListener('click', function () {
                selectedPattern = pattern.name;
                // Visual feedback for selection
                Array.from(patternContainer.children).forEach(child => {
                    child.style.border = '2px solid #ddd';
                });
                patternDiv.style.border = '4px solid #0264D9';
            });

            patternContainer.appendChild(patternDiv);
        });

        // Base Color Selection for Standard Finish
        const baseColorLabel = document.createElement('label');
        baseColorLabel.textContent = 'Choose a Base Color for Standard Finish:';
        baseColorLabel.style.color = '#0C1729';
        baseColorLabel.style.fontSize = '18px';
        baseColorLabel.style.marginBottom = '10px';
        container.appendChild(baseColorLabel);

        const baseColorContainer = document.createElement('div');
        baseColorContainer.style.display = 'flex';
        baseColorContainer.style.justifyContent = 'center';
        baseColorContainer.style.gap = '10px';
        container.appendChild(baseColorContainer);

        const baseColors = {
            'White': '#FFFFFF',
            'Black': '#000000',
            'Tornado Gray': '#4F4F4F',
            'Charcoal Gray': '#2E2E2E',
            'Toasted Almond': '#D2B48C',
            'Milk Chocolate': '#8B4513',
            'Dark Chocolate': '#5D3A1A'
        };

        let selectedBaseColor = null;

        Object.entries(baseColors).forEach(([colorName, hexCode]) => {
            const colorDiv = document.createElement('div');
            colorDiv.style.width = '100px';
            colorDiv.style.height = '100px';
            colorDiv.style.backgroundColor = hexCode;
            colorDiv.style.border = '2px solid #ddd';
            colorDiv.style.borderRadius = '10px';
            colorDiv.style.cursor = 'pointer';
            colorDiv.style.display = 'flex';
            colorDiv.style.alignItems = 'center';
            colorDiv.style.justifyContent = 'center';

            const label = document.createElement('span');
            label.textContent = colorName;
            label.style.color = '#0C1729';
            label.style.fontSize = '14px';
            label.style.fontWeight = 'bold';
            colorDiv.appendChild(label);

            colorDiv.addEventListener('click', function () {
                if (selectedBaseColor) {
                    selectedBaseColor.style.border = '2px solid #ddd';
                }
                selectedBaseColor = colorDiv;
                colorDiv.style.border = '4px solid #0264D9';
            });

            baseColorContainer.appendChild(colorDiv);
        });

        // Add-on Color Selection for Standard Finish
        const addonColorLabel = document.createElement('label');
        addonColorLabel.textContent = 'Choose up to 3 Add-on Colors for Standard Finish:';
        addonColorLabel.style.color = '#0C1729';
        addonColorLabel.style.fontSize = '18px';
        addonColorLabel.style.marginBottom = '10px';
        container.appendChild(addonColorLabel);

        const addonColorContainer = document.createElement('div');
        addonColorContainer.style.display = 'flex';
        addonColorContainer.style.justifyContent = 'center';
        addonColorContainer.style.gap = '10px';
        container.appendChild(addonColorContainer);

        const addonColors = {
            'Icy White': '#F8F8FF',
            'Silver': '#C0C0C0',
            'Champagne Gold': '#F7E7CE',
            'Bronze': '#CD7F32',
            'Cobalt Blue': '#0047AB',
            'Pewter Blue': '#8BA8B7',
            'Copper': '#B87333'
        };

        const selectedAddonColors = [];

        Object.entries(addonColors).forEach(([colorName, hexCode]) => {
            const colorDiv = document.createElement('div');
            colorDiv.style.width = '100px';
            colorDiv.style.height = '100px';
            colorDiv.style.backgroundColor = hexCode;
            colorDiv.style.border = '2px solid #ddd';
            colorDiv.style.borderRadius = '10px';
            colorDiv.style.cursor = 'pointer';
            colorDiv.style.display = 'flex';
            colorDiv.style.alignItems = 'center';
            colorDiv.style.justifyContent = 'center';

            const label = document.createElement('span');
            label.textContent = colorName;
            label.style.color = '#0C1729';
            label.style.fontSize = '14px';
            label.style.fontWeight = 'bold';
            colorDiv.appendChild(label);

            let selected = false;

            colorDiv.addEventListener('click', function () {
                if (selected) {
                    selected = false;
                    colorDiv.style.border = '2px solid #ddd';
                    const index = selectedAddonColors.indexOf(colorName);
                    if (index > -1) selectedAddonColors.splice(index, 1);
                } else if (selectedAddonColors.length < 3) {
                    selected = true;
                    colorDiv.style.border = '4px solid #0264D9';
                    selectedAddonColors.push(colorName);
                }
            });

            addonColorContainer.appendChild(colorDiv);
        });

        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Add Item';
        styleButton(nextBtn);
        container.appendChild(nextBtn);

        nextBtn.addEventListener('click', function () {
            if (!selectedPattern || !selectedBaseColor || selectedAddonColors.length === 0) {
                alert('Please select a pattern, base color, and add-on colors.');
                return;
            }
            shapeData.pattern = selectedPattern;
            shapeData.baseColor = selectedBaseColor.querySelector('span').textContent;
            shapeData.addonColors = selectedAddonColors;
            calculateAndAddItem(shape, shapeData, type, container);
        });
    }
}



         
function calculateAndAddItem(shape, shapeData, type, container) {
    const measurements = shapeData.measurements;

    // Determine depth automatically based on type
    let depth;
    if (type === 'Kitchen' || type === 'Island' || type === 'Bar Top' || type === 'Regular Counter') {
        depth = 25; // Standard depth for kitchen countertops
    } else if (type === 'Bathroom') {
        depth = 22; // Standard depth for bathroom countertops
    } else {
        depth = 25; // Default depth
    }

    // Calculate square footage based on shape formula
    let squareFootage = shape.formula(measurements, depth);

    // Add backsplash square footage if applicable
    if (shapeData.hasBacksplash) {
        const backsplashArea = (shapeData.backsplashWidth * shapeData.backsplashHeight) / 144;  // Convert to square feet
        squareFootage += backsplashArea;  // Add backsplash area to the total
    }

    // Update pricing based on finish type
    let pricePerSqFt;
    if (shapeData.finishType === 'crystal') {
        pricePerSqFt = 39;
    } else if (shapeData.finishType === 'standard') {
        pricePerSqFt = 26;
    } else {
        pricePerSqFt = PRICE_REGULAR; // Default price if not specified
    }

    // Adjust price for CrystalTop being 1.5 times the standard process
    if (shapeData.finishType === 'crystal') {
        pricePerSqFt *= 1.5;
    }

    // Calculate the cost
    const cost = squareFootage * pricePerSqFt;

    // Build item description
    let itemDescription = `${shape.name} - ${shape.type} - ${shapeData.finishType.charAt(0).toUpperCase() + shapeData.finishType.slice(1)} Finish`;

    if (shapeData.pattern) {
        itemDescription += ` - Pattern: ${shapeData.pattern}`;
    }
    if (shapeData.baseColor) {
        itemDescription += ` - Base Color: ${shapeData.baseColor}`;
    }
    if (shapeData.mixInColors && shapeData.mixInColors.length > 0) {
        itemDescription += ` - Mix-in Colors: ${shapeData.mixInColors.join(', ')}`;
    }

    if (shapeData.hasBacksplash) {
        itemDescription += ` - Backsplash: ${shapeData.backsplashWidth}x${shapeData.backsplashHeight} inches`;
    }

    // Add to items list
    items.push({
        description: itemDescription,
        squareFootage: squareFootage.toFixed(2),
        cost: cost.toFixed(2),
        imageUrl: shape.imageUrl // Ensure imageUrl is passed here
    });

    // Update the total cost
    totalCost += cost;

    // Redirect back to the invoice page and show the updated item list
    createInvoicePage(container);
}

// Function to update the item list with the correct image
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
            itemDiv.style.alignItems = 'center'; // Align image and text
            itemDiv.style.padding = '10px';
            itemDiv.style.marginBottom = '15px';
            itemDiv.style.borderBottom = '1px solid #ddd';
            itemDiv.style.color = '#0C1729';

            // Ensure the item image is displayed properly
            const itemImage = document.createElement('img');
            itemImage.src = item.imageUrl; // Display the correct image
            itemImage.style.width = '60px'; // Thumbnail size
            itemImage.style.height = '60px';
            itemImage.style.borderRadius = '8px';
            itemImage.style.marginRight = '15px'; // Space between image and text
            itemDiv.appendChild(itemImage);

            const itemText = document.createElement('span');
            itemText.textContent = `${index + 1}. ${item.description} - $${item.cost}`;
            itemDiv.appendChild(itemText);

            // 'X' button to remove item
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            removeBtn.style.color = '#ffffff';
            removeBtn.style.backgroundColor = '#ff0000'; // Red color for the remove button
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


// Function to update the item list with the correct image
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
            itemDiv.style.alignItems = 'center'; // Align image and text
            itemDiv.style.padding = '10px';
            itemDiv.style.marginBottom = '15px';
            itemDiv.style.borderBottom = '1px solid #ddd';
            itemDiv.style.color = '#0C1729';

            // Ensure the item image is displayed properly
            const itemImage = document.createElement('img');
            itemImage.src = item.imageUrl; // Display the correct image
            itemImage.style.width = '60px'; // Thumbnail size
            itemImage.style.height = '60px';
            itemImage.style.borderRadius = '8px';
            itemImage.style.marginRight = '15px'; // Space between image and text
            itemDiv.appendChild(itemImage);

            const itemText = document.createElement('span');
            itemText.textContent = `${index + 1}. ${item.description} - $${item.cost}`;
            itemDiv.appendChild(itemText);

            // 'X' button to remove item
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            removeBtn.style.color = '#ffffff';
            removeBtn.style.backgroundColor = '#ff0000'; // Red color for the remove button
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
    
    function createColorSquare(colorName) {
        const colorHexCodes = {
            'White': '#FFFFFF',
            'Black': '#000000',
            'Tornado Gray': '#4F4F4F',
            'Charcoal Gray': '#2E2E2E',
            'Toasted Almond': '#D2B48C',
            'Milk Chocolate': '#8B4513',
            'Dark Chocolate': '#5D3A1A',
            'Icy White': '#F8F8FF',
            'Silver': '#C0C0C0',
            'Champagne Gold': '#F7E7CE',
            'Bronze': '#CD7F32',
            'Cobalt Blue': '#0047AB',
            'Pewter Blue': '#8BA8B7',
            'Copper': '#B87333'
        };
    
        const colorDiv = document.createElement('div');
        colorDiv.style.width = '100px';
        colorDiv.style.height = '100px';
        colorDiv.style.backgroundColor = colorHexCodes[colorName] || '#FFFFFF';
        colorDiv.style.border = '2px solid #ddd';
        colorDiv.style.borderRadius = '10px';
        colorDiv.style.cursor = 'pointer';
        colorDiv.style.display = 'flex';
        colorDiv.style.alignItems = 'center';
        colorDiv.style.justifyContent = 'center';
        colorDiv.style.position = 'relative';
    
        const label = document.createElement('span');
        label.textContent = colorName;
        label.style.color = '#0C1729';
        label.style.fontSize = '14px';
        label.style.fontWeight = 'bold';
        label.style.textAlign = 'center';
        label.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        label.style.padding = '5px';
        label.style.borderRadius = '5px';
        label.style.position = 'absolute';
        label.style.bottom = '5px';
        label.style.left = '50%';
        label.style.transform = 'translateX(-50%)';
        colorDiv.appendChild(label);
    
        let selected = false;
    
        colorDiv.addEventListener('click', function () {
            selected = !selected;
            if (selected) {
                colorDiv.style.border = '4px solid #0264D9';
            } else {
                colorDiv.style.border = '2px solid #ddd';
            }
        });
    
        return {
            element: colorDiv,
            colorName: colorName,
            selected: selected
        };
    }
    
    
 (function () {
  const style = `
    /* General Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
      color: #333;
      padding: 20px;
      overflow-x: hidden;
    }

    h1, h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #0C1729;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    p {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }

    /* Containers */
    #container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px;
      background-color: #ffffff;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
      transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
      #container {
        padding: 20px;
      }
    }

    /* Form Input Fields */
    input, select, textarea {
      width: 100%;
      padding: 16px;
      margin-bottom: 20px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    input:focus, select:focus, textarea:focus {
      border-color: #0264D9;
      outline: none;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    /* Button Styling */
    button {
      padding: 14px 20px;
      background-color: #0264D9;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    button:hover {
      background-color: #004C99;
    }

    /* Responsive Layouts for Images and Grids */
    .image-container, .pattern-container, .color-container {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .image-container img, .pattern-container img {
      max-width: 250px;
      height: 250px;
      object-fit: cover;
      border-radius: 10px;
      transition: all 0.3s ease;
      border: 2px solid #ddd;
    }

    .image-container img:hover, .pattern-container img:hover {
      border-color: #0264D9;
    }

    @media (max-width: 768px) {
      .image-container, .pattern-container, .color-container {
        flex-direction: column;
        align-items: center;
      }
    }

    /* Text with Grey Background */
    .color-label {
      background-color: #f0f0f0;
      padding: 8px 12px;
      border-radius: 8px;
      font-weight: bold;
      color: #333;
    }

    /* Spacing and Positioning */
    .section {
      margin-bottom: 40px;
    }

    .spaced {
      padding: 20px 0;
    }

    /* Back Button Styling */
    .back-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #f44336;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .back-button:hover {
      background-color: #d32f2f;
    }

    /* Animation for smooth transitions */
    .fade-in {
      opacity: 0;
      animation: fadeIn 0.5s forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* More spacing for sections */
    .section-header {
      margin-bottom: 10px;
      font-size: 24px;
      color: #333;
    }

    .section-content {
      display: flex;
      gap: 30px;
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      .section-content {
        flex-direction: column;
      }
    }

    /* More emphasis on the 'Choose up to X colors' messages */
    .highlight {
      font-size: 18px;
      font-weight: bold;
      color: #0264D9;
      background-color: #f1f1f1;
      padding: 12px;
      border-radius: 8px;
    }

    /* Larger images for patterns and quartz, marble, etc. */
    .pattern-image, .color-image {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 12px;
      border: 3px solid #ddd;
      transition: border-color 0.3s ease;
    }

    .pattern-image:hover, .color-image:hover {
      border-color: #0264D9;
    }

    @media (max-width: 768px) {
      .pattern-image, .color-image {
        width: 100%;
        max-width: 300px;
        height: auto;
      }
    }

    /* Smooth transitions between pages */
    .transition-page {
      opacity: 0;
      transform: translateY(20px);
      animation: slideUp 0.5s forwards ease-in-out;
    }

    @keyframes slideUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // Inject the CSS into a <style> tag
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = style;
  } else {
    styleElement.appendChild(document.createTextNode(style));
  }
  document.head.appendChild(styleElement);
})();

    
    
    
        
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
