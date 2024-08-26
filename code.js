(function() {
    // Initial Interface: Start New Invoice
    const startInvoiceBtn = document.createElement('button');
    startInvoiceBtn.textContent = 'Start New Invoice';
    startInvoiceBtn.style.padding = '15px';
    startInvoiceBtn.style.backgroundColor = '#4CAF50';
    startInvoiceBtn.style.color = 'white';
    startInvoiceBtn.style.border = 'none';
    startInvoiceBtn.style.borderRadius = '5px';
    startInvoiceBtn.style.cursor = 'pointer';
    startInvoiceBtn.style.fontSize = '16px';
    startInvoiceBtn.style.fontWeight = 'bold';
    startInvoiceBtn.style.margin = '20px auto';
    startInvoiceBtn.style.display = 'block';

    document.body.appendChild(startInvoiceBtn);

    startInvoiceBtn.addEventListener('click', function() {
        // Clear the current interface and start a new invoice
        document.body.innerHTML = '';
        
        // Create an empty item list and a button to add new items
        const itemList = document.createElement('div');
        const addItemBtn = document.createElement('button');
        addItemBtn.textContent = 'Add New Item';
        addItemBtn.style.padding = '15px';
        addItemBtn.style.backgroundColor = '#4CAF50';
        addItemBtn.style.color = 'white';
        addItemBtn.style.border = 'none';
        addItemBtn.style.borderRadius = '5px';
        addItemBtn.style.cursor = 'pointer';
        addItemBtn.style.fontSize = '16px';
        addItemBtn.style.fontWeight = 'bold';
        addItemBtn.style.margin = '20px auto';
        addItemBtn.style.display = 'block';
        itemList.appendChild(addItemBtn);
        document.body.appendChild(itemList);

        addItemBtn.addEventListener('click', function() {
            // Prompt to choose Bathroom or Kitchen
            const choiceDiv = document.createElement('div');
            choiceDiv.innerHTML = `
                <p>Select Type:</p>
                <button id="kitchenBtn">Kitchen</button>
                <button id="bathroomBtn">Bathroom</button>
            `;
            document.body.innerHTML = '';
            document.body.appendChild(choiceDiv);

            document.getElementById('kitchenBtn').addEventListener('click', function() {
                // Show options: Island, Regular Counter, Bar Top
                const kitchenOptions = document.createElement('div');
                kitchenOptions.innerHTML = `
                    <p>Select Kitchen Type:</p>
                    <button id="islandBtn">Island</button>
                    <button id="counterBtn">Regular Counter</button>
                    <button id="barTopBtn">Bar Top</button>
                `;
                document.body.innerHTML = '';
                document.body.appendChild(kitchenOptions);

                // Event listeners for each kitchen type to move to shape selection and calculations
                document.getElementById('islandBtn').addEventListener('click', function() {
                    // Show shape options for Island and move to measurements
                    selectShapeAndCalculate('Island');
                });

                document.getElementById('counterBtn').addEventListener('click', function() {
                    // Show shape options for Regular Counter and move to measurements
                    selectShapeAndCalculate('Regular Counter');
                });

                document.getElementById('barTopBtn').addEventListener('click', function() {
                    // Show shape options for Bar Top and move to measurements
                    selectShapeAndCalculate('Bar Top');
                });
            });

            document.getElementById('bathroomBtn').addEventListener('click', function() {
                // Move directly to shape selection for Bathroom
                selectShapeAndCalculate('Bathroom');
            });
        });
    });

    function selectShapeAndCalculate(type) {
        // This function will handle shape selection, measurements, and calculation based on the type (Island, Counter, Bar Top, or Bathroom)
        document.body.innerHTML = ''; // Clear previous content
        const shapeDiv = document.createElement('div');
        shapeDiv.innerHTML = `<p>Select Shape for ${type}:</p>`;
        // Add shape buttons and their event listeners
        // Each shape will lead to input fields for measurements and the calculation logic

        // Example: shapeDiv.appendChild(shapeButton);

        document.body.appendChild(shapeDiv);
    }
})();
