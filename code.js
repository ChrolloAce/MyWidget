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
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.fontFamily = 'Arial, sans-serif';

        addNavigationTabs(); // Add the navigation tabs

        const contentContainer = document.createElement('div');
        contentContainer.id = 'contentContainer';
        contentContainer.style.width = '95%';
        contentContainer.style.maxWidth = '1300px';
        contentContainer.style.backgroundColor = '#ffffff';
        contentContainer.style.padding = '40px';
        contentContainer.style.borderRadius = '15px';
        contentContainer.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
        contentContainer.style.textAlign = 'center';
        contentContainer.style.margin = '30px auto';
        contentContainer.style.flexGrow = '1';
        document.body.appendChild(contentContainer);

        showHomePage(contentContainer); // Load the home page content by default
    }

    // Function to add the navigation tabs
    function addNavigationTabs() {
        const tabs = document.createElement('div');
        tabs.style.width = '100%';
        tabs.style.backgroundColor = '#FF3131';
        tabs.style.color = '#ffffff';
        tabs.style.display = 'flex';
        tabs.style.justifyContent = 'space-around';
        tabs.style.padding = '10px 0';
        tabs.style.position = 'fixed';
        tabs.style.top = '0';
        tabs.style.left = '0';
        tabs.style.zIndex = '1000';

        const homeTab = createTab('Home', showHomePage);
        const invoiceTab = createTab('Invoice', createInvoicePage);
        const aboutTab = createTab('About', showAboutPage);

        tabs.appendChild(homeTab);
        tabs.appendChild(invoiceTab);
        tabs.appendChild(aboutTab);

        document.body.appendChild(tabs);
    }

    // Helper function to create a tab
    function createTab(text, onClick) {
        const tab = document.createElement('button');
        tab.textContent = text;
        tab.style.backgroundColor = '#0264D9';
        tab.style.color = '#ffffff';
        tab.style.border = 'none';
        tab.style.padding = '10px 20px';
        tab.style.cursor = 'pointer';
        tab.style.flexGrow = '1';
        tab.style.textAlign = 'center';
        tab.style.fontSize = '18px';
        tab.style.fontWeight = 'bold';
        tab.style.transition = 'background-color 0.3s';
        tab.addEventListener('click', function() {
            const contentContainer = document.getElementById('contentContainer');
            contentContainer.innerHTML = ''; // Clear the content container
            onClick(contentContainer); // Load the respective content
        });

        tab.addEventListener('mouseenter', function() {
            tab.style.backgroundColor = '#FF6969';
        });

        tab.addEventListener('mouseleave', function() {
            tab.style.backgroundColor = '#0264D9';
        });

        return tab;
    }

    // Function to show the home page content
    function showHomePage(container) {
        container.innerHTML = '';

        const header = document.createElement('h1');
        header.textContent = 'Welcome to the Countertop Invoice Calculator';
        header.style.color = '#0C1729';
        header.style.marginBottom = '30px';
        header.style.fontSize = '36px';
        container.appendChild(header);

        const description = document.createElement('p');
        description.textContent = 'This tool helps you calculate the cost of your countertop projects easily. Start by creating a new invoice or learn more about the app.';
        description.style.color = '#0C1729';
        description.style.fontSize = '18px';
        description.style.marginBottom = '20px';
        container.appendChild(description);

        const startInvoiceBtn = document.createElement('button');
        startInvoiceBtn.textContent = 'Start New Invoice';
        styleButton(startInvoiceBtn);
        container.appendChild(startInvoiceBtn);

        startInvoiceBtn.addEventListener('click', function() {
            previousPage = showHomePage;
            createInvoicePage(container);
        });
    }

    // Function to create the invoice page
    function createInvoicePage(container) {
        previousPage = showHomePage;
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

    // Function to handle kitchen type selection (Island/Regular Counter/Bar Top)
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

        const islandBtn = createOptionButton('Island');
        const counterBtn = createOptionButton('Regular Counter');
        const barTopBtn = createOptionButton('Bar Top');

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

    function calculateAndAddItem(shape, finishType, container, type) {
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
        const squareFootage = shape.formula(measurements, depth);
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

        console.log('Items:', items);

        // Update total cost
        totalCost += cost;

        // Redirect back to the invoice page and show the updated item list
        createInvoicePage(container);
    }

    function updateItemList(container) {
        let itemListDiv = document.getElementById('itemList');

        // Recreate itemListDiv if it doesn't exist
        if (!itemListDiv) {
            console.error('itemListDiv not found. Recreating the element.');
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
        }
        // You can add more shapes and types here for Islands, Regular Countertops, etc.
        return shapes;
    }

    // Helper function to style buttons
    function styleButton(button) {
        button.style.padding = '15px';
        button.style.backgroundColor = '#FF3131';
        button.style.color = '#ffffff';
        button.style.border = 'none';
        button.style.borderRadius = '10px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '18px';
        button.style.fontWeight = 'bold';
        button.style.margin = '10px 0';
        button.style.width = '100%';
        button.style.transition = 'all 0.3s ease';
        button.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';

        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = '#FF6969';
            button.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = '#FF3131';
            button.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
    }

    // Helper function to create image buttons
    function createImageButton(text, imageUrl) {
        const button = document.createElement('div');
        button.style.position = 'relative';
        button.style.width = '500px';
        button.style.height = '500px';
        button.style.border = '2px solid #FF3131';
        button.style.borderRadius = '25px';
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
        button.style.marginBottom = '30px';

        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.bottom = '0';
        overlay.style.width = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.color = 'white';
        overlay.style.padding = '20px';
        overlay.style.fontSize = '24px';
        overlay.style.fontWeight = 'bold';
        overlay.style.textAlign = 'center';
        overlay.textContent = text;
        button.appendChild(overlay);

        return button;
    }

    // Initialize the interface
    initInterface();
})();
