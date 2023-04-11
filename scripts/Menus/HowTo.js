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
        Menu.container.innerHTML = `
            <h2>Weapons</h2>
            <p class='htp'>
                <strong class='red'>Destroy Gunners and Collect their War Medals</strong> to augment your warplane's firepower!  Collecting a <strong class='gold'>War Medal</strong> of your warplane's current weapon will reward <strong class='aqua'>25 SP.</strong>  Each Gunner drops a specific War Medal. There are three Weapon Types:
            </p>
        `
        // Build Table
        const table = document.createElement('table');
        table.className = 'htt';
        Menu.container.append(table);
        const ships = document.createElement('tr');
        const tableData = [
            {ship:'GunnerM.png', medal:'Menu-Weapons-01.png', txt:`<strong>Machine Gun</strong><br><br>Your warplane's default rapid fire weapon.  Dying replaces your current weapon with the Machine Gun.`},
            {ship:'Gunner.png', medal:'Menu-Weapons-02.png', txt:`<strong class='red'>Spread Shot</strong><br><br>Fires five bullets in an arc.`},
            {ship:'GunnerF.png', medal:'Menu-Weapons-03.png', txt:`<strong class='orange'>Flame Cannon</strong><br><br>Fires a large napalm bomb that creates an explosive blast on impact, destroying anything caught in its radius.`}
        ]
        // Ships
        for(let i = 0; i < tableData.length; i++){
            const td = document.createElement('td');
            const img = new Image();
            img.src = iconPath + tableData[i].ship;
            td.className = 'htd';
            td.style = 'text-align:center;';
            td.append(img);
            ships.append(td);
        }
        // Drops
        const drops = document.createElement('tr');
        for(let i = 0; i < tableData.length; i++){
            const td = document.createElement('td');
            td.innerHTML = '';
            td.className = 'htd';
            td.style = 'text-align:center';
            drops.append(td);
        }
        // War Medal
        const medals = document.createElement('tr');
        for(let i = 0; i < tableData.length; i++){
            const td = document.createElement('td');
            const img = new Image();
            img.src = iconPath + tableData[i].medal;
            td.className = 'htd';
            td.style = 'text-align:center';
            td.append(img);
            medals.append(td);
        }
        // Desc
        const desc = document.createElement('tr');
        for(let i = 0; i < tableData.length; i++){
            const td = document.createElement('td');
            td.className = 'htd weapon-desc';
            td.innerHTML = tableData[i].txt;
            desc.append(td);
        }
        table.append(ships,drops,medals,desc);
    }
    
    const medals = () => {
        Menu.container.innerHTML = `
            <h2>Medals</h2>
            <p class='htp'>
                Collect <strong class='gold'>Medals</strong> to earn <strong class='aqua'>Supply Points (SP)</strong> and Level Up!  Each level up spawns a <strong class='pink'>Supply Plane</strong> carrying one random power up.  The first two levels gained also increase your base firepower!
            </p>
        `;
        // Table
        const table = document.createElement('table');
        table.className = 'htt';
        Menu.container.append(table);
        const r1 = document.createElement('tr');
        const r2 = document.createElement('tr');
        r1.innerHTML = `
            <td style='text-align:center;' class='htd'><img src='${iconPath}Menu-Medals-01.png'/></td>
            <td style='text-align:center;' class='htd'><img src='${iconPath}Menu-Medals-02.png'/></td>
            <td style='text-align:center;' class='htd'><img src='${iconPath}Menu-Medals-03.png'/></td>
            <td style='text-align:center;' class='htd'><img src='${iconPath}Menu-Medals-04.png'/></td>
            <td style='text-align:center;' class='htd'><img src='${iconPath}Menu-Medals-05.png'/></td>
        `;

        r2.innerHTML = `
            <td class='medal-desc htd'>5</td>
            <td class='medal-desc htd'>10</td>
            <td class='medal-desc htd'>25</td>
            <td class='medal-desc htd'>50</td>
            <td class='medal-desc htd'>100</td>
        `
        table.append(r1,r2);
        // Second P
        const p2 = document.createElement('p');
        p2.className = 'htp';
        p2.innerHTML = `Destroy <strong class='pink'>Supply Planes</strong> to reveal their cargo!`;
        const img = new Image();
        img.src = iconPath+'Supply.png';
        img.style = `display:block; margin: 15px auto;`
        Menu.container.append(p2,img)
    }
    
    const powers = () => {
        Menu.container.innerHTML = `
            <h2>Power Ups</h2>
        `;

        const tableData = [
            {
                img:'SmallHealth.png',
                txt:`<strong class='aqua'>Small Health</strong><br>Repairs 5% of hull damage.`
            },
            {
                img:'LargeHealth.png',
                txt:`<strong class='aqua'>Large Health</strong><br>Repairs 50% of hull damage.`
            },
            {
                img:'ExtraLife.png',
                txt:`<strong class='orange'>Extra Life</strong><br>Grants one additional life.`
            },
            {
                img:'SpeedUp.png',
                txt:`<strong>Speed Up</strong><br>Increases your warplane's speed.`
            },
            {
                img:'SpeedDown.png',
                txt:`<strong>Speed Down</strong><br>Decreases your warplane's speed.`
            },
            {
                img:'BFG.png',
                txt:`<strong class='gold'>BFG</strong><br>A Weapon of Massive Destruction!  Only lasts for a limited amount of time.`
            },
            {
                img:'Ghost.png',
                txt:`<strong class='aqua'>Ghost</strong><br>Pass through enemy aircraft and bullets without taking any damage.  Only lasts for a limited amount of time.`
            }
        ]
        const table = document.createElement('table');
        table.className = 'htt';
        Menu.container.append(table);
        // Populate Table
        for(const row of tableData){
            const tr = document.createElement('tr');
            const   td1 = document.createElement('td'),
                    td2 = document.createElement('td');
            const img = new Image();
            img.src = iconPath+row.img;
            td1.className = 'htd';
            td1.style = 'text-align:center; width:150px;'
            td1.append(img);
            td2.innerHTML = row.txt;
            td2.className = 'htd';
            tr.append(td1,td2);
            table.append(tr);
        }
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