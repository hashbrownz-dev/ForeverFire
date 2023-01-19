// With our menu, I want to display the title screen, along with some options...
// Let's start with TITLE
// START
// OPTIONS
// INSTRUCTIONS

class Menu {
    constructor(options=[], id){
        this.options = options;
        this.optionNodes;
        this.selection = 0;
        this.delay = 10;
        this.id = id;
        this.parent = document.getElementById('menu');
        this.state = {};
        this.currentState = {};
    }

    update(input){
        this.delay --;
        if(this.delay < 0) this.delay = 0;
        if(!this.delay){
            if(!this.getInput(input)){
                this.delay = 10;
            }
        }
    }

    // Get Input
    getInput(input){
        const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, z, x } = input;

        // Change Selection
        if(ArrowUp) {
            this.changeSelection(-1);
            return
        }
        if(ArrowDown) {
            this.changeSelection(1)
            return
        }

        // Change Parameter
        if(ArrowLeft) {
            this.changeParameter(-1)
            return
        }
        if(ArrowRight) {
            this.changeParameter(1)
            return
        }

        // Choose Selection
        if(z) {
            this.chooseSelection()
            return
        }

        // Previous Menu
        if(x) {
            Menu.loadParent()
            return
        }

        return true;
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
        if(this.selection < 0) this.selection = this.options.length - 1;

        // Update Menu

        this.updateSelection();
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

    // Render Menu
    render(){
        // Get the Parent Element
        const parentContainer = Menu.container;
        parentContainer.classList.remove('hidden');

        // Create the Containing Element
        const optionsContainer = document.createElement('div');
        if(this.id)optionsContainer.id = this.id;
        optionsContainer.classList.add('menu');
        parentContainer.appendChild(optionsContainer);

        // Create the Options
        const optionNodes = [];
        const optionList = document.createElement('ul');
        for(let i = 0; i < this.options.length; i++){
            // Create the Element
            const option = document.createElement('li');
            // Store a reference to the element
            optionNodes.push(option);
            // Update the class of the currently selected 
            if(i === this.selection) option.classList.add('selected');
            option.innerText = this.options[i].name;
            optionList.appendChild(option);
        }
        optionsContainer.appendChild(optionList);
        this.optionNodes = optionNodes;
    }

    // Update Selection
    updateSelection(){
        this.optionNodes.forEach( e => { e.classList.remove('selected')});
        this.optionNodes[this.selection].classList.add('selected');
    }

    // Container
    static get container(){
        return document.getElementById('menu');
    }

    // Clear Menu
    static clear(){
        const menu = Menu.container;
        while(menu.firstChild){
            menu.removeChild(menu.firstChild);
        }
        menu.classList.add('hidden');
        _Menu = undefined;
    }

    // Check to see if a current menu is loaded
    static get isActive(){
        return Menu.container.firstChild;
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
    constructor(name = '', action = () => console.log('I am an action!')){
        this.name = name;
        this.load = action;
        this.type = 'selection';
    }
}