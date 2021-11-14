class GameComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="game-container">
            <div id="turn" class="turn-container"></div>
            <div class="canvas-container">
                <canvas id="canvas" width="750" height="750" class="canvas"></canvas>
                <br/>
                <button id="deployBot">Deploy Bot</button>
                <button id="endGame">Leave Game</button>
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