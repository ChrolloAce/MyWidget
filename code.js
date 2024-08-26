(function() {
    // Initial variables and configuration
    const PRICE_REGULAR = 26;
    const PRICE_CRYSTAL = 39;
    const MINIMUM_PRICE = 400;

    let items = [];
    let totalCost = 0;

    // Function to initialize the interface
    function initInterface() {
        document.body.innerHTML = '';
        const startInvoiceBtn = document.createElement('button');
        startInvoiceBtn.textContent = 'Start New Invoice';
        styleButton(startInvoiceBtn);
        document.body.appendChild(startInvoiceBtn);

        startInvoiceBtn.addEventListener('click', function() {
            createInvoicePage();
        });
    }

    // Function to create the invoice page
    function createInvoicePage() {
        document.body.innerHTML = '';

        // Add New Item Button
        const addItemBtn = document.createElement('button');
        addItemBtn.textContent = 'Add New Item';
        styleButton(addItemBtn);
        document.body.appendChild(addItemBtn);

        // Item List
        const itemListDiv = document.createElement('div');
        itemListDiv.id = 'itemList';
        document.body.appendChild(itemListDiv);

        addItemBtn.addEventListener('click', function() {
            selectType();
        });

        // Finalize Invoice Button
        const finalizeBtn = document.createElement('button');
        finalizeBtn.textContent = 'Finalize Invoice';
        styleButton(finalizeBtn);
        finalizeBtn.style.marginTop = '20px';
        document.body.appendChild(finalizeBtn);

        finalizeBtn.addEventListener('click', function() {
            finalizeInvoice();
        });
    }

    // Function to handle type selection (Kitchen/Bathroom)
    function selectType() {
        document.body.innerHTML = '';
        const choiceDiv = document.createElement('div');
        choiceDiv.innerHTML = `
            <p>Select Type:</p>
            <button id="kitchenBtn">Kitchen</button>
            <button id="bathroomBtn">Bathroom</button>
        `;
        document.body.appendChild(choiceDiv);

        document.getElementById('kitchenBtn').addEventListener('click', function() {
            selectKitchenType();
        });

        document.getElementById('bathroomBtn').addEventListener('click', function() {
            selectShapeAndCalculate('Bathroom');
        });
    }

    // Function to handle kitchen type selection (Island/Regular Counter/Bar Top)
    function selectKitchenType() {
        document.body.innerHTML = '';
        const kitchenOptions = document.createElement('div');
        kitchenOptions.innerHTML = `
            <p>Select Kitchen Type:</p>
            <button id="islandBtn">Island</button>
            <button id="counterBtn">Regular Counter</button>
            <button id="barTopBtn">Bar Top</button>
        `;
        document.body.appendChild(kitchenOptions);

        document.getElementById('islandBtn').addEventListener('click', function() {
            selectShapeAndCalculate('Island');
        });

        document.getElementById('counterBtn').addEventListener('click', function() {
            selectShapeAndCalculate('Regular Counter');
        });

        document.getElementById('barTopBtn').addEventListener('click', function() {
            selectShapeAndCalculate('Bar Top');
        });
    }

    // Function to handle shape selection and calculations
    function selectShapeAndCalculate(type) {
        document.body.innerHTML = '';
        const shapeDiv = document.createElement('div');
        shapeDiv.innerHTML = `<p>Select Shape for ${type}:</p>`;

        // Based on type, show different shape options
        const shapes = getShapesForType(type);
        shapes.forEach(shape => {
            const shapeBtn = document.createElement('button');
            shapeBtn.textContent = shape.name;
            styleButton(shapeBtn);
            shapeDiv.appendChild(shapeBtn);

            shapeBtn.addEventListener('click', function() {
                promptMeasurements(shape, type);
            });
        });

        document.body.appendChild(shapeDiv);
    }

    // Function to prompt user for measurements and finish selection
    function promptMeasurements(shape, type) {
        document.body.innerHTML = '';
        const formDiv = document.createElement('div');
        formDiv.innerHTML = `<h3>${shape.name} - ${type}</h3>`;
        
        shape.measurements.forEach((measurement, index) => {
            const label = document.createElement('label');
            label.textContent = `Measurement ${index + 1} (inches):`;
            formDiv.appendChild(label);
            
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `measurement${index + 1}`;
            input.style.width = '100%';
            input.style.padding = '10px';
            input.style.marginBottom = '10px';
            formDiv.appendChild(input);
        });

        // Finish Selection
        const finishLabel = document.createElement('label');
        finishLabel.textContent = 'Select Finish:';
        formDiv.appendChild(finishLabel);

        const finishSelect = document.createElement('select');
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
            calculateAndAddItem(shape, finishSelect.value);
        });

        document.body.appendChild(formDiv);
    }

    // Function to calculate square footage and add item to invoice
    function calculateAndAddItem(shape, finishType) {
        const measurements = shape.measurements.map((_, index) => parseFloat(document.getElementById(`measurement${index + 1}`).value));
        if (measurements.some(isNaN)) {
            alert('Please enter valid measurements.');
            return;
        }

        // Calculate square footage based on shape formula
        const squareFootage = shape.formula(measurements);
        const pricePerSqFt = (finishType === 'regular') ? PRICE_REGULAR : PRICE_CRYSTAL;
        const cost = squareFootage * pricePerSqFt;

        // Add to items list
        items.push({
            type: shape.name,
            squareFootage: squareFootage.toFixed(2),
            finish: finishType,
            cost: cost.toFixed(2)
        });

        // Update total cost
        totalCost += cost;

        // Show updated item list
        updateItemList();
    }

    // Function to update and display the item list
    function updateItemList() {
        const itemListDiv = document.getElementById('itemList');
        itemListDiv.innerHTML = '<h3>Items:</h3>';

        items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${index + 1}. ${item.type} - ${item.squareFootage} sq ft - ${item.finish} Finish - $${item.cost}`;
            itemListDiv.appendChild(itemDiv);
        });

        const totalDiv = document.createElement('div');
        totalDiv.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
        totalDiv.style.marginTop = '20px';
        itemListDiv.appendChild(totalDiv);
    }

    // Function to finalize the invoice
    function finalizeInvoice() {
        if (totalCost < MINIMUM_PRICE) {
            totalCost = MINIMUM_PRICE;
        }

        alert(`Finalized Invoice Total: $${totalCost.toFixed(2)}`);
        items = [];
        totalCost = 0;
        initInterface();
    }

    // Helper function to get shapes for a specific type
    function getShapesForType(type) {
        const shapes = [];

        switch (type) {
            case 'Island':
                shapes.push({
                    name: 'Island Shape 1',
                    measurements: ['1', '2'],
                    formula: measurements => ((measurements[0] * measurements[1]) / 144)
                });
                // Add more shapes for Island if needed
                break;
            case 'Regular Counter':
                shapes.push({
                    name: 'Regular Counter Shape 1',
                    measurements: ['1', '2', '3'],
                    formula: measurements => ((measurements[0] + measurements[1] + measurements[2]) * 25) / 144
                });
                // Add more shapes for Regular Counter if needed
                break;
            case 'Bar Top':
                shapes.push({
                    name: 'Bar Top Shape 1',
                    measurements: ['1', '2', '3', '4'],
                    formula: measurements => ((measurements[0] + measurements[1] + measurements[2] + measurements[3]) * 25) / 144
                });
                // Add more shapes for Bar Top if needed
                break;
            case 'Bathroom':
                shapes.push({
                    name: 'Bathroom Shape 1',
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
        button.style.padding = '15px';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
        button.style.fontWeight = 'bold';
        button.style.margin = '10px 0';
        button.style.display = 'block';
        button.style.width = '100%';
    }

    // Initialize the interface
    initInterface();
})();
