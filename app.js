(function () {
    let sections = [];
    let prepopulatedSnippets = [
        {
            title: "Tenant Move Out Inspection Summary",
            content: `Junk left on site: Yes / No  
            General Conditions: Bad / Decent / Good / Very Good  
            Drains Flush Test: Passed / Clogged  
            Damages Exceeding normal "Tear and Wear Standards": Yes / No  
            Cleaning Conditions: Very Dirty / Dirty / Acceptable / Clean / Professionally Cleaned`
        },
        {
            title: "Dryer Vent Clean Up",
            content: `Dryer Vent Clean Up needed. Ensure proper air circulation and lint removal.`
        },
        {
            title: "Inspection Summary",
            content: `Inspection date 08/01/2023  
            Inspection time frame 04:25-4:50 pm  
            Utilities are still available. All the tenants have moved out and left some junk to remove.`
        }
    ];

    // Inject Monochrome Styles
    (function injectStyles() {
        const styles = `
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f0f0f0;
                color: #333;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            .container {
                width: 90%;
                max-width: 1200px;
                background: #fff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                margin-bottom: 20px;
            }
            h1, h2, h3 {
                color: #333;
                margin-bottom: 10px;
            }
            .button {
                background-color: #555;
                color: white;
                padding: 10px 15px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                margin-right: 10px;
            }
            .button:hover {
                background-color: #333;
            }
            .drop-area {
                border: 2px dashed #bbb;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                color: #777;
                margin-bottom: 15px;
            }
            .drop-area.dragover {
                background-color: #eee;
            }
            .photo-preview {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 15px;
            }
            .photo-preview img {
                width: 100px;
                height: 100px;
                object-fit: cover;
                border-radius: 5px;
                border: 1px solid #ccc;
            }
            .rich-text {
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-bottom: 15px;
                min-height: 100px;
                background: #fafafa;
            }
            .section {
                margin-bottom: 20px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;
            }
        `;
        const styleEl = document.createElement("style");
        styleEl.innerHTML = styles;
        document.head.appendChild(styleEl);
    })();

    // Create DOM Elements
    function createElement(tag, className, textContent) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (textContent) el.textContent = textContent;
        return el;
    }

    // Initialize Dashboard
    function initDashboard() {
        const container = createElement("div", "container");
        document.body.innerHTML = "";
        document.body.appendChild(container);

        const header = createElement("h1", null, "Report Dashboard");
        container.appendChild(header);

        const addSectionBtn = createElement("button", "button", "Add Section");
        addSectionBtn.addEventListener("click", () => addSection(container));
        container.appendChild(addSectionBtn);

        const generateReportBtn = createElement("button", "button", "Generate Report");
        generateReportBtn.addEventListener("click", generateReport);
        container.appendChild(generateReportBtn);

        renderSections(container);
    }

    // Render Sections
    function renderSections(container) {
        sections.forEach((section, index) => {
            const sectionDiv = createElement("div", "section");
            container.appendChild(sectionDiv);

            const title = createElement("h3", null, section.title);
            sectionDiv.appendChild(title);

            // Drop Area for Images
            const dropArea = createElement("div", "drop-area", "Drag and drop images here, or click to upload.");
            sectionDiv.appendChild(dropArea);

            const previewContainer = createElement("div", "photo-preview");
            sectionDiv.appendChild(previewContainer);

            dropArea.addEventListener("dragover", (e) => {
                e.preventDefault();
                dropArea.classList.add("dragover");
            });

            dropArea.addEventListener("dragleave", () => dropArea.classList.remove("dragover"));

            dropArea.addEventListener("drop", (e) => {
                e.preventDefault();
                dropArea.classList.remove("dragover");
                handleFiles(e.dataTransfer.files, previewContainer);
            });

            dropArea.addEventListener("click", () => {
                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.multiple = true;
                fileInput.accept = "image/*";
                fileInput.addEventListener("change", () => {
                    handleFiles(fileInput.files, previewContainer);
                });
                fileInput.click();
            });

            // Rich Text Editor
            const richText = createElement("div", "rich-text");
            richText.contentEditable = true;
            richText.innerHTML = section.content || "Click to edit text...";
            sectionDiv.appendChild(richText);

            // Prepopulated Snippets
            const snippetSelect = createElement("select", "button");
            const defaultOption = createElement("option", null, "Insert Predefined Snippet");
            snippetSelect.appendChild(defaultOption);
            prepopulatedSnippets.forEach((snippet, i) => {
                const option = createElement("option", null, snippet.title);
                option.value = i;
                snippetSelect.appendChild(option);
            });

            snippetSelect.addEventListener("change", (e) => {
                const snippet = prepopulatedSnippets[e.target.value];
                if (snippet) {
                    richText.innerHTML += `<p>${snippet.content}</p>`;
                }
                snippetSelect.value = "Insert Predefined Snippet";
            });

            sectionDiv.appendChild(snippetSelect);
        });
    }

    // Add New Section
    function addSection(container) {
        const title = prompt("Enter section title:");
        if (title) {
            sections.push({ title, content: "" });
            initDashboard();
        }
    }

    // Handle File Uploads
    function handleFiles(files, previewContainer) {
        Array.from(files).forEach((file) => {
            if (!file.type.startsWith("image/")) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = createElement("img");
                img.src = e.target.result;
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }

    // Generate Report
    function generateReport() {
        const reportWindow = window.open("", "_blank");
        reportWindow.document.write("<h1>Generated Report</h1>");

        sections.forEach((section) => {
            reportWindow.document.write(`<h2>${section.title}</h2>`);
            reportWindow.document.write(`<p>${section.content}</p>`);
        });

        reportWindow.document.close();
    }

    initDashboard();
})();
