
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x87CEEB
});
document.getElementById('game-container').appendChild(app.view);

// Load textures
const fishTexture = PIXI.Texture.from('fish.png');
const foodTexture = PIXI.Texture.from('food.png');

// check textures loading
fishTexture.baseTexture.on('loaded', () => {
    console.log('Fish texture loaded successfully');
});
fishTexture.baseTexture.on('error', (error) => {
    console.error('Failed to load fish texture', error);
});

foodTexture.baseTexture.on('loaded', () => {
    console.log('Food texture loaded successfully');
});
foodTexture.baseTexture.on('error', (error) => {
    console.error('Failed to load food texture', error);
});

// Create the fish
const fish = new PIXI.Sprite(fishTexture);
fish.anchor.set(0.5);
fish.x = app.screen.width / 2;
fish.y = app.screen.height / 2;
fish.scale.set(0.5);
app.stage.addChild(fish);

// Create food
const food = new PIXI.Sprite(foodTexture);
food.anchor.set(0.5);
food.x = Math.random() * app.screen.width;
food.y = Math.random() * app.screen.height;
food.scale.set(0.2);
app.stage.addChild(food);

app.renderer.plugins.interaction.on('pointermove', (event) => {
    const newPosition = event.data.global;
    fish.x = newPosition.x;
    fish.y = newPosition.y;
});

// Game loop
app.ticker.add(() => {
    if (hitTestRectangle(fish, food)) {
        fish.scale.x += 0.01;
        fish.scale.y += 0.01;
        
        food.x = Math.random() * app.screen.width;
        food.y = Math.random() * app.screen.height;
    }
});

// Collision detection function
function hitTestRectangle(r1, r2) {
    const r1Bounds = r1.getBounds();
    const r2Bounds = r2.getBounds();

    return r1Bounds.x + r1Bounds.width > r2Bounds.x &&
           r1Bounds.x < r2Bounds.x + r2Bounds.width &&
           r1Bounds.y + r1Bounds.height > r2Bounds.y &&
           r1Bounds.y < r2Bounds.y + r2Bounds.height;
}
