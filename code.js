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
    'Tornado Gray': '#e5e7e9',       // Updated hex code
    'Charcoal Gray': '#2e4053',      // Updated hex code
    'Toasted Almond': '#EADDCA',     // Updated hex code
    'Milk Chocolate': '#795548',     // Updated hex code
    'Dark Chocolate': '#3e2723'      // Updated hex code
};

const mixInColors = {
    'Icy White': '#F8F8FF',
    'Silver': '#C0C0C0',
    'Champagne Gold': '#d4ac0d',     // Updated hex code
    'Bronze': '#A97142',             // Updated hex code
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
    font-family: 'Georgia', serif;
}

/* Main Container Styling */
.container {
    width: 95%;
    max-width: 1200px;
    background-color: #f9f9f9;
    padding: 60px;
    border-radius: 20px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
    text-align: center;
    margin: 60px auto;
    transition: all 0.3s ease;
}

/* Headers */
.container h1,
.container h2 {
    color: #333333;
    margin-bottom: 40px;
    font-family: 'Georgia', serif;
}

h2 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 30px;
}

.container h1 {
    font-size: 36px;
}

.container h2 {
    font-size: 28px;
}

/* Add more bottom margin to titles in the colors screen */
h3 {
    margin-bottom: 30px;
    font-size: 24px;
    color: #333333;
}

/* Paragraphs */
.container p {
    color: #555555;
    font-size: 18px;
    margin-bottom: 40px;
    line-height: 1.8;
}

/* Form Styles */
.form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 30px;
}

.form-group label {
    color: #333333;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 15px;
    border: 1px solid #cccccc;
    border-radius: 10px;
    font-size: 18px;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    border-color: #0264D9;
    outline: none;
    box-shadow: 0 0 8px rgba(2, 100, 217, 0.5);
}

/* Button Wrapper */
.button-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 100%;
}

/* Button Styles */
.button {
    padding: 18px 30px;
    background-color: #0264D9;
    color: #ffffff;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    max-width: 200px;
}

/* Button Hover Effects */
.button:hover {
    background-color: #004C99;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

/* Green Button */
.button.green-button {
    background-color: #28a745;
    color: #ffffff;
}

.button.green-button:hover {
    background-color: #218838;
}

/* Red Button */
.button.red-button {
    background-color: #dc3545;
}

.button.red-button:hover {
    background-color: #c82333;
}

/* Image Button Styles */
.image-button {
    position: relative;
    width: 500px;
    height: 500px;
    border: 2px solid #000000;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    margin: 30px auto;
    transition: border 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.image-button:hover {
    border: 4px solid #0264D9;
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.image-label {
    width: 100%;
    padding: 12px;
    background: white;
    color: #333;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    border-top: 1px solid #eee;
}

/* Container for multiple image buttons */
.image-button-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 500px));
    gap: 40px;
    justify-content: center;
    width: 100%;
    margin: 20px 0;
}

/* Shape Diagrams Specific Styling */
.shape-diagram {
    width: 100% !important;
    max-width: 500px !important;
    aspect-ratio: 16/9 !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-color: #f5f5f5 !important;
    margin: 20px auto !important;
}

/* Main Category Images */
.category-image {
    width: 500px !important;
    height: 500px !important;
    aspect-ratio: 1/1 !important;
    background-size: cover !important;
    background-position: center !important;
}

/* Image Container */
.image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.image-container img {
    width: 100%;
    max-width: 500px;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Item List */
.item-list {
    margin-top: 40px;
    text-align: left;
    width: 100%;
}

.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 2px solid #dddddd;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.item-description {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20px;
}

.item-description img {
    width: 100px;
    height: 60px;
    object-fit: contain;
    border-radius: 8px;
    background-color: #f5f5f5;
}

.item-description span {
    font-size: 18px;
    color: #333333;
    font-weight: 500;
}

.item-remove {
    background-color: #dc3545;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.item-remove:hover {
    background-color: #c82333;
    transform: scale(1.05);
}

/* Color Selection Styles */
.color-selection {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
}

.color-square {
    width: 100px;
    height: 100px;
    border: 3px solid #dddddd;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.color-square.selected {
    border: 4px solid #0264D9;
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.color-square span {
    width: 100%;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    background-color: white;
    padding: 5px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
}

/* Form Container */
.form {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

/* Measurement Input Specific Styles */
.measurement-input {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 30px 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 30px;
        width: 100%;
    }

    .image-button {
        width: 300px;
        height: 300px;
    }

    .shape-diagram {
        max-width: 300px !important;
    }

    .button-wrapper {
        flex-direction: column;
        align-items: center;
    }

    .button {
        width: 100%;
        max-width: none;
    }

    .item-description img {
        width: 80px;
        height: 48px;
    }

    .color-selection {
        gap: 10px;
    }

    .color-square {
        width: 80px;
        height: 80px;
    }

    .form {
        padding: 10px;
    }
}

/* Print Styles */
@media print {
    .container {
        box-shadow: none;
        margin: 0;
        padding: 20px;
    }

    .button-wrapper,
    .item-remove {
        display: none;
    }
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

    // Extract only the display name part before the code
    const displayName = text.split(' - ')[0];
    
    // Adding the text below the image
    const label = createElement('div', 'image-label', displayName);
    button.appendChild(label);
    
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

    

  function chooseFinishType(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Choose Finish Type');
    container.appendChild(header);

    // Create a container for the finish options
    const finishOptionsContainer = createElement('div', 'finish-options-container');
    container.appendChild(finishOptionsContainer);

    // Standard Finish Option
    const standardOptionDiv = createElement('div', 'finish-option');
    finishOptionsContainer.appendChild(standardOptionDiv);

    const standardFinishBtn = createImageButton('Standard Finish', getFinishImageUrl('Standard Finish'));
    standardOptionDiv.appendChild(standardFinishBtn);

    const standardDescription = createElement('p', null, 'With our standard process, the customer can pick the colors and choose the pattern. Once all colors are complete, we go through with the customer and will “tweak” the pattern to their liking.');
    standardDescription.style.marginTop = '10px';
    standardDescription.style.textAlign = 'center';
    standardOptionDiv.appendChild(standardDescription);

    standardFinishBtn.addEventListener('click', () => {
        designSelections.finishType = 'standard';
        previousPage = () => chooseFinishType(container);
        chooseMaterial(container);
    });

    // Crystal Top Finish Option
    const crystalOptionDiv = createElement('div', 'finish-option');
    finishOptionsContainer.appendChild(crystalOptionDiv);

    const crystalFinishBtn = createImageButton('Crystal Top Pour', getFinishImageUrl('Crystal Top Pour'));
    crystalOptionDiv.appendChild(crystalFinishBtn);

const crystalDescription = createElement('p', null, 'Our CrystalTop Pour gives a soft flowing Marble look. This process allows the colors to meld together, giving nuances to the various colors chosen and very detailed subtleties. The customer can choose the general amount of the colors but cannot choose exactly how it flows out. This is always a two-day process due to the drying times and labor. On average, this process is about one and a half times the amount of the Standard process.');
    crystalDescription.style.marginTop = '10px';
    crystalDescription.style.textAlign = 'center';
    crystalOptionDiv.appendChild(crystalDescription);

    crystalFinishBtn.addEventListener('click', () => {
        designSelections.finishType = 'crystal';
        previousPage = () => chooseFinishType(container);
        chooseMaterial(container);
    });

    // Back Button
    const backButton = createElement('button', 'button back-button', 'Back');
    container.appendChild(backButton);

    backButton.addEventListener('click', () => {
        if (previousPage) previousPage();
    });
}


function createColorSquare(colorName, hexCode) {
    const colorDiv = createElement('div', 'color-square');
    colorDiv.style.backgroundColor = hexCode;

    const label = createElement('span', null, colorName);
    colorDiv.appendChild(label);

    return colorDiv;
}


    

    // Helper function to get finish image URLs
    function getFinishImageUrl(finish) {
        const images = {
 'Standard Finish': 'https://i.ibb.co/tBQpf58/Marble-1.jpg',
               'Crystal Top Pour': 'https://i.ibb.co/vH56T17/Pour-Swirl2-min.jpg'

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
    'Quartz': 'https://i.ibb.co/2kxvQTN/Quartz-T-Almond-with-White-Icy-White.jpg',
    'Granite': 'https://i.ibb.co/fC1H2yj/Flowing-Granite-min.jpg',
    'Marble': 'https://i.ibb.co/xhXzYRr/Marble-1-min.jpg',
        
    'Pour Swirl': 'https://i.ibb.co/vH56T17/Pour-Swirl2-min.jpg',
    'Directional Pour': 'https://i.ibb.co/K21MDPq/Pour-Directional-2.jpg'
};

        return images[material] || 'https://via.placeholder.com/250';
    }



let historyStack = []; // Stack to store the navigation history

// Adds the back button to the container and enables infinite back navigation
function addBackButton(container) {
    const backButton = createElement('button', 'button back-button', 'Back');
    container.appendChild(backButton);
    
    backButton.addEventListener('click', () => {
        if (historyStack.length > 0) {
            const previousState = historyStack.pop(); // Retrieve the last saved state
            document.body.innerHTML = ''; // Clear the current screen
            document.body.appendChild(previousState); // Display the previous state
        }
    });
}

// Saves the current state to the history stack
function saveCurrentState() {
    const currentContainer = document.querySelector('.container');
    if (currentContainer) {
        historyStack.push(currentContainer.cloneNode(true)); // Clone and save the current state
    }
}
    
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

    // Mix-in Colors Selection (Including base colors)
    const mixInLabel = createElement('h3', null, 'Choose up to 4 Mix-in Colors:');
    container.appendChild(mixInLabel);

    const mixInContainer = createElement('div', 'color-selection');
    container.appendChild(mixInContainer);

    const allMixInColors = { ...mixInColors, ...baseColors }; // Restore base colors to mix-in options

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

    // Button Wrapper for consistency
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    // Next Button
    const nextBtn = createElement('button', 'button', 'Next');
    buttonWrapper.appendChild(nextBtn);

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
    buttonWrapper.appendChild(backButton);

    backButton.addEventListener('click', () => {
        previousPage && previousPage();
    });
}



function addItem(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Add a Countertop');
    container.appendChild(header);

    if (designSelections.type === 'Kitchen') {
        // Create grid container for subcategories
        const subcategoryContainer = createElement('div', 'button-group');
        container.appendChild(subcategoryContainer);

        // Use singular forms
        const subcategories = ['Bartop', 'Countertop', 'Island'];

        subcategories.forEach(subcategory => {
            const subcategoryBtn = createImageButton(subcategory, getSubcategoryImageUrl(subcategory));
            subcategoryContainer.appendChild(subcategoryBtn);

            subcategoryBtn.addEventListener('click', () => {
                previousPage = () => addItem(container);
                chooseShape(container, subcategory);
            });
        });
    } else {
        // For Bathroom, create grid of shapes
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
    }

    // Show item list if items exist
    if (items.length > 0) {
        const itemListDiv = createElement('div', 'item-list');
        container.appendChild(itemListDiv);
        updateItemList(itemListDiv);

        const buttonWrapper = createElement('div', 'button-wrapper');
        container.appendChild(buttonWrapper);

        const viewInvoiceBtn = createElement('button', 'button', 'View Price Estimate for Free →');
        buttonWrapper.appendChild(viewInvoiceBtn);

        viewInvoiceBtn.addEventListener('click', () => {
            previousPage = () => addItem(container);
            createInvoicePage(container);
        });
    }

    // Navigation buttons
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    const backButton = createElement('button', 'button back-button', 'Back');
    buttonWrapper.appendChild(backButton);

    backButton.addEventListener('click', () => {
        if (previousPage) previousPage();
    });
}

    
 function getSubcategoryImageUrl(subcategory) {
    const images = {
        'Bartops': 'https://i.ibb.co/T0fnP1g/2.png',
        'Countertops': 'https://i.ibb.co/ypYDVTk/1.png',  // New Counter image
        'Islands': 'https://i.ibb.co/BKhZY1V/3.png'   // New Island image
    };
    return images[subcategory] || 'https://via.placeholder.com/250';
}

  function chooseShape(container, subcategory) {
    container.innerHTML = '';

    // Remove trailing 's' from subcategory if present
    const singularSubcategory = subcategory.replace(/s$/, '');
    const header = createElement('h2', null, `Choose ${singularSubcategory} Shape`);
    container.appendChild(header);

    // Create grid container for shapes
    const shapeContainer = createElement('div', 'button-group');
    container.appendChild(shapeContainer);

    const shapes = getShapesForSubcategory(designSelections.type, singularSubcategory);
    shapes.forEach(shape => {
        const shapeBtn = createImageButton(shape.name, shape.imageUrl);
        shapeContainer.appendChild(shapeBtn);

        shapeBtn.addEventListener('click', () => {
            previousPage = () => chooseShape(container, singularSubcategory);
            inputMeasurements(container, shape);
        });
    });

    // Button wrapper for navigation buttons
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    // Back Button
    const backButton = createElement('button', 'button back-button', 'Back');
    buttonWrapper.appendChild(backButton);

    backButton.addEventListener('click', () => {
        if (previousPage) previousPage();
    });
}
    // Button text changed from "View Quote" to "See Available Shapes"
    const viewShapesBtn = createElement('button', 'button', 'See Available Shapes');
    container.appendChild(viewShapesBtn);

    viewShapesBtn.addEventListener('click', () => {
        previousPage = () => chooseShape(container, subcategory);
        createInvoicePage(container);
    });

    // Back Button
    const buttonWrapper = createElement('div', 'button-wrapper'); // Ensure button wrapper for consistency
    container.appendChild(buttonWrapper);

    const backButton = createElement('button', 'button back-button', 'Back');
    buttonWrapper.appendChild(backButton);

    backButton.addEventListener('click', () => {
        previousPage && previousPage();
    });




function getShapesForSubcategory(type, subcategory) {
    const shapes = {
        'Kitchen': {
            'Countertop': [
                {
                    name: 'Standard',
                    code: 'KS',
                    measurements: ['Length'],
                    formula: (measurements) => (measurements[0] * 25) / 144,
                    imageUrl: 'https://i.ibb.co/nn8k8Bf/1.png'
                },
                {
                    name: 'Standard L',
                    code: 'KSL',
                    measurements: ['Length 1', 'Length 2'],
                    formula: (measurements) => ((measurements[0] + measurements[1]) * 25) / 144,
                    imageUrl: 'https://i.ibb.co/ZdMvxQK/2.png'
                },
                {
                    name: 'Standard 3 Sides',
                    code: 'KS3',
                    measurements: ['Length 1', 'Length 2', 'Length 3'],
                    formula: (measurements) => ((measurements[0] + measurements[1] + measurements[2]) * 25) / 144,
                    imageUrl: 'https://i.ibb.co/B28cv3j/3.png'
                },
                {
                    name: 'Standard Broken L',
                    code: 'KSBL',
                    measurements: ['Length 1', 'Length 2', 'Length 3', 'Length 4'],
                    formula: (measurements) => ((measurements.reduce((acc, cur) => acc + cur, 0) / 2) * 25) / 144,
                    imageUrl: 'https://i.ibb.co/5kb4k7G/4.png'
                },
                {
                    name: 'Standard Wing',
                    code: 'KSW',
                    measurements: ['Length 1', 'Length 2', 'Length 3'],
                    formula: (measurements) => {
                        const perimeter = (measurements[0] + measurements[1] + (measurements[2] * 2)) * 25;
                        const triangleArea = (measurements[2] * 2) * (measurements[2] * 2) * 0.5;
                        return (perimeter + triangleArea) / 144;
                    },
                    imageUrl: 'https://i.ibb.co/qnLVKrS/5.png'
                },
                {
                    name: 'Standard Wing 3 Sides',
                    code: 'KSW3',
                    measurements: ['Length 1', 'Length 2', 'Length 3', 'Length 4', 'Length 5', 'Length 6'],
                    formula: (measurements) => ((measurements.reduce((acc, cur) => acc + cur, 0)) * 25) / 144,
                    imageUrl: 'https://i.ibb.co/WKscbzZ/6.png'
                },
                {
                    name: 'Standard 4 Sides',
                    code: 'KS4',
                    measurements: ['Length 1', 'Length 2', 'Length 3', 'Length 4', 'Length 5', 'Length 6', 'Length 7'],
                    formula: (measurements) => {
                        const sum = measurements.reduce((acc, cur) => acc + cur, 0);
                        return ((sum / 2) * 25) / 144;
                    },
                    imageUrl: 'https://i.ibb.co/dQ4sD7Y/7.png'
                },
                {
                    name: 'Irregular L',
                    code: 'KIL',
                    measurements: ['Length 1', 'Width 1', 'Length 2'],
                    formula: (measurements) => ((measurements[0] * measurements[1]) + (measurements[2] * 25)) / 144,
                    imageUrl: 'https://i.ibb.co/8BsnF1W/11.png'
                }
            ],
            'Bartop': [
                {
                    name: 'Straight',
                    code: 'BarS',
                    measurements: ['Length', 'Width'],
                    formula: (measurements) => (measurements[0] * measurements[1]) / 144,
                    imageUrl: 'https://i.ibb.co/LhtPc1f/8.png'
                },
                {
                    name: 'Standard L',
                    code: 'BarSL',
                    measurements: ['Length 1', 'Length 2', 'Width'],
                    formula: (measurements) => ((measurements[0] + measurements[1]) * measurements[2]) / 144,
                    imageUrl: 'https://i.ibb.co/P69ZfHJ/9.png'
                },
                {
                    name: 'Irregular L',
                    code: 'BarIL',
                    measurements: ['Length 1', 'Width 1', 'Length 2', 'Width 2'],
                    formula: (measurements) => ((measurements[0] * measurements[1]) + (measurements[2] * measurements[3])) / 144,
                    imageUrl: 'https://i.ibb.co/J55R5XS/10.png'
                },
                {
                    name: 'Broken L',
                    code: 'BarBL',
                    measurements: ['Length 1', 'Length 2', 'Length 3', 'Length 4', 'Height'],
                    formula: (measurements) => {
                        const perimeter = measurements.slice(0, 4).reduce((acc, cur) => acc + cur, 0);
                        return ((perimeter / 2) * measurements[4]) / 144;
                    },
                    imageUrl: 'https://i.ibb.co/mzpQz03/11.png'
                },
                {
                    name: 'Standard 3 Sides',
                    code: 'Bar3',
                    measurements: ['Length 1', 'Length 2', 'Length 3', 'Length 4', 'Length 5', 'Length 6', 'Height'],
                    formula: (measurements) => {
                        const perimeter = measurements.slice(0, 6).reduce((acc, cur) => acc + cur, 0);
                        return ((perimeter / 2) * measurements[6]) / 144;
                    },
                    imageUrl: 'https://i.ibb.co/cg9YBY2/12.png'
                },
                {
                    name: 'Standard 4 Sides',
                    code: 'Bar4',
                    measurements: ['Length 1', 'Length 2', 'Length 3', 'Length 4', 'Length 5', 'Length 6', 'Length 7', 'Length 8', 'Height'],
                    formula: (measurements) => {
                        const perimeter = measurements.slice(0, 8).reduce((acc, cur) => acc + cur, 0);
                        return ((perimeter / 2) * measurements[8]) / 144;
                    },
                    imageUrl: 'https://i.ibb.co/qMpW4WB/13.png'
                }
            ],
            'Island': [
                {
                    name: 'Rectangle',
                    code: 'IsR',
                    measurements: ['Length', 'Width'],
                    formula: (measurements) => (measurements[0] * measurements[1]) / 144,
                    imageUrl: 'https://i.ibb.co/37bbBck/14.png'
                },
                {
                    name: 'Broken L',
                    code: 'IsBL',
                    measurements: ['Length 1', 'Length 2', 'Length 3', 'Length 4', 'Height'],
                    formula: (measurements) => {
                        const perimeter = measurements.slice(0, 4).reduce((acc, cur) => acc + cur, 0);
                        return ((perimeter / 2) * measurements[4]) / 144;
                    },
                    imageUrl: 'https://i.ibb.co/hcKgcJr/15.png'
                },
                {
                    name: '3 Sides',
                    code: 'Is3',
                    measurements: ['Length 1', 'Length 2', 'Length 3', 'Length 4', 'Length 5', 'Length 6', 'Height'],
                    formula: (measurements) => {
                        const perimeter = measurements.slice(0, 6).reduce((acc, cur) => acc + cur, 0);
                        return ((perimeter / 2) * measurements[7]) / 144;
                    },
                    imageUrl: 'https://i.ibb.co/Qv8p4Bx/16.png'
                }
            ]
        }
    };

    // Convert singular forms to match potential plural inputs
    const normalizedSubcategory = subcategory.replace(/s$/, '');
    return shapes[type] && shapes[type][normalizedSubcategory] ? shapes[type][normalizedSubcategory] : [];
}







function getTypeImageUrl(type) {
    const images = {
        'Kitchen': 'https://i.ibb.co/4phdQ5q/4.png', // New Kitchen image
        'Bathroom': 'https://i.ibb.co/RPJgsCB/2.png'  // New Bathroom image
    };
    return images[type] || 'https://via.placeholder.com/250';
}


    
    // Choose Shape for Bathroom
    function chooseShapeBathroom(container) {
        // Not needed as Bathroom doesn't have subcategories
    }
// Ensure this function is defined before it's used
function addToQuote(container, shape) {
    // Add item to the quote and calculate cost
    items.push({
        shape: shape.name,
        measurements: shape.measurements,
        backsplash: shape.hasBacksplash ? { width: shape.backsplashWidth, height: shape.backsplashHeight } : null
    });
    calculateTotalCost();

    // Now go back to the item list instead of the quote screen
    createInvoicePage(container);  // Directly go to the item list
}



function askBacksplash(container, shape) {
       container.innerHTML = ''; // Clear the container

    const header = createElement('h2', null, 'Does your countertop have a backsplash?');
    container.appendChild(header);

    // Add the backsplash image
    const imageDiv = createElement('div', 'image-container');
    const backsplashImage = createElement('img');
    backsplashImage.src = 'https://i.ibb.co/bQHKHN0/Backsplash-min.png';  // New backsplash image
    backsplashImage.alt = 'Backsplash Image';
    backsplashImage.style.width = '100%';
    backsplashImage.style.maxWidth = '400px';
    imageDiv.appendChild(backsplashImage);
    container.appendChild(imageDiv);

    // Create a button wrapper to center the buttons
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    const yesBtn = createElement('button', 'button', 'Yes');
    const noBtn = createElement('button', 'button', 'No');

    buttonWrapper.appendChild(yesBtn);
    buttonWrapper.appendChild(noBtn);

    yesBtn.addEventListener('click', () => {
        promptBacksplashDimensions(container, shape);
    });

    noBtn.addEventListener('click', () => {
        shape.hasBacksplash = false;
        addToQuote(container, shape);  // Directly go to the quote page
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

    // Only display the total price here
    const totalText = createElement('p', null, `Total Price: $${Math.ceil(totalCost)}`); // Rounded up total price
    totalText.style.fontSize = '36px';  // Make price bigger
    totalText.style.fontWeight = 'bold';
    container.appendChild(totalText);

    // Create a button wrapper for centering buttons
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    // View Price Estimate Button
    const viewEstimateBtn = createElement('button', 'button', 'View Price Estimate for Free →');
    buttonWrapper.appendChild(viewEstimateBtn);

    viewEstimateBtn.addEventListener('click', () => {
        // Collect user info or proceed to finalize quote
        collectUserInfo(container);
    });

    // Add New Countertop Button
    const addCountertopBtn = createElement('button', 'button green-button', 'Add New Countertop to Your Quote');
    buttonWrapper.appendChild(addCountertopBtn);

    addCountertopBtn.addEventListener('click', () => {
        previousPage = createQuotePage;
        addItem(container);
    });

    // Back Button
    const backButton = createElement('button', 'button back-button', 'Back');
    buttonWrapper.appendChild(backButton);

    backButton.addEventListener('click', () => {
        if (previousPage) previousPage();
    });
}


function inputMeasurements(container, shape) {
    container.innerHTML = '';

    // Extract display name without the code
    const displayName = shape.name.split(' - ')[0];
    const header = createElement('h2', null, `Configure ${displayName}`);
    container.appendChild(header);

    // Image container with proper sizing
    const imageDiv = createElement('div', 'image-container');
    const shapeImage = createElement('img');
    shapeImage.src = shape.imageUrl;
    shapeImage.alt = displayName;
    imageDiv.appendChild(shapeImage);
    container.appendChild(imageDiv);

    const form = createElement('div', 'form');
    container.appendChild(form);

    // Create measurement grid
    const measurementGrid = createElement('div', 'measurement-input');
    form.appendChild(measurementGrid);

    // Measurement Inputs
    const measurementInputs = [];
    shape.measurements.forEach((label, index) => {
        const formGroup = createElement('div', 'form-group');
        const inputLabel = createElement('label', null, label);
        const inputField = createElement('input');
        inputField.type = 'number';
        inputField.min = '0';
        inputField.step = 'any';
        inputField.placeholder = 'Enter measurement in inches';
        formGroup.appendChild(inputLabel);
        formGroup.appendChild(inputField);
        measurementGrid.appendChild(formGroup);
        measurementInputs.push(inputField);
    });

    // Button Wrapper
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    // Next Button
    const nextBtn = createElement('button', 'button', 'Next');
    buttonWrapper.appendChild(nextBtn);

    nextBtn.addEventListener('click', () => {
        const measurements = measurementInputs.map(input => parseFloat(input.value));
        if (measurements.some(value => isNaN(value) || value <= 0)) {
            alert('Please enter valid measurements for all fields.');
            return;
        }

        shape.measurements = measurements;
        askBacksplash(container, shape);
    });

    // Back Button
    const backButton = createElement('button', 'button back-button', 'Back');
    buttonWrapper.appendChild(backButton);

    backButton.addEventListener('click', () => {
        previousPage && previousPage();
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

    // Button Wrapper with spacing and centering
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    const nextBtn = createElement('button', 'button', 'Next');
    buttonWrapper.appendChild(nextBtn);

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
    buttonWrapper.appendChild(backButton);

    backButton.addEventListener('click', () => {
        inputMeasurements(container, shape);
    });
}

  // Calculate Total Cost Function
function calculateTotalCost() {
    totalCost = 0;
    items.forEach(item => {
        // Get the shape's details using the item's shape name
        const shape = getShapeByName(item.shape);
        if (shape && typeof shape.formula === 'function') {
            // Calculate the area using the shape's formula
            const area = shape.formula(item.measurements);
            
            // Determine the price per square foot based on the finish type
            let pricePerSqFt = designSelections.finishType === 'crystal' ? PRICE_CRYSTAL : PRICE_REGULAR;
            
            // Calculate the cost for the item
            let itemCost = area * pricePerSqFt;
            
            // Add backsplash cost if applicable
            if (item.backsplash) {
                // Calculate backsplash area in square feet
                const backsplashArea = (item.backsplash.width * item.backsplash.height) / 144;
                // Calculate backsplash cost
                const backsplashCost = backsplashArea * pricePerSqFt;
                itemCost += backsplashCost;
            }
            
            // Add the item's cost to the total cost
            itemCost += 50; // Add $50 to the item cost
            totalCost += itemCost;
        }
    });
    
    // Enforce the minimum price
    if (totalCost < MINIMUM_PRICE) {
        totalCost = MINIMUM_PRICE;
    }
    
    // Round up the total cost to the nearest whole number
    totalCost = Math.ceil(totalCost);
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

function createInvoicePage(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Your Quote');
    container.appendChild(header);

    // Display the item list (without showing the price)
    if (items.length > 0) {
        const itemListDiv = createElement('div', 'item-list');
        container.appendChild(itemListDiv);
        updateItemList(itemListDiv);  // Display the list of items
    } else {
        const noItems = createElement('p', null, 'No items added yet.');
        container.appendChild(noItems);
    }

    // Button wrapper for centering the buttons
    const buttonWrapper = createElement('div', 'button-wrapper'); // Centering and spacing container
    container.appendChild(buttonWrapper);

    // Proceed to Checkout Button
    if (items.length > 0) {
        const proceedBtn = createElement('button', 'button', 'View Pricing');
        buttonWrapper.appendChild(proceedBtn);

        proceedBtn.addEventListener('click', () => {
            previousPage = () => createInvoicePage(container);
            collectUserInfo(container);  // Proceed to collect user info
        });
    }

    // Add More Items Button
    const addCountertopBtn = createElement('button', 'button green-button', 'Add More Countertops');
    buttonWrapper.appendChild(addCountertopBtn);

    addCountertopBtn.addEventListener('click', () => {
        previousPage = createInvoicePage;
        addItem(container);  // Go back to adding items
    });
}



function updateItemList(itemListDiv) {
    itemListDiv.innerHTML = '<h3>Items in Your Quote:</h3>';
    
    items.forEach((item, index) => {
        const itemDiv = createElement('div', 'item');
        const descDiv = createElement('div', 'item-description');
        
        const img = createElement('img');
        const shape = getShapeByName(item.shape);
        img.src = shape.imageUrl;
        img.alt = shape.name;
        descDiv.appendChild(img);

        // Use the display name for the UI
        const descText = createElement('span', null, shape.name);
        descDiv.appendChild(descText);

        const removeBtn = createElement('button', 'item-remove', 'Remove');
        removeBtn.addEventListener('click', () => removeItem(index));

        itemDiv.appendChild(descDiv);
        itemDiv.appendChild(removeBtn);
        itemListDiv.appendChild(itemDiv);
    });
}
    
// Function to generate a more simplified description for the item
function generateItemDescription(item) {
    let typeDescription = '';

    // Determine if it's Kitchen or Bathroom
    if (designSelections.type === 'Kitchen') {
        if (item.shape.includes('Bartop')) {
            typeDescription = 'Kitchen Bartop';
        } else if (item.shape.includes('Island')) {
            typeDescription = 'Kitchen Island Countertop';
        } else {
            typeDescription = 'Kitchen Regular Countertop';
        }
    } else if (designSelections.type === 'Bathroom') {
        typeDescription = 'Bathroom Countertop';
    }

    return typeDescription; // Return the simplified description
}



    // Remove Item from Invoice
    function removeItem(index) {
        items.splice(index, 1);
        calculateTotalCost();
        const itemListDiv = document.querySelector('.item-list');
        if (itemListDiv) updateItemList(itemListDiv);
    }

function collectUserInfo(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Tell Us About You');
    container.appendChild(header);

    const description = createElement('p', null, 'Please enter your contact information. We will send you a detailed quote.');
    container.appendChild(description);

    const form = createElement('div', 'form');
    container.appendChild(form);

    // Input fields
    const nameInput = createInputField('Name', 'text');
    form.appendChild(nameInput);

    const phoneInput = createInputField('Phone Number', 'tel');
    form.appendChild(phoneInput);

    const emailInput = createInputField('Email', 'email');
    form.appendChild(emailInput);

    const zipCodeInput = createInputField('Zip Code', 'text');
    form.appendChild(zipCodeInput);

    // Submit Button
    const submitBtn = createElement('button', 'button', 'Submit');
    form.appendChild(submitBtn);

    submitBtn.addEventListener('click', () => {
        const userInfo = {
            name: nameInput.querySelector('input').value.trim(),
            phone: phoneInput.querySelector('input').value.trim(),
            email: emailInput.querySelector('input').value.trim(),
            zipCode: zipCodeInput.querySelector('input').value.trim()
        };

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

        calculateTotalCost();
        const totalPrice = totalCost;
        const itemsList = items.map(item => ({
            shape: item.shape,
            measurements: item.measurements,
            backsplash: item.backsplash
        }));
        const totalSquareFootage = items.reduce((total, item) => {
            const shape = getShapeByName(item.shape);
            return shape && typeof shape.formula === 'function'
                ? total + shape.formula(item.measurements)
                : total;
        }, 0);

        const payload = {
            userInfo,
            totalPrice,
            totalSquareFootage: Math.ceil(totalSquareFootage),
            items: itemsList
        };

        // Use window.WEBHOOK_URL directly
        fetch(window.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                alert('Your quote has been submitted successfully!');
                finalizeInvoice(container);
            } else {
                alert('Failed to submit the quote. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error sending data to webhook:', error);
            alert('Failed to submit the quote due to a network error.');
        });
    });
}




function finalizeInvoice(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Your Final Price');
    container.appendChild(header);

    // Display the total cost (rounded up) after collecting user info
    const totalText = createElement('p', null, `Total Price: $${totalCost}`);
    totalText.style.fontSize = '36px';  // Larger font for visibility
    totalText.style.fontWeight = 'bold';
    container.appendChild(totalText);

    // Create a button wrapper for centering buttons
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    // Call Now Button
    const callBtn = createElement('button', 'button', 'Call Now');
    buttonWrapper.appendChild(callBtn);

    callBtn.addEventListener('click', () => {
        alert('Calling...');
    });

    // Visualize Quote Button
    const visualizeBtn = createElement('button', 'button', 'Visualize Your Quote');
    buttonWrapper.appendChild(visualizeBtn);

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

  


// Function to get shapes for types (for Bathroom if needed)
function getShapesForType(type) {
    const shapes = {
        'Bathroom': [
            {
                name: 'Standard - BathS',
                code: 'BathS',
                measurements: ['Length'],
                formula: (measurements) => (measurements[0] * 22) / 144,
                imageUrl: 'https://i.ibb.co/47FGwJg/17.png'
            },
            {
                name: 'Standard L - BathL',
                code: 'BathL',
                measurements: ['Length 1', 'Length 2'],
                formula: (measurements) => ((measurements[0] + measurements[1]) * 22) / 144,
                imageUrl: 'https://i.ibb.co/Dwx1Rsw/18.png'
            },
            {
                name: 'Standard 3 Sides - Bath3',
                code: 'Bath3',
                measurements: ['Length 1', 'Length 2', 'Length 3', 'Length 4', 'Length 5', 'Length 6'],
                formula: (measurements) => {
                    const perimeter = measurements.reduce((acc, cur) => acc + cur, 0);
                    return ((perimeter / 2) * 22) / 144;
                },
                imageUrl: 'https://i.ibb.co/JHrP44S/19.png'
            }
        ]
    };

    return shapes[type] || [];
}


    // Calculate and Add Item to Invoice (Unused in streamlined flow)
    // Removed individual item addition steps as per user request

    // Finalize the Interface
    initInterface();
})();
