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
                itemText.textContent = `${index + 1}. ${item.description} - $${item.cost}`;
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
        description.textContent = 'A backsplash is the vertical extension of your countertop that connects everything. It is usually 4 inches in height.';
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
        crystalOption.textContent = 'CrystalTop Finish - $39/sq ft';
        finishSelect.appendChild(crystalOption);
    
        const standardOption = document.createElement('option');
        standardOption.value = 'standard';
        standardOption.textContent = 'Standard Finish - $26/sq ft';
        finishSelect.appendChild(standardOption);
    
        container.appendChild(finishSelect);
    
        const finishBtn = document.createElement('button');
        finishBtn.textContent = 'Next';
        styleButton(finishBtn);
        container.appendChild(finishBtn);
    
        finishBtn.addEventListener('click', function () {
            shapeData.finishType = finishSelect.value;
            promptFinishOptions(shape, type, container, shapeData);
        });
    }
    
    
    function promptFinishOptions(shape, type, container, shapeData) {
        container.innerHTML = '';
    
        if (shapeData.finishType === 'crystal') {
            // CrystalTop Pour Options
            const header = document.createElement('h2');
            header.textContent = 'CrystalTop Pour Options';
            header.style.color = '#0C1729';
            header.style.marginBottom = '20px';
            header.style.fontSize = '24px';
            container.appendChild(header);
    
            // Description
            const description = document.createElement('p');
            description.textContent = 'Our CrystalTop Pour gives a soft, flowing marble look. This process allows the colors to meld together, giving nuances to the various colors chosen and detailed subtleties. You can choose the general amount of the colors but cannot choose exactly how it flows out. This is always a two-day process due to drying times and labor. On average, this process is about one and a half times the amount of the standard process.';
            description.style.color = '#0C1729';
            description.style.fontSize = '16px';
            description.style.marginBottom = '20px';
            container.appendChild(description);
    
            // Pattern Selection using images
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
            patternContainer.style.marginBottom = '20px';
            container.appendChild(patternContainer);
    
            // Pattern Images
            const patterns = [
                {
                    name: 'Soft Directional',
                    imageUrl: 'https://i.ibb.co/H4TC5sj/Pour-Directional-min.jpg'
                },
                {
                    name: 'Soft Swirl',
                    imageUrl: 'https://i.ibb.co/6wK2zct/Pour-Swirl-1-min.jpg'
                }
            ];
    
            let selectedPattern = null;
    
            patterns.forEach(pattern => {
                const patternDiv = document.createElement('div');
                patternDiv.style.border = '2px solid #ddd';
                patternDiv.style.borderRadius = '10px';
                patternDiv.style.overflow = 'hidden';
                patternDiv.style.cursor = 'pointer';
                patternDiv.style.width = '200px';
                patternDiv.style.height = '200px';
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
    
            // Color Selection
            const colorsLabel = document.createElement('label');
            colorsLabel.textContent = 'Choose up to 4 Colors:';
            colorsLabel.style.color = '#0C1729';
            colorsLabel.style.fontSize = '18px';
            colorsLabel.style.marginBottom = '10px';
            container.appendChild(colorsLabel);
    
            const colorsContainer = document.createElement('div');
            colorsContainer.style.display = 'flex';
            colorsContainer.style.flexWrap = 'wrap';
            colorsContainer.style.justifyContent = 'center';
            colorsContainer.style.gap = '10px';
            colorsContainer.style.marginBottom = '20px';
            container.appendChild(colorsContainer);
    
            const colors = [
                'White', 'Black', 'Tornado Gray', 'Charcoal Gray', 'Toasted Almond', 'Milk Chocolate', 'Dark Chocolate',
                'Icy White', 'Silver', 'Champagne Gold', 'Bronze', 'Cobalt Blue', 'Pewter Blue', 'Copper'
            ];
    
            const colorDivs = [];
    
            colors.forEach(color => {
                const colorDiv = createColorSquare(color);
                colorsContainer.appendChild(colorDiv.element);
                colorDivs.push(colorDiv);
            });
    
            // Next Button
            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Add Item';
            styleButton(nextBtn);
            container.appendChild(nextBtn);
    
            nextBtn.addEventListener('click', function () {
                // Validate pattern selection
                if (!selectedPattern) {
                    alert('Please select a pattern.');
                    return;
                }
    
                shapeData.pattern = selectedPattern;
    
                // Get selected colors
                const selectedColors = colorDivs.filter(div => div.selected).map(div => div.colorName);
    
                if (selectedColors.length === 0 || selectedColors.length > 4) {
                    alert('Please select up to 4 colors.');
                    return;
                }
    
                shapeData.colors = selectedColors;
    
                // Proceed to calculation and adding the item
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
    
            // Description
            const description = document.createElement('p');
            description.textContent = 'With our Standard process, you can pick the colors and choose the pattern. Once all colors are complete, we will "tweak" the pattern to your liking.';
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
    
            const patternSelect = document.createElement('select');
            patternSelect.style.width = '80%';
            patternSelect.style.padding = '10px';
            patternSelect.style.border = '1px solid #ddd';
            patternSelect.style.borderRadius = '5px';
            patternSelect.style.fontSize = '16px';
            patternSelect.style.marginBottom = '20px';
    
            const marbleOption = document.createElement('option');
            marbleOption.value = 'Marble';
            marbleOption.textContent = 'Marble';
            patternSelect.appendChild(marbleOption);
    
            const graniteOption = document.createElement('option');
            graniteOption.value = 'Flowing Granite';
            graniteOption.textContent = 'Flowing Granite';
            patternSelect.appendChild(graniteOption);
    
            const quartzOption = document.createElement('option');
            quartzOption.value = 'Quartz';
            quartzOption.textContent = 'Quartz';
            patternSelect.appendChild(quartzOption);
    
            container.appendChild(patternSelect);
    
            // Base Color Selection using color squares
            const baseColorLabel = document.createElement('label');
            baseColorLabel.textContent = 'Choose a Base Color:';
            baseColorLabel.style.color = '#0C1729';
            baseColorLabel.style.fontSize = '18px';
            baseColorLabel.style.marginBottom = '10px';
            container.appendChild(baseColorLabel);
    
            const baseColorsContainer = document.createElement('div');
            baseColorsContainer.style.display = 'flex';
            baseColorsContainer.style.flexWrap = 'wrap';
            baseColorsContainer.style.justifyContent = 'center';
            baseColorsContainer.style.gap = '10px';
            baseColorsContainer.style.marginBottom = '20px';
            container.appendChild(baseColorsContainer);
    
            const baseColors = [
                'White', 'Black', 'Tornado Gray', 'Charcoal Gray', 'Toasted Almond', 'Milk Chocolate', 'Dark Chocolate'
            ];
    
            let selectedBaseColor = null;
            const baseColorDivs = [];
    
            baseColors.forEach(color => {
                const colorDiv = createColorSquare(color);
                baseColorsContainer.appendChild(colorDiv.element);
                baseColorDivs.push(colorDiv);
    
                colorDiv.element.addEventListener('click', function () {
                    // Deselect all other base colors
                    baseColorDivs.forEach(div => {
                        div.selected = false;
                        div.element.style.border = '2px solid #ddd';
                    });
                    // Select this base color
                    colorDiv.selected = true;
                    colorDiv.element.style.border = '4px solid #0264D9';
                    selectedBaseColor = colorDiv.colorName;
                });
            });
    
            // Accent Colors Selection
            const accentColorsLabel = document.createElement('label');
            accentColorsLabel.textContent = 'Choose Accent Colors:';
            accentColorsLabel.style.color = '#0C1729';
            accentColorsLabel.style.fontSize = '18px';
            accentColorsLabel.style.marginBottom = '10px';
            container.appendChild(accentColorsLabel);
    
            const accentColorsContainer = document.createElement('div');
            accentColorsContainer.style.display = 'flex';
            accentColorsContainer.style.flexWrap = 'wrap';
            accentColorsContainer.style.justifyContent = 'center';
            accentColorsContainer.style.gap = '10px';
            accentColorsContainer.style.marginBottom = '20px';
            container.appendChild(accentColorsContainer);
    
            const accentColors = [
                'Icy White', 'Silver', 'Champagne Gold', 'Bronze', 'Cobalt Blue', 'Pewter Blue', 'Copper'
            ];
    
            // Include base colors as accent options
            const allAccentColors = baseColors.concat(accentColors);
    
            const accentColorDivs = [];
    
            allAccentColors.forEach(color => {
                const colorDiv = createColorSquare(color);
                accentColorsContainer.appendChild(colorDiv.element);
                accentColorDivs.push(colorDiv);
            });
    
            // Next Button
            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Add Item';
            styleButton(nextBtn);
            container.appendChild(nextBtn);
    
            // Update accent colors selection based on pattern
            function updateAccentColorsSelection() {
                accentColorDivs.forEach(div => div.selected = false); // Reset selections
                if (patternSelect.value === 'Quartz') {
                    accentColorsLabel.textContent = 'Choose up to 2 Accent Colors:';
                } else {
                    accentColorsLabel.textContent = 'Choose up to 3 Additional Colors:';
                }
            }
    
            patternSelect.addEventListener('change', updateAccentColorsSelection);
    
            nextBtn.addEventListener('click', function () {
                // Validate base color selection
                if (!selectedBaseColor) {
                    alert('Please select a base color.');
                    return;
                }
    
                // Get selected pattern
                shapeData.pattern = patternSelect.value;
    
                // Get base color
                shapeData.baseColor = selectedBaseColor;
    
                // Get selected accent colors
                const selectedAccentColors = accentColorDivs.filter(div => div.selected).map(div => div.colorName);
    
                let maxColors = patternSelect.value === 'Quartz' ? 2 : 3;
                if (selectedAccentColors.length > maxColors) {
                    alert(`Please select up to ${maxColors} accent colors.`);
                    return;
                }
    
                shapeData.accentColors = selectedAccentColors;
    
                // Proceed to calculation and adding the item
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
        if (shapeData.hasBacksplash && shapeData.backsplashHeight > 0) {
            const backsplashArea = measurements[0] * (shapeData.backsplashHeight / 12); // Convert height to feet
            squareFootage += backsplashArea / 12; // Convert length to feet
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
        if (shapeData.colors && shapeData.colors.length > 0) {
            itemDescription += ` - Colors: ${shapeData.colors.join(', ')}`;
        }
        if (shapeData.baseColor) {
            itemDescription += ` - Base Color: ${shapeData.baseColor}`;
        }
        if (shapeData.accentColors && shapeData.accentColors.length > 0) {
            itemDescription += ` - Accent Colors: ${shapeData.accentColors.join(', ')}`;
        }
    
        // Add to items list
        items.push({
            description: itemDescription,
            squareFootage: squareFootage.toFixed(2),
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
