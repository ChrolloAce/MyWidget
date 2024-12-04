(function () {
    let reports = [];
    let snippets = [];

    // Monochrome Style Injection
    (function injectStyles() {
        const styles = `
            body {
                margin: 0;
                font-family: 'Arial', sans-serif;
                background: #f5f5f5;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                min-height: 100vh;
                padding: 20px;
            }
            .container {
                width: 90%;
                max-width: 1200px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                margin: 20px 0;
            }
            h1, h2 {
                color: #222;
                margin-bottom: 10px;
            }
            .button {
                background-color: #555;
                color: #fff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-right: 10px;
                font-size: 14px;
            }
            .button:hover {
                background-color: #333;
            }
            .button-group {
                margin: 20px 0;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            .form-group {
                margin-bottom: 15px;
            }
            label {
                display: block;
                font-weight: bold;
                margin-bottom: 5px;
            }
            input, textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 14px;
            }
            .snippet, .photo-section {
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-bottom: 10px;
                background-color: #f9f9f9;
            }
            .snippet-title, .photo-title {
                font-weight: bold;
                margin-bottom: 10px;
                color: #444;
            }
            .photo-img {
                width: 100%;
                max-height: 300px;
                object-fit: cover;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
        `;
        const styleElement = document.createElement("style");
        styleElement.type = "text/css";
        styleElement.appendChild(document.createTextNode(styles));
        document.head.appendChild(styleElement);
    })();

    // Helper Function: Create DOM Elements
    function createElement(tag, className, textContent) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (textContent) el.textContent = textContent;
        return el;
    }

    // Main Dashboard Initialization
    function initDashboard() {
        const container = createElement("div", "container");
        document.body.innerHTML = "";
        document.body.appendChild(container);

        const header = createElement("h1", null, "Report Dashboard");
        container.appendChild(header);

        // Button Group
        const buttonGroup = createElement("div", "button-group");
        container.appendChild(buttonGroup);

        const addPhotoBtn = createElement("button", "button", "Add Photo Section");
        addPhotoBtn.addEventListener("click", () => addPhotoSection(container));
        buttonGroup.appendChild(addPhotoBtn);

        const addSnippetBtn = createElement("button", "button", "Add Snippet");
        addSnippetBtn.addEventListener("click", () => addSnippet(container));
        buttonGroup.appendChild(addSnippetBtn);

        const generateReportBtn = createElement("button", "button", "Generate Report");
        generateReportBtn.addEventListener("click", () => generateReport(container));
        buttonGroup.appendChild(generateReportBtn);

        // Display Sections
        displaySections(container);
    }

    // Display Photos and Snippets
    function displaySections(container) {
        const photoHeader = createElement("h2", null, "Photo Sections");
        container.appendChild(photoHeader);

        reports.forEach((photo, index) => {
            const photoDiv = createElement("div", "photo-section");
            const title = createElement("div", "photo-title", photo.title);
            const img = createElement("img", "photo-img");
            img.src = photo.image;

            const itemList = createElement("ul", null);
            photo.items.forEach(item => {
                const li = createElement("li", null, item);
                itemList.appendChild(li);
            });

            const removeBtn = createElement("button", "button red", "Remove");
            removeBtn.addEventListener("click", () => {
                reports.splice(index, 1);
                initDashboard();
            });

            photoDiv.appendChild(title);
            photoDiv.appendChild(img);
            photoDiv.appendChild(itemList);
            photoDiv.appendChild(removeBtn);
            container.appendChild(photoDiv);
        });

        const snippetHeader = createElement("h2", null, "Snippets");
        container.appendChild(snippetHeader);

        snippets.forEach((snippet, index) => {
            const snippetDiv = createElement("div", "snippet");
            const title = createElement("div", "snippet-title", snippet.title);
            const text = createElement("p", null, snippet.content);

            const removeBtn = createElement("button", "button red", "Remove");
            removeBtn.addEventListener("click", () => {
                snippets.splice(index, 1);
                initDashboard();
            });

            snippetDiv.appendChild(title);
            snippetDiv.appendChild(text);
            snippetDiv.appendChild(removeBtn);
            container.appendChild(snippetDiv);
        });
    }

    // Add Photo Section
    function addPhotoSection(container) {
        container.innerHTML = "";
        const form = createElement("div", "form-group");

        const titleInput = createInputField("Photo Title");
        form.appendChild(titleInput);

        const imageInput = createInputField("Photo URL");
        form.appendChild(imageInput);

        const itemsInput = createTextareaField("Itemized List (Comma Separated)");
        form.appendChild(itemsInput);

        const addBtn = createElement("button", "button", "Add Photo");
        addBtn.addEventListener("click", () => {
            reports.push({
                title: titleInput.querySelector("input").value,
                image: imageInput.querySelector("input").value,
                items: itemsInput.querySelector("textarea").value.split(","),
            });
            initDashboard();
        });
        form.appendChild(addBtn);
        container.appendChild(form);
    }

    // Add Snippet
    function addSnippet(container) {
        container.innerHTML = "";
        const form = createElement("div", "form-group");

        const titleInput = createInputField("Snippet Title");
        form.appendChild(titleInput);

        const contentInput = createTextareaField("Snippet Content");
        form.appendChild(contentInput);

        const addBtn = createElement("button", "button", "Add Snippet");
        addBtn.addEventListener("click", () => {
            snippets.push({
                title: titleInput.querySelector("input").value,
                content: contentInput.querySelector("textarea").value,
            });
            initDashboard();
        });
        form.appendChild(addBtn);
        container.appendChild(form);
    }

    // Generate Report
    function generateReport(container) {
        container.innerHTML = "";
        const header = createElement("h1", null, "Generated Report");
        container.appendChild(header);

        reports.forEach(photo => {
            const photoDiv = createElement("div", "photo-section");
            const title = createElement("div", "photo-title", photo.title);
            const img = createElement("img", "photo-img");
            img.src = photo.image;

            const itemList = createElement("ul", null);
            photo.items.forEach(item => {
                const li = createElement("li", null, item);
                itemList.appendChild(li);
            });

            photoDiv.appendChild(title);
            photoDiv.appendChild(img);
            photoDiv.appendChild(itemList);
            container.appendChild(photoDiv);
        });

        snippets.forEach(snippet => {
            const snippetDiv = createElement("div", "snippet");
            const title = createElement("div", "snippet-title", snippet.title);
            const text = createElement("p", null, snippet.content);

            snippetDiv.appendChild(title);
            snippetDiv.appendChild(text);
            container.appendChild(snippetDiv);
        });

        const backBtn = createElement("button", "button", "Back to Dashboard");
        backBtn.addEventListener("click", initDashboard);
        container.appendChild(backBtn);
    }

    // Input Fields
    function createInputField(labelText) {
        const group = createElement("div", "form-group");
        const label = createElement("label", null, labelText);
        const input = createElement("input");
        group.appendChild(label);
        group.appendChild(input);
        return group;
    }

    function createTextareaField(labelText) {
        const group = createElement("div", "form-group");
        const label = createElement("label", null, labelText);
        const textarea = createElement("textarea");
        group.appendChild(label);
        group.appendChild(textarea);
        return group;
    }

    // Initialize Dashboard
    initDashboard();
})();
