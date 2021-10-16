class IntroComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="intro-container">
                <h1>Game of bots</h1>
                <button id="playGame">Play</button>
                <p>This site uses cookies (<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">session storage</a>), by clicking "play" you agree to use these cookies.</p>
                <h3>How to play?</h3>
                <p>
                    The goal of the game is to try to acquire more resources than your opponents before the time runs out.
                </p>
                <p>
                    <b>Deploy bot</b> will spawn a new bot at a starting position. The bot will automatically try to acquire a resource.
                </p>
                <p>
                    <b>Turn bot</b> will turn your bot in a random direction before your bot starts moving towards a resource again.
                </p></div>`;
    }
}

customElements.define('intro-component', IntroComponent);