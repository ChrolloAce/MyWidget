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

   function navigateToSelectionPage(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Choose Type of Countertop');
    container.appendChild(header);

    const typeContainer = createElement('div', 'button-group');
    container.appendChild(typeContainer);

    // Kitchen Button with Image
    const kitchenBtn = createImageButton('Kitchen', 'https://i.ibb.co/CwwQ0Gd/1.png'); // Replace with your kitchen image URL
    typeContainer.appendChild(kitchenBtn);

    // Bathroom Button with Image
    const bathroomBtn = createImageButton('Bathroom', 'https://i.ibb.co/RPJgsCB/2.png'); // Replace with your bathroom image URL
    typeContainer.appendChild(bathroomBtn);

    // Back Button (if exists)
    if (previousPage) {
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            previousPage(container);
        });
    }

    // Event Listeners
    kitchenBtn.addEventListener('click', () => {
        previousPage = navigateToSelectionPage;
        selectKitchenType(container);
    });

    bathroomBtn.addEventListener('click', () => {
        previousPage = navigateToSelectionPage;
        selectBathroomType(container);
    });
}



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

    // Only prompt backsplash for Regular Counter shapes
    if (shape.name === 'Regular Counter' || shape.name === 'Rectangle') {
        promptBacksplash(shape, type, container, shapeData, () => {
            promptMeasurements(shape, type, container, shapeData, () => {
                promptFinishType(shape, type, container, shapeData);
            });
        });
    } else {
        promptMeasurements(shape, type, container, shapeData, () => {
            promptFinishType(shape, type, container, shapeData);
        });
    }
}

function promptBacksplash(shape, type, container, shapeData, callback) {
    container.innerHTML = '';

    const question = 'Does this countertop have a backsplash?';

    const header = createElement('h2', null, question);
    container.appendChild(header);

    // Add backsplash image
    const imageDiv = createElement('div', 'image-container');
    const backsplashImage = createElement('img');
    backsplashImage.src = 'https://i.ibb.co/jy18LMM/Backsplash.png'; // Use your provided backsplash image URL
    backsplashImage.alt = 'Backsplash Example';
    imageDiv.appendChild(backsplashImage);
    container.appendChild(imageDiv);

    // Add description
    const description = createElement('p', null, 'A backsplash is a vertical extension to a counter which protects the wall from splashes.');
    container.appendChild(description);

    const buttonGroup = createElement('div', 'button-group');
    container.appendChild(buttonGroup);

    const yesBtn = createElement('button', 'button', 'Yes');
    const noBtn = createElement('button', 'button', 'No');

    buttonGroup.appendChild(yesBtn);
    buttonGroup.appendChild(noBtn);

    yesBtn.addEventListener('click', () => {
        shapeData.hasBacksplash = true;
        promptBacksplashDimensions(container, shapeData, () => {
            callback();
        });
    });

    noBtn.addEventListener('click', () => {
        shapeData.hasBacksplash = false;
        callback();
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

    function promptMeasurements(shape, type, container, shapeData, callback) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Enter Measurements (in inches)');
    container.appendChild(header);

    // Display the shape image
    const imageDiv = createElement('div', 'image-container');
    const shapeImage = createElement('img');
    shapeImage.src = shape.imageUrl; // Use the image URL from the selected shape
    shapeImage.alt = shape.name;
    shapeImage.classList.add('shape-image');
    imageDiv.appendChild(shapeImage);
    container.appendChild(imageDiv);

    const form = createElement('div', 'form');
    container.appendChild(form);

    const measurementInputs = [];
    shape.measurements.forEach((label, index) => {
        const formGroup = createElement('div', 'form-group');
        const inputLabel = createElement('label', null, `${label}:`);
        const inputField = createElement('input');
        inputField.type = 'number';
        inputField.min = '0';
        formGroup.appendChild(inputLabel);
        formGroup.appendChild(inputField);
        form.appendChild(formGroup);
        measurementInputs.push(inputField);
    });

    const nextBtn = createElement('button', 'button', 'Next');
    form.appendChild(nextBtn);

    nextBtn.addEventListener('click', () => {
        const measurements = measurementInputs.map(input => parseFloat(input.value));
        if (measurements.some(value => isNaN(value) || value <= 0)) {
            alert('Please enter valid measurements.');
            return;
        }
        shapeData.measurements = measurements;
        callback();
    });
}



    // Finish Type Prompt
    function promptFinishType(shape, type, container, shapeData) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Select Finish Type');
        container.appendChild(header);

        const buttonGroup = createElement('div', 'button-group');
        container.appendChild(buttonGroup);

        const regularBtn = createElement('button', 'button', 'Regular Finish');
        const crystalBtn = createElement('button', 'button', 'Crystal Top Finish');

        buttonGroup.appendChild(regularBtn);
        buttonGroup.appendChild(crystalBtn);

        regularBtn.addEventListener('click', () => {
            shapeData.finishType = 'regular';
            promptFinishOptions(shape, type, container, shapeData);
        });

        crystalBtn.addEventListener('click', () => {
            shapeData.finishType = 'crystal';
            promptFinishOptions(shape, type, container, shapeData);
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            previousPage(container);
        });
    }

    // Finish Options Prompt
    function promptFinishOptions(shape, type, container, shapeData) {
        container.innerHTML = '';

        if (shapeData.finishType === 'crystal') {
            promptCrystalFinish(shape, type, container, shapeData);
        } else if (shapeData.finishType === 'regular') {
            promptRegularFinish(shape, type, container, shapeData);
        }
    }

    function promptCrystalFinish(shape, type, container, shapeData) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Choose Your Crystal Top Finish');
    container.appendChild(header);

    // Pattern Selection with Images
    const patternContainer = createElement('div', 'button-group');
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

    let selectedPattern = '';

    crystalPatterns.forEach(pattern => {
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

    // Base Color Selection (Single Selection)
    const baseColorLabel = createElement('h3', null, 'Choose a Base Color for Crystal Top:');
    container.appendChild(baseColorLabel);

    const baseColorContainer = createElement('div', 'color-selection');
    container.appendChild(baseColorContainer);

    Object.entries(baseColors).forEach(([colorName, hexCode]) => {
        const colorSquare = createColorSquare(colorName, hexCode);
        baseColorContainer.appendChild(colorSquare);

        colorSquare.addEventListener('click', () => {
            Array.from(baseColorContainer.children).forEach(child => {
                child.classList.remove('selected');
            });
            colorSquare.classList.add('selected');
            shapeData.baseColor = colorName;
        });
    });

    // Mix-in Colors (Multiple Selection up to 4)
    const mixInLabel = createElement('h3', null, 'Choose up to 4 Mix-in Colors:');
    container.appendChild(mixInLabel);

    const mixInContainer = createElement('div', 'color-selection');
    container.appendChild(mixInContainer);

    const mixInColors = Object.assign({}, baseColors, {
        'Icy White': '#F8F8FF',
        'Silver': '#C0C0C0',
        'Champagne Gold': '#F7E7CE',
        'Bronze': '#CD7F32',
        'Cobalt Blue': '#0047AB',
        'Pewter Blue': '#8BA8B7',
        'Copper': '#B87333'
    });

    const selectedMixIn = [];

    Object.entries(mixInColors).forEach(([colorName, hexCode]) => {
        const colorSquare = createColorSquare(colorName, hexCode);
        mixInContainer.appendChild(colorSquare);

        colorSquare.addEventListener('click', () => {
            if (colorSquare.classList.contains('selected')) {
                colorSquare.classList.remove('selected');
                const index = selectedMixIn.indexOf(colorName);
                if (index > -1) selectedMixIn.splice(index, 1);
            } else if (selectedMixIn.length < 4) {
                colorSquare.classList.add('selected');
                selectedMixIn.push(colorName);
            } else {
                alert('You can select up to 4 mix-in colors.');
            }
            shapeData.mixInColors = selectedMixIn;
        });
    });

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
}

  function promptRegularFinish(shape, type, container, shapeData) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Select Pattern and Colors for Regular Finish');
    container.appendChild(header);

    // Pattern Selection with Images
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

    // Base Color Selection (Single Selection)
    const baseColorLabel = createElement('h3', null, 'Choose a Base Color:');
    container.appendChild(baseColorLabel);

    const baseColorContainer = createElement('div', 'color-selection');
    container.appendChild(baseColorContainer);

    Object.entries(baseColors).forEach(([colorName, hexCode]) => {
        const colorSquare = createColorSquare(colorName, hexCode);
        baseColorContainer.appendChild(colorSquare);

        colorSquare.addEventListener('click', () => {
            Array.from(baseColorContainer.children).forEach(child => {
                child.classList.remove('selected');
            });
            colorSquare.classList.add('selected');
            shapeData.baseColor = colorName;
        });
    });

    // Add-on Colors (Multiple Selection up to 3)
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
            } else {
                alert('You can select up to 3 add-on colors.');
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

    // Create Invoice Page
    function createInvoicePage(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Current Invoice');
        container.appendChild(header);

        // Add New Item Button
        const addItemBtn = createElement('button', 'button', 'Add New Item');
        container.appendChild(addItemBtn);

        addItemBtn.addEventListener('click', () => {
            previousPage = createInvoicePage;
            navigateToSelectionPage(container);
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
function getShapesForType(type) {
    const shapes = [];

    const shapeData = {
        'Kitchen': [
            {
                name: 'Regular Counter',
                type: 'Kitchen',
                measurements: ['Length', 'Width'],
                formula: (measurements) => (measurements[0] * measurements[1]) / 144,
                imageUrl: 'https://i.ibb.co/gw8Bxw2/counter.png' // Replace with your Regular Counter image URL
            },
            {
                name: 'Island',
                type: 'Kitchen',
                measurements: ['Length', 'Width'],
                formula: (measurements) => (measurements[0] * measurements[1]) / 144,
                imageUrl: 'https://i.ibb.co/2WfRSkn/islandsquare.png' // Replace with your Island image URL
            },
            {
                name: 'Bar Top',
                type: 'Kitchen',
                measurements: ['Length', 'Width'],
                formula: (measurements) => (measurements[0] * measurements[1]) / 144,
                imageUrl: 'https://i.ibb.co/4PNXrnc/1.png' // Replace with your Bar Top image URL
            }
        ],
        'Bathroom': [
            {
                name: 'Rectangle',
                type: 'Bathroom',
                measurements: ['Length', 'Width'],
                formula: (measurements) => (measurements[0] * measurements[1]) / 144,
                imageUrl: 'https://i.ibb.co/KmS1PKB/recbath.png' // Replace with your Rectangle image URL
            },
            {
                name: 'Square',
                type: 'Bathroom',
                measurements: ['Side'],
                formula: (measurements) => (Math.pow(measurements[0], 2)) / 144,
                imageUrl: 'https://i.ibb.co/1qLTRBc/bathsqaure.png' // Replace with your Square image URL
            },
            {
                name: 'Hexagonal',
                type: 'Bathroom',
                measurements: ['Side Length'],
                formula: (measurements) => (1.5 * Math.sqrt(3) * Math.pow(measurements[0], 2)) / 144,
                imageUrl: 'https://i.ibb.co/ScsL4gN/IN.png' // Replace with your Hexagonal image URL
            }
        ]
    };

    return shapeData[type] || [];
}


    // Finalize the Interface
    initInterface();
})();
