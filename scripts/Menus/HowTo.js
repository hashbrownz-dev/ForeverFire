const iconPath = `./images/icons/`
const renderHowTo = () => {
    const controls = () => {
        Menu.container.innerHTML = ``;

        // HEADING

        const heading = document.createElement('h1');
        heading.innerText = `How To Play`;
        heading.id = 'score-title';
        heading.style = 'margin-bottom: 15px;'
        Menu.container.appendChild(heading);

        const playerImg = new Image();
        playerImg.src = './images/icons/Player.png';
        playerImg.style = `display:block; margin:25px auto;`
        Menu.container.appendChild(playerImg);

        const p1 = document.createElement('p');
        p1.innerHTML = `Pilot your warplane through 10 waves of hostile enemy fighters!  <strong class='gold'>Collect Medals</strong> to power up while shooting <strong class='red'>Enemy Aircraft</strong> and dodging <strong class='pink'>Bullets</strong>!`;
        p1.className = 'htp';
        Menu.container.appendChild(p1);

        const h2 = document.createElement('h2');
        h2.innerText = `Controls`
        Menu.container.appendChild(h2);

        const p2 = document.createElement('p');
        p2.innerHTML = `<strong>Move with the Arrow Keys</strong> - <strong class='red'>Shoot with Z</strong> - <strong class='aqua'>Pause the action with P</strong>`
        p2.className = 'htp';
        Menu.container.appendChild(p2);

        // CONTROL INFOGRAPHIC

        const controls = document.createElement('div');
        controls.id = 'controls';
        Menu.container.appendChild(controls);

        const move = document.createElement('div');
        move.innerHTML = `<h2>Move</h2>`;
        const   arrowUp = new Image(),
                arrowDown = new Image(),
                arrowLeft = new Image(),
                arrowRight = new Image();
        arrowUp.src = iconPath + 'KeyUp.png';
        arrowDown.src = iconPath + `KeyDown.png`;
        arrowLeft.src = iconPath + 'KeyLeft.png';
        arrowRight.src = iconPath + 'KeyRight.png';

        arrowUp.className = 'arrowUp';
        arrowDown.className = 'arrowKey';
        arrowLeft.className = 'arrowKey';
        arrowRight.className = 'arrowKey';
        
        const arrowContainer = document.createElement('div');
        arrowContainer.append(arrowUp, arrowLeft, arrowDown, arrowRight);

        move.append(arrowContainer);

        const shoot = document.createElement('div');
        shoot.innerHTML = `<h2>Shoot</h2>`;
        const keyZ = new Image();
        keyZ.src = iconPath + 'KeyZ.png';
        keyZ.className = `key`;
        shoot.append(keyZ);

        const pause = document.createElement('div');
        pause.innerHTML = `<h2>Pause</h2>`;
        const keyP = new Image();
        keyP.src = iconPath + 'KeyP.png';
        keyP.className = 'key';
        pause.append(keyP);

        controls.append(move, shoot, pause);
    }
    
    const enemies = () => {
        Menu.container.innerHTML = `
            <h2>Enemies</h2>
            <p class='htp'>
                <strong>Destroy Enemy Aircraft</strong> to earn points!  Each enemy drops either a <strong>Medal</strong> or <strong>Power Up</strong> to upgrade your warplane.  Crashing into an enemy results in <strong>death</strong>.  Some enemies fire <strong>Bullets</strong> that can damage your Hull by 25%.
                <br><br>
                There are more than 20 enemy variants in <strong>Forever Fire</strong>.  Below are the four core archetypes:
            </p>
        `;
        // Table
        const table = document.createElement('table');
        table.className = 'htt';
        const tableData = [
            {img:'PotShot.png', txt:`<strong class='aqua'>Pot Shots</strong> fly vertically in a straight line.  <strong class='red'>Red,</strong> <strong class='orange'>Orange,</strong> <strong class='aqua'>Blue,</strong> and <strong class='pink'>Pink</strong> Pot Shots fire bullets.  <strong>Green Pot Shots</strong> have improved defense and reduced speed.`},
            {img:'Kamikaze.png', txt:`<strong>Kamikaze</strong> fly towards the player.  <strong class='orange'>Orange,</strong> <strong class='aqua'>Blue,</strong> and <strong class='pink'>Pink</strong> Kamikaze also fire bullets.  <strong>Green Kamikaze</strong> have improved defense.  <strong class='red'>Watch Out!</strong>  <strong class='aqua'>Blue</strong> Kamikaze approach from behind!`},
            {img:'Ace.png', txt:`<strong class='orange'>Aces</strong> fly in patterns while firing bullets at your aircraft.  <strong class='gold'>Beware the Golden Ace!</strong>  These enemies will chase you relentlessly!`},
            {img:'Gunner.png', txt:`<strong class='red'>Gunner's</strong> aren't very fast, but, while they lack speed, they have ample defense and firepower!  <strong class='red'>Watch Out!</strong>  <strong>Green Gunners</strong> approach from behind!`}
        ];
        for(const row of tableData){
            const r = document.createElement('tr');
            const i = document.createElement('td');
            const t = document.createElement('td');
            i.innerHTML = `<img src='${iconPath}${row.img}'/>`;
            i.className = 'htd';
            i.style = `text-align: center;`
            t.innerHTML = row.txt;
            t.className = 'htd';
            r.append(i, t);
            table.append(r);
        }

        Menu.container.appendChild(table);
    }
    
    const weapons = () => {
        console.log('weapons');
    }
    
    const medals = () => {
        console.log('medals');
    }
    
    const powers = () => {
        console.log('powers');
    }
    const options = [
        new Parameter('pages', [
            controls,
            enemies,
            weapons,
            medals,
            powers
        ])
    ]
    const menu = new Menu(options, 'how-to-menu');
    menu.render();
    return menu;
}