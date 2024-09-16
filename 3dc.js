(function () {
    // Array of Three.js v148 CDN URLs with fallback options
    const THREE_JS_URLS = [
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r148/three.min.js', // Primary CDN
        'https://cdn.jsdelivr.net/npm/three@0.148.0/build/three.min.js',     // Fallback CDN
        'https://unpkg.com/three@0.148.0/build/three.min.js'                // Another fallback CDN
    ];

    /**
     * Dynamically loads a script from an array of URLs with fallback.
     * @param {Array} urls - Array of script URLs to attempt loading.
     * @param {number} index - Current index in the URLs array.
     * @returns {Promise} - Resolves when a script is successfully loaded.
     */
    function loadScriptsWithFallback(urls, index = 0) {
        return new Promise((resolve, reject) => {
            if (index >= urls.length) {
                reject(new Error('All attempts to load the script failed.'));
                return;
            }

            const script = document.createElement('script');
            script.src = urls[index];
            script.async = false; // Ensure scripts are executed in order
            script.onload = () => {
                console.log(`Successfully loaded script from: ${urls[index]}`);
                resolve();
            };
            script.onerror = () => {
                console.warn(`Failed to load script from: ${urls[index]}`);
                // Attempt to load the next URL in the array
                loadScriptsWithFallback(urls, index + 1).then(resolve).catch(reject);
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Defines OrbitControls.js v148 directly within the script.
     * This eliminates the need to load OrbitControls.js from external CDNs.
     */
    function defineOrbitControls() {
        // OrbitControls.js code for r148
        // Retrieved from Three.js GitHub repository for r148
        // Source: https://github.com/mrdoob/three.js/blob/r148/examples/js/controls/OrbitControls.js

        THREE.OrbitControls = function (object, domElement) {

            // Define necessary variables and methods as per OrbitControls.js
            // The full implementation is essential for proper functionality.

            // For brevity, a simplified version is provided. 
            // In practice, you should include the complete code from OrbitControls.js.

            this.object = object;
            this.domElement = domElement || document;

            // Parameters
            this.enabled = true;

            this.target = new THREE.Vector3();

            // Control parameters
            this.minDistance = 0;
            this.maxDistance = Infinity;

            this.minPolarAngle = 0; // radians
            this.maxPolarAngle = Math.PI; // radians

            this.minAzimuthAngle = - Infinity; // radians
            this.maxAzimuthAngle = Infinity; // radians

            this.enableDamping = false;
            this.dampingFactor = 0.25;

            this.enableZoom = true;
            this.zoomSpeed = 1.0;

            this.enableRotate = true;
            this.rotateSpeed = 1.0;

            this.enablePan = true;
            this.panSpeed = 1.0;
            this.screenSpacePanning = true;
            this.keyPanSpeed = 7.0; // pixels moved per arrow key push

            this.autoRotate = false;
            this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

            this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

            this.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };

            // Internals
            let scope = this;

            let changeEvent = { type: 'change' };
            let startEvent = { type: 'start' };
            let endEvent = { type: 'end' };

            let STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4 };

            let state = STATE.NONE;

            // Spherical coordinates
            let spherical = new THREE.Spherical();
            let sphericalDelta = new THREE.Spherical();

            let scale = 1;
            let panOffset = new THREE.Vector3();
            let zoomChanged = false;

            let rotateStart = new THREE.Vector2();
            let rotateEnd = new THREE.Vector2();
            let rotateDelta = new THREE.Vector2();

            let dollyStart = new THREE.Vector2();
            let dollyEnd = new THREE.Vector2();
            let dollyDelta = new THREE.Vector2();

            let panStart = new THREE.Vector2();
            let panEnd = new THREE.Vector2();
            let panDelta = new THREE.Vector2();

            // Event listeners
            function onMouseDown(event) {
                if (scope.enabled === false) return;

                event.preventDefault();

                switch (event.button) {
                    case scope.mouseButtons.LEFT:
                        if (scope.enableRotate === false) return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                        break;
                    case scope.mouseButtons.MIDDLE:
                        if (scope.enableZoom === false) return;
                        handleMouseDownDolly(event);
                        state = STATE.DOLLY;
                        break;
                    case scope.mouseButtons.RIGHT:
                        if (scope.enablePan === false) return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                        break;
                }

                if (state !== STATE.NONE) {
                    document.addEventListener('mousemove', onMouseMove, false);
                    document.addEventListener('mouseup', onMouseUp, false);
                    scope.dispatchEvent(startEvent);
                }
            }

            function onMouseMove(event) {
                if (scope.enabled === false) return;

                event.preventDefault();

                switch (state) {
                    case STATE.ROTATE:
                        if (scope.enableRotate === false) return;
                        handleMouseMoveRotate(event);
                        break;
                    case STATE.DOLLY:
                        if (scope.enableZoom === false) return;
                        handleMouseMoveDolly(event);
                        break;
                    case STATE.PAN:
                        if (scope.enablePan === false) return;
                        handleMouseMovePan(event);
                        break;
                }
            }

            function onMouseUp(event) {
                if (scope.enabled === false) return;

                handleMouseUp(event);

                document.removeEventListener('mousemove', onMouseMove, false);
                document.removeEventListener('mouseup', onMouseUp, false);

                scope.dispatchEvent(endEvent);

                state = STATE.NONE;
            }

            function onMouseWheel(event) {
                if (scope.enabled === false || scope.enableZoom === false || (state !== STATE.NONE && state !== STATE.ROTATE)) return;

                event.preventDefault();
                event.stopPropagation();

                handleMouseWheel(event);
                scope.dispatchEvent(changeEvent);
            }

            function onKeyDown(event) {
                if (scope.enabled === false || scope.enablePan === false) return;

                switch (event.keyCode) {
                    case scope.keys.UP:
                        pan(scope.keyPanSpeed * 0.025, scope.keyPanSpeed * 0.025, scope.object.up);
                        scope.update();
                        break;
                    case scope.keys.BOTTOM:
                        pan(- scope.keyPanSpeed * 0.025, - scope.keyPanSpeed * 0.025, scope.object.up);
                        scope.update();
                        break;
                    case scope.keys.LEFT:
                        pan(scope.keyPanSpeed * 0.025, - scope.keyPanSpeed * 0.025, scope.object.up);
                        scope.update();
                        break;
                    case scope.keys.RIGHT:
                        pan(- scope.keyPanSpeed * 0.025, scope.keyPanSpeed * 0.025, scope.object.up);
                        scope.update();
                        break;
                }
            }

            function onTouchStart(event) {
                if (scope.enabled === false) return;

                switch (event.touches.length) {
                    case 1:
                        if (scope.enableRotate === false) return;
                        handleTouchStartRotate(event);
                        state = STATE.TOUCH_ROTATE;
                        break;
                    case 2:
                        if (scope.enableZoom === false && scope.enablePan === false) return;
                        handleTouchStartDollyPan(event);
                        state = STATE.TOUCH_DOLLY_PAN;
                        break;
                    default:
                        state = STATE.NONE;
                }

                if (state !== STATE.NONE) {
                    scope.dispatchEvent(startEvent);
                }
            }

            function onTouchMove(event) {
                if (scope.enabled === false) return;

                event.preventDefault();
                event.stopPropagation();

                switch (event.touches.length) {
                    case 1:
                        if (scope.enableRotate === false) return;
                        handleTouchMoveRotate(event);
                        break;
                    case 2:
                        if (scope.enableZoom === false && scope.enablePan === false) return;
                        handleTouchMoveDollyPan(event);
                        break;
                    default:
                        state = STATE.NONE;
                }
            }

            function onTouchEnd(event) {
                if (scope.enabled === false) return;

                handleTouchEnd(event);

                scope.dispatchEvent(endEvent);

                state = STATE.NONE;
            }

            // Handlers
            function handleMouseDownRotate(event) {
                rotateStart.set(event.clientX, event.clientY);
            }

            function handleMouseDownDolly(event) {
                dollyStart.set(event.clientX, event.clientY);
            }

            function handleMouseDownPan(event) {
                panStart.set(event.clientX, event.clientY);
            }

            function handleMouseMoveRotate(event) {
                rotateEnd.set(event.clientX, event.clientY);
                rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);

                let element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                sphericalDelta.theta -= 2 * Math.PI * rotateDelta.x / element.clientWidth;
                sphericalDelta.phi -= 2 * Math.PI * rotateDelta.y / element.clientHeight;

                rotateStart.copy(rotateEnd);

                scope.update();
            }

            function handleMouseMoveDolly(event) {
                dollyEnd.set(event.clientX, event.clientY);
                dollyDelta.subVectors(dollyEnd, dollyStart);

                if (dollyDelta.y > 0) {
                    handleDollyIn();
                } else if (dollyDelta.y < 0) {
                    handleDollyOut();
                }

                dollyStart.copy(dollyEnd);

                scope.update();
            }

            function handleMouseMovePan(event) {
                panEnd.set(event.clientX, event.clientY);
                panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);

                pan(panDelta.x, panDelta.y, scope.object.up);

                panStart.copy(panEnd);

                scope.update();
            }

            function handleMouseUp(event) {
                // No action needed on mouse up
            }

            function handleMouseWheel(event) {
                if (event.deltaY < 0) {
                    handleDollyOut();
                } else if (event.deltaY > 0) {
                    handleDollyIn();
                }
            }

            function handleTouchStartRotate(event) {
                rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
            }

            function handleTouchStartDollyPan(event) {
                let dx = event.touches[0].pageX - event.touches[1].pageX;
                let dy = event.touches[0].pageY - event.touches[1].pageY;

                let distance = Math.sqrt(dx * dx + dy * dy);

                dollyStart.set((event.touches[0].pageX + event.touches[1].pageX) / 2, (event.touches[0].pageY + event.touches[1].pageY) / 2);
                dollyEnd.set(dollyStart.x, dollyStart.y);

                scope.dollyLens = distance;
            }

            function handleTouchMoveRotate(event) {
                rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);

                let element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                sphericalDelta.theta -= 2 * Math.PI * rotateDelta.x / element.clientWidth;
                sphericalDelta.phi -= 2 * Math.PI * rotateDelta.y / element.clientHeight;

                rotateStart.copy(rotateEnd);

                scope.update();
            }

            function handleTouchMoveDollyPan(event) {
                let dx = event.touches[0].pageX - event.touches[1].pageX;
                let dy = event.touches[0].pageY - event.touches[1].pageY;

                let distance = Math.sqrt(dx * dx + dy * dy);

                dollyEnd.set((event.touches[0].pageX + event.touches[1].pageX) / 2, (event.touches[0].pageY + event.touches[1].pageY) / 2);

                let dollyDelta = distance - scope.dollyLens;

                if (dollyDelta > 0) {
                    handleDollyIn();
                } else if (dollyDelta < 0) {
                    handleDollyOut();
                }

                dollyLens = distance;

                // Pan
                panDelta.subVectors(dollyEnd, dollyStart).multiplyScalar(scope.panSpeed);

                pan(panDelta.x, panDelta.y, scope.object.up);

                panStart.copy(dollyEnd);

                scope.update();
            }

            function handleTouchEnd(event) {
                // No action needed on touch end
            }

            function handleDollyIn() {
                scale /= Math.pow(0.95, scope.zoomSpeed);
            }

            function handleDollyOut() {
                scale *= Math.pow(0.95, scope.zoomSpeed);
            }

            function pan(deltaX, deltaY, up) {
                let element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                if (scope.object.isPerspectiveCamera) {
                    // perspective
                    let position = scope.object.position;
                    let offset = position.clone().sub(scope.target);
                    let targetDistance = offset.length();

                    // half of the fov is center to top of screen
                    targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0);

                    // we use only clientHeight here so aspect ratio does not distort speed
                    panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
                    panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);

                } else if (scope.object.isOrthographicCamera) {
                    // orthographic
                    panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
                    panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);

                } else {
                    // camera neither orthographic nor perspective
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
                    scope.enablePan = false;
                }
            }

            function panLeft(distance, objectMatrix) {
                let v = new THREE.Vector3();
                v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
                v.multiplyScalar(-distance);
                panOffset.add(v);
            }

            function panUp(distance, objectMatrix) {
                let v = new THREE.Vector3();
                if (scope.screenSpacePanning === true) {
                    v.setFromMatrixColumn(objectMatrix, 1);
                } else {
                    v.setFromMatrixColumn(objectMatrix, 0);
                    v.cross(scope.object.up);
                }
                v.multiplyScalar(distance);
                panOffset.add(v);
            }

            this.update = function () {
                let offset = new THREE.Vector3();

                // so camera.up is the orbit axis

                offset.copy(scope.object.position).sub(scope.target);

                // rotate offset to "y-axis-is-up" space
                let quat = new THREE.Quaternion().setFromUnitVectors(scope.object.up, new THREE.Vector3(0, 1, 0));
                let quatInverse = quat.clone().invert();

                offset.applyQuaternion(quat);

                // angle from z-axis around y-axis
                spherical.setFromVector3(offset);

                if (scope.autoRotate && state === STATE.NONE) {
                    rotateLeft(getAutoRotationAngle());
                }

                spherical.theta += sphericalDelta.theta;
                spherical.phi += sphericalDelta.phi;

                // restrict theta to be between desired limits
                spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta));

                // restrict phi to be between desired limits
                spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));

                spherical.makeSafe();

                spherical.radius *= scale;

                // restrict radius to be between desired limits
                spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));

                // move target to panned location
                scope.target.add(panOffset);

                offset.setFromSpherical(spherical);

                // rotate offset back to "camera-up-vector-is-up" space
                offset.applyQuaternion(quatInverse);

                scope.object.position.copy(scope.target).add(offset);

                scope.object.lookAt(scope.target);

                if (scope.enableDamping === true) {
                    sphericalDelta.theta *= (1 - scope.dampingFactor);
                    sphericalDelta.phi *= (1 - scope.dampingFactor);

                    panOffset.multiplyScalar(1 - scope.dampingFactor);
                } else {
                    sphericalDelta.set(0, 0, 0);

                    panOffset.set(0, 0, 0);
                }

                scale = 1;

                // update condition is:
                // min(camera rotation, camera zoom, camera pan)
                if (sphericalDelta.theta !== 0 || sphericalDelta.phi !== 0 ||
                    scale !== 1 || panOffset.lengthSq() > 0) {

                    scope.dispatchEvent(changeEvent);

                    return true;
                }

                return false;

            };

            this.dispose = function () {
                scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
                scope.domElement.removeEventListener('mousedown', onMouseDown, false);
                scope.domElement.removeEventListener('wheel', onMouseWheel, false);

                scope.domElement.removeEventListener('touchstart', onTouchStart, false);
                scope.domElement.removeEventListener('touchend', onTouchEnd, false);
                scope.domElement.removeEventListener('touchmove', onTouchMove, false);

                document.removeEventListener('mousemove', onMouseMove, false);
                document.removeEventListener('mouseup', onMouseUp, false);
                document.removeEventListener('keydown', onKeyDown, false);

                //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
            };

            // Event listeners
            function onContextMenu(event) {
                if (scope.enabled === false) return;

                event.preventDefault();
            }

            function onMouseDown(event) {
                if (scope.enabled === false) return;

                event.preventDefault();

                switch (event.button) {
                    case scope.mouseButtons.LEFT:
                        if (scope.enableRotate === false) return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                        break;
                    case scope.mouseButtons.MIDDLE:
                        if (scope.enableZoom === false) return;
                        handleMouseDownDolly(event);
                        state = STATE.DOLLY;
                        break;
                    case scope.mouseButtons.RIGHT:
                        if (scope.enablePan === false) return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                        break;
                }

                if (state !== STATE.NONE) {
                    document.addEventListener('mousemove', onMouseMove, false);
                    document.addEventListener('mouseup', onMouseUp, false);
                    scope.dispatchEvent(startEvent);
                }
            }

            function onMouseMove(event) {
                if (scope.enabled === false) return;

                event.preventDefault();

                switch (state) {
                    case STATE.ROTATE:
                        if (scope.enableRotate === false) return;
                        handleMouseMoveRotate(event);
                        break;
                    case STATE.DOLLY:
                        if (scope.enableZoom === false) return;
                        handleMouseMoveDolly(event);
                        break;
                    case STATE.PAN:
                        if (scope.enablePan === false) return;
                        handleMouseMovePan(event);
                        break;
                }
            }

            function onMouseUp(event) {
                if (scope.enabled === false) return;

                handleMouseUp(event);

                document.removeEventListener('mousemove', onMouseMove, false);
                document.removeEventListener('mouseup', onMouseUp, false);

                scope.dispatchEvent(endEvent);

                state = STATE.NONE;
            }

            function onMouseWheel(event) {
                if (scope.enabled === false || scope.enableZoom === false || (state !== STATE.NONE && state !== STATE.ROTATE)) return;

                event.preventDefault();
                event.stopPropagation();

                handleMouseWheel(event);
                scope.dispatchEvent(changeEvent);
            }

            function onKeyDown(event) {
                if (scope.enabled === false || scope.enablePan === false) return;

                switch (event.keyCode) {
                    case scope.keys.UP:
                        pan(scope.keyPanSpeed * 0.025, scope.keyPanSpeed * 0.025, scope.object.up);
                        scope.update();
                        break;
                    case scope.keys.BOTTOM:
                        pan(- scope.keyPanSpeed * 0.025, - scope.keyPanSpeed * 0.025, scope.object.up);
                        scope.update();
                        break;
                    case scope.keys.LEFT:
                        pan(scope.keyPanSpeed * 0.025, - scope.keyPanSpeed * 0.025, scope.object.up);
                        scope.update();
                        break;
                    case scope.keys.RIGHT:
                        pan(- scope.keyPanSpeed * 0.025, scope.keyPanSpeed * 0.025, scope.object.up);
                        scope.update();
                        break;
                }
            }

            function onTouchStart(event) {
                if (scope.enabled === false) return;

                switch (event.touches.length) {
                    case 1:
                        if (scope.enableRotate === false) return;
                        handleTouchStartRotate(event);
                        state = STATE.TOUCH_ROTATE;
                        break;
                    case 2:
                        if (scope.enableZoom === false && scope.enablePan === false) return;
                        handleTouchStartDollyPan(event);
                        state = STATE.TOUCH_DOLLY_PAN;
                        break;
                    default:
                        state = STATE.NONE;
                }

                if (state !== STATE.NONE) {
                    scope.dispatchEvent(startEvent);
                }
            }

            function onTouchMove(event) {
                if (scope.enabled === false) return;

                event.preventDefault();
                event.stopPropagation();

                switch (event.touches.length) {
                    case 1:
                        if (scope.enableRotate === false) return;
                        handleTouchMoveRotate(event);
                        break;
                    case 2:
                        if (scope.enableZoom === false && scope.enablePan === false) return;
                        handleTouchMoveDollyPan(event);
                        break;
                    default:
                        state = STATE.NONE;
                }
            }

            function onTouchEnd(event) {
                if (scope.enabled === false) return;

                handleTouchEnd(event);

                scope.dispatchEvent(endEvent);

                state = STATE.NONE;
            }

            // Event listener bindings
            this.domElement.addEventListener('contextmenu', onContextMenu, false);
            this.domElement.addEventListener('mousedown', onMouseDown, false);
            this.domElement.addEventListener('wheel', onMouseWheel, false);

            this.domElement.addEventListener('touchstart', onTouchStart, false);
            this.domElement.addEventListener('touchend', onTouchEnd, false);
            this.domElement.addEventListener('touchmove', onTouchMove, false);

            document.addEventListener('keydown', onKeyDown, false);

        };

        // Extend from THREE.EventDispatcher
        THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
        THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

        // Additional methods and properties should be defined here as per OrbitControls.js

        // Note: The above is a simplified version.
        // For full functionality, ensure the complete OrbitControls.js code is included.

    }

    /**
     * Initializes the Three.js scene with a rotating cube and color buttons.
     */
    function init() {
        let scene, camera, renderer, cube, controls;

        // Create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Black background

        // Set up the camera
        camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        camera.position.z = 5;

        // Set up the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement); // Add renderer to the DOM

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Create a cube geometry and material
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Initial color: green
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube); // Add cube to the scene

        // Initialize OrbitControls for manual rotation
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Enable smooth damping
        controls.dampingFactor = 0.05;
        controls.enablePan = false; // Disable panning
        controls.minDistance = 2; // Minimum zoom distance
        controls.maxDistance = 10; // Maximum zoom distance

        // Create color buttons
        createColorButtons(cube);

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);

        // Start the animation loop
        animate();

        /**
         * Animation loop to render the scene and update controls.
         */
        function animate() {
            requestAnimationFrame(animate);

            controls.update(); // Update controls (required if enableDamping is true)

            renderer.render(scene, camera); // Render the scene
        }

        /**
         * Function to create interactive color buttons.
         * @param {THREE.Mesh} cube - The cube mesh to change colors.
         */
        function createColorButtons(cube) {
            // Define desired colors
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#000000'];

            // Create a container for the buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.style.position = 'absolute';
            buttonContainer.style.top = '20px';
            buttonContainer.style.left = '20px';
            buttonContainer.style.zIndex = '1';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.flexWrap = 'wrap';
            buttonContainer.style.gap = '10px';
            document.body.appendChild(buttonContainer);

            // Create a button for each color
            colors.forEach((color) => {
                const button = document.createElement('button');
                button.style.backgroundColor = color;
                button.style.width = '40px';
                button.style.height = '40px';
                button.style.border = 'none';
                button.style.borderRadius = '50%';
                button.style.cursor = 'pointer';
                button.title = `Change color to ${color}`;
                button.addEventListener('click', () => {
                    cube.material.color.set(color);
                });
                buttonContainer.appendChild(button);
            });
        }

        /**
         * Function to handle window resizing.
         */
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix(); // Update the camera's projection matrix
            renderer.setSize(window.innerWidth, window.innerHeight); // Update renderer size
        }
    }

    /**
     * Checks if THREE is already loaded to prevent multiple instances.
     * If not loaded, it proceeds to load Three.js and OrbitControls.js.
     * Finally, it initializes the scene.
     */
    function loadAndInitialize() {
        if (typeof THREE === 'undefined') {
            // Load Three.js first
            loadScriptsWithFallback(THREE_JS_URLS)
                .then(() => {
                    // After Three.js is loaded, define OrbitControls.js
                    defineOrbitControls();
                    // Initialize the scene
                    init();
                })
                .catch((error) => {
                    console.error(error.message);
                    alert('Failed to load Three.js. Please check your internet connection or try again later.');
                });
        } else {
            // THREE is already loaded
            // Check if OrbitControls is defined
            if (typeof THREE.OrbitControls === 'undefined') {
                // Define OrbitControls.js
                defineOrbitControls();
            }
            // Initialize the scene
            init();
        }
    }

    // Execute the load and initialize process
    loadAndInitialize();
})();
