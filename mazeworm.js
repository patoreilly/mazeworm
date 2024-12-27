var Mazeworm = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Mazeworm ()
    {
        Phaser.Scene.call(this, { key: 'mazeworm' });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        this.load.image('mushroom', 'sprites/mushroom.png');
        this.load.image('butterfly', 'sprites/butterfly.png');

    },

    create: function ()
    {   
        
        this_context = this;

        //universal params
        this.safetile = 1;
        this.gridsize = 16;
        this.speed = 90;
        this.threshold = 3;
        this.turnSpeed = 150;
        this.opposites = [ _NONE, _RIGHT, _LEFT, _DOWN, _UP ];

        this.numEnemies = 6;

        this.player_dead = false;
        

        var tileSize = 16;

        var tilesKey = Math.random().toString();
        var canvasFrame = this.textures.createCanvas(tilesKey, 18*tileSize, tileSize);


        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: tile_wall, pixelWidth: 1 });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,0,0);
        
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: tile_space, pixelWidth: 1 });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize,0);



        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: middle_horiz, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*2,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: left_horiz, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*3,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: right_horiz, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*4,0);


        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: middle_verti, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*5,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: top_verti, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*6,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: bottom_verti, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*7,0);


        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: up_t, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*8,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: down_t, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*9,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: left_t, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*10,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: right_t, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*11,0);


        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: right_down_corner, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*12,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: left_down_corner, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*13,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: right_up_corner, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*14,0);
        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: left_up_corner, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*15,0);


        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: single_island, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*16,0);

        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: cross, pixelWidth: 1, palette: palette_jmp });
        //draw the texture data for this tile
        canvasFrame.drawFrame(randomKey,0,tileSize*17,0);


        // Creating a blank tilemap and layer with the specified dimensions
        this.map = this.make.tilemap({ tileWidth: tileSize, tileHeight: tileSize, width: 51, height: 51});

        var tiles = this.map.addTilesetImage(tilesKey);

        var layerKey = Math.random().toString();
        var layer = this.map.createBlankDynamicLayer(layerKey, tiles);
        layer.setScale(1);

        this.map.setCollision([ 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 ]);


        // init animated sprites
        this.animated_group = this.add.group();

        var as; 

        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest').play('atest_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest2').play('atest2_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest3').play('atest3_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest7').play('atest7_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest8').play('atest8_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest9').play('atest9_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest10').play('atest10_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest11').play('atest11_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest12').play('atest12_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest14').play('atest14_animation').setDepth(200);
        this.animated_group.add(as);
        as = this.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'atest17').play('atest17_animation').setDepth(200);
        this.animated_group.add(as);
        
        this.animated_array = this.animated_group.getChildren();


        


        // init butterfly sprites
        this.butterfly_group = this.add.group();

        for (var t=0;t<4;t++)
        {
            var bf = this.physics.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'butterfly');
            bf.zoomTo = Phaser.Math.RND.realInRange(.8, 2.4);            
            this.butterfly_group.add(bf);
        }
        this.butterfly_array = this.butterfly_group.getChildren();



        // init mushroom sprites
        this.mushroom_group = this.add.group();

        for (var t=0;t<4;t++)
        {
            var mush = this.physics.add.sprite( 24+(32*Phaser.Math.Between(0, 24)), 24+(32*Phaser.Math.Between(0, 24)) ,'mushroom');
            mush.gapfactor = Phaser.Math.RND.realInRange(.25, .85);
            if (t%2 == 0)
            {
                mush.newmaze = true;
                mush.tint = 255;
            }

            mush.marker = {};
            mush.marker.x = this.map.worldToTileX(mush.x);
            mush.marker.y = this.map.worldToTileY(mush.y);

            this.mushroom_group.add(mush);
        }
        this.mushroom_array = this.mushroom_group.getChildren();

        

        // init enemy sprite(s)

        this.enemy_group = this.add.group();

        for (var q=0;q<this.numEnemies;q++)
        {
            var enemy = this.physics.add.sprite(24,136,'red_head').setDepth(100);
            
            enemy.eindex = q;

            enemy.snakeSection = [];
            enemy.snakePath = [];
            enemy.speed = Phaser.Math.RND.realInRange(.8, 1.8);
            enemy.snakeSpacer = Math.round((3/enemy.speed)*5);

            enemy.numSnakeSections = 8;

            enemy.status='red';

            //enemy.body_group = this.add.group();

            enemy.emarker = {};
            enemy.eturnPoint = {};
            enemy.edirections = [ null, null, null, null, null ];
            enemy.ecurrent = _DOWN;
            enemy.eturning = _NONE;

            enemy.AI_turnTo = _NONE;
            enemy.saved_emarker = {x:1,y:8};
            enemy.safe_tile_list = [];
            enemy.newFlag = false;

            //  Init player snakeSection array
            for (var i = 0; i < enemy.numSnakeSections; i++)
            {
                enemy.snakeSection[i] = this.physics.add.sprite(24, 136, 'red_section').setDepth(99-i); 
                enemy.snakeSection[i].eindex = q;
                //enemy.body_group.add(enemy.snakeSection[i]);
            }            
            //  Init player snakePath array
            for (var i = 0; i < (enemy.numSnakeSections+1) * enemy.snakeSpacer; i++)
            {
                enemy.snakePath[i] = {x:24,y:136,angle:0};
            }

            this.enemy_group.add(enemy);
        }
        this.enemy_array = this.enemy_group.getChildren();

        
        //player worm params
        //this.marker = {};
        this.turnPoint = {};
        
        this.current = _NONE;
        this.turning = _NONE;
        
        //this.saved_marker = {};
        


        // init player sprite(s)

        player = this.physics.add.sprite(344,344,'blue_head').setDepth(100);

        player.sametile = true;
        player.marker = {};
        player.saved_marker = {};
        player.directions = [ null, null, null, null, null ];

        player.snakeSection = [];
        player.snakePath = [];
        player.speed = 1.5;//1.5;
        player.snakeSpacer = Math.round((3/player.speed)*5);

        player.numSnakeSections = 10;

        //player.body_group = this.add.group();

        
        for (var i = 0; i < player.numSnakeSections; i++)
        {
            player.snakeSection[i] = this.physics.add.sprite(344-(i+1)*player.snakeSpacer, 344, 'blue_section').setDepth(99-i);
            //player.body_group.add(player.snakeSection[i]);          
        }
        
        //  Init player snakePath array
        for (var i = 0; i < (player.numSnakeSections+1) * player.snakeSpacer; i++)
        {
            player.snakePath[i] = {x:344-i,y:344,angle:0};
        }


        //maze generation
        

        this.mainMaze = this.generateMaze(25,25);
        this.displayMaze(this.mainMaze, .25);


        



        // init UIs
        cursors = this.input.keyboard.createCursorKeys();

        // activates gamepad in this scene
        this.input.gamepad.once('down', function (pad, button, index) {
            pad.setAxisThreshold(0.3);
            gamepad = pad;
            }, this);


        // set up checks to prevent direction jerking
        this.last_direction_pressed;

        this.input.gamepad.on('down', function (pad, button, index) {

            if (button.index==12) { this.last_direction_pressed = _UP; }
            if (button.index==13) { this.last_direction_pressed = _DOWN; }
            if (button.index==14) { this.last_direction_pressed = _LEFT; }
            if (button.index==15) { this.last_direction_pressed = _RIGHT; }

        }, this);

        // for keyboard control checks in checkKeys()
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        
        ////


        //var text_gamepad = this.add.text(10, 10, 'Press a button on the Gamepad to use', { font: '16px Courier', fill: '#0000ff' }).setScrollFactor(0);

        // this.input.gamepad.once('down', function (pad, button, index) {

        // //text_gamepad.setText('Playing with ' + pad.id + ' index: ' + pad.index);

        // pad.setAxisThreshold(0.3);

        // gamepad = pad;

        // }, this);

        // //debug
        // left_text = this.add.text(10, 50, 'left', { font: '16px Courier', fill: '#ffffff' }).setScrollFactor(0);
        // right_text = this.add.text(10, 70, 'right', { font: '16px Courier', fill: '#ffffff' }).setScrollFactor(0);
        // up_text = this.add.text(10, 90, 'up', { font: '16px Courier', fill: '#ffffff' }).setScrollFactor(0);
        // down_text = this.add.text(10, 110, 'down', { font: '16px Courier', fill: '#ffffff' }).setScrollFactor(0);

        // current_text = this.add.text(10, 150, 'current', { font: '16px Courier', fill: '#ffffff' }).setScrollFactor(0);
        // turning_text = this.add.text(10, 170, 'turning', { font: '16px Courier', fill: '#ffffff' }).setScrollFactor(0);

        // this.tile_change_text = this.add.text(10, 240, 'TILE CHANGE', { font: '16px Courier', fill: '#ffffff' }).setScrollFactor(0);
        // this.stile_change_text = this.add.text(10, 270, 'sTILE CHANGE', { font: '16px Courier', fill: '#ffffff' }).setScrollFactor(0);

        

        //collisions
        this.physics.add.overlap(player, this.mushroom_group, this.do_mush);
        this.physics.add.overlap(player, this.butterfly_group, this.do_bf);

        this.physics.add.overlap(player, this.enemy_group, this.p2ehead_collision);


        for (var y=0;y<this.enemy_array.length;y++)
        {
            this.physics.add.overlap(player, this.enemy_array[y].snakeSection, this.p2ebody_collision); 
        }



        //this.physics.add.overlap(enemy_group, player, this.e2phead_collision);


        for (var y=0;y<this.enemy_array.length;y++)
        {
            this.physics.add.overlap(this.enemy_group, player.snakeSection, this.e2pbody_collision); 
        }



        ////update enemy colors
        this.update_enemy_colors();


        // //create external div elements for controller UI
        // //see CSS in html file
        // var left_controller = document.createElement('div');
        // left_controller.textContent = 'left';
        // left_controller.setAttribute('class', 'overlay_left')
        // document.body.appendChild(left_controller);
        // left_controller.addEventListener('mouseenter', function(event) {
        //     event.target.style.color = 'purple';
        // });


        // var right_controller = document.createElement('div');
        // right_controller.textContent = 'right';
        // right_controller.setAttribute('class', 'overlay_right')
        // document.body.appendChild(right_controller);



        //gui
        //this.input.addPointer(2);

        //text1 = this.add.text(30, 10);

        this.textures.generate('chunk', { data: ['A'], pixelWidth: 1});

        guide_multi = this.add.image(560,216,'chunk').setDisplaySize(128, 128).setAlpha(.25).setDepth(100);
        // guide_multi.on('pointermove', function () {guide_multi_activeY = guide_multi.input.localY}, this);
        // guide_multi.on('pointerout', function () {guide_multi_activeY = .5}, this);

        //guide_zspeed = this.add.image(40,108,'chunk').setDisplaySize(32, 64).setAlpha(.25).setInteractive().setDepth(100);
        //guide_zspeed.on('pointermove', function () {text1.setText(guide_zspeed.input.localX+" "+guide_zspeed.input.localY)}, this);

        this.textures.generate('h_arrow', { data: guideInputHorizontalData, pixelWidth: 4});
        this.textures.generate('v_arrow', { data: guideInputVerticalData, pixelWidth: 4});

        guide_left = this.add.image(520,216,'h_arrow').setAlpha(.25).setInteractive();
        guide_right = this.add.image(600,216,'h_arrow').toggleFlipX().setAlpha(.25).setInteractive();

        guide_up = this.add.image(560,176,'v_arrow').setAlpha(.25).setInteractive();
        guide_down = this.add.image(560,256,'v_arrow').toggleFlipY().setAlpha(.25).setInteractive();

        guide_left.on('pointerover', function () {guiLeft = true}, this);
        guide_right.on('pointerover', function () {guiRight = true}, this);
        guide_up.on('pointerover', function () {guiUp = true}, this);
        guide_down.on('pointerover', function () {guiDown = true}, this);

        guide_left.on('pointerout', function () {guiLeft = false}, this);
        guide_right.on('pointerout', function () {guiRight = false}, this);
        guide_up.on('pointerout', function () {guiUp = false}, this);
        guide_down.on('pointerout', function () {guiDown = false}, this);

        // guide_forward = this.add.image(40,88,'v_arrow').setAlpha(.25).setDepth(100);
        // guide_back = this.add.image(40,128,'v_arrow').toggleFlipY().setAlpha(.25).setDepth(100);


        //cameras setup

        myCam = this.cameras.main;
        this.cameras.main.startFollow(player, true);
        //this.cameras.main.setZoom(1);
        //this.cameras.main.centerOn(0, 0);

        cont = this.add.container();
        cont.add([guide_left,guide_right,guide_up,guide_down, guide_multi]);

        //  Add in a new camera, the same size and position as the main camera
        UICam = this.cameras.add();

        //  The main camera will not render the container
        this.cameras.main.ignore(cont);

        //  The new UI Camera will not render the background image
        camera_ignorestuff = [this.enemy_group, player, player.snakeSection, this.butterfly_group, this.mushroom_group, this.animated_group, layer];

        for (var t=0;t<this.enemy_array.length;t++)
        {
            camera_ignorestuff.push(this.enemy_array[t].snakeSection);
        }
        UICam.ignore(camera_ignorestuff);



    },

    

    // e2phead_collision: function(sprite1,sprite2)
    // {
        
        // if (sprite1.numSnakeSections>=sprite2.numSnakeSections)
        // {
        //     for (var y=0;y<sprite2.numSnakeSections;y++)
        //     {
        //         sprite2.snakeSection[y].destroy(); 
        //     }
        //     sprite2.destroy(true);
        
        // }
        // else
        // {
        //     for (var y=0;y<sprite1.numSnakeSections;y++)
        //     {
        //         sprite1.snakeSection[y].destroy(); 
        //     }
        //     //sprite1.destroy(true);
        // }
        
        
        
    //},


    e2pbody_collision: function(sprite1,sprite2)
    {

        



        //this_context.dead_sprites = [];
         
        var ssi = player.snakeSection.findIndex(function(e){return (e == sprite2)});

        //var c=0;

        for (var y=ssi;y<player.numSnakeSections;y++)
        {
            /// don't use sprite.destroy() !!! it will render player.snakeSection unusable
            //player.snakeSection[y].visible = false;
            player.snakeSection[y].destroy();

            //this_context.dead_sprites[c] = this_context.add.sprite(player.snakeSection[y].x,player.snakeSection[y].y,'player_bodysection');
            
            //c++;
        }

        // reset camera ignore for new section
        //camera_ignorestuff.push(this_context.dead_sprites);
        UICam.ignore(camera_ignorestuff);

        //start timer for dead sprites
        //this_context.saved_timecheck = game.loop.now;


        //animate_death();//global var dead_sprites instead of passing thru function because 'setTimout' doesn't work otherwise???not sure

        var truncateSections = player.numSnakeSections-ssi;

        player.snakeSection.splice(ssi,truncateSections);

        
        player.numSnakeSections = player.numSnakeSections-truncateSections;
        player.snakePath.splice( player.numSnakeSections*player.snakeSpacer, truncateSections*player.snakeSpacer );

        if (player.numSnakeSections==0) this_context.player_dead = true;

        this_context.update_enemy_colors();

    },     

        


    
    p2ehead_collision: function(sprite1,sprite2)
    {
        
        if (sprite1.numSnakeSections>sprite2.numSnakeSections)
        {
            for (var y=0;y<sprite2.numSnakeSections;y++)
            {
                sprite2.snakeSection[y].destroy(); 
            }
            sprite2.destroy(true);

            this_context.add_playersection();
        
        }
        else
        {
            for (var y=0;y<sprite1.numSnakeSections;y++)
            {
                sprite1.snakeSection[y].destroy(); 
            }
            sprite1.numSnakeSections=0;

            this_context.player_dead = true;
            //sprite1.destroy(true);
        }
        //console.log('player = '+sprite1.numSnakeSections);
        //console.log('enemy = '+sprite2.numSnakeSections);
        
        
    },
    p2ebody_collision: function(sprite1,sprite2)
    {
       
        var ei = this_context.enemy_array.findIndex(function(e){return (e.eindex == sprite2.eindex)});

        var thisEnemy = this_context.enemy_array[ei];

        var ssi = thisEnemy.snakeSection.findIndex(function(e){return (e == sprite2)});

        for (var y=ssi;y<thisEnemy.numSnakeSections;y++)
        {
            thisEnemy.snakeSection[y].destroy(); 
        }
        
        thisEnemy.numSnakeSections = thisEnemy.numSnakeSections-(thisEnemy.numSnakeSections-ssi);

        if (thisEnemy.numSnakeSections==0) 
        {
            thisEnemy.destroy();
            this_context.add_playersection();
        }


        // if (thisEnemy.numSnakeSections<player.numSnakeSections)
        // {
        //     for (var y=0;y<thisEnemy.snakeSection.length;y++)
        //     {
        //         thisEnemy.snakeSection[y].tint = 65280; 
        //     }
        // }
        
        this_context.update_enemy_colors();
        
        //sprite2.destroy();

        
        
    },

    
    do_bf: function(sprite1,sprite2)
    {
        

        myCam.zoomTo(sprite2.zoomTo);
        
    },
    do_mush: function(sprite1,sprite2)
    {
        if (player.saved_marker.x !== player.marker.x || player.saved_marker.y !== player.marker.y)
        {
            player.saved_marker.x = player.marker.x;
            player.saved_marker.y = player.marker.y;

            ///prevents false trigger when leaving tile
            var mush_on_tile = this_context.map.getTileAt(sprite2.marker.x, sprite2.marker.y);

            if (mush_on_tile !== player.directions[1] && mush_on_tile !== player.directions[2] && mush_on_tile !== player.directions[3] && mush_on_tile !== player.directions[4])
            {
                player.sametile = false;
            }
                        
        }
        else
        {
            player.sametile = true;
        }  



        if (!player.sametile)
        {
            if (sprite2.newmaze)
            {
                this_context.displayMaze(this_context.generateMaze(25,25), sprite2.gapfactor);
            }
            else
            {
                this_context.displayMaze(this_context.mainMaze, sprite2.gapfactor);
            }
        }

              
        
    },

    

    update: function()
    {
        
        if (!this.player_dead)
        {
            this.player_movement();
        
            // enemy ai movement
            for (var e=0; e<this.enemy_array.length;e++)
            {
                this.enemy_ai_movement(this.enemy_array[e]);
            }
        }
        else
        {
            this.newPlay();
        }
                

    },


    newPlay: function()
    {
       this.scene.restart();
    },






    player_movement: function()
    {
             
        // Rounds down to nearest tile
        player.marker.x = this.map.worldToTileX(player.x);
        player.marker.y = this.map.worldToTileY(player.y);        
        
        //  Update our grid sensors
        player.directions[1] = this.map.getTileAt(player.marker.x-1, player.marker.y);
        player.directions[2] = this.map.getTileAt(player.marker.x+1, player.marker.y);
        player.directions[3] = this.map.getTileAt(player.marker.x, player.marker.y-1);
        player.directions[4] = this.map.getTileAt(player.marker.x, player.marker.y+1);
        
        this.checkKeys();

        if (this.turning !== _NONE)
        {
            this.turn();
        }

        var path_part = player.snakePath[0];

        
        if ( !(path_part.x==player.x && path_part.y==player.y) ) //keeps snake from bunching on wall collision
        {
            path_part = player.snakePath.pop();

            path_part.x = player.x;
            path_part.y = player.y;
            path_part.angle = player.angle;

            player.snakePath.unshift(path_part);

            for (var i = 0; i < player.numSnakeSections; i++)
            {
                

                player.snakeSection[i].x = (player.snakePath[(i+1) * player.snakeSpacer]).x;
                player.snakeSection[i].y = (player.snakePath[(i+1) * player.snakeSpacer]).y;
                player.snakeSection[i].angle = (player.snakePath[(i+1) * player.snakeSpacer]).angle;
            }   
        }

        //advance movement manually
        switch (this.current)
            {
                case 1:
                        if (player.directions[1].index == 1)
                        {
                            player.body.x -= player.speed;
                        }
                        else
                        {
                            if (player.body.x>player.directions[1].pixelX+16)
                            {
                                player.body.x -= player.speed;
                            }

                            //// if needed to reset body from wall
                            else
                            {
                                player.body.x=player.directions[1].pixelX+16;
                            }
                            
                        }
                        
                        break;
                case 2:
                        if (player.directions[2].index == 1)
                        {
                            player.body.x += player.speed;
                        }
                        else
                        {
                            if (player.body.x<player.directions[2].pixelX-16)
                            {
                                player.body.x += player.speed;
                            }
                            //// if needed to reset body from wall
                            else
                            {
                                player.body.x=player.directions[2].pixelX-16;
                            }
                            
                        }
                                                
                        break;
                case 3:
                        if (player.directions[3].index == 1)
                        {
                            player.body.y -= player.speed;
                        }
                        else
                        {
                            if (player.body.y>player.directions[3].pixelY+16)
                            {
                                player.body.y -= player.speed;
                            }
                            // if needed to reset body from wall
                            else
                            {
                                player.body.y=player.directions[3].pixelY+16;
                            }
                            
                        }
                        
                        break;
                case 4:
                        if (player.directions[4].index == 1)
                        {
                            player.body.y += player.speed;
                        }
                        else
                        {
                            if (player.body.y<player.directions[4].pixelY-16)
                            {
                                player.body.y += player.speed;
                            }
                            // if needed to reset body from wall
                            else
                            {
                                player.body.y=player.directions[4].pixelY-16;
                            }
                            
                        }
                        
                        break;
            }


    },
    

    enemy_ai_movement: function (enemy) {
    // enemy ai movement
        // Rounds down to nearest tile
        enemy.emarker.x = this.map.worldToTileX(enemy.x);
        enemy.emarker.y = this.map.worldToTileY(enemy.y);

        //  Update our grid sensors
        enemy.edirections[1] = this.map.getTileAt(enemy.emarker.x-1, enemy.emarker.y);
        enemy.edirections[2] = this.map.getTileAt(enemy.emarker.x+1, enemy.emarker.y);
        enemy.edirections[3] = this.map.getTileAt(enemy.emarker.x, enemy.emarker.y-1);
        enemy.edirections[4] = this.map.getTileAt(enemy.emarker.x, enemy.emarker.y+1);



        //this.tile_change_text.setText( enemy.emarker.x + "   " + enemy.emarker.y);

        if ( (enemy.emarker.x !== enemy.saved_emarker.x) || (enemy.emarker.y !== enemy.saved_emarker.y) ) 

        {
            
            


            enemy.saved_emarker.x = enemy.emarker.x; 
            enemy.saved_emarker.y = enemy.emarker.y;

            //console.log('check');
            
            enemy.newFlag = true;

            //this.stile_change_text.setText( enemy.saved_emarker.x + "   " + enemy.saved_emarker.y);

            
            
            enemy.saved_timecheck = game.loop.now
            
            
        }


        else
        {
            

            if (enemy.newFlag == true) 
                {this.checkAI(enemy);}
            else
            {
                if (game.loop.now > enemy.saved_timecheck + 500)
                {      
                    //enemy stuck after maze change   
                    enemy.newFlag = true;
                    //console.log('stuck');
                }
            }

        }
        
        

        if (enemy.AI_turnTo==1 && enemy.ecurrent !== _LEFT)
        {
            this.echeckDirection(_LEFT, enemy);
            this.eturn(enemy);
        }
        else if (enemy.AI_turnTo==2 && enemy.ecurrent !== _RIGHT)
        {
            this.echeckDirection(_RIGHT, enemy);
            this.eturn(enemy);
        }
        else if (enemy.AI_turnTo==3 && enemy.ecurrent !== _UP)
        {
            this.echeckDirection(_UP, enemy);
            this.eturn(enemy);
        }
        else if (enemy.AI_turnTo==4 && enemy.ecurrent !== _DOWN)
        {
            this.echeckDirection(_DOWN, enemy);
            this.eturn(enemy);
        }



        

        


        
        //advance movement manually
        switch (enemy.ecurrent)
            {
                case 1:
                        if (enemy.edirections[1].index == 1)
                        {
                            enemy.body.x -= enemy.speed;
                        }
                        else
                        {
                            if (enemy.body.x>enemy.edirections[1].pixelX+16)
                            {
                                enemy.body.x -= enemy.speed;
                            }

                            //// if needed to reset body from wall
                            else
                            {
                                
                                enemy.body.x=enemy.edirections[1].pixelX+16;
                            }
                            
                        }
                        
                        break;
                case 2:
                        if (enemy.edirections[2].index == 1)
                        {
                            enemy.body.x += enemy.speed;
                        }
                        else
                        {
                            if (enemy.body.x<enemy.edirections[2].pixelX-16)
                            {
                                enemy.body.x += enemy.speed;
                            }
                            //// if needed to reset body from wall
                            else
                            {
                                
                                enemy.body.x=enemy.edirections[2].pixelX-16;
                            }
                            
                        }
                                                
                        break;
                case 3:
                        if (enemy.edirections[3].index == 1)
                        {
                            enemy.body.y -= enemy.speed;
                        }
                        else
                        {
                            if (enemy.body.y>enemy.edirections[3].pixelY+16)
                            {
                                enemy.body.y -= enemy.speed;
                            }
                            //// if needed to reset body from wall
                            else
                            {
                                
                                enemy.body.y=enemy.edirections[3].pixelY+16;
                            }
                            
                        }
                        
                        break;
                case 4:
                        if (enemy.edirections[4].index == 1)
                        {
                            enemy.body.y += enemy.speed;
                        }
                        else
                        {
                            if (enemy.body.y<enemy.edirections[4].pixelY-16)
                            {
                                enemy.body.y += enemy.speed;
                            }
                            //// if needed to reset body from wall
                            else
                            {

                                enemy.body.y=enemy.edirections[4].pixelY-16;
                            }
                            
                        }
                        
                        break;
            }

        

        var epart = enemy.snakePath[0];
        
        if ( !(epart.x==enemy.x && epart.y==enemy.y) )
        {
            epart = enemy.snakePath.pop();

            epart.x = enemy.x;
            epart.y = enemy.y;
            epart.angle = enemy.angle;



            enemy.snakePath.unshift(epart);

            for (var i = 1; i <= enemy.numSnakeSections; i++)
            {
                enemy.snakeSection[i-1].x = (enemy.snakePath[i * enemy.snakeSpacer]).x;
                enemy.snakeSection[i-1].y = (enemy.snakePath[i * enemy.snakeSpacer]).y;
                enemy.snakeSection[i-1].angle = (enemy.snakePath[i * enemy.snakeSpacer]).angle;
            }   
        }


    },
    checkAI: function (enemy) {
        
        
        
        
            
        enemy.newFlag = false;
            

        
            enemy.safe_tile_list = [];

            for (var z=1;z<5;z++)
            {
                if (z !== this.opposites[enemy.ecurrent])
                {
                    if (enemy.edirections[z].index==this.safetile) {enemy.safe_tile_list.push(z)}
                }
                
            }

            //console.log(this.safe_tile_list);

            switch (enemy.safe_tile_list.length)
            {
                case 0:

                    enemy.AI_turnTo = this.opposites[enemy.ecurrent];
                    break;

                case 1:
                    enemy.AI_turnTo = enemy.safe_tile_list[0];
                    break;

                case 2:
                    enemy.AI_turnTo = enemy.safe_tile_list[Phaser.Math.Between(0, enemy.safe_tile_list.length-1)];
                    //this.AI_turnTo = safe_tile_list[0];
                    //if (this.AI_turnTo == this.opposites[this.ecurrent]) {this.AI_turnTo = safe_tile_list[1]}
                    break;

                case 3:
                    enemy.AI_turnTo = enemy.safe_tile_list[Phaser.Math.Between(0, enemy.safe_tile_list.length-1)];
                    //this.AI_turnTo = safe_tile_list[1];
                    //if (this.AI_turnTo == this.opposites[this.ecurrent]) {this.AI_turnTo = safe_tile_list[2]}
                    break;

                case 4:
                    enemy.AI_turnTo = enemy.safe_tile_list[Phaser.Math.Between(0, enemy.safe_tile_list.length-1)];
                    //this.AI_turnTo = safe_tile_list[2];
                    //if (this.AI_turnTo == this.opposites[this.ecurrent]) {this.AI_turnTo = safe_tile_list[3]}
                    break;
            }

            
            
            //console.log(this.AI_turnTo);

        // if (enemy.AI_turnTo==1) {left_text.setColor('#00ff00')} else {left_text.setColor('#ff0000')}
        // if (enemy.AI_turnTo==2) {right_text.setColor('#00ff00')} else {right_text.setColor('#ff0000')}
        // if (enemy.AI_turnTo==3) {up_text.setColor('#00ff00')} else {up_text.setColor('#ff0000')}
        // if (enemy.AI_turnTo==4) {down_text.setColor('#00ff00')} else {down_text.setColor('#ff0000')}

        

        
                
        // current_text.setText('current direction: ' + dir_text_label[enemy.ecurrent]);
        // turning_text.setText('current turn setting:' + dir_text_label[enemy.eturning]);
            

                
        

    },

    checkKeys: function () {

        if (Phaser.Input.Keyboard.JustDown(this.up_key))
        {
            this.last_direction_pressed = _UP;
        }
        if (Phaser.Input.Keyboard.JustDown(this.down_key))
        {
            this.last_direction_pressed = _DOWN;
        }
        if (Phaser.Input.Keyboard.JustDown(this.left_key))
        {
            this.last_direction_pressed = _LEFT;
        }
        if (Phaser.Input.Keyboard.JustDown(this.right_key))
        {
            this.last_direction_pressed = _RIGHT;
        }

        

        if (touchActivated)

        {
            if ( guiLeft && this.current !== _LEFT )
            {
                this.checkDirection(_LEFT);
            }
            else if ( guiRight && this.current !== _RIGHT)
            {
                this.checkDirection(_RIGHT);
            }
            else if ( guiUp && this.current !== _UP)
            {
                this.checkDirection(_UP);
            }
            else if ( guiDown && this.current !== _DOWN)
            {
                this.checkDirection(_DOWN);
            }
            else
            {
                //  This forces them to hold the key down to turn the corner
                this.turning = _NONE;

            }
        }

        
        else if (gamepad)

        {
            if ( (gamepad.left && this.last_direction_pressed==_LEFT) && this.current !== _LEFT)
            {
                this.checkDirection(_LEFT);
            }
            else if ( (gamepad.right && this.last_direction_pressed==_RIGHT) && this.current !== _RIGHT)
            {
                this.checkDirection(_RIGHT);
            }
            else if ( (gamepad.up && this.last_direction_pressed==_UP) && this.current !== _UP)
            {
                this.checkDirection(_UP);
            }
            else if ( (gamepad.down && this.last_direction_pressed==_DOWN) && this.current !== _DOWN)
            {
                this.checkDirection(_DOWN);
            }
            else
            {
                //  This forces them to hold the key down to turn the corner
                this.turning = _NONE;

            }
        }

        else

        {
            if ( (cursors.left.isDown && this.last_direction_pressed==_LEFT) && this.current !== _LEFT )
            {
                this.checkDirection(_LEFT);
            }
            else if ( (cursors.right.isDown && this.last_direction_pressed==_RIGHT) && this.current !== _RIGHT)
            {
                this.checkDirection(_RIGHT);
            }
            else if ( (cursors.up.isDown && this.last_direction_pressed==_UP) && this.current !== _UP)
            {
                this.checkDirection(_UP);
            }
            else if ( (cursors.down.isDown && this.last_direction_pressed==_DOWN) && this.current !== _DOWN)
            {
                this.checkDirection(_DOWN);
            }
            else
            {
                //  This forces them to hold the key down to turn the corner
                this.turning = _NONE;

            }
        }
    },
    

    checkDirection: function (turnTo) {

        if (player.directions[turnTo] === null || player.directions[turnTo].index !== this.safetile)
        {
            //  Invalid direction if there is no tile there, or the tile doesn't index a floor tile

            return;
        }

        //  Check if they want to turn around and can
        if (this.current === this.opposites[turnTo])
        {
            this.move(turnTo);
        }
        else
        {
            this.turning = turnTo;

            this.turnPoint.x = (player.marker.x * this.gridsize) + (this.gridsize / 2);
            this.turnPoint.y = (player.marker.y * this.gridsize) + (this.gridsize / 2);
        }
    },

    turn: function () {

        var cx = Math.floor(player.x);
        var cy = Math.floor(player.y);

        //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
        if (!Phaser.Math.Fuzzy.Equal(cx, this.turnPoint.x, this.threshold) || !Phaser.Math.Fuzzy.Equal(cy, this.turnPoint.y, this.threshold))
        {
            return false;
        }

        player.x = this.turnPoint.x;
        player.y = this.turnPoint.y;

        player.body.reset(this.turnPoint.x, this.turnPoint.y);

        this.move(this.turning);

        //this.turning = _NONE;

        return true;

    },

    move: function (direction) {

        //var speed = this.speed;

        if (direction === _LEFT)
        {
            //player.body.velocity.x = -speed;

            if (this.current === _UP)
            {
                this.tweens.add({targets: player,angle: -180,duration: 150,});
            }
            else
            {
                this.tweens.add({targets: player,angle: 180,duration: 150,});
            }
            
            //player.angle = 180;
        }
        if (direction === _RIGHT)
        {
            //player.body.velocity.x = speed;
            this.tweens.add({targets: player,angle: 0,duration: 150,});
            //player.angle = 0;
        }
        if (direction === _UP)
        {
            //player.body.velocity.y = -speed;
            this.tweens.add({targets: player,angle: -90,duration: 150,});
            //player.angle = -90;
        }
        if (direction === _DOWN)
        {


            //player.body.velocity.y = speed;
            if (this.current === _LEFT)
            {
                this.tweens.add({targets: player,angle: -270,duration: 150,});
            }
            else
            {
                this.tweens.add({targets: player,angle: 90,duration: 150,});
            }

            //player.angle = 90;
        }   

        this.current = direction;

    },

    echeckDirection: function (turnTo, enemy) {

        if (enemy.edirections[turnTo] === null || enemy.edirections[turnTo].index !== this.safetile)
        {
            //  Invalid direction if there is no tile there, or the tile doesn't index a floor tile

            return;
        }

        //  Check if they want to turn around and can
        if (enemy.ecurrent === this.opposites[turnTo])
        {
            this.emove(turnTo, enemy);
        }
        else
        {
            enemy.eturning = turnTo;
            

            enemy.eturnPoint.x = (enemy.emarker.x * this.gridsize) + (this.gridsize / 2);
            enemy.eturnPoint.y = (enemy.emarker.y * this.gridsize) + (this.gridsize / 2);
        }
    },

    eturn: function (enemy) {

        var cx = Math.floor(enemy.x);
        var cy = Math.floor(enemy.y);

        //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
        if (!Phaser.Math.Fuzzy.Equal(cx, enemy.eturnPoint.x, this.threshold) || !Phaser.Math.Fuzzy.Equal(cy, enemy.eturnPoint.y, this.threshold))
        {

            return false;
        }

        enemy.x = enemy.eturnPoint.x;
        enemy.y = enemy.eturnPoint.y;

        enemy.body.reset(enemy.eturnPoint.x, enemy.eturnPoint.y);

        //console.log('eturn: '+ this.eturning);
        
        this.emove(enemy.eturning, enemy);
        

        //this.eturning = _NONE;

        return true;

    },

    // emove: function (direction) {

    //     var speed = this.speed;

    //     if (direction === _LEFT)
    //     {
    //         enemy.body.velocity.x = -speed;            
    //     }
    //     if (direction === _RIGHT)
    //     {
    //         enemy.body.velocity.x = speed;            
    //     }
    //     if (direction === _UP)
    //     {
    //         enemy.body.velocity.y = -speed;            
    //     }
    //     if (direction === _DOWN)
    //     {
    //         enemy.body.velocity.y = speed;
    //     }   

    //     //console.log('emove: '+direction);
    //     //this.eprevious = this.ecurrent;
    //     this.ecurrent = direction;

        
        
        

    // },
    emove: function (direction, enemy) {

        //var speed = this.speed;

        if (direction === _LEFT)
        {
            //player.body.velocity.x = -speed;

            if (enemy.ecurrent === _UP)
            {
                this.tweens.add({targets: enemy,angle: -180,duration: 150,});
            }
            else
            {
                this.tweens.add({targets: enemy,angle: 180,duration: 150,});
            }
            
            //player.angle = 180;
        }
        if (direction === _RIGHT)
        {
            //player.body.velocity.x = speed;
            this.tweens.add({targets: enemy,angle: 0,duration: 150,});
            //player.angle = 0;
        }
        if (direction === _UP)
        {
            //player.body.velocity.y = -speed;
            this.tweens.add({targets: enemy,angle: -90,duration: 150,});
            //player.angle = -90;
        }
        if (direction === _DOWN)
        {


            //player.body.velocity.y = speed;
            if (enemy.ecurrent === _LEFT)
            {
                this.tweens.add({targets: enemy,angle: -270,duration: 150,});
            }
            else
            {
                this.tweens.add({targets: enemy,angle: 90,duration: 150,});
            }

            //player.angle = 90;
        }   

        enemy.ecurrent = direction;

    },

    add_playersection: function() 
    {
        player.numSnakeSections++;

        //re-init player snakePath array
        for (var i = (player.numSnakeSections) * player.snakeSpacer; i < (player.numSnakeSections+1) * player.snakeSpacer; i++)
        {
            player.snakePath[i] = {x:0, y:0, angle:0};
        }

        //console.log(player.snakePath);

        var thisSection = this.physics.add.sprite(24, 24, 'blue_section').setDepth(100-player.numSnakeSections);


        player.snakeSection.push(thisSection);
        //player.body_group.add(thisSection);          

        // reset camera ignore for new section
            
            camera_ignorestuff.push(thisSection);
            
            UICam.ignore(camera_ignorestuff);
        
        

        this.update_enemy_colors();

        
    },

    update_enemy_colors: function() 
    {
        for (var t=0;t<this.enemy_array.length;t++)
        {
            if (this.enemy_array[t].numSnakeSections<player.numSnakeSections)
            {
                this.enemy_array[t].setTexture('green_head');
                for (var y=0;y<this.enemy_array[t].numSnakeSections;y++)
                {
                    this.enemy_array[t].snakeSection[y].setTexture('green_section'); 
                }
            }
            else
            {
                this.enemy_array[t].setTexture('red_head');
                for (var y=0;y<this.enemy_array[t].numSnakeSections;y++)
                {
                    this.enemy_array[t].snakeSection[y].setTexture('red_section'); 
                }
            }
        }
    },

    animate_death: function(x) 
    {

        //console.log(x);

        // for (var y=0;y<dead_sprites.length;y++)
        // {
            this.dead_sprites[x].tint = Phaser.Math.Between(457634,15978978);
        //}
        
        //setTimeout(function(){dead_sprites[x].tint = x*14563;}, 500*x);        
    },

    remove_sprite: function(x) 
    {
        this.dead_sprites[x].visible = false;
    },            

    generateMaze: function(x,y) 
    {
        var n=x*y-1;
        if (n<0) {alert("illegal maze dimensions");return;}
        var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
            verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [],
            here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
            path = [here],
            unvisited = [];
        for (var j = 0; j<x+2; j++) {
            unvisited[j] = [];
            for (var k= 0; k<y+1; k++)
                unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
        }
      //console.log(unvisited);
        while (0<n) {
            var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
                [here[0]-1, here[1]], [here[0],here[1]-1]];
            var neighbors = [];
            for (var j = 0; j < 4; j++)
                if (unvisited[potential[j][0]+1][potential[j][1]+1])
                    neighbors.push(potential[j]);
            if (neighbors.length) {
                n = n-1;
                next= neighbors[Math.floor(Math.random()*neighbors.length)];
          //console.log(next);
                unvisited[next[0]+1][next[1]+1]= false;
                if (next[0] == here[0])
            {
              //console.log(next[0],(next[1]+here[1]-1)/2);
              //console.log(horiz);
                      horiz[next[0]][(next[1]+here[1]-1)/2]= true;
            }
                else 
            {
              //console.log((next[0]+here[0]-1)/2,next[1]);
              //console.log(verti);
              //if ((next[0]+here[0]-1)/2 < verti.length)
                      verti[(next[0]+here[0]-1)/2][next[1]]= true;
            }
                path.push(here = next);
          //console.log(path);
            } else 
                {
            here = path.pop();
            //console.log(here);
          }
        }

      
        return {x: x, y: y, horiz: horiz, verti: verti};
    },
     
    displayMaze: function(m, gap_factor) 
    {
        // debug stuff ------
        myString1 = m.x.toString();
        myString2 = m.y.toString();

        myString3 = m.horiz.length.toString();
        myString4 = m.verti.length.toString();

        // console.log("horiz:");
        // for (i=0; i<m.horiz.length; i++)
        //     {console.log(m.horiz[i])}

        // console.log("verti:");
        // for (i=0; i<m.verti.length; i++)
        //     {console.log(m.verti[i])}
        // -------------------


        // loop through horiz and verti arrays to find wall openings for each maze cell
        // for display, the walls are oriented on the bottom/right sides of the tile square

        for (var j= 0; j<2*m.x+1; j++) 
        {this.map.putTileAt(0, j, 0); this.map.putTileAt(0, j, 2*m.y);}  
        for (var k=0; k<2*m.y+1; k++) 
        {this.map.putTileAt(0, 0, k); this.map.putTileAt(0, 2*m.x, k);}

        for (var j= 0; j<m.x+1; j++) 
        {       
            for (var k=0; k<m.y+1; k++) 
            {
          //if (m.horiz[j] != undefined && m.verti[j] != undefined)
          //{



                if ( !m.horiz[j][k] && m.verti[j][k] )
                {   
                    // only verti is true, so place horizontal line tile
                    this.map.putTileAt(1, j*2+1, k*2+1);
                    this.map.putTileAt(1, j*2+2, k*2+1);
                    if (Math.random()>gap_factor) this.map.putTileAt(0, j*2+1, k*2+2); else if (j<m.x && k<m.y-1) this.map.putTileAt(1, j*2+1, k*2+2);
                    this.map.putTileAt(0, j*2+2, k*2+2);
                }
                else if ( m.horiz[j][k] && !m.verti[j][k] )
                {
                    // only horiz is true, so place vertical line tile
                    this.map.putTileAt(1, j*2+1, k*2+1);
                    this.map.putTileAt(1, j*2+1, k*2+2);
                    if (Math.random()>gap_factor) this.map.putTileAt(0, j*2+2, k*2+1); else if (j<m.x-1 && k<m.y)  this.map.putTileAt(1, j*2+2, k*2+1);
                    this.map.putTileAt(0, j*2+2, k*2+2);
                }
                else if ( !m.horiz[j][k] && !m.verti[j][k] && (j<m.x && k<m.y) )
                {
                    // both are false, so place horizontal/vertical line tile
                    this.map.putTileAt(1, j*2+1, k*2+1);
                    if (Math.random()>gap_factor) this.map.putTileAt(0, j*2+2, k*2+1); else if (j<m.x-1 && k<m.y) this.map.putTileAt(1, j*2+2, k*2+1); 
                    if (Math.random()>gap_factor) this.map.putTileAt(0, j*2+1, k*2+2); else if (j<m.x && k<m.y-1) this.map.putTileAt(1, j*2+1, k*2+2);
                    this.map.putTileAt(0, j*2+2, k*2+2);

                }
                else if ( !m.horiz[j][k] && !m.verti[j][k] )
                {
                    // both are false outside the maze boundary
                    //this.map.putTile(1, j*2+1, k*2+1);
                    //this.map.putTile(1, j*2+2, k*2+2);
                }                       
                else
                {
                    // both are true, so place empty tile (with corner filled for looks)
                    this.map.putTileAt(1, j*2+1, k*2+1);
                    this.map.putTileAt(1, j*2+1, k*2+2);
                    this.map.putTileAt(1, j*2+2, k*2+1);
                    this.map.putTileAt(0, j*2+2, k*2+2);
              
                }

          //}

            }
        }

        ///tilethis.map scan & replace generic block tiles with maze defined art tiles
        for (var tx=0; tx<this.map.width; tx++)
        {
            for (var ty=0; ty<this.map.height; ty++) 
            {
                //console.log(tx,ty);
                if (this.map.getTileAt(tx, ty, true).index != 1)
                {
                    //console.log(tx,ty, this.map.getTileAt(tx, ty));

                    var tile_left = this.map.getTileAt(tx-1, ty);
                    var tile_right = this.map.getTileAt(tx+1, ty);
                    var tile_above = this.map.getTileAt(tx, ty-1);
                    var tile_below = this.map.getTileAt(tx, ty+1);

                    //console.log(tile_left,tile_right,tile_above,tile_below);

                    var empty_left = (tile_left == null || tile_left.index == 1);
                    var empty_right = (tile_right == null || tile_right.index == 1);
                    var empty_above = (tile_above == null || tile_above.index == 1);
                    var empty_below = (tile_below == null || tile_below.index == 1);

                    //console.log(empty_left,empty_right,empty_above,empty_below);

                    //////
                    if (empty_above && empty_below && !empty_right && !empty_left)
                    {
                        //middle horiz
                         this.map.putTileAt(2, tx, ty);
                    }
                    if (empty_above && empty_below && empty_left && !empty_right)
                    {
                        //left horiz
                        this.map.putTileAt(3, tx, ty);
                    }
                    if (empty_above && empty_below && empty_right && !empty_left)
                    {
                        //right horiz
                        this.map.putTileAt(4, tx, ty);
                    }
                    

                    //////
                    if (empty_left && empty_right && !empty_above && !empty_below)
                    {
                        //middle verti
                        this.map.putTileAt(5, tx, ty);
                    }
                    if (empty_left && empty_right && empty_above && !empty_below)
                    {
                        //top verti
                        this.map.putTileAt(6, tx, ty);
                    }
                    if (empty_left && empty_right && empty_below && !empty_above)
                    {
                        //bottom verti
                        this.map.putTileAt(7, tx, ty);
                    }


                    //////


                    if (empty_below && !empty_right && !empty_left && !empty_above)
                    {
                        //up t
                        this.map.putTileAt(8, tx, ty);
                    }
                    if (empty_above && !empty_right && !empty_left && !empty_below)
                    {
                        //down t
                        this.map.putTileAt(9, tx, ty);
                    }
                    if (empty_right && !empty_left && !empty_below && !empty_above)
                    {
                        //left t
                        this.map.putTileAt(10, tx, ty);
                    }
                    if (empty_left && !empty_right && !empty_below && !empty_above)
                    {
                        //right t
                        this.map.putTileAt(11, tx, ty);
                    }
                    
                    


                    //////
                    if (empty_left && empty_above && !empty_right && !empty_below)
                    {
                        //right down corner
                        this.map.putTileAt(12, tx, ty);
                    }
                    if (empty_right && empty_above && !empty_left && !empty_below)
                    {
                        //left down corner
                        this.map.putTileAt(13, tx, ty);
                    }
                    if (empty_left && empty_below && !empty_right && !empty_above)
                    {
                        //right up corner
                        this.map.putTileAt(14, tx, ty);
                    }
                    if (empty_right && empty_below && !empty_left && !empty_above)
                    {
                        //left up corner
                        this.map.putTileAt(15, tx, ty);
                    }

                    

                    

                    //////
                    if (empty_above && empty_below && empty_right && empty_left)
                    {
                        // single island
                        this.map.putTileAt(16, tx, ty);
                    }

                    if (!empty_above && !empty_below && !empty_right && !empty_left)
                    {
                        // cross
                        this.map.putTileAt(17, tx, ty);
                    }
                    

                }
            }
        }
    }

});

