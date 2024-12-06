(function () {
    let sections = [];
    let snippetCategories = {
        "All": [], // Dynamically populated later
        "Inspection": [
            {
                title: "Tenant Move Out Inspection Summary",
                content: `Junk left on site: Yes / No  
                General Conditions: Bad / Decent / Good / Very Good  
                Drains Flush Test: Passed / Clogged`,
                date: "2023-08-01"
            },
            {
                title: "Inspection Summary",
                content: `Inspection date 08/01/2023  
                Utilities are still available. All the tenants have moved out and left some junk to remove.`,
                date: "2023-06-20"
            }
        ],
        "Maintenance": [
            {
                title: "Dryer Vent Clean Up",
                content: `Dryer Vent Clean Up needed. Ensure proper air circulation and lint removal.`,
                date: "2023-07-15"
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
            }
        ],
        "General Notes": [
            {
                title: "Property Cleanliness Evaluation",
                content: `Flooring: Acceptable  
                Walls: Needs minor cleaning  
                Windows: Very dirty`,
                date: "2023-07-18"
            },
            {
                title: "Landscape Condition",
                content: `Lawn: Overgrown  
                Bushes: Trim required  
                General: Needs maintenance`,
                date: "2023-08-05"
            }
        ]
    };

    // Combine all snippets into the "All" category
    snippetCategories["All"] = Object.values(snippetCategories)
        .filter((category) => category !== snippetCategories["All"])
        .flat();

    // Inject Styles
    (function injectStyles() {
        const styles = `
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        display: flex;
        min-height: 100vh;
        background: #f8f9fa;
    }
    .app-bar {
        width: 250px;
        background: #333;
        color: white;
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }
    .app-bar h2 {
        margin-bottom: 20px;
        font-size: 20px;
        text-align: center;
    }
    .nav-item {
        padding: 10px;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        margin-bottom: 10px;
        text-align: center;
    }
    .nav-item:hover {
        background: #555;
    }
    .nav-item.active {
        background: #555;
    }
    .content {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }
`;

        const styleEl = document.createElement("style");
        styleEl.innerHTML = styles;
        document.head.appendChild(styleEl);
    })();


function initReportGenerator(content) {
    const container = createElement("div", "container");
    content.appendChild(container);

    const header = createElement("h1", null, "Report Generator");
    container.appendChild(header);

    const addReportBtn = createElement("button", "button", "Add Report Template");
    addReportBtn.addEventListener("click", () => {
        alert("Report Generator: Add Template functionality coming soon.");
    });
    container.appendChild(addReportBtn);
}



    
    // Create DOM Elements
    function createElement(tag, className, textContent) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (textContent) el.textContent = textContent;
        return el;
    }

    let currentScreen = "snippetManager"; // Default screen

    function initDashboard() {
    document.body.innerHTML = ""; // Clear existing content

    const appBar = createElement("div", "app-bar");
    const content = createElement("div", "content");

    const appTitle = createElement("h2", null, "Dashboard");
    appBar.appendChild(appTitle);

    const navItems = [
        { id: "snippetManager", label: "Snippet Manager" },
        { id: "reportGenerator", label: "Report Generator" }
    ];

    navItems.forEach((item) => {
        const navItem = createElement("div", "nav-item", item.label);
        if (item.id === currentScreen) navItem.classList.add("active");
        navItem.addEventListener("click", () => {
            currentScreen = item.id;
            initDashboard(); // Reinitialize dashboard when switching screens
        });
        appBar.appendChild(navItem);
    });

    document.body.appendChild(appBar);
    document.body.appendChild(content);

    if (currentScreen === "snippetManager") {
        initSnippetManager(content); // Render Snippet Manager screen
    } else if (currentScreen === "reportGenerator") {
        initReportGenerator(content); // Render Report Generator screen
    }
}


    // Render Sections
    function renderSections(container) {
        sections.forEach((section) => {
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

            // Insert Snippet Button
            const snippetBtn = createElement("button", "button", "Insert Snippet");
            snippetBtn.addEventListener("click", () => showSnippetModal(richText));
            sectionDiv.appendChild(snippetBtn);
        });
    }

    // Add Section
    function addSection() {
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

    // Create a dropdown for categories
    const dropdown = createElement("select", "category-dropdown");
    Object.keys(snippetCategories).forEach((category) => {
        const option = createElement("option", null, category);
        dropdown.appendChild(option);
    });
    modalContent.appendChild(dropdown);

    // Add search input
    const searchInput = createElement("input", "category-search");
    searchInput.type = "text";
    searchInput.placeholder = "Search snippets...";
    modalContent.appendChild(searchInput);

    // Sort controls
    const sortControls = createElement("div", "sort-controls");
    const sortAlphaBtn = createElement("button", "button", "Sort Alphabetically");
    const sortDateBtn = createElement("button", "button", "Sort by Date");
    sortControls.appendChild(sortAlphaBtn);
    sortControls.appendChild(sortDateBtn);
    modalContent.appendChild(sortControls);

    // Snippet container
    const snippetContainer = createElement("div", null);
    modalContent.appendChild(snippetContainer);

    // Render snippets based on category, sort function, and search query
    const renderSnippets = (category, sortFn = null, searchQuery = "") => {
        snippetContainer.innerHTML = "";
        let snippets = snippetCategories[category];
        if (sortFn) snippets = [...snippets].sort(sortFn);

        // Filter snippets by search query
        snippets = snippets.filter(
            (snippet) =>
                snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                snippet.content.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Render each snippet
        snippets.forEach((snippet) => {
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

    // Initial rendering of the "All" category
    renderSnippets("All");

    // Event listeners for dropdown, sorting, and search
    dropdown.addEventListener("change", (e) => {
        renderSnippets(e.target.value, null, searchInput.value);
    });

    sortAlphaBtn.addEventListener("click", () => {
        const category = dropdown.value;
        renderSnippets(category, (a, b) => a.title.localeCompare(b.title), searchInput.value);
    });

    sortDateBtn.addEventListener("click", () => {
        const category = dropdown.value;
        renderSnippets(category, (a, b) => new Date(b.date) - new Date(a.date), searchInput.value);
    });

    searchInput.addEventListener("input", () => {
        const category = dropdown.value;
        renderSnippets(category, null, searchInput.value);
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}


    initDashboard();
})();
