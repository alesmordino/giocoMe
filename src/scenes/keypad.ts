import Level1 from "./Level1";

export default class Keypad extends Phaser.Scene {
    private base: Phaser.GameObjects.Image;
    private static level: number;
    private currentNumber: string = '';
    private currentNumberText: Phaser.GameObjects.Text;
    static success: boolean;
    constructor() {
        super({ key: "Keypad" });
    }

    create() {
        // Create keypad buttons
        const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'C', 'Enter'];
        const buttonWidth = 80;
        const buttonHeight = 80;
        const startX = this.game.canvas.width / 2;
        const startY = 200; // Increased startY to make space for currentNumber text
        const padding = 10;

        let x = startX;
        let y = startY;

        // Add text to display currentNumber
        const currentNumberRectangle = this.add.rectangle(startX + 90, startY - 90, (buttonWidth + padding) * 3 - 10, buttonHeight, 0x666666)
            .setOrigin(0.5);

        this.currentNumberText = this.add.text(currentNumberRectangle.x, currentNumberRectangle.y, this.currentNumber, { fontSize: '44px', color: '#ffffff' })
            .setOrigin(0.5);

        buttons.forEach((label, index) => {
            const button = this.add.rectangle(x, y, buttonWidth, buttonHeight, 0x666666)
                .setInteractive()
                .on('pointerdown', () => this.onButtonClick(label));
            const buttonText = this.add.text(x, y, label, { fontSize: '24px', color: '#ffffff' })
                .setOrigin(0.5);

            x += buttonWidth + padding;

            if ((index + 1) % 3 === 0) {
                x = startX;
                y += buttonHeight + padding;
            }
        });
    }

    private onButtonClick(label: string) {
        if (label === 'C') {
            // Clear current number
            this.currentNumber = '';
        } else if (label === 'Enter') {
            // Print current number to console
            console.log(this.currentNumber);

            if(this.currentNumber == "10"){

                console.log("Codice corretto - livello successivo");
                this.scene.remove("Keypad");
                Keypad.success = true;
            }
        } else {
            // Concatenate the clicked number
            this.currentNumber += label;
        }

        // Update the text to display currentNumber
        this.currentNumberText.setText(this.currentNumber);
    }
}
