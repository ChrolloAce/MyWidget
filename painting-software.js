(function () {
    const pricingOptions = {
        economical: 1.5,
        standard: 2.0,
        premium: 3.0
    };

    const additionalCosts = {
        insuranceFee: 200,
        occupiedFee: 0.25,
        darkWallFee: 0.5,
        texturedWallFee: 0.75,
        wallpaperRemoval: 1.5,
        furnitureCoverage: { standard: 50, complex: 100 },
        bathtubFee: 250,
        stairStepFee: 50,
        stairRailingFee: 5,
        cabinetHandleFee: 10,
        metalWallFee: 2.0
    };

    let rooms = [];
    let totalCost = 0;

    // Function to create and append CSS styles dynamically
    function injectStyles() {
        const styles = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Montserrat', sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }

            .container {
                width: 100%;
                max-width: 900px;
                background: #fff;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                text-align: center;
            }

            h1, h2 {
                text-align: center;
                margin-bottom: 20px;
            }

            .button {
                display: inline-block;
                padding: 12px 20px;
                margin: 10px;
                background-color: #00D0FF;
                color: #fff;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
                text-align: center;
                transition: 0.3s ease-in-out;
            }

            .button:hover {
                background-color: #0078a6;
            }

            .button-group {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 15px;
            }

            .back-button {
                background-color: #666;
            }

            .form-group {
                margin: 20px 0;
                text-align: left;
            }

            .form-group label {
                display: block;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .form-group input,
            .form-group select {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 8px;
            }

            .room-summary {
                margin: 20px 0;
                background: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #ddd;
                text-align: left;
            }

            .room-summary h3 {
                margin-bottom: 10px;
            }

            .summary-total {
                text-align: right;
                font-size: 20px;
                font-weight: bold;
                margin-top: 20px;
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    // Create reusable element creation function
    function createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    // Initialize the interface
    function initInterface() {
        const app = document.createElement('div');
        app.className = 'container';
        app.id = 'app';
        document.body.innerHTML = '';
        document.body.appendChild(app);

        const header = createElement('h1', null, 'Painting Quote Software');
        app.appendChild(header);

        const startButton = createElement('button', 'button', 'Begin Quote');
        startButton.addEventListener('click', startGeneralQuestions);
        app.appendChild(startButton);
    }

    function startGeneralQuestions() {
        const app = document.getElementById('app');
        app.innerHTML = '<h2>General Questions</h2>';

        const form = document.createElement('div');
        form.className = 'form-group';
        form.innerHTML = `
            <label>Is this a residential or commercial property?</label>
            <select id="jobType">
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
            </select>
        `;
        app.appendChild(form);

        const buttonGroup = createElement('div', 'button-group');
        app.appendChild(buttonGroup);

        const nextButton = createElement('button', 'button', 'Next');
        nextButton.addEventListener('click', () => {
            const jobType = document.getElementById('jobType').value;
            if (jobType === 'residential') askResidentialDetails();
            else askCommercialDetails();
        });
        buttonGroup.appendChild(nextButton);

        const backButton = createElement('button', 'button back-button', 'Back');
        backButton.addEventListener('click', initInterface);
        buttonGroup.appendChild(backButton);
    }

    function askResidentialDetails() {
        const app = document.getElementById('app');
        app.innerHTML = '<h2>Residential Details</h2>';

        const form = document.createElement('div');
        form.className = 'form-group';
        form.innerHTML = `
            <label>Is the property over 2 floors?</label>
            <select id="residentialFloors">
                <option value="under2">Under 2 Floors</option>
                <option value="over2">Over 2 Floors</option>
            </select>
        `;
        app.appendChild(form);

        const buttonGroup = createElement('div', 'button-group');
        app.appendChild(buttonGroup);

        const nextButton = createElement('button', 'button', 'Next');
        nextButton.addEventListener('click', () => {
            const residentialFloors = document.getElementById('residentialFloors').value;
            if (residentialFloors === 'over2') totalCost += additionalCosts.insuranceFee;
            setupRoomQuestions();
        });
        buttonGroup.appendChild(nextButton);
    }

    function askCommercialDetails() {
        const app = document.getElementById('app');
        app.innerHTML = '<h2>Commercial Details</h2>';

        const form = document.createElement('div');
        form.className = 'form-group';
        form.innerHTML = `
            <label>Is the property over X height? (Requires additional equipment)</label>
            <select id="commercialHeight">
                <option value="under">Under X Height</option>
                <option value="over">Over X Height</option>
            </select>
        `;
        app.appendChild(form);

        const buttonGroup = createElement('div', 'button-group');
        app.appendChild(buttonGroup);

        const nextButton = createElement('button', 'button', 'Next');
        nextButton.addEventListener('click', setupRoomQuestions);
        buttonGroup.appendChild(nextButton);
    }

    function setupRoomQuestions() {
        const app = document.getElementById('app');
        app.innerHTML = '<h2>Room Setup</h2>';

        const buttonGroup = createElement('div', 'button-group');
        app.appendChild(buttonGroup);

        const addRoomButton = createElement('button', 'button', 'Add Room');
        addRoomButton.addEventListener('click', addRoom);
        buttonGroup.appendChild(addRoomButton);

        const viewSummaryButton = createElement('button', 'button', 'View Summary');
        viewSummaryButton.addEventListener('click', viewSummary);
        buttonGroup.appendChild(viewSummaryButton);
    }

    function addRoom() {
        const app = document.getElementById('app');
        app.innerHTML = '<h2>Add Room</h2>';

        const form = document.createElement('div');
        form.className = 'form-group';
        form.innerHTML = `
            <label>Select Package:</label>
            <select id="package">
                <option value="economical">Economical ($1.50 per sq. ft.)</option>
                <option value="standard">Standard ($2.00 per sq. ft.)</option>
                <option value="premium">Premium ($3.00 per sq. ft.)</option>
            </select>
            <label>Enter Square Footage:</label>
            <input type="number" id="sqft" placeholder="e.g., 500">
        `;
        app.appendChild(form);

        const buttonGroup = createElement('div', 'button-group');
        app.appendChild(buttonGroup);

        const addItemButton = createElement('button', 'button', 'Add Items');
        addItemButton.addEventListener('click', () => addRoomItems(form));
        buttonGroup.appendChild(addItemButton);

        const saveButton = createElement('button', 'button', 'Save Room');
        saveButton.addEventListener('click', () => {
            const packageType = document.getElementById('package').value;
            const sqft = parseFloat(document.getElementById('sqft').value) || 0;
            const cost = sqft * pricingOptions[packageType];
            rooms.push({ packageType, sqft, cost });
            setupRoomQuestions();
        });
        buttonGroup.appendChild(saveButton);

        const backButton = createElement('button', 'button back-button', 'Back');
        backButton.addEventListener('click', setupRoomQuestions);
        buttonGroup.appendChild(backButton);
    }

    function addRoomItems(form) {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <label>Add Items to Room:</label>
            <select id="roomItems">
                <option value="bathtub">Bathtub ($250)</option>
                <option value="stairSteps">Stair Steps ($50 per step)</option>
                <option value="cabinetHandles">Cabinet Handles ($10 each)</option>
            </select>
        `;
        form.appendChild(itemDiv);
    }

    function viewSummary() {
        const app = document.getElementById('app');
        app.innerHTML = '<h2>Quote Summary</h2>';

        rooms.forEach((room, index) => {
            const roomDiv = createElement('div', 'room-summary');
            roomDiv.innerHTML = `
                <h3>Room ${index + 1}</h3>
                <p>Package: ${room.packageType}</p>
                <p>Square Footage: ${room.sqft}</p>
                <p>Cost: $${room.cost.toFixed(2)}</p>
            `;
            app.appendChild(roomDiv);
        });

        const totalDiv = createElement('p', 'summary-total', `Total: $${totalCost.toFixed(2)}`);
        app.appendChild(totalDiv);

        const finishButton = createElement('button', 'button', 'Finish');
        finishButton.addEventListener('click', initInterface);
        app.appendChild(finishButton);
    }

    injectStyles();
    initInterface();
})();
