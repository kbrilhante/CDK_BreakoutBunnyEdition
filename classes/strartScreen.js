class StartScreen {
    constructor() {
        this.parentDiv = createDiv();
        this.modeDiv = createDiv();
        this.modeDiv.parent(this.parentDiv);
        this.lblMode = createP("Game Mode: ");
        this.lblMode.addClass('text');
        this.lblMode.parent(this.modeDiv);
        this.selMode = createSelect();
        this.selMode.parent(this.modeDiv);
        this.setOptions();
        // this.selMode.option('Classic');
        // this.selMode.option('Moving Blocks');
        // this.selMode.option('Force Field');
        this.selMode.selected('Classic');
        this.selMode.addClass('dropdown');
        this.btnStart = createButton("Start Game");
        this.btnStart.parent(this.parentDiv);
        this.btnStart.addClass('btn')
        this.btnStart.mouseClicked(() => {
            this.handleStartGame();
        });
        this.parentDiv.center();
    }
    setOptions() {
        for (let i = 0; i < gameModes.length; i++) {
            const mode = gameModes[i];
            this.selMode.option(mode);
        }
    }
    handleStartGame() {
        game = new Game(this.selMode.value());
        game.initialize();
        gameOver = false;
        removeElements(); 
    }
}