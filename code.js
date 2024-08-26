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
        document.body.style.backgroundColor = '#f4f7f6';
        document.body.style.fontFamily = 'Arial, sans-serif';

        const container = document.createElement('div');
        container.style.width = '90%';
        container.style.maxWidth = '1200px';
        container.style.backgroundColor = '#ffffff';
        container.style.padding = '30px';
        container.style.borderRadius = '12px';
        container.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        container.style.textAlign = 'center';
        container.style.margin = '20px auto';
        document.body.appendChild(container);

        const header = document.createElement('h1');
        header.textContent = 'Invoice Calculator';
        header.style.color = '#333';
        header.style.marginBottom = '30px';
        container.appendChild(header);

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
        const choiceDiv = document.createElement('div');
        choiceDiv.style.display = 'flex';
        choiceDiv.style.justifyContent = 'space-around';
        choiceDiv.style.gap = '20px';
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

        // Add New Item Button
        const addItemBtn = document.createElement('button');
        addItemBtn.textContent = 'Add New Item';
        styleButton(addItemBtn);
        container.appendChild(addItemBtn);

        // Item List
        const itemListDiv = document.createElement('div');
        itemListDiv.id = 'itemList';
        itemListDiv.style.marginTop = '20px';
        itemListDiv.style.textAlign = 'left';
        itemListDiv.innerHTML = '<h3>Items:</h3><p style="color: #777;">No items added yet.</p>'; // Initialize with 0 items message
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
        finalizeBtn.style.marginTop = '20px';
        container.appendChild(finalizeBtn);

        finalizeBtn.addEventListener('click', function() {
            finalizeInvoice(container);
        });
    }

    // Function to handle kitchen type selection (Island/Regular Counter/Bar Top)
    function selectKitchenType(container) {
        container.innerHTML = '';
        const kitchenOptions = document.createElement('div');
        kitchenOptions.style.display = 'flex';
        kitchenOptions.style.flexDirection = 'column';
        kitchenOptions.style.alignItems = 'center';
        kitchenOptions.style.gap = '10px';

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
        const shapeDiv = document.createElement('div');
        shapeDiv.innerHTML = `<h3>${type} - Select Shape</h3>`;
        shapeDiv.style.display = 'flex';
        shapeDiv.style.flexDirection = 'column';
        shapeDiv.style.alignItems = 'center';
        shapeDiv.style.gap = '10px';

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
        const formDiv = document.createElement('div');
        formDiv.innerHTML = `<h3>${shape.name} - ${type}</h3>`;
        formDiv.style.display = 'flex';
        formDiv.style.flexDirection = 'column';
        formDiv.style.alignItems = 'center';
        formDiv.style.gap = '10px';

        shape.measurements.forEach((measurement, index) => {
            const label = document.createElement('label');
            label.textContent = `Measurement ${index + 1} (inches):`;
            label.style.marginBottom = '5px';
            formDiv.appendChild(label);

            const input = document.createElement('input');
            input.type = 'number';
            input.id = `measurement${index + 1}`;
            input.style.width = '100%';
            input.style.padding = '10px';
            input.style.marginBottom = '10px';
            input.style.border = '1px solid #ddd';
            input.style.borderRadius = '5px';
            input.style.fontSize = '16px';
            formDiv.appendChild(input);
        });

        // Finish Selection
        const finishLabel = document.createElement('label');
        finishLabel.textContent = 'Select Finish:';
        finishLabel.style.marginBottom = '5px';
        formDiv.appendChild(finishLabel);

        const finishSelect = document.createElement('select');
        finishSelect.style.padding = '10px';
        finishSelect.style.border = '1px solid #ddd';
        finishSelect.style.borderRadius = '5px';
        finishSelect.style.fontSize = '16px';
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
            itemListDiv.style.marginTop = '20px';
            container.appendChild(itemListDiv);
        }

        itemListDiv.innerHTML = '<h3>Items:</h3>';

        if (items.length === 0) {
            itemListDiv.innerHTML += '<p style="color: #777;">No items added yet.</p>';
        } else {
            items.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = `${index + 1}. ${item.type} - ${item.squareFootage} sq ft - ${item.finish} Finish - $${item.cost}`;
                itemDiv.style.padding = '10px';
                itemDiv.style.marginBottom = '10px';
                itemDiv.style.borderBottom = '1px solid #ddd';
                itemListDiv.appendChild(itemDiv);
            });

            const totalDiv = document.createElement('div');
            totalDiv.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
            totalDiv.style.marginTop = '20px';
            totalDiv.style.fontWeight = 'bold';
            totalDiv.style.fontSize = '18px';
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
                // Add more shapes for Island if needed
                break;
            case 'Regular Counter':
                shapes.push({
                    name: 'Regular Counter Shape 1',
                    type: 'Regular Counter',
                    measurements: ['1', '2', '3'],
                    formula: measurements => ((measurements[0] + measurements[1] + measurements[2]) * 25) / 144
                });
                // Add more shapes for Regular Counter if needed
                break;
            case 'Bar Top':
                shapes.push({
                    name: 'Bar Top Shape 1',
                    type: 'Bar Top',
                    measurements: ['1', '2', '3', '4'],
                    formula: measurements => ((measurements[0] + measurements[1] + measurements[2] + measurements[3]) * 25) / 144
                });
                // Add more shapes for Bar Top if needed
                break;
            case 'Bathroom':
                shapes.push({
                    name: 'Bathroom Shape 1',
                    type: 'Bathroom',
                    measurements: ['1', '2'],
                    formula: measurements => ((measurements[0] * 22) / 144)
                });
                // Add more shapes for Bathroom if needed
                break;
            // Add more cases and shapes as necessary
        }

        return shapes;
    }

    // Helper function to style buttons
    function styleButton(button) {
        button.style.padding = '15px 25px';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '25px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
        button.style.fontWeight = 'bold';
        button.style.margin = '10px 0';
        button.style.display = 'inline-block';
        button.style.transition = 'background-color 0.3s ease';

        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = '#45a049';
        });

        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = '#4CAF50';
        });
    }

    // Helper function to create image buttons
    function createImageButton(text, imageUrl) {
        const button = document.createElement('div');
        button.style.position = 'relative';
        button.style.width = 'calc(50% - 20px)';
        button.style.height = '150px';
        button.style.maxWidth = '250px';
        button.style.border = '2px solid #4CAF50';
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
        button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
        button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

        button.addEventListener('mouseenter', function() {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseleave', function() {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
        });

        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.bottom = '0';
        overlay.style.width = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.color = 'white';
        overlay.style.padding = '10px';
        overlay.style.textAlign = 'center';
        overlay.style.fontSize = '16px';
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
        button.style.width = '200px';  // Make these smaller than the image buttons
        return button;
    }

    // Initialize the interface
    initInterface();
})();
