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
    transition: all 0.3s ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    max-width: 200px;
}

.button:hover {
    background-color: #004C99;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.button.green-button {
    background-color: #28a745;
    color: #ffffff;
}

.button.green-button:hover {
    background-color: #218838;
}

.button.red-button {
    background-color: #dc3545;
}

.button.red-button:hover {
    background-color: #c82333;
}

/* Grid Layout for Buttons/Images */
.button-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    width: 100%;
    padding: 20px;
    justify-items: center;
}

.image-button {
    position: relative;
    width: 300px;
    aspect-ratio: 1/1;
    border: 2px solid #000000;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    margin: 20px auto;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

/* Shape Container */
.shape-container {
    display: grid; /* Use grid layout */
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
    gap: 20px; /* Space between items */
    justify-items: center; /* Center items horizontally */
    align-items: start; /* Align items vertically to the start */
    width: 100%; /* Full width of the parent container */
    padding: 20px; /* Add padding for spacing */
}

/* Shape Diagram */
.shape-diagram {
    width: 300px; /* Fixed width for uniformity */
    height: 200px; /* Fixed height for uniformity */
    background-size: contain; /* Ensure the image fits */
    background-repeat: no-repeat; /* Prevent tiling */
    background-position: center; /* Center the image */
    background-color: #f5f5f5; /* Subtle background for contrast */
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    overflow: hidden; /* Prevent content overflow */
    display: flex; /* Flexible layout */
    align-items: center; /* Center content vertically */
    justify-content: center; /* Center content horizontally */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth hover effect */
}

/* Hover Effect */
.shape-diagram:hover {
    transform: scale(1.05); /* Slightly enlarge on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhance shadow on hover */
    border: 2px solid #0264D9; /* Add border on hover */
}

/* Shape Label */
.shape-label {
    margin-top: 10px; /* Space between image and label */
    text-align: center; /* Center align text */
    font-size: 16px; /* Adjust font size */
    font-weight: bold; /* Make text bold */
    color: #333; /* Dark text color */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .shape-diagram {
        width: 250px; /* Smaller width for narrow screens */
        height: 150px; /* Adjust height proportionally */
    }

    .shape-label {
        font-size: 14px; /* Adjust label font size for smaller screens */
    }
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

/* For measurement page diagrams */
.image-container img.shape-diagram {
    max-width: 600px;
    aspect-ratio: 16/9;
    object-fit: contain;
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

/* Measurement Input */
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
        width: 250px;
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

    .button-group {
        grid-template-columns: 1fr;
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

    function createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}


function createImageButton(text, imageUrl, isShapeDiagram = false) {
    const button = createElement('div', 'image-button');
    
    // Add `shape-diagram` class only if `isShapeDiagram` is true
    if (isShapeDiagram) {
        button.classList.add('shape-diagram');
    }
    
    button.style.backgroundImage = `url(${imageUrl})`;

    // Extract only the display name part before the code
    const displayName = text.split(' - ')[0];
    
    // Adding the text below the image
    const label = createElement('div', 'image-label', displayName);
    button.appendChild(label);
    
    return button;
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

        // Use singular forms for subcategories
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
        const shapeContainer = createElement('div', 'shape-container'); // Use uniform class for shapes
        container.appendChild(shapeContainer);

        const shapes = getShapesForType(designSelections.type); // Fetch bathroom shapes
        shapes.forEach(shape => {
            const shapeDiagram = createShapeDiagram(shape.name, shape.imageUrl); // Use the updated function
            shapeContainer.appendChild(shapeDiagram);

            shapeDiagram.addEventListener('click', () => {
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

    function createShapeDiagram(name, imageUrl) {
    const diagram = createElement('div', 'shape-diagram'); // Use uniform class
    diagram.style.backgroundImage = `url(${imageUrl})`;

    const label = createElement('div', 'shape-label', name); // Add label below
    const wrapper = createElement('div', 'shape-button-wrapper'); // Wrap for alignment
    wrapper.appendChild(diagram);
    wrapper.appendChild(label);

    return wrapper;
}


function createShapeDiagramButton(text, imageUrl) {
    const button = createElement('div', 'shape-diagram'); // Applies 'shape-diagram' class universally
    button.style.backgroundImage = `url(${imageUrl})`;

    // Add label container that sits below the shape diagram
    const labelContainer = createElement('div', 'image-label');
    labelContainer.textContent = text.split(' - ')[0];  // Remove code from display name
    
    // Create wrapper to hold both diagram and label
    const wrapper = createElement('div', 'shape-button-wrapper');
    wrapper.appendChild(button);
    wrapper.appendChild(labelContainer);

    return wrapper;
}


    
function getSubcategoryImageUrl(subcategory) {
    // Remove trailing 's' if present
    const singular = subcategory.replace(/s$/, '');
    
    const images = {
        'Bartop': 'https://i.ibb.co/T0fnP1g/2.png',
        'Countertop': 'https://i.ibb.co/ypYDVTk/1.png',
        'Island': 'https://i.ibb.co/BKhZY1V/3.png'
    };
    return images[singular] || 'https://via.placeholder.com/250';
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
        const shapeBtn = createShapeDiagramButton(shape.name, shape.imageUrl);
        shapeContainer.appendChild(shapeBtn);

        shapeBtn.addEventListener('click', () => {
            previousPage = () => chooseShape(container, singularSubcategory);
            inputMeasurements(container, shape);
        });
    });

    // Button wrapper for navigation buttons
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    // Button text changed from "View Quote" to "See Available Shapes"
    const viewShapesBtn = createElement('button', 'button', 'Back To Quote');
    container.appendChild(viewShapesBtn);

    viewShapesBtn.addEventListener('click', () => {
        previousPage = () => chooseShape(container, subcategory);
        createInvoicePage(container);
    });

    // Back Button
    const backButton = createElement('button', 'button back-button', 'Back');
    buttonWrapper.appendChild(backButton);

    backButton.addEventListener('click', () => {
        if (previousPage) previousPage();
    });
}




function getShapesForSubcategory(type, subcategory) {

     const subcategoryMap = {
        'Countertop': 'Countertop',
        'Bartop': 'Bartop',
        'Island': 'Island'
    };

    const normalizedSubcategory = subcategoryMap[subcategory] || subcategory;
    
    const shapes = {
        'Kitchen': {
            'Countertop': [
                {
                    name: 'Standard',
                    code: 'KS',
                                        type: 'Countertop', // Add the type field

                    measurements: ['Measurement 1'],
                    formula: (measurements) => ((measurements[0] * 25) / 144),
                    imageUrl: 'https://i.ibb.co/nn8k8Bf/1.png'
                },
                {
                    name: 'Standard L',
                    code: 'KSL',
                                        type: 'Countertop', // Add the type field

                    measurements: ['Measurement 1', 'Measurement 2'],
                    formula: (measurements) => (((measurements[0] + measurements[1]) / 2 * 25) / 144),
                    imageUrl: 'https://i.ibb.co/ZdMvxQK/2.png'
                },
                {
                    name: 'Standard 3 Sides',
                    code: 'KS3',
                                        type: 'Countertop', // Add the type field

                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3'],
                    formula: (measurements) => (((measurements[0] + measurements[1] + measurements[2]) * 25) / 144),
                    imageUrl: 'https://i.ibb.co/B28cv3j/3.png'
                },
                {
                    name: 'Standard Broken L',
                    code: 'KSBL',
                                        type: 'Countertop', // Add the type field

                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4'],
                    formula: (measurements) => (((measurements[0] + measurements[1] + measurements[2] + measurements[3])) / 2 * 25/ 144),
                    imageUrl: 'https://i.ibb.co/5kb4k7G/4.png'
                },
                {
                    name: 'Standard Wing',
                    code: 'KSW',
                                        type: 'Countertop', // Add the type field

                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3'],
                    formula: (measurements) => {
                        const part1 = ((measurements[0] + measurements[1] + (measurements[2] / 2)) * 25);
                        const part2 = ((measurements[2] / 2) * (measurements[2] / 2) * 0.5);
                        return (part1 + part2) / 144;
                    },
                    imageUrl: 'https://i.ibb.co/qnLVKrS/5.png'
                },
                {
                    name: 'Standard Wing 3 Sides',
                    code: 'KSW3',
                                        type: 'Countertop', // Add the type field

                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4', 'Measurement 5', 'Measurement 6'],
                    formula: (measurements) => {
                        const perimeter = (measurements[0] + measurements[1] + measurements[2] + measurements[3] + measurements[4] + measurements[5]) / 2;
                        return ((perimeter * 25) / 144);
                    },
                    imageUrl: 'https://i.ibb.co/WKscbzZ/6.png'
                },
                {
                    name: 'Standard 4 Sides',
                    code: 'KS4',
                                        type: 'Countertop', // Add the type field

                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4', 'Measurement 5', 'Measurement 6', 'Measurement 7'],
                    formula: (measurements) => {
                        const perimeter = (measurements[0] + measurements[1] + measurements[2] + measurements[3] + measurements[4] + measurements[5]) / 2;
                        return ((perimeter * 25) + (measurements[6] * 25)) / 144;
                    },
                    imageUrl: 'https://i.ibb.co/dQ4sD7Y/7.png'
                },
         {
                name: 'Irregular L',
                code: 'KIL',
                                 type: 'Countertop', // Add the type field

                measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3'],
                formula: (measurements) => ((measurements[0] * measurements[1]) + (measurements[2] * 25)) / 144,
                imageUrl: 'https://i.ibb.co/LhtPc1f/8.png'
          }
                ],
            'Bartop': [
                {
                    name: 'Straight',
                    code: 'BarS',
                    type: 'Bartop', // Add the type field
                    measurements: ['Measurement 1', 'Measurement 2'],
                    formula: (measurements) => ((measurements[0] * measurements[1]) / 144),
                    imageUrl: 'https://i.ibb.co/P69ZfHJ/9.png'
                },
                {
                    name: 'Standard L',
                    code: 'BarSL',
                    type: 'Bartop', // Add the type field
                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3'],
                    formula: (measurements) => (((measurements[0] + measurements[1]) / 2 * measurements[2]) / 144),
                    imageUrl: 'https://i.ibb.co/J55R5XS/10.png'
                },
                {
                    name: 'Irregular L',
                    code: 'BarIL',
                    type: 'Bartop', // Add the type field
                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4'],
                    formula: (measurements) => (((measurements[0] * measurements[1]) + (measurements[2] * measurements[3])) / 144),
                    imageUrl: 'https://i.ibb.co/mzpQz03/11.png'
                },
                {
                    name: 'Broken L',
                    code: 'BarBL',
                    type: 'Bartop', // Add the type field
                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4', 'Measurement 5'],
                    formula: (measurements) => {
                        const perimeter = (measurements[0] + measurements[1] + measurements[2] + measurements[3]) / 2;
                        return ((perimeter * measurements[4]) / 144);
                    },
                    imageUrl: 'https://i.ibb.co/cg9YBY2/12.png'
                },
               {
    name: 'Standard 3 Sides',
    code: 'Bar3',
                   type: 'Bartop', // Add the type field
    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4', 'Measurement 5', 'Measurement 6', 'Measurement 7'],
    formula: (measurements) => {
        const perimeter = (measurements[0] + measurements[1] + measurements[2] + measurements[3] + measurements[4] + measurements[5]) / 2;
        return ((perimeter * measurements[6]) / 144);
    },
    imageUrl: 'https://i.ibb.co/qMpW4WB/13.png'
},
{
    name: 'Standard 4 Sides',
    code: 'Bar4',
    type: 'Bartop', // Add the type field
    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4', 'Measurement 5', 'Measurement 6', 'Measurement 7', 'Measurement 8', 'Measurement 9'],
    formula: (measurements) => {
        const perimeter = (measurements[0] + measurements[1] + measurements[2] + measurements[3] + measurements[4] + measurements[5] + measurements[6] + measurements[7]) / 2;
        return ((perimeter * measurements[8]) / 144);
    },
    imageUrl: 'https://i.ibb.co/37bbBck/14.png'
}

            ],
            'Island': [
                {
                    name: 'Rectangle',
                    code: 'IsR',
                    type: 'Island', // Add the type field
                    measurements: ['Measurement 1', 'Measurement 2'],
                    formula: (measurements) => ((measurements[0] * measurements[1]) / 144),
                    imageUrl: 'https://i.ibb.co/Dwx1Rsw/18.png'
                },
                {
                    name: 'Broken L',
                    code: 'IsBL',
                    type: 'Island', // Add the type field
                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4', 'Measurement 5'],
                    formula: (measurements) => {
                        const perimeter = (measurements[0] + measurements[1] + measurements[2] + measurements[3]) / 2;
                        return ((perimeter * measurements[4]) / 144);
                    },
                    imageUrl: 'https://i.ibb.co/JHrP44S/19.png'
                },
                {
                    name: '3 Sides',
                    code: 'Is3',
                    type: 'Island', // Add the type field
                    measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4', 'Measurement 5', 'Measurement 6', 'Measurement 7'],
                    formula: (measurements) => {
                        const perimeter = (measurements[0] + measurements[1] + measurements[2] + measurements[3] + measurements[4] + measurements[5]) / 2;
                        return ((perimeter * measurements[6]) / 144);
                    },
                    imageUrl: 'https://i.ibb.co/HtZy3kR/20.png'
                }
            ]
        }
    };

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
function addToQuote(container, shape) {
    const itemToAdd = {
        category: designSelections.type, // 'Kitchen' or 'Bathroom'
        type: shape.type, // Use the new `type` field from the shape
        shape: shape.name,
        measurements: shape.measurements,
        backsplash: shape.hasBacksplash ? {
            width: shape.backsplashWidth,
            height: shape.backsplashHeight
        } : null
    };

    console.log("Item being added:", itemToAdd); // Debug log
    items.push(itemToAdd);
    calculateTotalCost();
    createInvoicePage(container);
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

function calculateTotalCost() {
    console.log('Starting calculation...');
    totalCost = 0;

    items.forEach((item, index) => {
        console.log(`\nProcessing item ${index}:`, item);

        const shape = (item.shape);
        if (!shape) {
            console.error('Shape not found:', item.shape);
            return;
        }

        // Debug formula and measurements
        console.log('Shape formula:', shape.formula.toString());
        console.log('Shape measurements:', item.measurements);

        // Calculate base area
        const area = shape.formula(item.measurements);
        console.log('Area calculated:', area);

        // Debug price per square foot
        const pricePerSqFt = designSelections.finishType === 'crystal' ? PRICE_CRYSTAL : PRICE_REGULAR;
        console.log('Price per square foot:', pricePerSqFt);

        // Calculate base cost
        let itemCost = area * pricePerSqFt;
        console.log('Base cost:', itemCost);

        // Add backsplash if present
        if (item.backsplash) {
            const backsplashArea = (item.backsplash.width * item.backsplash.height) / 144;
            const backsplashCost = backsplashArea * pricePerSqFt;
            itemCost += backsplashCost;
            console.log('Added backsplash cost:', backsplashCost);
        }

        totalCost += itemCost;
    });

    // Debug base fee addition
    totalCost += 50;
    console.log('Added $50 base fee to final total cost.');

    // Debug minimum price logic
    totalCost = Math.max(totalCost, MINIMUM_PRICE);
    totalCost = Math.ceil(totalCost);
    console.log('Final total cost:', totalCost);

    return totalCost;
}




// Helper function to debug pricing
function debugPricing(item) {
    const shape = getShapeByName(item.shape);
    const baseArea = shape.formula(item.measurements);
    const pricePerSqFt = designSelections.finishType === 'crystal' ? PRICE_CRYSTAL : PRICE_REGULAR;
    const baseCost = baseArea * pricePerSqFt;
    
    console.log({
        shape: item.shape,
        measurements: item.measurements,
        baseArea: baseArea.toFixed(2) + ' sq ft',
        pricePerSqFt: '$' + pricePerSqFt,
        baseCost: '$' + baseCost.toFixed(2),
        backsplash: item.backsplash ? {
            area: ((item.backsplash.width * item.backsplash.height) / 144).toFixed(2) + ' sq ft',
            cost: '$' + ((item.backsplash.width * item.backsplash.height) / 144 * pricePerSqFt).toFixed(2)
        } : 'none'
    })};

function getShapeByName(name) {
    let shape;

    // Search Kitchen shapes first
    const kitchenSubcategories = ['Countertop', 'Bartop', 'Island'];
    for (const subcategory of kitchenSubcategories) {
        const shapes = getShapesForSubcategory('Kitchen', subcategory);
        shape = shapes.find(s => s.name === name);
        if (shape) break;
    }

    // Search Bathroom shapes if not found in Kitchen
    if (!shape) {
        const bathroomShapes = getShapesForType('Bathroom');
        shape = bathroomShapes.find(s => s.name === name);
    }

    if (!shape) {
        console.warn(`Shape with name "${name}" not found in any category.`);
    }

    return shape;
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



// Update the updateItemList function to use generateItemDescription
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

        // Use the updated description for the UI, which includes the category
        const descText = createElement('span', null, generateItemDescription(item));
        descDiv.appendChild(descText);

        const removeBtn = createElement('button', 'item-remove', 'Remove');
        removeBtn.addEventListener('click', () => removeItem(index));

        itemDiv.appendChild(descDiv);
        itemDiv.appendChild(removeBtn);
        itemListDiv.appendChild(itemDiv);
    });
}
    
function generateItemDescription(item) {
    const category = item.category || 'Unknown';
    const subcategory = item.subcategory || 'Unknown'; // Use the `type` field from shape
    const shapeName = item.shape || 'Unknown';

    return `${category} ${subcategory} - ${shapeName}`;
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
        
        // Prepare items list with codes
        const itemsList = items.map(item => {
            const shape = getShapeByName(item.shape);
            return {
                code: shape.code,
                measurements: item.measurements,
                backsplash: item.backsplash
            };
        });

        // Calculate total square footage
        const totalSquareFootage = items.reduce((total, item) => {
            const shape = getShapeByName(item.shape);
            return shape && typeof shape.formula === 'function'
                ? total + shape.formula(item.measurements)
                : total;
        }, 0);

      const payload = {
    userInfo,
    totalCost,  // Use totalCost here instead of totalPrice
    totalSquareFootage: Math.ceil(totalSquareFootage),
    items: itemsList
};


        fetch(window.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                finalizeInvoice(container);
            } else {
                alert('Failed to submit the quote. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error sending data to webhook:', error);
        });
    });
}




function finalizeInvoice(container) {
    container.innerHTML = '';

    const header = createElement('h2', null, 'Your Final Price');
    container.appendChild(header);

    // Display the total cost (rounded up) after collecting user info
    const totalText = createElement('p', null, `Total Price: $${Math.ceil(totalCost)}`);
    totalText.style.fontSize = '36px';  // Larger font for visibility
    totalText.style.fontWeight = 'bold';
    container.appendChild(totalText);

    // Create a button wrapper for centering buttons
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    // "I'm Interested" Button
    const interestedBtn = createElement('button', 'button', "I'm Interested");
    buttonWrapper.appendChild(interestedBtn);

    interestedBtn.addEventListener('click', () => {
        showInterestedScreen(container);  // Function to show the interested response screen
    });

    // "Not Interested At This Time" Button
    const notInterestedBtn = createElement('button', 'button', 'Not Interested At This Time');
    buttonWrapper.appendChild(notInterestedBtn);

    notInterestedBtn.addEventListener('click', () => {
        showNotInterestedScreen(container);  // Function to show the not interested response screen
    });
}

// Show the "Interested" response screen
function showInterestedScreen(container) {
    container.innerHTML = '';  // Clear the screen
    
    const message = createElement('h2', null, 'Thank you for your interest!');
    message.style.textAlign = 'center';
    container.appendChild(message);

    const description = createElement('p', null, "One of our agents will reach out to you shortly to discuss your quote in detail. We appreciate your consideration and look forward to assisting with your project!");
    description.style.textAlign = 'center';
    container.appendChild(description);

    addFinalScreenButtons(container);
}

// Show the "Not Interested" response screen
function showNotInterestedScreen(container) {
    container.innerHTML = '';  // Clear the screen
    
    const message = createElement('h2', null, "We're sorry to hear that.");
    message.style.textAlign = 'center';
    container.appendChild(message);

    const description = createElement('p', null, "Feel free to give us a call to discuss any questions you may have about your quote. Our team is here to help you explore all your options.");
    description.style.textAlign = 'center';
    container.appendChild(description);

    addFinalScreenButtons(container);
}

// Add "Call Us" and "Get Another Quote" buttons to the final screens
function addFinalScreenButtons(container) {
    const buttonWrapper = createElement('div', 'button-wrapper');
    container.appendChild(buttonWrapper);

    // "Call Us" Button
    const callUsBtn = createElement('button', 'button green-button', 'Call Us Now');
    callUsBtn.addEventListener('click', () => {
        window.location.href = 'tel:+13523063106';  // Replace with your actual contact number
    });
    buttonWrapper.appendChild(callUsBtn);

    // "Get Another Quote" Button
    const newQuoteBtn = createElement('button', 'button', 'Get Another Quote');
    newQuoteBtn.addEventListener('click', () => {
        initInterface();  // Restart the quote process
    });
    buttonWrapper.appendChild(newQuoteBtn);
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
// Bathroom Shapes
function getShapesForType(type) {
    const shapes = {
        'Bathroom': [
         {
            name: 'Standard',
            code: 'BathS',
            type: ' ', // Add the type field
            measurements: ['Measurement 1'], // Only one measurement
            formula: (measurements) => ((measurements[0] * 22) / 144), // Correct depth
            imageUrl: 'https://i.ibb.co/hcKgcJr/15.png'
            },
            {
                name: 'Standard L',
                code: 'BathL',
                type: ' ', // Add the type field
                measurements: ['Measurement 1', 'Measurement 2'],
                formula: (measurements) => (((measurements[0] + measurements[1]) * 22) / 144),
                imageUrl: 'https://i.ibb.co/Qv8p4Bx/16.png'
            },
            {
                name: 'Standard 3 Sides',
                code: 'Bath3',
                type: ' ', // Add the type field
                measurements: ['Measurement 1', 'Measurement 2', 'Measurement 3', 'Measurement 4', 'Measurement 5', 'Measurement 6'],
                formula: (measurements) => {
                    const perimeter = (measurements[0] + measurements[1] + measurements[2] + measurements[3] + measurements[4] + measurements[5]) / 2;
                    return ((perimeter * 22) / 144);
                },
                imageUrl: 'https://i.ibb.co/47FGwJg/17.png'
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
