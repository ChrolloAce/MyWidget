<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
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
            }
            .photo-preview img {
                width: 100px;
                height: 100px;
                object-fit: cover;
                border-radius: 5px;
                border: 1px solid #ccc;
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
                max-width: 700px;
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
            .category-dropdown {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                margin-bottom: 15px;
                font-size: 16px;
                background: #f9f9f9;
            }
            .sort-controls {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
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
            handleFiles(e.dataTransfer.files, previewContainer, index);
        });

        dropArea.addEventListener("click", () => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.multiple = true;
            fileInput.accept = "image/*";
            fileInput.addEventListener("change", () => {
                handleFiles(fileInput.files, previewContainer, index);
            });
            fileInput.click();
        });

        // Rich Text Editor
        const richText = createElement("div", "rich-text");
        richText.contentEditable = true;
        richText.innerHTML = section.content || "Click to edit text...";
        richText.addEventListener("input", () => {
            sections[index].content = richText.innerHTML;
        });
        sectionDiv.appendChild(richText);

        // Insert Snippet Button
        const snippetBtn = createElement("button", "button", "Insert Snippet");
        snippetBtn.addEventListener("click", () => showSnippetModal(richText));
        sectionDiv.appendChild(snippetBtn);
    });
}


   function addSection() {
    const title = prompt("Enter section title:");
    if (title) {
        sections.push({ title, content: "", images: [] });
        initDashboard();
    }
}

   function handleFiles(files, previewContainer, sectionIndex) {
    Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = createElement("img");
            img.src = e.target.result;
            previewContainer.appendChild(img);

            // Store image in the section
            sections[sectionIndex].images.push(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}


   // Generate Report as PDF
function generateReport() {
    // Include jsPDF
    const pdf = new jsPDF();

    // Add a title to the PDF
    pdf.setFontSize(18);
    pdf.text("Generated Report", 105, 20, { align: "center" });

    let yPosition = 30; // Start position for the first section

    // Loop through sections to add content
    sections.forEach((section) => {
        // Add Section Title
        pdf.setFontSize(16);
        pdf.text(section.title, 10, yPosition);
        yPosition += 10;

        // Add Section Content
        pdf.setFontSize(12);
        const splitText = pdf.splitTextToSize(section.content, 190); // Split text to fit the page
        pdf.text(splitText, 10, yPosition);
        yPosition += splitText.length * 10;

        // Add images (if any)
        const imgContainer = section.images || [];
        imgContainer.forEach((imgSrc) => {
            if (yPosition + 50 > 280) {
                pdf.addPage(); // Add a new page if the content exceeds the current page
                yPosition = 10;
            }
            pdf.addImage(imgSrc, "JPEG", 10, yPosition, 50, 50);
            yPosition += 60;
        });

        yPosition += 10; // Space between sections
    });

    // Save the PDF
    pdf.save("Report.pdf");
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
