<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Functional Dashboard</title>
    <style>
        /* General Styles */
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            display: flex;
            min-height: 100vh;
            background: #f8f9fa;
        }

        /* App Bar */
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
            text-align: center;
            margin-bottom: 20px;
        }

        .nav-item {
            padding: 10px;
            color: white;
            cursor: pointer;
            border-radius: 5px;
            margin-bottom: 10px;
            text-align: center;
        }

        .nav-item:hover,
        .nav-item.active {
            background: #555;
        }

        /* Main Content */
        .content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        }

        /* Buttons and Inputs */
        .button {
            padding: 10px 15px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px 0;
        }

        .button:hover {
            background: #0056b3;
        }

        input,
        select {
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
        }

        /* Modal */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 5px;
            max-width: 600px;
            width: 90%;
            position: relative;
        }

        .modal-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
        }

        .snippet {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .snippet-title {
            font-weight: bold;
        }

        /* Image Upload */
        .drop-area {
            padding: 20px;
            border: 2px dashed #ccc;
            border-radius: 5px;
            text-align: center;
            cursor: pointer;
            margin: 20px 0;
        }

        .drop-area.dragover {
            background: #f0f0f0;
        }

        .photo-preview img {
            width: 100px;
            height: 100px;
            margin: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="app-bar">
        <h2>Dashboard</h2>
        <div class="nav-item" data-section="snippetManager">Snippet Manager</div>
        <div class="nav-item" data-section="reportGenerator">Report Generator</div>
        <div class="nav-item" data-section="imageUpload">Image Upload</div>
    </div>
    <div class="content" id="content">
        <!-- Dynamic Content Here -->
    </div>

    <script>
        (function () {
            const sections = []; // Holds dynamically created sections
            const snippetCategories = {
                All: [],
                Inspection: [
                    {
                        title: "Tenant Move Out Inspection Summary",
                        content: `Junk left on site: Yes / No  
                                General Conditions: Bad / Decent / Good / Very Good  
                                Drains Flush Test: Passed / Clogged`,
                        date: "2023-08-01",
                    },
                    {
                        title: "Inspection Summary",
                        content: `Inspection date 08/01/2023  
                                Utilities are still available. All the tenants have moved out and left some junk to remove.`,
                        date: "2023-06-20",
                    },
                ],
                Maintenance: [
                    {
                        title: "Dryer Vent Clean Up",
                        content: `Dryer Vent Clean Up needed. Ensure proper air circulation and lint removal.`,
                        date: "2023-07-15",
                    },
                ],
            };

            // Combine snippets into the "All" category
            snippetCategories["All"] = Object.values(snippetCategories)
                .filter((category) => category !== snippetCategories["All"])
                .flat();

            // Helper: Create Elements
            function createElement(tag, className, textContent) {
                const el = document.createElement(tag);
                if (className) el.className = className;
                if (textContent) el.textContent = textContent;
                return el;
            }

            // Initialize Dashboard
            function initDashboard() {
                const content = document.getElementById("content");
                content.innerHTML = ""; // Clear existing content

                const activeSection = document.querySelector(".nav-item.active");
                const sectionName = activeSection ? activeSection.dataset.section : "snippetManager";

                switch (sectionName) {
                    case "snippetManager":
                        initSnippetManager(content);
                        break;
                    case "reportGenerator":
                        initReportGenerator(content);
                        break;
                    case "imageUpload":
                        initImageUpload(content);
                        break;
                    default:
                        content.textContent = "Section not found.";
                }
            }

            // Snippet Manager
            function initSnippetManager(container) {
                const header = createElement("h1", null, "Snippet Manager");
                container.appendChild(header);

                const searchInput = createElement("input", null);
                searchInput.placeholder = "Search snippets...";
                container.appendChild(searchInput);

                const snippetList = createElement("div", "snippet-list");
                container.appendChild(snippetList);

                // Render snippets
                function renderSnippets(query = "") {
                    snippetList.innerHTML = "";
                    const snippets = snippetCategories.All.filter(
                        (snippet) =>
                            snippet.title.toLowerCase().includes(query.toLowerCase()) ||
                            snippet.content.toLowerCase().includes(query.toLowerCase())
                    );
                    snippets.forEach((snippet) => {
                        const snippetDiv = createElement("div", "snippet");
                        const title = createElement("div", "snippet-title", snippet.title);
                        const content = createElement("div", null, snippet.content);
                        snippetDiv.appendChild(title);
                        snippetDiv.appendChild(content);
                        snippetList.appendChild(snippetDiv);
                    });
                }

                searchInput.addEventListener("input", (e) => renderSnippets(e.target.value));

                renderSnippets();
            }

            // Report Generator
            function initReportGenerator(container) {
                const header = createElement("h1", null, "Report Generator");
                container.appendChild(header);

                const addReportButton = createElement("button", "button", "Add Report Template");
                container.appendChild(addReportButton);
            }

            // Image Upload
            function initImageUpload(container) {
                const header = createElement("h1", null, "Image Upload");
                container.appendChild(header);

                const dropArea = createElement("div", "drop-area", "Drag and drop images here");
                container.appendChild(dropArea);

                const previewContainer = createElement("div", "photo-preview");
                container.appendChild(previewContainer);

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

                function handleFiles(files, preview) {
                    Array.from(files).forEach((file) => {
                        if (!file.type.startsWith("image/")) return;

                        const reader = new FileReader();
                        reader.onload = () => {
                            const img = createElement("img");
                            img.src = reader.result;
                            preview.appendChild(img);
                        };
                        reader.readAsDataURL(file);
                    });
                }
            }

            // App Bar Navigation
            document.querySelectorAll(".nav-item").forEach((navItem) => {
                navItem.addEventListener("click", () => {
                    document
                        .querySelectorAll(".nav-item")
                        .forEach((item) => item.classList.remove("active"));
                    navItem.classList.add("active");
                    initDashboard();
                });
            });

            // Initialize the first section
            document.querySelector(".nav-item").classList.add("active");
            initDashboard();
        })();
    </script>
</body>
</html>
