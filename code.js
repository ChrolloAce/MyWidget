(function () {
    // Constants and Configuration
    const PRICE_REGULAR = 26;
    const PRICE_CRYSTAL = 39;
    const MINIMUM_PRICE = 400;

    let items = [];
    let totalCost = 0;
    let previousPage = null;
    let userInfo = {};

    const baseColors = {
        'White': '#FFFFFF',
        'Black': '#000000',
        'Tornado Gray': '#4F4F4F',
        'Charcoal Gray': '#2E2E2E',
        'Toasted Almond': '#D2B48C',
        'Milk Chocolate': '#8B4513',
        'Dark Chocolate': '#5D3A1A'
    };

    // Inject CSS Styles Globally
    (function injectStyles() {
        const styles = `
            /* General Reset */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                display: flex;
                flex-direction: column;
                align-items: center;
                min-height: 100vh;
                background-color: #ffffff;
                font-family: 'Arial', sans-serif;
            }

            /* Container */
            .container {
                width: 95%;
                max-width: 800px;
                background-color: #f1f1f1;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
                text-align: center;
                margin: 80px auto 30px auto;
                transition: all 0.3s ease;
            }

            /* Headers */
            .container h1,
            .container h2 {
                color: #0C1729;
                margin-bottom: 20px;
            }

            .container h1 {
                font-size: 36px;
            }

            .container h2 {
                font-size: 28px;
            }

            /* Paragraphs */
            .container p {
                color: #0C1729;
                font-size: 18px;
                margin-bottom: 30px;
            }

            /* Form Styles */
            .form-group {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
                margin-bottom: 20px;
            }

            .form-group label {
                color: #0C1729;
                margin-bottom: 5px;
                font-size: 18px;
            }

            .form-group input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 18px;
                transition: border-color 0.3s ease;
            }

            .form-group input:focus {
                border-color: #0264D9;
                outline: none;
            }

            /* Button Styles */
            .button {
                padding: 14px;
                background-color: #0264D9;
                color: #ffffff;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                margin: 20px 0;
                transition: background-color 0.3s ease, opacity 0.3s ease;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            }

            .button:hover {
                background-color: #004C99;
            }

            /* Image Button Styles */
            .image-button {
                position: relative;
                width: 250px;
                height: 250px;
                border: 2px solid #000000;
                border-radius: 15px;
                overflow: hidden;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                background-size: cover;
                background-position: center;
                margin-bottom: 20px;
                transition: border 0.3s ease;
            }

            .image-button:hover {
                border: 4px solid #0264D9;
            }

            .image-button .overlay {
                position: absolute;
                bottom: 0;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 15px;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
            }

            /* Back Button Styles */
            .back-button {
                background-color: #f44336;
            }

            .back-button:hover {
                background-color: #d32f2f;
            }

            /* Item List Styles */
            .item-list {
                margin-top: 30px;
                text-align: left;
            }

            .item-list h3 {
                color: #0C1729;
            }

            .item-list p {
                color: #777;
            }

            .item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                border-bottom: 1px solid #ddd;
            }

            .item img {
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 5px;
                margin-right: 10px;
            }

            .item-description {
                flex: 1;
                display: flex;
                align-items: center;
            }

            .item-description span {
                margin-left: 10px;
                font-size: 16px;
                color: #333;
            }

            .item-remove {
                background-color: #dc3545;
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                color: #ffffff;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s ease;
            }

            .item-remove:hover {
                background-color: #c82333;
            }

            /* Responsive Styles */
            @media (max-width: 768px) {
                .image-button {
                    width: 100%;
                    height: auto;
                }

                .item {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .item-remove {
                    margin-top: 10px;
                }
            }

            /* Color Selection Styles */
            .color-selection {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
                margin-bottom: 20px;
            }

            .color-square {
                width: 100px;
                height: 100px;
                border: 2px solid #ddd;
                border-radius: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                transition: border 0.3s ease;
            }

            .color-square.selected {
                border: 4px solid #0264D9;
            }

            .color-square span {
                color: #0C1729;
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                background-color: rgba(255, 255, 255, 0.7);
                padding: 5px;
                border-radius: 5px;
                position: absolute;
                bottom: 5px;
                left: 50%;
                transform: translateX(-50%);
            }

            /* Form Button Container */
            .button-group {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-bottom: 20px;
            }

            /* Fade In Animation */
            .fade-in {
                animation: fadeIn 0.5s forwards;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(styles));
        document.head.appendChild(styleElement);
    })();

    // Helper Functions
    function createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    function createImageButton(text, imageUrl) {
        const button = createElement('div', 'image-button');
        button.style.backgroundImage = `url(${imageUrl})`;

        const overlay = createElement('div', 'overlay', text);
        button.appendChild(overlay);

        return button;
    }

    function styleButton(button, additionalClasses = '') {
        button.classList.add('button');
        if (additionalClasses) {
            additionalClasses.split(' ').forEach(cls => button.classList.add(cls));
        }
    }

    function createColorSquare(colorName, hexCode) {
        const colorDiv = createElement('div', 'color-square');
        colorDiv.style.backgroundColor = hexCode;

        const label = createElement('span', null, colorName);
        colorDiv.appendChild(label);

        return colorDiv;
    }

    // Initialization Function
    function initInterface() {
        const container = createElement('div', 'container');
        document.body.innerHTML = '';
        document.body.appendChild(container);

        const header = createElement('h1', null, 'Start New Invoice');
        container.appendChild(header);

        const description = createElement('p', null, 'Please enter your contact information to proceed.');
        container.appendChild(description);

        const form = createElement('div', 'form');
        container.appendChild(form);

        // Name Input
        const nameInput = createInputField('Name', 'text');
        form.appendChild(nameInput);

        // Phone Input
        const phoneInput = createInputField('Phone Number', 'tel');
        form.appendChild(phoneInput);

        // Email Input
        const emailInput = createInputField('Email', 'email');
        form.appendChild(emailInput);

        // Zip Code Input
        const zipCodeInput = createInputField('Zip Code', 'text');
        form.appendChild(zipCodeInput);

        // Continue Button
        const continueBtn = createElement('button', 'button', 'Continue');
        form.appendChild(continueBtn);

        continueBtn.addEventListener('click', () => {
            // Retrieve user input values
            userInfo.name = nameInput.querySelector('input').value.trim();
            userInfo.phone = phoneInput.querySelector('input').value.trim();
            userInfo.email = emailInput.querySelector('input').value.trim();
            userInfo.zipCode = zipCodeInput.querySelector('input').value.trim();

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
        const formGroup = createElement('div', 'form-group');

        const label = createElement('label', null, labelText);
        formGroup.appendChild(label);

        const input = createElement('input');
        input.type = type;
        formGroup.appendChild(input);

        return formGroup;
    }

    // Navigation Functions
 function navigateToSelectionPage(container) {
    container.innerHTML = ''; // Clear the container

    const header = document.createElement('h2');
    header.textContent = 'Choose Type of Countertop';
    container.appendChild(header);

    const typeContainer = document.createElement('div');
    typeContainer.classList.add('image-container'); // Use global CSS for image container
    container.appendChild(typeContainer);

    // Kitchen and Bathroom buttons with their respective images
    const kitchenBtn = createImageButton('Kitchen', 'https://i.ibb.co/wWHG4XN/1.png');
    const bathroomBtn = createImageButton('Bathroom', 'https://i.ibb.co/xm8PmSF/2.png');
    typeContainer.appendChild(kitchenBtn);
    typeContainer.appendChild(bathroomBtn);

    kitchenBtn.addEventListener('click', function () {
        selectKitchenType(container);
    });

    bathroomBtn.addEventListener('click', function () {
        selectBathroomType(container);
    });

    // Back button to return to the previous page
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    styleButton(backButton);
    backButton.addEventListener('click', function () {
        if (previousPage) {
            previousPage(container);
        }
    });
    container.appendChild(backButton);
}


    // Shape Selection Functions
    function selectKitchenType(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Choose Kitchen Counter Shape');
        container.appendChild(header);

        const kitchenOptions = createElement('div', 'button-group');
        container.appendChild(kitchenOptions);

        const shapes = getShapesForType('Kitchen');
        shapes.forEach(shape => {
            const shapeBtn = createImageButton(shape.name, shape.imageUrl);
            kitchenOptions.appendChild(shapeBtn);

            shapeBtn.addEventListener('click', () => {
                previousPage = selectKitchenType;
                startShapeConfiguration(shape, 'Kitchen', container);
            });
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            navigateToSelectionPage(container);
        });
    }

    function selectBathroomType(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Choose Bathroom Counter Shape');
        container.appendChild(header);

        const bathroomOptions = createElement('div', 'button-group');
        container.appendChild(bathroomOptions);

        const shapes = getShapesForType('Bathroom');
        shapes.forEach(shape => {
            const shapeBtn = createImageButton(shape.name, shape.imageUrl);
            bathroomOptions.appendChild(shapeBtn);

            shapeBtn.addEventListener('click', () => {
                previousPage = selectBathroomType;
                startShapeConfiguration(shape, 'Bathroom', container);
            });
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            navigateToSelectionPage(container);
        });
    }

    function selectBarTopType(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Choose Bar Top Shape');
        container.appendChild(header);

        const barTopOptions = createElement('div', 'button-group');
        container.appendChild(barTopOptions);

        const shapes = getShapesForType('Bar Top');
        shapes.forEach(shape => {
            const shapeBtn = createImageButton(shape.name, shape.imageUrl);
            barTopOptions.appendChild(shapeBtn);

            shapeBtn.addEventListener('click', () => {
                previousPage = selectBarTopType;
                startShapeConfiguration(shape, 'Bar Top', container);
            });
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            navigateToSelectionPage(container);
        });
    }

    function selectIslandType(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Choose Island Shape');
        container.appendChild(header);

        const islandOptions = createElement('div', 'button-group');
        container.appendChild(islandOptions);

        const shapes = getShapesForType('Island');
        shapes.forEach(shape => {
            const shapeBtn = createImageButton(shape.name, shape.imageUrl);
            islandOptions.appendChild(shapeBtn);

            shapeBtn.addEventListener('click', () => {
                previousPage = selectIslandType;
                startShapeConfiguration(shape, 'Island', container);
            });
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            navigateToSelectionPage(container);
        });
    }

    // Shape Configuration Function
    function startShapeConfiguration(shape, type, container) {
        let shapeData = {
            hasBacksplash: false,
            backsplashWidth: 0,
            backsplashHeight: 0,
            measurements: [],
            finishType: '',
            pattern: '',
            baseColor: '',
            mixInColors: [],
            addonColors: []
        };

        // Skip backsplash for Island
        if (type === 'Island') {
            promptMeasurements(shape, type, container, shapeData, () => {
                promptFinishType(shape, type, container, shapeData);
            });
        } else {
            promptBacksplash(shape, type, container, shapeData, () => {
                promptMeasurements(shape, type, container, shapeData, () => {
                    promptFinishType(shape, type, container, shapeData);
                });
            });
        }
    }

  function promptBacksplash(shape, type, container, shapeData) {
    container.innerHTML = ''; // Clear the container

    const header = document.createElement('h2');
    header.textContent = 'Does this countertop have a backsplash?';
    container.appendChild(header);

    // Add an image representing backsplash
    const backsplashImage = document.createElement('img');
    backsplashImage.src = 'https://i.ibb.co/C9t7rzy/backsplash-image.png';  // Replace with the correct image URL
    backsplashImage.alt = 'Backsplash Example';
    backsplashImage.style.width = '100%';  // Make it responsive
    container.appendChild(backsplashImage);

    const description = document.createElement('p');
    description.textContent = 'A backsplash is an extension of the countertop surface that covers the wall behind the countertop.';
    container.appendChild(description);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    container.appendChild(buttonContainer);

    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Yes';
    styleButton(yesBtn);
    buttonContainer.appendChild(yesBtn);

    const noBtn = document.createElement('button');
    noBtn.textContent = 'No';
    styleButton(noBtn);
    buttonContainer.appendChild(noBtn);

    yesBtn.addEventListener('click', function () {
        shapeData.hasBacksplash = true;
        promptBacksplashDimensions(container, shapeData, function () {
            promptMeasurements(shape, type, container, shapeData);
        });
    });

    noBtn.addEventListener('click', function () {
        shapeData.hasBacksplash = false;
        promptMeasurements(shape, type, container, shapeData);
    });
}

    // Backsplash Dimensions Prompt
    function promptBacksplashDimensions(container, shapeData, callback) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Enter Backsplash Dimensions (in inches)');
        container.appendChild(header);

        const form = createElement('div', 'form');
        container.appendChild(form);

        // Width Input
        const widthInput = createElement('div', 'form-group');
        const widthLabel = createElement('label', null, 'Backsplash Width:');
        const widthField = createElement('input');
        widthField.type = 'number';
        widthField.min = '0';
        widthInput.appendChild(widthLabel);
        widthInput.appendChild(widthField);
        form.appendChild(widthInput);

        // Height Input
        const heightInput = createElement('div', 'form-group');
        const heightLabel = createElement('label', null, 'Backsplash Height:');
        const heightField = createElement('input');
        heightField.type = 'number';
        heightField.min = '0';
        heightInput.appendChild(heightLabel);
        heightInput.appendChild(heightField);
        form.appendChild(heightInput);

        // Next Button
        const nextBtn = createElement('button', 'button', 'Next');
        form.appendChild(nextBtn);

        nextBtn.addEventListener('click', () => {
            const width = parseFloat(widthField.value);
            const height = parseFloat(heightField.value);
            if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0) {
                alert('Please enter valid width and height.');
                return;
            }
            shapeData.backsplashWidth = width;
            shapeData.backsplashHeight = height;
            callback();
        });
    }

    // Measurements Prompt
    function promptMeasurements(shape, type, container, shapeData) {
    container.innerHTML = ''; // Clear the container

    const header = document.createElement('h2');
    header.textContent = 'Enter Measurements (in inches)';
    container.appendChild(header);

    // Add the shape image to the measurements screen
    const shapeImage = document.createElement('img');
    shapeImage.src = shape.imageUrl;
    shapeImage.alt = `${shape.name} Shape`;
    shapeImage.style.width = '100%';
    shapeImage.style.height = 'auto';
    shapeImage.style.marginBottom = '20px';
    container.appendChild(shapeImage);

    const formDiv = document.createElement('div');
    formDiv.classList.add('form-container');  // Use global styles for form layout
    container.appendChild(formDiv);

    const measurementInputs = [];
    shape.measurements.forEach((measurement, index) => {
        const label = document.createElement('label');
        label.textContent = `Measurement ${index + 1}:`;
        formDiv.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Measurement for side ${index + 1} (in inches)`;
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
    container.innerHTML = ''; // Clear the container

    const header = document.createElement('h2');
    header.textContent = 'Select Finish Type';
    container.appendChild(header);

    const finishContainer = document.createElement('div');
    finishContainer.classList.add('image-container'); // Global styles for image container
    container.appendChild(finishContainer);

    const finishes = [
        {
            name: 'CrystalTop Finish',
            imageUrl: 'https://i.ibb.co/vH56T17/Pour-Swirl2-min.jpg',  // Image for CrystalTop
            value: 'crystal'
        },
        {
            name: 'Standard Finish',
            imageUrl: 'https://i.ibb.co/TcYP1FN/Marble-1-min.jpg',  // Image for Standard Finish
            value: 'standard'
        }
    ];

    let selectedFinishType = null;

    finishes.forEach(finish => {
        const finishDiv = createImageButton(finish.name, finish.imageUrl);
        finishContainer.appendChild(finishDiv);

        finishDiv.addEventListener('click', function () {
            selectedFinishType = finish.value;
            // Update UI to reflect selection
            Array.from(finishContainer.children).forEach(child => {
                child.style.border = '2px solid #ddd';
            });
            finishDiv.style.border = '4px solid #0264D9';
        });
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

function promptFinishOptions(shape, type, container, shapeData) {
    container.innerHTML = ''; // Clear the container
    
    // Header for base color selection
    const baseColorLabel = document.createElement('h3');
    baseColorLabel.textContent = 'Choose Base Color';
    container.appendChild(baseColorLabel);

    const baseColorContainer = document.createElement('div');
    baseColorContainer.classList.add('color-container'); // Global styles for color container
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

    // Base Color Selection - User can choose only one
    Object.entries(baseColors).forEach(([colorName, hexCode]) => {
        const colorDiv = createColorSquare(colorName, hexCode); // Create color square buttons
        colorDiv.element.addEventListener('click', function () {
            if (selectedBaseColor) {
                selectedBaseColor.element.style.border = '2px solid #ddd';  // Reset previously selected color
            }
            selectedBaseColor = colorDiv;  // Set the new base color
            colorDiv.element.style.border = '4px solid #0264D9';  // Highlight selected color
        });
        baseColorContainer.appendChild(colorDiv.element);
    });

    // Add-on Colors Selection (User can select up to 4)
    const addonColorLabel = document.createElement('h3');
    addonColorLabel.textContent = 'Choose up to 4 Add-on Colors';
    container.appendChild(addonColorLabel);

    const addonColorContainer = document.createElement('div');
    addonColorContainer.classList.add('color-container');
    container.appendChild(addonColorContainer);

    const addonColors = Object.assign({}, baseColors, {
        'Icy White': '#F8F8FF',
        'Silver': '#C0C0C0',
        'Champagne Gold': '#F7E7CE',
        'Bronze': '#CD7F32',
        'Cobalt Blue': '#0047AB',
        'Pewter Blue': '#8BA8B7',
        'Copper': '#B87333'
    });

    const selectedAddonColors = [];

    // Add-on color selection logic, allowing up to 4
    Object.entries(addonColors).forEach(([colorName, hexCode]) => {
        const colorDiv = createColorSquare(colorName, hexCode);
        let selected = false;

        colorDiv.element.addEventListener('click', function () {
            if (selected) {
                // Deselect color
                selected = false;
                colorDiv.element.style.border = '2px solid #ddd';
                const index = selectedAddonColors.indexOf(colorName);
                if (index > -1) selectedAddonColors.splice(index, 1);
            } else if (selectedAddonColors.length < 4) {
                // Select color (limit to 4)
                selected = true;
                colorDiv.element.style.border = '4px solid #0264D9';
                selectedAddonColors.push(colorName);
            }
        });

        addonColorContainer.appendChild(colorDiv.element);
    });

    // Image selection for CrystalTop Finish
    if (shapeData.finishType === 'crystal') {
        const header = document.createElement('h3');
        header.textContent = 'Choose Your Crystal Top Finish';
        container.appendChild(header);

        const patternContainer = document.createElement('div');
        patternContainer.classList.add('image-container');
        container.appendChild(patternContainer);

        const crystalPatterns = [
            {
                name: 'Pour Swirl',
                imageUrl: 'https://i.ibb.co/vH56T17/Pour-Swirl2-min.jpg',
            },
            {
                name: 'Directional Pour',
                imageUrl: 'https://i.ibb.co/K21MDPq/Pour-Directional-2.jpg',
            }
        ];

        let selectedCrystalPattern = null;

        crystalPatterns.forEach(pattern => {
            const patternDiv = createImageButton(pattern.name, pattern.imageUrl);
            patternContainer.appendChild(patternDiv);

            patternDiv.addEventListener('click', function () {
                selectedCrystalPattern = pattern.name;
                // Visual feedback for selection
                Array.from(patternContainer.children).forEach(child => {
                    child.style.border = '2px solid #ddd';
                });
                patternDiv.style.border = '4px solid #0264D9';
            });
        });

        // Button to proceed after selections
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Add Item';
        styleButton(nextBtn);
        container.appendChild(nextBtn);

        nextBtn.addEventListener('click', function () {
            if (!selectedCrystalPattern || !selectedBaseColor || selectedAddonColors.length === 0) {
                alert('Please select a finish pattern, base color, and mix-in colors.');
                return;
            }
            shapeData.pattern = selectedCrystalPattern;
            shapeData.baseColor = selectedBaseColor.colorName;
            shapeData.mixInColors = selectedAddonColors;

            // If the countertop has a backsplash, prompt for dimensions
            if (shapeData.hasBacksplash) {
                promptBacksplashDimensions(container, shapeData, function () {
                    calculateAndAddItem(shape, shapeData, type, container);
                });
            } else {
                calculateAndAddItem(shape, shapeData, type, container);
            }
        });
    }

    // Standard Finish options
    if (shapeData.finishType === 'standard') {
        const header = document.createElement('h3');
        header.textContent = 'Choose Your Standard Finish Pattern';
        container.appendChild(header);

        const patternContainer = document.createElement('div');
        patternContainer.classList.add('image-container');
        container.appendChild(patternContainer);

        const standardPatterns = [
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

        standardPatterns.forEach(pattern => {
            const patternDiv = createImageButton(pattern.name, pattern.imageUrl);
            patternContainer.appendChild(patternDiv);

            patternDiv.addEventListener('click', function () {
                selectedPattern = pattern.name;
                // Visual feedback for selection
                Array.from(patternContainer.children).forEach(child => {
                    child.style.border = '2px solid #ddd';
                });
                patternDiv.style.border = '4px solid #0264D9';
            });
        });

        // Button to proceed after selections
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
            shapeData.baseColor = selectedBaseColor.colorName;
            shapeData.addonColors = selectedAddonColors;

            // If the countertop has a backsplash, prompt for dimensions
            if (shapeData.hasBacksplash) {
                promptBacksplashDimensions(container, shapeData, function () {
                    calculateAndAddItem(shape, shapeData, type, container);
                });
            } else {
                calculateAndAddItem(shape, shapeData, type, container);
            }
        });
    }
}


        // Add Item Button
        const addItemBtn = createElement('button', 'button', 'Add Item');
        container.appendChild(addItemBtn);

        addItemBtn.addEventListener('click', () => {
            if (!selectedPattern) {
                alert('Please select a crystal pattern.');
                return;
            }
            if (!shapeData.baseColor) {
                alert('Please select a base color.');
                return;
            }
            if (shapeData.mixInColors.length === 0) {
                alert('Please select at least one mix-in color.');
                return;
            }

            shapeData.pattern = selectedPattern;

            // Calculate and add item
            calculateAndAddItem(shape, shapeData, type, container);
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            previousPage(container);
        });
    

    // Regular Finish Prompt
    function promptRegularFinish(shape, type, container, shapeData) {
        const header = createElement('h2', null, 'Select Pattern and Colors for Regular Finish');
        container.appendChild(header);

        const patternLabel = createElement('h3', null, 'Select Pattern:');
        container.appendChild(patternLabel);

        const patternContainer = createElement('div', 'button-group');
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

        let selectedPattern = '';

        patterns.forEach(pattern => {
            const patternBtn = createImageButton(pattern.name, pattern.imageUrl);
            patternContainer.appendChild(patternBtn);

            patternBtn.addEventListener('click', () => {
                selectedPattern = pattern.name;
                Array.from(patternContainer.children).forEach(child => {
                    child.classList.remove('selected');
                });
                patternBtn.classList.add('selected');
            });
        });

        // Base Color Selection
        const baseColorLabel = createElement('h3', null, 'Choose a Base Color:');
        container.appendChild(baseColorLabel);

        const baseColorContainer = createElement('div', 'color-selection');
        container.appendChild(baseColorContainer);

        Object.entries(baseColors).forEach(([colorName, hexCode]) => {
            const colorSquare = createColorSquare(colorName, hexCode);
            baseColorContainer.appendChild(colorSquare);

            colorSquare.addEventListener('click', () => {
                colorSquare.classList.toggle('selected');
                if (colorSquare.classList.contains('selected')) {
                    shapeData.baseColor = colorName;
                } else {
                    shapeData.baseColor = '';
                }
            });
        });

        // Add-on Colors
        const addonLabel = createElement('h3', null, 'Choose up to 3 Add-on Colors:');
        container.appendChild(addonLabel);

        const addonContainer = createElement('div', 'color-selection');
        container.appendChild(addonContainer);

        const addonColors = Object.assign({}, baseColors, {
            'Icy White': '#F8F8FF',
            'Silver': '#C0C0C0',
            'Champagne Gold': '#F7E7CE',
            'Bronze': '#CD7F32',
            'Cobalt Blue': '#0047AB',
            'Pewter Blue': '#8BA8B7',
            'Copper': '#B87333'
        });

        const selectedAddons = [];

        Object.entries(addonColors).forEach(([colorName, hexCode]) => {
            const colorSquare = createColorSquare(colorName, hexCode);
            addonContainer.appendChild(colorSquare);

            colorSquare.addEventListener('click', () => {
                if (colorSquare.classList.contains('selected')) {
                    colorSquare.classList.remove('selected');
                    const index = selectedAddons.indexOf(colorName);
                    if (index > -1) selectedAddons.splice(index, 1);
                } else if (selectedAddons.length < 3) {
                    colorSquare.classList.add('selected');
                    selectedAddons.push(colorName);
                }
                shapeData.addonColors = selectedAddons;
            });
        });

        // Add Item Button
        const addItemBtn = createElement('button', 'button', 'Add Item');
        container.appendChild(addItemBtn);

        addItemBtn.addEventListener('click', () => {
            if (!selectedPattern) {
                alert('Please select a pattern.');
                return;
            }
            if (!shapeData.baseColor) {
                alert('Please select a base color.');
                return;
            }
            if (shapeData.addonColors.length === 0) {
                alert('Please select at least one add-on color.');
                return;
            }

            shapeData.pattern = selectedPattern;

            // Calculate and add item
            calculateAndAddItem(shape, shapeData, type, container);
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            previousPage(container);
        });
    }

    // Calculate and Add Item to Invoice
    function calculateAndAddItem(shape, shapeData, type, container) {
        const measurements = shapeData.measurements;

        // Determine depth
        const depth = ['Kitchen', 'Island', 'Bar Top', 'Regular Counter'].includes(type) ? 25 : 22;
        let squareFootage = shape.formula(measurements, depth);

        // Add backsplash area if applicable
        if (shapeData.hasBacksplash) {
            const backsplashArea = (shapeData.backsplashWidth / 12) * (shapeData.backsplashHeight / 12);
            squareFootage += backsplashArea;
        }

        // Determine price per sq ft
        let pricePerSqFt = shapeData.finishType === 'crystal' ? PRICE_CRYSTAL : PRICE_REGULAR;

        // Calculate cost
        const cost = squareFootage * pricePerSqFt;

        // Add to items
        items.push({
            description: `${shape.name} - ${type} - ${shapeData.finishType.charAt(0).toUpperCase() + shapeData.finishType.slice(1)}`,
            imageUrl: shape.imageUrl,
            squareFootage: squareFootage.toFixed(2),
            cost: cost.toFixed(2)
        });

        // Update total cost
        totalCost += parseFloat(cost);

        // Redirect back to the invoice page and show the updated item list
        createInvoicePage(container);
    }

  function createInvoicePage(container) {
    container = container || document.querySelector('.container') || document.body;
    container.innerHTML = '';

    const header = createElement('h2', null, 'Current Invoice');
    container.appendChild(header);

    // Add New Item Button
    const addItemBtn = createElement('button', 'button', 'Add New Item');
    container.appendChild(addItemBtn);

    addItemBtn.addEventListener('click', () => {
        previousPage = createInvoicePage;
        navigateToSelectionPage(container); // Make sure container is defined here
    });

    // Item List
    const itemListDiv = createElement('div', 'item-list');
    container.appendChild(itemListDiv);
    updateItemList(itemListDiv);

    // Finalize Invoice Button
    const finalizeBtn = createElement('button', 'button', 'Finalize Invoice');
    finalizeBtn.style.marginTop = '30px';
    container.appendChild(finalizeBtn);

    finalizeBtn.addEventListener('click', () => {
        finalizeInvoice(container);
    });
}


        // Item List
        const itemListDiv = createElement('div', 'item-list');
        container.appendChild(itemListDiv);
        updateItemList(itemListDiv);

        // Finalize Invoice Button
        const finalizeBtn = createElement('button', 'button', 'Finalize Invoice');
        finalizeBtn.style.marginTop = '30px';
        container.appendChild(finalizeBtn);

        finalizeBtn.addEventListener('click', () => {
            finalizeInvoice(container);
        });
    }

    // Update Item List UI
    function updateItemList(itemListDiv) {
        itemListDiv.innerHTML = '<h3>Items:</h3>';

        if (items.length === 0) {
            const noItems = createElement('p', null, 'No items added yet.');
            itemListDiv.appendChild(noItems);
            return;
        }

        items.forEach((item, index) => {
            const itemDiv = createElement('div', 'item');

            const descDiv = createElement('div', 'item-description');
            const img = createElement('img');
            img.src = item.imageUrl;
            img.alt = item.description;
            descDiv.appendChild(img);

            const descText = createElement('span', null, `${item.description} - ${item.squareFootage} sq ft`);
            descDiv.appendChild(descText);

            const costSpan = createElement('span', null, `$${item.cost}`);
            descDiv.appendChild(costSpan);

            const removeBtn = createElement('button', 'item-remove', 'Remove');
            removeBtn.addEventListener('click', () => {
                removeItem(index);
            });

            itemDiv.appendChild(descDiv);
            itemDiv.appendChild(removeBtn);

            itemListDiv.appendChild(itemDiv);
        });
    }

    // Remove Item from Invoice
    function removeItem(index) {
        totalCost -= parseFloat(items[index].cost);
        items.splice(index, 1);
        const itemListDiv = document.querySelector('.item-list');
        updateItemList(itemListDiv);
    }

    // Finalize Invoice
    function finalizeInvoice(container) {
        if (totalCost < MINIMUM_PRICE) {
            totalCost = MINIMUM_PRICE;
        }

        alert(`Finalized Invoice Total: $${totalCost.toFixed(2)}`);
        items = [];
        totalCost = 0;
        createInvoicePage(container);
    }

    // Get Shapes Based on Type
    function getShapesForType(type) {
        const shapes = [];

        const shapeData = {
            'Kitchen': [
                {
                    name: 'Island',
                    type: 'Kitchen',
                    measurements: ['Length', 'Width'],
                    formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144,
                    imageUrl: 'https://i.ibb.co/Hrr8ztS/Pour-Directional.png'
                },
                {
                    name: 'Regular Counter',
                    type: 'Kitchen',
                    measurements: ['Length', 'Width'],
                    formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144,
                    imageUrl: 'https://i.ibb.co/gw8Bxw2/counter.png'
                },
                {
                    name: 'Bar Top',
                    type: 'Kitchen',
                    measurements: ['Length', 'Width'],
                    formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144,
                    imageUrl: 'https://i.ibb.co/yS5gzGd/Marble-2.png'
                }
            ],
            'Bathroom': [
                {
                    name: 'Rectangle',
                    type: 'Bathroom',
                    measurements: ['Length', 'Width'],
                    formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144,
                    imageUrl: 'https://i.ibb.co/KmS1PKB/recbath.png'
                },
                {
                    name: 'Square',
                    type: 'Bathroom',
                    measurements: ['Side'],
                    formula: (measurements, depth) => (measurements[0] * depth) / 144,
                    imageUrl: 'https://i.ibb.co/1qLTRBc/bathsqaure.png'
                },
                {
                    name: 'Hexagonal',
                    type: 'Bathroom',
                    measurements: ['Side Length'],
                    formula: (measurements, depth) => (1.5 * Math.sqrt(3) * Math.pow(measurements[0], 2) * depth) / 144,
                    imageUrl: 'https://i.ibb.co/ScsL4gN/IN.png'
                }
            ],
            'Bar Top': [
                {
                    name: '2 Sides',
                    type: 'Bar Top',
                    measurements: ['Length', 'Width'],
                    formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144,
                    imageUrl: 'https://i.ibb.co/4PNXrnc/1.png'
                },
                {
                    name: '3 Sides',
                    type: 'Bar Top',
                    measurements: ['Side 1', 'Side 2', 'Side 3'],
                    formula: (measurements, depth) => (measurements.reduce((acc, cur) => acc + cur, 0) * depth) / 144,
                    imageUrl: 'https://i.ibb.co/bmV9twv/2.png'
                },
                // Add more Bar Top shapes as needed
            ],
            'Island': [
                {
                    name: '1 Side',
                    type: 'Island',
                    measurements: ['Radius'],
                    formula: (measurements, depth) => (Math.PI * Math.pow(measurements[0], 2) * depth) / 144,
                    imageUrl: 'https://i.ibb.co/2WfRSkn/islandsquare.png'
                },
                {
                    name: '5 Sides',
                    type: 'Island',
                    measurements: ['Side 1', 'Side 2', 'Side 3', 'Side 4', 'Side 5'],
                    formula: (measurements, depth) => (measurements.reduce((acc, cur) => acc + cur, 0) * depth) / 144,
                    imageUrl: 'https://i.ibb.co/M6dqLGH/islandlong.png'
                }
            ]
        };

        return shapeData[type] || [];
    }

    // Finalize the Interface
    initInterface();
})();
