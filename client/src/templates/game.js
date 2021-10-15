class GameComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="game-container">
            <div id="turn" class="turn-container"></div>
            <div class="canvas-container">
                <canvas id="canvas" width="750" height="750" class="canvas"></canvas>
                <br/>
                <button id="deployBot">Deploy Bot</button>
                <button id="turnBot">Turn Bot</button>
                <button id="endGame">End Game</button>
                <h3>How to play?</h3>
                <p>
                    The goal of the game is to try to acquire more resources than your opponents before the time runs out.
                </p>
                <p>
                    <b>Deploy bot</b> will spawn a new bot at a starting position. The bot will automatically try to acquire a resource.
                </p>
                <p>
                    <b>Turn bot</b> will turn your bot in a random direction before your bot starts moving towards a resource again.
                </p>
            </div>
            <div class="score-container">
                <h3>Points</h3>
                <div id="scores"></div>
            </div>
        </div>`;
    }
}

customElements.define('game-component', GameComponent);