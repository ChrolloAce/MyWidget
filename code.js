(function () {
    // Constants and Configuration
    const PRICE_REGULAR = 26;
    const PRICE_CRYSTAL = 39;
    const MINIMUM_PRICE = 400;

    let items = [];
    let totalCost = 0;
    let previousPage = null;
    let userInfo = {};

    let designSelections = {
        type: '',         // 'Kitchen' or 'Bathroom'
        finishType: '',   // 'crystal' or 'standard'
        material: '',     // e.g., 'Quartz', 'Granite', etc.
        baseColor: '',
        mixInColors: []
    };

    const baseColors = {
        'White': '#FFFFFF',
        'Black': '#000000',
        'Tornado Gray': '#4F4F4F',
        'Charcoal Gray': '#2E2E2E',
        'Toasted Almond': '#D2B48C',
        'Milk Chocolate': '#8B4513',
        'Dark Chocolate': '#5D3A1A'
    };

    const mixInColors = {
        'Icy White': '#F8F8FF',
        'Silver': '#C0C0C0',
        'Champagne Gold': '#F7E7CE',
        'Bronze': '#CD7F32',
        'Cobalt Blue': '#0047AB',
        'Pewter Blue': '#8BA8B7',
        'Copper': '#B87333'
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
    background-color: #f9f9f9;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 60px auto 30px auto;
    transition: all 0.3s ease;
}

/* Headers */
.container h1,
.container h2 {
    color: #333333;
    margin-bottom: 20px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.container h1 {
    font-size: 32px;
}

.container h2 {
    font-size: 24px;
}

/* Paragraphs */
.container p {
    color: #555555;
    font-size: 16px;
    margin-bottom: 30px;
    line-height: 1.5;
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
    color: #333333;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    border-color: #0264D9;
    outline: none;
    box-shadow: 0 0 5px rgba(2, 100, 217, 0.5);
}

/* Button Styles */
.button {
    padding: 14px 20px;
    background-color: #0264D9;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin: 20px auto;
    transition: background-color 0.3s ease, opacity 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: block;
    max-width: 200px;
}

.button:hover {
    background-color: #004C99;
}

.button-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
}

/* Green Button */
.button.green-button {
    background-color: #28a745;
    color: #ffffff;
}

.button.green-button:hover {
    background-color: #218838;
}

/* Image Button Styles */
.image-button {
    position: relative;
    width: 250px;
    aspect-ratio: 1 / 1;
    border: 2px solid #000000;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    margin: 20px auto;
    transition: border 0.3s ease, transform 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-button:hover {
    border: 4px solid #0264D9;
    transform: scale(1.05);
}

.image-button .overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

/* Backsplash Question */
.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
}

/* Invoice / Quote Screen */
h2 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 30px;
}

p {
    font-size: 28px;
    color: #333333;
    margin-bottom: 20px;
}

/* Item List */
.item-list {
    margin-top: 30px;
    text-align: left;
}

.item-list h3 {
    color: #333333;
    margin-bottom: 15px;
}

.item-list p {
    color: #777777;
}

.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #dddddd;
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
    color: #333333;
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
    .container {
        padding: 20px;
    }

    .image-button {
        width: 100%;
        max-width: 250px;
        margin: 10px auto;
    }

    .button, .back-button {
        width: 100%;
        max-width: none;
    }

    .item {
        flex-direction: column;
        align-items: flex-start;
    }

    .item-remove {
        margin-top: 10px;
    }

    .container h1 {
        font-size: 28px;
    }

    .container h2 {
        font-size: 20px;
    }

    .container p, .form-group label, .form-group input, .item-description span {
        font-size: 14px;
    }

    .image-button .overlay {
        font-size: 14px;
        padding: 8px;
    }
}

/* Large Quote Price */
.quote-price {
    font-size: 48px;
    font-weight: bold;
    color: #333333;
}

/* Form Button Container */
.button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

/* Back Button */
.back-button {
    background-color: #f44336;
    max-width: 150px;
}

.back-button:hover {
    background-color: #d32f2f;
}

/* Add New Countertop Button */
.add-countertop-button {
    background-color: #28a745;
    color: white;
    font-size: 18px;
    font-weight: bold;
    padding: 14px 30px;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 30px;
}

.add-countertop-button:hover {
    background-color: #218838;
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
    width: 80px;
    height: 80px;
    border: 2px solid #dddddd;
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
    color: #333333;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 3px;
    border-radius: 5px;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
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

    // Initialization Function
    function initInterface() {
        const container = createElement('div', 'container');
        document.body.innerHTML = '';
        document.body.appendChild(container);

        const header = createElement('h1', null, 'Get a Countertop Quote');
        container.appendChild(header);

        const description = createElement('p', null, 'Choose the type of countertop you need a quote for.');
        container.appendChild(description);

        const typeContainer = createElement('div', 'button-group');
        container.appendChild(typeContainer);

        const types = ['Kitchen', 'Bathroom']; // Define your types here

        types.forEach(type => {
            const typeBtn = createImageButton(type, getTypeImageUrl(type));
            typeContainer.appendChild(typeBtn);

            typeBtn.addEventListener('click', () => {
                designSelections.type = type;
                previousPage = initInterface;
                chooseFinishType(container);
            });
        });
    }

    // Helper function to get type image URLs
    function getTypeImageUrl(type) {
        const images = {
            'Kitchen': 'https://i.ibb.co/tPH5VT2/10.png', // Original Kitchen image URL
            'Bathroom': 'https://i.ibb.co/KmS1PKB/recbath.png' // Original Bathroom image URL
        };
        return images[type] || 'https://via.placeholder.com/250'; // Fallback image
    }

    // Choose Finish Type
    function chooseFinishType(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Choose Finish Type');
        container.appendChild(header);

        const finishContainer = createElement('div', 'button-group');
        container.appendChild(finishContainer);

        const finishes = ['Standard Finish', 'Crystal Top Finish'];

        finishes.forEach(finish => {
            const finishBtn = createImageButton(finish, getFinishImageUrl(finish));
            finishContainer.appendChild(finishBtn);

            finishBtn.addEventListener('click', () => {
                designSelections.finishType = finish === 'Crystal Top Finish' ? 'crystal' : 'standard';
                previousPage = () => chooseFinishType(container);
                chooseMaterial(container);
            });
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            if (previousPage) previousPage();
        });
    }

    // Helper function to get finish image URLs
    function getFinishImageUrl(finish) {
        const images = {
            'Standard Finish': 'https://i.ibb.co/g4K3B0S/Flowing-Granite-1-min.jpg', // Original Standard Finish image URL
            'Crystal Top Finish': 'https://i.ibb.co/vH56T17/Pour-Swirl2-min.jpg' // Original Crystal Top Finish image URL
        };
        return images[finish] || 'https://via.placeholder.com/250';
    }

    // Choose Material/Pour Type
    function chooseMaterial(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Choose Material/Pour Type');
        container.appendChild(header);

        const materialContainer = createElement('div', 'button-group');
        container.appendChild(materialContainer);

        let materials = [];
        if (designSelections.finishType === 'crystal') {
            materials = ['Pour Swirl', 'Directional Pour'];
        } else {
            materials = ['Quartz', 'Granite', 'Marble'];
        }

        materials.forEach(material => {
            const materialBtn = createImageButton(material, getMaterialImageUrl(material));
            materialContainer.appendChild(materialBtn);

            materialBtn.addEventListener('click', () => {
                designSelections.material = material;
                previousPage = () => chooseMaterial(container);
                chooseColors(container);
            });
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            if (previousPage) previousPage();
        });
    }

    // Helper function to get material image URLs
    function getMaterialImageUrl(material) {
        const images = {
            'Quartz': 'https://i.ibb.co/g4K3B0S/Flowing-Granite-1-min.jpg', // Original Quartz image URL
            'Granite': 'https://i.ibb.co/xhXzYRr/Marble-1-min.jpg', // Original Granite image URL
            'Marble': 'https://i.ibb.co/fC1H2yj/Flowing-Granite-min.jpg', // Original Marble image URL
            'Pour Swirl': 'https://i.ibb.co/vH56T17/Pour-Swirl2-min.jpg', // Original Pour Swirl image URL
            'Directional Pour': 'https://i.ibb.co/K21MDPq/Pour-Directional-2.jpg' // Original Directional Pour image URL
        };
        return images[material] || 'https://via.placeholder.com/250';
    }

    // Choose Colors
    function chooseColors(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Choose Colors');
        container.appendChild(header);

        // Base Color Selection
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
                designSelections.baseColor = colorName;
            });
        });

        // Mix-in Colors Selection
        const mixInLabel = createElement('h3', null, 'Choose up to 4 Mix-in Colors:');
        container.appendChild(mixInLabel);

        const mixInContainer = createElement('div', 'color-selection');
        container.appendChild(mixInContainer);

        const allMixInColors = Object.assign({}, mixInColors, baseColors); // Including base colors if needed

        const selectedMixIns = [];

        Object.entries(allMixInColors).forEach(([colorName, hexCode]) => {
            const colorSquare = createColorSquare(colorName, hexCode);
            mixInContainer.appendChild(colorSquare);

            colorSquare.addEventListener('click', () => {
                if (colorSquare.classList.contains('selected')) {
                    colorSquare.classList.remove('selected');
                    const index = selectedMixIns.indexOf(colorName);
                    if (index > -1) selectedMixIns.splice(index, 1);
                } else if (selectedMixIns.length < 4) {
                    colorSquare.classList.add('selected');
                    selectedMixIns.push(colorName);
                } else {
                    alert('You can select up to 4 mix-in colors.');
                }
                designSelections.mixInColors = selectedMixIns;
            });
        });

        // Next Button
        const nextBtn = createElement('button', 'button', 'Next');
        container.appendChild(nextBtn);

        nextBtn.addEventListener('click', () => {
            if (!designSelections.baseColor) {
                alert('Please select a base color.');
                return;
            }
            if (designSelections.mixInColors.length === 0) {
                alert('Please select at least one mix-in color.');
                return;
            }
            previousPage = () => chooseColors(container);
            addItem(container);
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            if (previousPage) previousPage();
        });
    }

    // Create Color Square
    function createColorSquare(colorName, hexCode) {
        const colorDiv = createElement('div', 'color-square');
        colorDiv.style.backgroundColor = hexCode;

        const label = createElement('span', null, colorName);
        colorDiv.appendChild(label);

        return colorDiv;
    }

    // Add Item Function
    function addItem(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Add a Countertop Item');
        container.appendChild(header);

        // If Kitchen, choose subcategory
        if (designSelections.type === 'Kitchen') {
            const subcategoryContainer = createElement('div', 'button-group');
            container.appendChild(subcategoryContainer);

            const subcategories = ['Bartops', 'Countertops', 'Islands'];

            subcategories.forEach(subcategory => {
                const subcategoryBtn = createImageButton(subcategory, getSubcategoryImageUrl(subcategory));
                subcategoryContainer.appendChild(subcategoryBtn);

                subcategoryBtn.addEventListener('click', () => {
                    previousPage = () => addItem(container);
                    chooseShape(container, subcategory);
                });
            });

            // View Invoice Button
            const viewInvoiceBtn = createElement('button', 'button', 'View Invoice');
            container.appendChild(viewInvoiceBtn);

            viewInvoiceBtn.addEventListener('click', () => {
                previousPage = () => addItem(container);
                createInvoicePage(container);
            });

            // Back Button
            const backButton = createElement('button', 'button back-button', 'Back');
            container.appendChild(backButton);

            backButton.addEventListener('click', () => {
                if (previousPage) previousPage();
            });
        } else {
            // For Bathroom, directly choose shape
            const shapeContainer = createElement('div', 'button-group');
            container.appendChild(shapeContainer);

            const shapes = getShapesForType(designSelections.type);
            shapes.forEach(shape => {
                const shapeBtn = createImageButton(shape.name, shape.imageUrl);
                shapeContainer.appendChild(shapeBtn);

                shapeBtn.addEventListener('click', () => {
                    previousPage = () => addItem(container);
                    inputMeasurements(container, shape);
                });
            });

            // View Invoice Button
            const viewInvoiceBtn = createElement('button', 'button', 'View Invoice');
            container.appendChild(viewInvoiceBtn);

            viewInvoiceBtn.addEventListener('click', () => {
                previousPage = () => addItem(container);
                createInvoicePage(container);
            });

            // Back Button
            const backButton = createElement('button', 'button back-button', 'Back');
            container.appendChild(backButton);

            backButton.addEventListener('click', () => {
                if (previousPage) previousPage();
            });
        }
    }

    // Helper function to get subcategory image URLs
    function getSubcategoryImageUrl(subcategory) {
        const images = {
            'Bartops': 'https://i.ibb.co/4PNXrnc/1.png', // Replace with actual Bartops image URL
            'Countertops': 'https://i.ibb.co/tPH5VT2/10.png', // Replace with actual Countertops image URL
            'Islands': 'https://i.ibb.co/2WfRSkn/islandsquare.png' // Replace with actual Islands image URL
        };
        return images[subcategory] || 'https://via.placeholder.com/250';
    }

    // Choose Shape
    function chooseShape(container, subcategory) {
        container.innerHTML = '';

        const header = createElement('h2', null, `Choose ${subcategory} Shape`);
        container.appendChild(header);

        const shapeContainer = createElement('div', 'button-group');
        container.appendChild(shapeContainer);

        const shapes = getShapesForSubcategory(designSelections.type, subcategory);
        shapes.forEach(shape => {
            const shapeBtn = createImageButton(shape.name, shape.imageUrl);
            shapeContainer.appendChild(shapeBtn);

            shapeBtn.addEventListener('click', () => {
                previousPage = () => chooseShape(container, subcategory);
                inputMeasurements(container, shape);
            });
        });

        // View Invoice Button
        const viewInvoiceBtn = createElement('button', 'button', 'View Invoice');
        container.appendChild(viewInvoiceBtn);

        viewInvoiceBtn.addEventListener('click', () => {
            previousPage = () => chooseShape(container, subcategory);
            createInvoicePage(container);
        });

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            if (previousPage) previousPage();
        });
    }

    // Get Shapes for Subcategory
    function getShapesForSubcategory(type, subcategory) {
        const shapes = {
            'Kitchen': {
                'Bartops': [
                    {
                        name: 'Bar Top - 2 Sides',
                        measurements: ['Length', 'Width'],
                        formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144, // sq ft
                        imageUrl: 'https://i.ibb.co/4PNXrnc/1.png'
                    },
                    // Add more Bartops shapes as needed
                ],
                'Countertops': [
                    {
                        name: 'Regular Counter - 2 Sides',
                        measurements: ['Length', 'Width'],
                        formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144, // sq ft
                        imageUrl: 'https://i.ibb.co/tPH5VT2/10.png'
                    },
                    // Add more Countertops shapes as needed
                ],
                'Islands': [
                    {
                        name: 'Island - 1 Side',
                        measurements: ['Length', 'Width'],
                        formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144, // sq ft
                        imageUrl: 'https://i.ibb.co/2WfRSkn/islandsquare.png'
                    },
                    // Add more Islands shapes as needed
                ]
            },
            'Bathroom': [
                {
                    name: 'Rectangle',
                    measurements: ['Length', 'Width'],
                    formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144,
                    imageUrl: 'https://i.ibb.co/KmS1PKB/recbath.png'
                },
                {
                    name: 'Square',
                    measurements: ['Side'],
                    formula: (measurements, depth) => (Math.pow(measurements[0], 2) * depth) / 144,
                    imageUrl: 'https://i.ibb.co/1qLTRBc/bathsqaure.png'
                },
                {
                    name: 'Hexagonal',
                    measurements: ['Side Length'],
                    formula: (measurements, depth) => (1.5 * Math.sqrt(3) * Math.pow(measurements[0], 2) * depth) / 144,
                    imageUrl: 'https://i.ibb.co/ScsL4gN/IN.png'
                }
            ]
        };

        return shapes[type] && shapes[type][subcategory] ? shapes[type][subcategory] : [];
    }

    // Choose Shape for Bathroom
    function chooseShapeBathroom(container) {
        // Not needed as Bathroom doesn't have subcategories
    }


function askBacksplash(container, shape) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Does this countertop have a backsplash?');
    container.appendChild(header);

    const buttonGroup = createElement('div', 'button-group');
    container.appendChild(buttonGroup);

    const yesBtn = createElement('button', 'button', 'Yes');
    const noBtn = createElement('button', 'button', 'No');

    buttonGroup.appendChild(yesBtn);
    buttonGroup.appendChild(noBtn);

    yesBtn.addEventListener('click', () => {
        promptBacksplashDimensions(container, shape);
    });

    noBtn.addEventListener('click', () => {
        shape.hasBacksplash = false;
        addToQuote(container, shape);
    });

    // Back Button
    const backButton = createElement('button', 'button back-button', 'Back');
    container.appendChild(backButton);

    backButton.addEventListener('click', () => {
        inputMeasurements(container, shape);
    });
}

function createQuotePage(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Your Quote');
    container.appendChild(header);

    // Display the total price, larger font
    const totalText = createElement('p', null, `Total Price: $${totalCost.toFixed(2)}`);
    totalText.style.fontSize = '36px';  // Make price bigger
    totalText.style.fontWeight = 'bold';
    container.appendChild(totalText);

    // View Price Estimate Button
    const viewEstimateBtn = createElement('button', 'button', 'View Price Estimate for Free →');
    viewEstimateBtn.style.display = 'inline-block';
    viewEstimateBtn.style.margin = '20px';
    container.appendChild(viewEstimateBtn);

    viewEstimateBtn.addEventListener('click', () => {
        // Collect user info or proceed to finalize quote
        collectUserInfo(container);
    });

    // Add New Countertop Button
    const addCountertopBtn = createElement('button', 'button green-button', 'Add New Countertop to Your Quote');
    addCountertopBtn.style.display = 'inline-block';
    addCountertopBtn.style.margin = '20px';
    container.appendChild(addCountertopBtn);

    addCountertopBtn.addEventListener('click', () => {
        previousPage = createQuotePage;
        addItem(container);
    });
}

    
function inputMeasurements(container, shape) {
    container.innerHTML = '';

    const header = createElement('h2', null, `Configure ${shape.name}`);
    container.appendChild(header);

    // Display the shape image
    const imageDiv = createElement('div', 'image-container');
    const shapeImage = createElement('img');
    shapeImage.src = shape.imageUrl;
    shapeImage.alt = shape.name;
    shapeImage.style.width = '100%';
    shapeImage.style.maxWidth = '300px';
    imageDiv.appendChild(shapeImage);
    container.appendChild(imageDiv);

    const form = createElement('div', 'form');
    container.appendChild(form);

    // Measurement Inputs
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

    // Next Button for measurements
    const nextBtn = createElement('button', 'button', 'Next');
    form.appendChild(nextBtn);

    nextBtn.addEventListener('click', () => {
        const measurements = measurementInputs.map(input => parseFloat(input.value));
        if (measurements.some(value => isNaN(value) || value <= 0)) {
            alert('Please enter valid measurements.');
            return;
        }

        // Store measurements
        shape.measurements = measurements;

        // Proceed to ask about the backsplash
        askBacksplash(container, shape);
    });

    // Back Button
    const backButton = createElement('button', 'button back-button', 'Back');
    form.appendChild(backButton);

    backButton.addEventListener('click', () => {
        if (previousPage) previousPage();
    });
}


   function promptBacksplashDimensions(container, shape) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Enter Backsplash Dimensions');
    container.appendChild(header);

    const form = createElement('div', 'form');
    container.appendChild(form);

    // Width Input
    const widthInput = createElement('div', 'form-group');
    const widthLabel = createElement('label', null, 'Backsplash Width (in inches):');
    const widthField = createElement('input');
    widthField.type = 'number';
    widthField.min = '0';
    widthInput.appendChild(widthLabel);
    widthInput.appendChild(widthField);
    form.appendChild(widthInput);

    // Height Input
    const heightInput = createElement('div', 'form-group');
    const heightLabel = createElement('label', null, 'Backsplash Height (in inches):');
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
            alert('Please enter valid dimensions.');
            return;
        }

        shape.backsplashWidth = width;
        shape.backsplashHeight = height;
        shape.hasBacksplash = true;

        addToQuote(container, shape);
    });

    // Back Button
    const backButton = createElement('button', 'button back-button', 'Back');
    form.appendChild(backButton);

    backButton.addEventListener('click', () => {
        askBacksplash(container, shape);
    });
}

    // Calculate Total Cost
    function calculateTotalCost() {
        totalCost = 0;
        items.forEach(item => {
            const depth = designSelections.type === 'Kitchen' ? 25 : 22; // Standard depths
            let squareFootage = 0;

            // Calculate area based on shape formula
            const shape = getShapeByName(item.shape);
            if (shape && typeof shape.formula === 'function') {
                squareFootage += shape.formula(item.measurements, depth);
            }

            // Add backsplash area if applicable
            if (item.backsplash) {
                const backsplashArea = (item.backsplash.width / 12) * (item.backsplash.height / 12);
                squareFootage += backsplashArea;
            }

            // Determine price per sq ft
            let pricePerSqFt = designSelections.finishType === 'crystal' ? PRICE_CRYSTAL : PRICE_REGULAR;

            // Calculate cost
            const cost = squareFootage * pricePerSqFt;
            totalCost += cost;
        });

        // Enforce minimum price
        if (totalCost < MINIMUM_PRICE) {
            totalCost = MINIMUM_PRICE;
        }
    }

    // Get Shape by Name
    function getShapeByName(name) {
        const shapes = getAllShapes();
        return shapes.find(shape => shape.name === name);
    }

    // Get All Shapes
    function getAllShapes() {
        const kitchenShapes = {
            'Bartops': getShapesForSubcategory('Kitchen', 'Bartops'),
            'Countertops': getShapesForSubcategory('Kitchen', 'Countertops'),
            'Islands': getShapesForSubcategory('Kitchen', 'Islands')
        };

        const bathroomShapes = getShapesForType('Bathroom');

        return [
            ...kitchenShapes['Bartops'],
            ...kitchenShapes['Countertops'],
            ...kitchenShapes['Islands'],
            ...bathroomShapes
        ];
    }

    // Create Invoice Page
    function createInvoicePage(container) {
        container.innerHTML = '';

        const header = createElement('h2', null, 'Your Invoice');
        container.appendChild(header);

        if (items.length === 0) {
            const noItems = createElement('p', null, 'No items added yet.');
            container.appendChild(noItems);
        } else {
            const itemListDiv = createElement('div', 'item-list');
            container.appendChild(itemListDiv);
            updateItemList(itemListDiv);
        }

        // Proceed to User Info Button
        if (items.length > 0) {
            const proceedBtn = createElement('button', 'button', 'Proceed to Checkout');
            container.appendChild(proceedBtn);

            proceedBtn.addEventListener('click', () => {
                previousPage = () => createInvoicePage(container);
                collectUserInfo(container);
            });
        }

        // Back Button
        const backButton = createElement('button', 'button back-button', 'Back');
        container.appendChild(backButton);

        backButton.addEventListener('click', () => {
            if (previousPage) previousPage();
        });
    }

    // Update Item List UI
    function updateItemList(itemListDiv) {
        itemListDiv.innerHTML = '<h3>Items:</h3>';

        items.forEach((item, index) => {
            const itemDiv = createElement('div', 'item');

            const descDiv = createElement('div', 'item-description');
            const img = createElement('img');
            img.src = getShapeByName(item.shape).imageUrl;
            img.alt = item.shape;
            descDiv.appendChild(img);

            const descText = createElement('span', null, `${item.shape}`);
            descDiv.appendChild(descText);

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
        items.splice(index, 1);
        calculateTotalCost();
        const itemListDiv = document.querySelector('.item-list');
        if (itemListDiv) updateItemList(itemListDiv);
    }

    // Collect User Information
    function collectUserInfo(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Tell Us About You');
    container.appendChild(header);

    const description = createElement('p', null, 'Please enter your contact information. We will send you a detailed quote.');
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

    // Submit Button
    const submitBtn = createElement('button', 'button', 'Submit');
    form.appendChild(submitBtn);

    submitBtn.addEventListener('click', () => {
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

        // Show final price after collecting user info
        finalizeInvoice(container);
    });
}


    function finalizeInvoice(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Your Final Price');
    container.appendChild(header);

    // Display the total cost
    const totalText = createElement('p', null, `Total Price: $${totalCost.toFixed(2)}`);
    totalText.style.fontSize = '36px';  // Larger font for visibility
    totalText.style.fontWeight = 'bold';
    container.appendChild(totalText);

    // Call Now Button
    const callBtn = createElement('button', 'button', 'Call Now');
    callBtn.style.marginTop = '20px';
    container.appendChild(callBtn);

    callBtn.addEventListener('click', () => {
        alert('Calling...');
    });

    // Visualize Quote Button
    const visualizeBtn = createElement('button', 'button', 'Visualize Your Quote');
    visualizeBtn.style.marginTop = '20px';
    container.appendChild(visualizeBtn);

    visualizeBtn.addEventListener('click', () => {
        alert('Visualizing...');
    });
}


    // Create Input Field
    function createInputField(labelText, type) {
        const formGroup = createElement('div', 'form-group');

        const label = createElement('label', null, labelText);
        formGroup.appendChild(label);

        const input = createElement('input');
        input.type = type;
        formGroup.appendChild(input);

        return formGroup;
    }

    // Get Shapes for Type
    function getShapesForType(type) {
        const shapeData = {
            'Bathroom': [
                {
                    name: 'Rectangle',
                    measurements: ['Length', 'Width'],
                    formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144,
                    imageUrl: 'https://i.ibb.co/KmS1PKB/recbath.png'
                },
                {
                    name: 'Square',
                    measurements: ['Side'],
                    formula: (measurements, depth) => (Math.pow(measurements[0], 2) * depth) / 144,
                    imageUrl: 'https://i.ibb.co/1qLTRBc/bathsqaure.png'
                },
                {
                    name: 'Hexagonal',
                    measurements: ['Side Length'],
                    formula: (measurements, depth) => (1.5 * Math.sqrt(3) * Math.pow(measurements[0], 2) * depth) / 144,
                    imageUrl: 'https://i.ibb.co/ScsL4gN/IN.png'
                }
            ]
        };

        return shapeData[type] || [];
    }

    // Get Shapes for Subcategory
    function getShapesForSubcategory(type, subcategory) {
        const shapes = {
            'Kitchen': {
                'Bartops': [
                    {
                        name: 'Bartop - 2 Sides',
                        measurements: ['Length', 'Width'],
                        formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144, // sq ft
                        imageUrl: 'https://i.ibb.co/4PNXrnc/1.png'
                    },
                    // Add more Bartops shapes as needed
                ],
                'Countertops': [
                    {
                        name: 'Regular Counter - 2 Sides',
                        measurements: ['Length', 'Width'],
                        formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144, // sq ft
                        imageUrl: 'https://i.ibb.co/tPH5VT2/10.png'
                    },
                    {
                        name: 'Regular Counter - 3 Sides (Style 1)',
                        measurements: ['Length', 'Width', 'Height'],
                        formula: (measurements, depth) => (measurements.reduce((acc, cur) => acc + cur, 0) * depth) / 144,
                        imageUrl: 'https://i.ibb.co/hHSRgjk/13.png'
                    },
                    {
                        name: 'Regular Counter - 3 Sides (Style 2)',
                        measurements: ['Length', 'Width', 'Height'],
                        formula: (measurements, depth) => (measurements.reduce((acc, cur) => acc + cur, 0) * depth) / 144,
                        imageUrl: 'https://i.ibb.co/C9t7rzy/15.png'
                    },
                    {
                        name: 'Regular Counter - 5 Sides',
                        measurements: ['Length', 'Width', 'Height', 'Depth', 'Additional Measure'],
                        formula: (measurements, depth) => (measurements.reduce((acc, cur) => acc + cur, 0) * depth) / 144,
                        imageUrl: 'https://i.ibb.co/8BsnF1W/11.png'
                    },
                    {
                        name: 'Regular Counter - 6 Sides',
                        measurements: ['Length', 'Width', 'Height', 'Depth', 'Additional Measure 1', 'Additional Measure 2'],
                        formula: (measurements, depth) => (measurements.reduce((acc, cur) => acc + cur, 0) * depth) / 144,
                        imageUrl: 'https://i.ibb.co/b7fyPTL/14.png'
                    },
                    {
                        name: 'Regular Counter - 2 Sides (Style 2)',
                        measurements: ['Length', 'Width'],
                        formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144,
                        imageUrl: 'https://i.ibb.co/Zf3JzCz/16.png'
                    }
                ],
                'Islands': [
                    {
                        name: 'Island - 1 Side',
                        measurements: ['Length', 'Width'],
                        formula: (measurements, depth) => (measurements[0] * measurements[1] * depth) / 144, // sq ft
                        imageUrl: 'https://i.ibb.co/2WfRSkn/islandsquare.png'
                    },
                    // Add more Islands shapes as needed
                ]
            }
        };

        return shapes[type] && shapes[type][subcategory] ? shapes[type][subcategory] : [];
    }

    // Calculate and Add Item to Invoice (Unused in streamlined flow)
    // Removed individual item addition steps as per user request

    // Finalize the Interface
    initInterface();
})();
