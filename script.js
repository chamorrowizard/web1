document.addEventListener('DOMContentLoaded', () => {

    /*
    * 1. Dynamic Text Accentuation
    * The main title might have an effect where certain words (like "wealth" and "precision")
    * appear in the accent green color, which is already handled in HTML/CSS, but
    * JS could handle a 'typing' or 'glitch' effect on these words.
    */
    const systemStatus = document.querySelector('.system-status');
    const toggleSystemOperational = () => {
        // Simple toggle for a subtle operational blink effect
        systemStatus.classList.toggle('active');
    };
    // Run the toggle every second for a pulse effect
    setInterval(toggleSystemOperational, 1000);

    /*
    * 2. Radar/Scanner Animation (Hero Section)
    * The circular graphic needs to look like it's scanning.
    */
    const radarGraphic = document.querySelector('.radar-graphic');
    // CSS keyframes would handle the main rotation, but JS could handle a pulsing inner glow.
    // Example:
    const pulse = () => {
        radarGraphic.style.boxShadow = `0 0 20px 5px ${
            Math.random() > 0.5 ? 'rgba(0, 255, 102, 0.5)' : 'transparent'
        }`;
    };
    setInterval(pulse, 500);


    /*
    * 3. Feature Card Interaction (Global Settlement Status Update)
    * Simulate real-time updates for a "Global Settlement" list.
    */
    const settlementList = document.querySelector('.settlement-list');
    const updateSettlementStatus = () => {
        const items = settlementList.querySelectorAll('li span');
        items.forEach(span => {
            if (span.textContent.trim() === 'Pending') {
                span.textContent = 'Settled';
                span.style.color = 'var(--color-accent-green)';
            } else if (span.textContent.trim() === 'Settled') {
                span.textContent = 'Pending';
                span.style.color = 'yellow';
            }
        });
    };
    // Update every few seconds to look dynamic
    setInterval(updateSettlementStatus, 5000);


    /*
    * 4. AI Query Simulation (AI-Driven Market Intelligence)
    * When the "Liquidity Depth" button is clicked, simulate a query result.
    */
    const queryButton = document.querySelector('.query-box button');
    const queryInput = document.getElementById('query');

    queryButton.addEventListener('click', () => {
        console.log(`Executing AI Query for: ${queryInput.value}`);
        // In a real application, this would send an API request to the LLM agent.
        // For a demo, we could display a temporary "QUERY EXECUTING..." message.
        queryButton.textContent = 'QUERY COMPLETE.';
        setTimeout(() => {
            queryButton.textContent = 'Liquidity Depth';
        }, 3000);
    });
});