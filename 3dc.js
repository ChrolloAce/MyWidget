(function () {
    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Load Three.js first, then GLTFLoader
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', function () {
        loadScript('https://cdn.jsdelivr.net/npm/three@0.128/examples/js/loaders/GLTFLoader.js', init);
    });

    let scene, camera, renderer, model;

    function init() {
        // Set up the scene
        scene = new THREE.Scene();

        // Set up the camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Set up the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add light to the scene
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        // Load the GLTF model from GitHub using the GLTFLoader
        const loader = new THREE.GLTFLoader();
        loader.load('https://raw.githubusercontent.com/ChrolloAce/MyWidget/main/Counters.gltf', function (gltf) {
            model = gltf.scene;
            model.scale.set(1, 1, 1); // Adjust the scale if necessary
            scene.add(model);
            animate();
        });

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);

        // Create color picker buttons
        createColorButtons();
    }

    // Function to adjust the scene when window is resized
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Function to animate the scene and render it
    function animate() {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.y += 0.01; // Rotate the model for a visual effect
        }
        renderer.render(scene, camera);
    }

    // Function to change the color of the model
    function changeModelColor(color) {
        if (model) {
            model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.color.set(color); // Change the color of the material
                }
            });
        }
    }

    // Create color picker buttons dynamically
    function createColorButtons() {
        const colors = ['red', 'green', 'blue']; // Add more colors if you like
        const colorPicker = document.createElement('div');
        colorPicker.style.position = 'absolute';
        colorPicker.style.top = '10px';
        colorPicker.style.left = '10px';
        colorPicker.style.display = 'flex';
        colorPicker.style.gap = '10px';

        colors.forEach(color => {
            const button = document.createElement('div');
            button.style.width = '50px';
            button.style.height = '50px';
            button.style.backgroundColor = color;
            button.style.cursor = 'pointer';
            button.addEventListener('click', () => changeModelColor(color));
            colorPicker.appendChild(button);
        });

        document.body.appendChild(colorPicker);
    }
})();
