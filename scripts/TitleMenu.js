// With our menu, I want to display the title screen, along with some options...
// Let's start with TITLE
// START
// OPTIONS
// INSTRUCTIONS

class Menu {
    constructor(options=[], parent){
        this.options = options;
        this.selection = 0;
        this.delay = 0;
        this.parent = parent;
        this.state = {};
        this.currentState = {};
    }

    // Get Input
    getInput(input){
        const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, z, x } = input;

        // Change Selection
        if(ArrowUp) this.changeSelection(-1)
        if(ArrowDown) this.changeSelection(1)

        // Change Parameter
        if(ArrowLeft) this.changeParameter(-1)
        if(ArrowRight) this.changeParameter(1)

        // Choose Selection
        if(z) this.chooseSelection();

        // Previous Menu
        if(x) Menu.loadParent();
    }

    // Get Selection
    get getSelection(){
        return this.options[this.selection];
    }

    // Change Selection
    changeSelection(num){
        this.selection += num;

        // Wrap Selection

        if(this.selection >= this.options.length) this.selection = 0;
        if(this.selection < 0) this.selection = this.options - 1;
    }

    // Choose Selection
    chooseSelection(){
        this.getSelection.load();
    }

    // Change Parameter
    changeParameter(num){
        // Get the parameter
        const parameter = this.getSelection;
        if(parameter.type !== 'parameter') return;

        // Change the parameter selection
        parameter.changeSelection(num);

        // Update our state object
        this.currentState[parameter.name] = parameter.value;
    }

    // Load Parent
    static loadParent(){
        console.log(this.parent);
    }
}

class Parameter{
    constructor(name, options = []){
        this.name = name;
        this.options = options;
        this.selection = 0;
        this.type = 'parameter'
    }

    // Get Value
    get value(){
        return this.options[this.selection];
    }

    // Change Selection

    changeSelection(num){
        this.selection += num;
        if(this.selection >= this.options.length) this.selection = 0;
        if(this.selection < 0) this.selection = this.options - 1;
    }
}

class Selection{
    constructor(action = () => console.log('I am an action!')){
        this.load = action;
        this.type = 'selection';
    }
}

// VIEW

// MENU PROPS
// this.options = options;
// this.selection = 0;
// this.currentState = {};

const renderMenu = (menu) => {
    const { options, selection, currentState } = menu;
    // I want our... render methodology to be pretty... consistent...
    // Because I want to avoid spending a lot of time doing custom formatting / styling
    // So we'll use regular HTML elements to render our entire view...
    // A few things will need to do first: 
    // Restructure our core HTML element
}

// static drawTitle(){
//     // Draw Black Background
//     View.clear();
//     ctx.fillStyle = defaultStyle.fill;
//     ctx.fillRect(0,0,viewport.width, viewport.height);

//     // Draw Game Title
//     const title = `Forever Fire\n1942`;
//     ctx.font = `48px ${fontTitle}`;
//     ctx.fillStyle = white;
//     ctx.fillText(title, viewport.width /2, 180);

//     // Draw Splash Image

//     // Draw Menu Options
// }