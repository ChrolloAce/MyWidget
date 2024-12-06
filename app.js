(function () {
    let sections = [];
    let prepopulatedSnippets = [
        {
            title: "Tenant Move Out Inspection Summary",
            content: `Junk left on site: Yes / No  
            General Conditions: Bad / Decent / Good / Very Good  
            Drains Flush Test: Passed / Clogged`,
            date: "2023-08-01"
        },
        {
            title: "Dryer Vent Clean Up",
            content: `Dryer Vent Clean Up needed. Ensure proper air circulation and lint removal.`,
            date: "2023-07-15"
        },
        {
            title: "Inspection Summary",
            content: `Inspection date 08/01/2023  
            Utilities are still available. All the tenants have moved out and left some junk to remove.`,
            date: "2023-06-20"
        },
        {
            title: "Wall Damage Report",
            content: `Damage found on the north wall. Paint peeling and requires patching. Estimated repair time: 2 hours.`,
            date: "2023-09-12"
        },
        {
            title: "Appliance Inspection",
            content: `Oven: Clean  
            Fridge: Needs cleaning  
            Dishwasher: Functional but needs exterior cleaning`,
            date: "2023-08-30"
        },
        {
            title: "Property Cleanliness Evaluation",
            content: `Flooring: Acceptable  
            Walls: Needs minor cleaning  
            Windows: Very dirty`,
            date: "2023-07-18"
        }
    ];

    // Inject Styles
    (function injectStyles() {
        const styles = `
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f8f9fa;
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
            .rich-text {
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-bottom: 15px;
                min-height: 100px;
                background: #f9f9f9;
            }
            .rich-text-toolbar {
                display: flex;
                gap: 5px;
                margin-bottom: 10px;
            }
            .toolbar-button {
                padding: 5px 10px;
                border: 1px solid #ccc;
                background: #f0f0f0;
                cursor: pointer;
                border-radius: 4px;
            }
            .toolbar-button:hover {
                background: #e0e0e0;
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
            .photo-preview img {
                width: 100px;
                height: 100px;
                object-fit: cover;
                border-radius: 5px;
                border: 1px solid #ccc;
                margin-right: 5px;
            }
            .section {
                margin-bottom: 20px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;
            }
            /* Modal Styles */
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                visibility: hidden;
                opacity: 0;
                transition: visibility 0s, opacity 0.3s;
            }
            .modal.show {
                visibility: visible;
                opacity: 1;
            }
            .modal-content {
                background: #fff;
                border-radius: 8px;
                padding: 20px;
                width: 90%;
                max-width: 600px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                position: relative;
            }
            .modal-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: #ccc;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                font-size: 16px;
                cursor: pointer;
            }
            .snippet {
                margin-bottom: 10px;
                padding: 10px;
                background: #f9f9f9;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .snippet-title {
                font-weight: bold;
                margin-bottom: 5px;
            }
            .sort-controls {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            /* Report Styles */
            .report-title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
                text-align: center;
            }
            .report-section {
                margin-bottom: 20px;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                background: #f9f9f9;
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

        const header = createElement("h1", null, "Professional Report Dashboard");
        container.appendChild(header);

        const addSectionBtn = createElement("button", "button", "Add Section");
        addSectionBtn.addEventListener("click", () => addSection());
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

            // Toolbar for Rich Text Editor
            const toolbar = createElement("div", "rich-text-toolbar");
            sectionDiv.appendChild(toolbar);

            ["Bold", "Italic", "Underline", "Bullet List", "Numbered List"].forEach((tool) => {
                const button = createElement("button", "toolbar-button", tool);
                button.addEventListener("click", () => formatText(tool));
                toolbar.appendChild(button);
            });

            // Rich Text Editor
            const richText = createElement("div", "rich-text");
            richText.contentEditable = true;
            richText.innerHTML = section.content || "Click to edit text...";
            sectionDiv.appendChild(richText);

            // Insert Snippet Button
            const snippetBtn = createElement("button", "button", "Insert Snippet");
            snippetBtn.addEventListener("click", () => showSnippetModal(richText));
            sectionDiv.appendChild(snippetBtn);
        });
    }

    function formatText(action) {
        document.execCommand(action.toLowerCase().replace(" ", ""));
    }

    // Add Section
    function addSection() {
        const title = prompt("Enter section title:");
        if (title) {
            sections.push({ title, content: "" });
            initDashboard();
        }
    }

    // Generate Report
    function generateReport() {
        const reportWindow = window.open("", "_blank");
        reportWindow.document.write(`<h1 class="report-title">Generated Report</h1>`);

        sections.forEach((section) => {
            reportWindow.document.write(`<div class="report-section">`);
            reportWindow.document.write(`<h2>${section.title}</h2>`);
            reportWindow.document.write(`<p>${section.content}</p>`);
            reportWindow.document.write(`</div>`);
        });

        reportWindow.document.close();
    }

    // Snippet Modal
    function showSnippetModal(richText) {
        const modal = createElement("div", "modal show");
        const modalContent = createElement("div", "modal-content");
        const closeModal = createElement("button", "modal-close", "×");

        closeModal.addEventListener("click", () => document.body.removeChild(modal));
        modalContent.appendChild(closeModal);

        const sortControls = createElement("div", "sort-controls");
        const sortAlphaBtn = createElement("button", "button", "Sort Alphabetically");
        const sortDateBtn = createElement("button", "button", "Sort by Date");
        const searchInput = createElement("input");
        searchInput.placeholder = "Search snippets...";
        sortControls.appendChild(sortAlphaBtn);
        sortControls.appendChild(sortDateBtn);
        sortControls.appendChild(searchInput);
        modalContent.appendChild(sortControls);

        const snippetContainer = createElement("div", null);
        modalContent.appendChild(snippetContainer);

        const renderSnippets = (filteredSnippets) => {
            snippetContainer.innerHTML = "";
            filteredSnippets.forEach((snippet) => {
                const snippetDiv = createElement("div", "snippet");
                const title = createElement("div", "snippet-title", snippet.title);
                const content = createElement("p", null, snippet.content);
                const insertBtn = createElement("button", "button", "Insert");
                insertBtn.addEventListener("click", () => {
                    richText.innerHTML += `<p>${snippet.content}</p>`;
                    document.body.removeChild(modal);
                });
                snippetDiv.appendChild(title);
                snippetDiv.appendChild(content);
                snippetDiv.appendChild(insertBtn);
                snippetContainer.appendChild(snippetDiv);
            });
        };

        renderSnippets(prepopulatedSnippets);

        sortAlphaBtn.addEventListener("click", () => {
            renderSnippets([...prepopulatedSnippets].sort((a, b) => a.title.localeCompare(b.title)));
        });

        sortDateBtn.addEventListener("click", () => {
            renderSnippets([...prepopulatedSnippets].sort((a, b) => new Date(b.date) - new Date(a.date)));
        });

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = prepopulatedSnippets.filter((snippet) =>
                snippet.title.toLowerCase().includes(query) || snippet.content.toLowerCase().includes(query)
            );
            renderSnippets(filtered);
        });

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    initDashboard();
})();
