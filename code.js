(function() {
    // Initial variables and configuration
    const PRICE_REGULAR = 26;
    const PRICE_CRYSTAL = 39;
    const MINIMUM_PRICE = 400;

    let items = [];
    let totalCost = 0;

    function initInterface() {
        document.body.innerHTML = '';
        document.body.style.display = 'flex';
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems = 'center';
        document.body.style.minHeight = '100vh';
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.fontFamily = 'Arial, sans-serif';

        const container = document.createElement('div');
        container.style.width = '95%';
        container.style.maxWidth = '1300px';
        container.style.backgroundColor = '#0C1729';
        container.style.padding = '40px';
        container.style.borderRadius = '15px';
        container.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
        container.style.textAlign = 'center';
        container.style.margin = '30px auto';
        document.body.appendChild(container);

        const header = document.createElement('h1');
        header.textContent = 'Invoice Calculator';
        header.style.color = '#FF3131';
        header.style.marginBottom = '40px';
        header.style.fontSize = '36px';
        container.appendChild(header);

        const description = document.createElement('p');
        description.textContent = 'Calculate your countertop costs easily. Start by adding items to your invoice below.';
        description.style.color = '#ffffff';
        description.style.fontSize = '18px';
        description.style.marginBottom = '30px';
        container.appendChild(description);

        const startInvoiceBtn = document.createElement('button');
        startInvoiceBtn.textContent = 'Start New Invoice';
        styleButton(startInvoiceBtn);
        container.appendChild(startInvoiceBtn);

        startInvoiceBtn.addEventListener('click', function() {
            createInvoicePage(container);
        });
    }

    // Call the initInterface function to initialize the interface
    initInterface();

    // Function to handle type selection (Kitchen/Bathroom)
    function selectType(container) {
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = 'Choose a Room Type';
        header.style.color = '#FF3131';
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

    // Function to create the invoice page
    function createInvoicePage(container) {
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = 'Current Invoice';
        header.style.color = '#FF3131';
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
        itemListDiv.innerHTML = '<h3 style="color: #FF3131;">Items:</h3><p style="color: #777;">No items added yet.</p>';
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

    // Function to handle kitchen type selection (Island/Regular Counter/Bar Top)
    function selectKitchenType(container) {
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = 'Choose a Kitchen Counter Type';
        header.style.color = '#FF3131';
        header.style.marginBottom = '30px';
        header.style.fontSize = '28px';
        container.appendChild(header);

        const kitchenOptions = document.createElement('div');
        kitchenOptions.style.display = 'flex';
        kitchenOptions.style.flexDirection = 'column';
        kitchenOptions.style.alignItems = 'center';
        kitchenOptions.style.gap = '20px';

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
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = `Select Shape for ${type}`;
        header.style.color = '#FF3131';
        header.style.marginBottom = '30px';
        header.style.fontSize = '28px';
        container.appendChild(header);

        const shapeDiv = document.createElement('div');
        shapeDiv.style.display = 'flex';
        shapeDiv.style.flexDirection = 'column';
        shapeDiv.style.alignItems = 'center';
        shapeDiv.style.gap = '20px';

        const shapes = getShapesForType(type);
        shapes.forEach(shape => {
            const shapeBtn = createOptionButton(shape.name);
            shapeDiv.appendChild(shapeBtn);

            shapeBtn.addEventListener('click', function() {
                promptMeasurements(shape, type, container);
            });
        });

        container.appendChild(shapeDiv);
    }

    // Function to prompt user for measurements and finish selection
    function promptMeasurements(shape, type, container) {
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = `${shape.name} - ${type}`;
        header.style.color = '#FF3131';
        header.style.marginBottom = '30px';
        header.style.fontSize = '28px';
        container.appendChild(header);

        const formDiv = document.createElement('div');
        formDiv.style.display = 'flex';
        formDiv.style.flexDirection = 'column';
        formDiv.style.alignItems = 'center';
        formDiv.style.gap = '20px';

        shape.measurements.forEach((measurement, index) => {
            const label = document.createElement('label');
            label.textContent = `Measurement ${index + 1} (inches):`;
            label.style.color = '#ffffff';
            label.style.marginBottom = '5px';
            label.style.fontSize = '18px';
            formDiv.appendChild(label);

            const input = document.createElement('input');
            input.type = 'number';
            input.id = `measurement${index + 1}`;
            input.style.width = '80%';
            input.style.padding = '15px';
            input.style.marginBottom = '20px';
            input.style.border = '1px solid #ddd';
            input.style.borderRadius = '5px';
            input.style.fontSize = '18px';
            input.style.color = '#0264D9';
            input.style.textAlign = 'center';
            formDiv.appendChild(input);
        });

        // Finish Selection
        const finishLabel = document.createElement('label');
        finishLabel.textContent = 'Select Finish:';
        finishLabel.style.color = '#ffffff';
        finishLabel.style.marginBottom = '10px';
        finishLabel.style.fontSize = '18px';
        formDiv.appendChild(finishLabel);

        const finishSelect = document.createElement('select');
        finishSelect.style.padding = '15px';
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

        formDiv.appendChild(finishSelect);

        // Calculate Button
        const calculateBtn = document.createElement('button');
        calculateBtn.textContent = 'Add Item';
        styleButton(calculateBtn);
        formDiv.appendChild(calculateBtn);

        calculateBtn.addEventListener('click', function() {
            calculateAndAddItem(shape, finishSelect.value, container);
        });

        container.appendChild(formDiv);
    }

    function calculateAndAddItem(shape, finishType, container) {
        console.log('Add Item button clicked');
        const measurements = shape.measurements.map((_, index) => parseFloat(document.getElementById(`measurement${index + 1}`).value));
        
        console.log('Measurements:', measurements);
        
        if (measurements.some(isNaN)) {
            alert('Please enter valid measurements.');
            return;
        }

        // Calculate square footage based on shape formula
        const squareFootage = shape.formula(measurements);
        console.log('Square Footage:', squareFootage);
        
        const pricePerSqFt = (finishType === 'regular') ? PRICE_REGULAR : PRICE_CRYSTAL;
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
        console.log('Total Cost:', totalCost);

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

        itemListDiv.innerHTML = '<h3 style="color: #FF3131;">Items:</h3>';

        if (items.length === 0) {
            itemListDiv.innerHTML += '<p style="color: #777;">No items added yet.</p>';
        } else {
            items.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = `${index + 1}. ${item.type} - ${item.squareFootage} sq ft - ${item.finish} Finish - $${item.cost}`;
                itemDiv.style.padding = '10px';
                itemDiv.style.marginBottom = '15px';
                itemDiv.style.borderBottom = '1px solid #ddd';
                itemDiv.style.color = '#ffffff';
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

        switch (type) {
            case 'Island':
                shapes.push({
                    name: 'Island Shape 1',
                    type: 'Island',
                    measurements: ['1', '2'],
                    formula: measurements => ((measurements[0] * measurements[1]) / 144)
                });
                break;
            case 'Regular Counter':
                shapes.push({
                    name: 'Regular Counter Shape 1',
                    type: 'Regular Counter',
                    measurements: ['1', '2', '3'],
                    formula: measurements => ((measurements[0] + measurements[1] + measurements[2]) * 25) / 144
                });
                break;
            case 'Bar Top':
                shapes.push({
                    name: 'Bar Top Shape 1',
                    type: 'Bar Top',
                    measurements: ['1', '2', '3', '4'],
                    formula: measurements => ((measurements[0] + measurements[1] + measurements[2] + measurements[3]) * 25) / 144
                });
                break;
            case 'Bathroom':
                shapes.push({
                    name: 'Bathroom Shape 1',
                    type: 'Bathroom',
                    measurements: ['1', '2'],
                    formula: measurements => ((measurements[0] * 22) / 144)
                });
                break;
        }

        return shapes;
    }

    // Helper function to style buttons
    function styleButton(button) {
        button.style.padding = '20px 30px';
        button.style.backgroundColor = '#FF3131';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '25px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '18px';
        button.style.fontWeight = 'bold';
        button.style.margin = '20px 0';
        button.style.display = 'inline-block';
        button.style.transition = 'background-color 0.3s ease';

        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = '#e62e2e';
        });

        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = '#FF3131';
        });
    }

    // Helper function to create image buttons
    function createImageButton(text, imageUrl) {
        const button = document.createElement('div');
        button.style.position = 'relative';
        button.style.width = '500px';
        button.style.height = '500px';
        button.style.maxWidth = '500px';
        button.style.border = '2px solid #FF3131';
        button.style.borderRadius = '10px';
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
        button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

        button.addEventListener('mouseenter', function() {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 14px 28px rgba(0, 0, 0, 0.25)';
        });

        button.addEventListener('mouseleave', function() {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });

        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.bottom = '0';
        overlay.style.width = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.color = 'white';
        overlay.style.padding = '15px';
        overlay.style.textAlign = 'center';
        overlay.style.fontSize = '20px';
        overlay.style.fontWeight = 'bold';
        overlay.textContent = text;
        button.appendChild(overlay);

        return button;
    }

    // Helper function to create option buttons
    function createOptionButton(text) {
        const button = document.createElement('button');
        button.textContent = text;
        styleButton(button);
        button.style.width = '300px';  // Make these larger
        button.style.marginBottom = '15px';
        return button;
    }

    // Initialize the interface
    initInterface();
})();
