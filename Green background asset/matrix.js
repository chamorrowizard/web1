document.addEventListener('DOMContentLoaded', () => {
    
    // --- Existing Functionality (Keep this for the radar, status pulse, etc.) ---
    const systemDot = document.querySelector('.system-status span');
    if (systemDot) {
        // Toggles the opacity/pulse of the SYSTEM OPERATIONAL dot
        setInterval(() => systemDot.classList.toggle('active'), 1200);
    }
    const radarGraphic = document.querySelector('.radar-graphic');
    if (radarGraphic) {
        // Triggers the CSS rotation animation
        radarGraphic.classList.add('is-animating');
    }
    // --------------------------------------------------------------------------

    
    // 🟩 HEADLINE ADJUSTMENT LOGIC 🟩
    
    // Selects the <h1> element which holds the headline text.
    const headlineElement = document.querySelector('.hero-content h1'); 
    const MAX_WIDTH = 768; 
    const originalText = "Architect your wealth with absolute precision.";
    const shorterText = "Architect your wealth."; 

    function adjustHeadlineText() {
        if (!headlineElement) return;

        if (window.innerWidth <= MAX_WIDTH) {
            headlineElement.textContent = shorterText;
        } else {
            // Use innerHTML to preserve the <br> tag for the two-line desktop display
            headlineElement.innerHTML = "Architect your wealth <br> with absolute precision.";
        }
    }

    adjustHeadlineText();
    window.addEventListener('resize', adjustHeadlineText);

    
    /* * 🟩 MATRIX RAIN EFFECT USING CANVAS 🟩
    * This is the dedicated code block to create the falling green squares/text.
    */
    const canvas = document.getElementById('matrix-background');
    if (!canvas) return; // Exit if the canvas element isn't found

    const ctx = canvas.getContext('2d');

    // --- Matrix Rain Variables ---
    const matrixCharacters = '01'; // Only 1s and 0s
    const fontSize = 16;
    let columns;
    let yPositions;

    // Set canvas dimensions to the size of the viewport
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = document.querySelector('.hero').offsetHeight;
        
        // Recalculate column positions on resize
        columns = canvas.width / fontSize;
        yPositions = Array(Math.floor(columns)).fill(0);
    };
    window.addEventListener('resize', resizeCanvas);
    
    // Initial setup
    resizeCanvas(); 


    function draw() {
        // 1. **Fading Effect:** Semi-transparent black rectangle to make old characters fade
        // Lowering the alpha (0.05) makes the trails longer and slower to fade
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. **Character Style:** Set the Matrix green color and font
        ctx.fillStyle = '#0F0'; // Neon green
        ctx.font = fontSize + 'px monospace';

        // 3. **Drawing and Falling:** Loop through each stream (column)
        for (let i = 0; i < yPositions.length; i++) {
            const y = yPositions[i];
            
            // Pick a random character (the "letter" to populate)
            const text = matrixCharacters.charAt(Math.floor(Math.random() * matrixCharacters.length));
            
            // Draw the character at the current position
            ctx.fillText(text, i * fontSize, y);

            // Reset the stream when it hits the bottom (or randomly to create a staggered effect)
            // Adjusting the random check creates the "rain" effect
            if (y > canvas.height && Math.random() > 0.97) {
                yPositions[i] = 0;
            } else {
                // Move the stream down
                yPositions[i] = y + fontSize;
            }
        }
    }

    // Start the Matrix Rain animation loop
    setInterval(draw, 30); // 30ms is about 33 FPS, which looks smooth for this effect
});