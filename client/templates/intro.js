class IntroComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="intro-container">
                <h1>Game of bots</h1>
                <button id="playGame">Play</button>
                <p>If a game is running anyone can join by going to this site and clicking play. You can also open multiple browser tabs to act as more players.</p>
                <p>This site uses cookies (<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">session storage</a>), by clicking "play" you agree to use these cookies.</p>
                <h3>How to play?</h3>
                <p>
                    The goal of the game is to try to acquire more points than your opponents before the time runs out.
                </p>
                 <ul>
                    <li>Bots that collide explode and are removed</li>
                    <li>Gathering a resource gives 5 points.</li>
                    <li>Deploying a bot costs 5 points.</li>
                    <li>The player with the most points when the time runs out wins.</li>
                    <li>If you run out of points and bots you lose.</li>
</ul>
                <p>
                    <b>Deploy bot</b> will spawn a new bot at a starting position. The bot will automatically try to acquire a resource.
                </p></div>`;
    }
}

customElements.define('intro-component', IntroComponent);