(function() {
    // Initial variables and configuration
    const PRICE_REGULAR = 26;
    const PRICE_CRYSTAL = 39;
    const MINIMUM_PRICE = 400;

    let items = [];
    let totalCost = 0;
    let previousPage = null;

    // Function to initialize the interface
    function initInterface() {
        document.body.innerHTML = '';
        document.body.style.display = 'flex';
        document.body.style.flexDirection = 'column';
        document.body.style.alignItems = 'center';
        document.body.style.minHeight = '100vh';
        document.body.style.backgroundColor = '#f7f7f7';  // Softer background color
        document.body.style.fontFamily = 'Arial, sans-serif';

        addTabs(); // Add the tabs at the top

        const container = document.createElement('div');
        container.style.width = '95%';
        container.style.maxWidth = '1300px';
        container.style.backgroundColor = '#ffffff';
        container.style.padding = '40px';
        container.style.borderRadius = '15px';
        container.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
        container.style.textAlign = 'center';
        container.style.margin = '30px auto';
        container.style.flexGrow = '1';
        container.style.position = 'relative'; 
        document.body.appendChild(container);

        const header = document.createElement('h1');
        header.textContent = 'Invoice Calculator';
        header.style.color = '#0C1729';
        header.style.marginBottom = '40px';
        header.style.fontSize = '36px';
        container.appendChild(header);

        const description = document.createElement('p');
        description.textContent = 'Calculate your countertop costs easily. Start by adding items to your invoice below.';
        description.style.color = '#0C1729';
        description.style.fontSize = '18px';
        description.style.marginBottom = '30px';
        container.appendChild(description);

        const startInvoiceBtn = document.createElement('button');
        startInvoiceBtn.textContent = 'Start New Invoice';
        styleButton(startInvoiceBtn);
        container.appendChild(startInvoiceBtn);

        startInvoiceBtn.addEventListener('click', function() {
            previousPage = initInterface;
            createContactInfoPage(container);  // First page will collect user info
        });
    }

    // Function to add tabs at the top
    function addTabs() {
        const tabs = document.createElement('div');
        tabs.style.width = '100%';
        tabs.style.backgroundColor = '#222222';  
        tabs.style.color = '#ffffff';  
        tabs.style.padding = '15px 20px';  
        tabs.style.position = 'absolute';
        tabs.style.top = '0';
        tabs.style.left = '0';
        tabs.style.zIndex = '1000';
        tabs.style.display = 'flex';
        tabs.style.justifyContent = 'space-around';
        tabs.style.alignItems = 'center';
        tabs.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';  

        const aboutUsTab = document.createElement('div');
        aboutUsTab.textContent = 'About Us';
        styleTab(aboutUsTab);
        aboutUsTab.addEventListener('click', function() {
            showAboutUs();
        });
        tabs.appendChild(aboutUsTab);

        const invoiceTab = document.createElement('div');
        invoiceTab.textContent = 'Invoice';
        styleTab(invoiceTab);
        invoiceTab.addEventListener('click', initInterface);
        tabs.appendChild(invoiceTab);

        const backTab = document.createElement('div');
        backTab.textContent = 'Back';
        styleTab(backTab);
        backTab.addEventListener('click', function() {
            if (previousPage) {
                previousPage();
            }
        });
        tabs.appendChild(backTab);

        document.body.appendChild(tabs);
    }

    // Style for tabs
    function styleTab(tab) {
        tab.style.cursor = 'pointer';
        tab.style.fontSize = '18px';
        tab.style.fontWeight = 'bold';
        tab.style.padding = '10px 20px';
        tab.style.transition = 'all 0.3s ease';
        tab.style.borderRadius = '5px';
        tab.style.color = '#ffffff';
        tab.addEventListener('mouseenter', () => {
            tab.style.backgroundColor = '#0264D9'; // Vibrant hover effect
        });
        tab.addEventListener('mouseleave', () => {
            tab.style.backgroundColor = 'transparent';
        });
    }

    // Function to create the contact info page
    function createContactInfoPage(container) {
        previousPage = initInterface;
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = 'Enter Your Contact Information';
        header.style.color = '#0C1729';
        header.style.marginBottom = '30px';
        header.style.fontSize = '28px';
        container.appendChild(header);

        const formDiv = document.createElement('div');
        formDiv.style.display = 'flex';
        formDiv.style.flexDirection = 'column';
        formDiv.style.gap = '20px';
        formDiv.style.width = '80%';
        formDiv.style.margin = '0 auto';
        container.appendChild(formDiv);

        // Name input
        const nameLabel = createInputLabel('Name');
        const nameInput = createTextInput('text', 'name');
        formDiv.appendChild(nameLabel);
        formDiv.appendChild(nameInput);

        // Phone input
        const phoneLabel = createInputLabel('Phone');
        const phoneInput = createTextInput('tel', 'phone');
        formDiv.appendChild(phoneLabel);
        formDiv.appendChild(phoneInput);

        // Email input
        const emailLabel = createInputLabel('Email');
        const emailInput = createTextInput('email', 'email');
        formDiv.appendChild(emailLabel);
        formDiv.appendChild(emailInput);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Next';
        styleButton(submitBtn);
        formDiv.appendChild(submitBtn);

        submitBtn.addEventListener('click', function() {
            createInvoicePage(container);  // Move to invoice page
        });
    }

    // Helper function to create labels
    function createInputLabel(text) {
        const label = document.createElement('label');
        label.textContent = text;
        label.style.color = '#0C1729';
        label.style.fontSize = '18px';
        label.style.textAlign = 'left';
        return label;
    }

    // Helper function to create text inputs
    function createTextInput(type, id) {
        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.style.padding = '12px';
        input.style.width = '100%';
        input.style.fontSize = '16px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '5px';
        input.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        return input;
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

        addItemBtn.addEventListener('click', function() {
            selectType(container);
        });

        // Finalize Invoice Button
        const finalizeBtn = document.createElement('button');
        finalizeBtn.textContent = 'Finalize Invoice';
        styleButton(finalizeBtn);
        finalizeBtn.style.marginTop = '30px';
        container.appendChild(finalizeBtn);

        finalizeBtn.addEventListener('click', function() {
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

        kitchenBtn.addEventListener('click', function() {
            selectKitchenType(container);
        });

        bathroomBtn.addEventListener('click', function() {
            selectShapeAndCalculate('Bathroom', container);
        });
    }

    // Select kitchen type
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

        islandBtn.addEventListener('click', function() {
            selectShapeAndCalculate('Island', container);
        });

        counterBtn.addEventListener('click', function() {
            selectShapeAndCalculate('Regular Counter', container);
        });

        barTopBtn.addEventListener('click', function() {
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

            shapeBtn.addEventListener('click', function() {
                promptMeasurements(shape, type, container);
            });
        });

        container.appendChild(shapeDiv);
    }

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

        const formDiv = document.createElement('div');
        formDiv.style.display = 'flex';
        formDiv.style.flexDirection = 'column';
        formDiv.style.alignItems = 'center';
        formDiv.style.gap = '20px';
        formDiv.style.marginTop = '30px';
        container.appendChild(formDiv);

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

        calculateBtn.addEventListener('click', function() {
            calculateAndAddItem(shape, finishSelect.value, container, type);
        });
    }

    // Function to calculate and add items to the list
    function calculateAndAddItem(shape, finishType, container, type) {
        const measurements = shape.measurements.map((_, index) => parseFloat(document.getElementById(`measurement${index + 1}`).value));

        if (measurements.some(isNaN)) {
            alert('Please enter valid measurements.');
            return;
        }

        const depth = type === 'Kitchen' ? 25 : 22;
        const squareFootage = shape.formula(measurements, depth);

        const pricePerSqFt = finishType === 'regular' ? PRICE_REGULAR : PRICE_CRYSTAL;
        const cost = squareFootage * pricePerSqFt;

        items.push({
            type: `${shape.name} - ${shape.type}`,
            squareFootage: squareFootage.toFixed(2),
            finish: finishType,
            cost: cost.toFixed(2)
        });

        totalCost += cost;
        createInvoicePage(container);
    }

    // Function to update the item list
    function updateItemList(container) {
        let itemListDiv = document.getElementById('itemList');

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
                itemDiv.textContent = `${index + 1}. ${item.type} - ${item.squareFootage} sq ft - ${item.finish} Finish - $${item.cost}`;
                itemDiv.style.padding = '10px';
                itemDiv.style.marginBottom = '15px';
                itemDiv.style.borderBottom = '1px solid #ddd';
                itemDiv.style.color = '#0C1729';
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

        // Example of shapes for different types
        if (type === 'Bar Top') {
            shapes.push({
                name: 'Bar Top Shape 1',
                type: 'Bar Top',
                measurements: ['1', '2'],
                formula: (measurements, depth) => ((measurements[0] * depth) / 144),
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66cd29da863bba73ecdd7c48_1.png'
            });
            // Add more Bar Top shapes here...
        } else if (type === 'Regular Counter') {
            shapes.push({
                name: 'Regular Counter Shape 1',
                type: 'Regular Counter',
                measurements: ['1', '2'],
                formula: (measurements, depth) => ((measurements[0] * depth) / 144),
                imageUrl: 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66ce3a7d61151fe7d2e11e25_4.png'
            });
            // Add more Regular Counter shapes here...
        }
        return shapes;
    }

    // Helper function to style buttons
    function styleButton(button) {
        button.style.padding = '10px';
        button.style.backgroundColor = '#000000';
        button.style.color = '#ffffff';
        button.style.border = '2px solid #0264D9';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
        button.style.fontWeight = 'bold';
        button.style.transition = 'all 0.3s ease';
        button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = '#0264D9';
        });

        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = '#000000';
        });
    }

    // Helper function to create image buttons
    function createImageButton(text, imageUrl) {
        const button = document.createElement('div');
        button.style.position = 'relative';
        button.style.width = '250px';
        button.style.height = '250px';
        button.style.border = '2px solid #000000';
        button.style.borderRadius = '15px';
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
        button.style.marginBottom = '20px';

        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.bottom = '0';
        overlay.style.width = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.color = 'white';
        overlay.style.padding = '15px';
        overlay.style.fontSize = '18px';
        overlay.style.fontWeight = 'bold';
        overlay.style.textAlign = 'center';
        overlay.textContent = text;
        button.appendChild(overlay);

        return button;
    }

    // Initialize the interface
    initInterface();
})();
