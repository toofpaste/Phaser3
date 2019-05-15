var sprite;
let ratio = 720 / 216;
var GameScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:


  function GameScene ()
  {
    Phaser.Scene.call(this, { key: 'gameScene', active: true });

    this.player = null;
    this.enemy = null;
    this.cursors = null;
    this.score = 0;
    this.scoreText = null;
  },


  preload: function ()
  {
    this.load.image('bg1', 'assets/plx-1.png');
    this.load.image('bg2', 'assets/plx-2.png');
    this.load.image('bg3', 'assets/plx-3.png');
    this.load.image('bg4', 'assets/plx-4.png');
    this.load.image('bg5', 'assets/plx-5.png');
    this.load.spritesheet('character', 'assets/adventurer-Sheet.png',{frameWidth: 50, frameHeight: 37});
    this.load.spritesheet('character2', 'assets/adventurer-v1.5-Sheet.png',{frameWidth: 50, frameHeight: 37});
    this.load.spritesheet('enemy', 'assets/LightBandit_Spritesheet.png',{frameWidth: 48, frameHeight: 48});


  },

  create: function ()
  {



    this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setOrigin(0, 0);
		this.bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setOrigin(0, 0);
		this.bg3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg3').setOrigin(0, 0);
		this.bg4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg4').setOrigin(0, 0);
		this.bg5 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg5').setOrigin(0, 0);
    // this.bg1.tileScaleX = this.bg1.tileScaleY =
    // this.bg2.tileScaleX = this.bg2.tileScaleY =
    // this.bg3.tileScaleX = this.bg3.tileScaleY =
    // this.bg4.tileScaleX = this.bg4.tileScaleY =
    // this.bg5.tileScaleX = this.bg5.tileScaleY = 3;

    var platforms = this.physics.add.staticGroup();

		platforms.create(16 * 2, game.config.height - 16 * 2, 'bg').setScale(4).refreshBody();
      this.bg1.setScrollFactor(0);
  		this.bg2.setScrollFactor(0);
  		this.bg3.setScrollFactor(0);
  		this.bg4.setScrollFactor(0);
  		this.bg5.setScrollFactor(0);

  		this.bg1.setDisplaySize(game.config.width, game.config.height);
  		this.bg1.setScale(ratio);

  		this.bg2.setDisplaySize(game.config.width, game.config.height);
  		this.bg2.setScale(ratio);

  		this.bg3.setDisplaySize(game.config.width, game.config.height);
  		this.bg3.setScale(ratio);

  		this.bg4.setDisplaySize(game.config.width, game.config.height);
  		this.bg4.setScale(ratio);

  		this.bg5.setDisplaySize(game.config.width, game.config.height);
  		this.bg5.setScale(ratio);

      this.player = this.physics.add.sprite(0, 0, 'character');
      this.player = this.physics.add.sprite(0, 0, 'character2');
      this.enemy = this.physics.add.sprite(1000, 0, 'enemy');
        this.enemy.setBounce(0.2);
        this.enemy.setCollideWorldBounds(true);
        this.enemy.setScale(5);
        //this.enemy.body.setSize(14, 7, 31, 35);
        this.enemy.body.mass = 50;
        this.enemy.body.setFrictionX(-5);
        this.enemy.body.setSize(39, 46, false);
        this.enemy.body.setOffset(6, 0);
        // var enemyBody = enemy.body.physics.add.staticGroup();
    		this.player.setBounce(0.1);
    		this.player.setCollideWorldBounds(true);
    		this.player.setScale(3);
    		//this.player.body.setSize(14, 7, 31, 35);
        this.player.body.mass = 50;
    		this.player.body.setSize(25, 32, false);
    		this.player.body.setOffset(14, 4);
        this.physics.add.collider(this.enemy, platforms);
    		this.physics.add.collider(this.player, platforms);


        this.anims.create({
  			key: 'walk',
  			frames: this.anims.generateFrameNumbers('character', { start: 8, end: 13 }),
  			frameRate: 6,
  			repeat: -1
  		});

  		this.anims.create({
  			key: 'idle',
  			frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
  			frameRate: 6,
  			repeat: -1
  		});

  		this.anims.create({
  			key: 'jump',
  			frames: this.anims.generateFrameNumbers('character', { start: 16, end: 23 }),
  			frameRate: 8,
  			repeat: 0
  		});
      this.anims.create({
  			key: 'attack',
  			frames: this.anims.generateFrameNumbers('character2', { start: 93, end: 108 }),
  			frameRate: 30,
  			repeat: -1
  		});
      this.anims.create({
  			key: 'idleEnemy',
  			frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
  			frameRate: 6,
  			repeat: -1
  		});
      this.anims.create({
  			key: 'hurtEnemy',
  			frames: this.anims.generateFrameNumbers('enemy', { start: 32, end: 36 }),
  			frameRate: 2,
  			repeat: 0
  		});
      this.anims.create({
        key: 'runEnemy',
        frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 15 }),
        frameRate: 6,
        repeat: -1
      });
      this.anims.create({
  			key: 'attackEnemy',
  			frames: this.anims.generateFrameNumbers('enemy', { start: 15, end: 23 }),
  			frameRate: 9,
  			repeat: -1
  		});



    //var button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();

    this.physics.world.bounds.width = 4000;
    //this.physics.world.bounds.height = 800;
    this.cameras.main.setBounds(0, 0, 4000, 720);
    this.cameras.main.startFollow(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();
    var FKey = this.input.keyboard.addKey('F');

    FKey.on('down', function () {

      if (this.scale.isFullscreen)
      {
        //button.setFrame(0);
        this.scale.stopFullscreen();
      }
      else
      {
        //button.setFrame(1);
        this.scale.startFullscreen();
      }

    }, this);
  },
  update: function (time, theta)
  {



    var cursors = this.cursors;
    var player = this.player;
    var enemy = this.enemy;
    this.bg1.tilePositionX = this.cameras.main.scrollX * .2 / ratio;
    this.bg2.tilePositionX = this.cameras.main.scrollX * .4 / ratio;
    this.bg3.tilePositionX = this.cameras.main.scrollX * .6 / ratio;
    this.bg4.tilePositionX = this.cameras.main.scrollX * .8 / ratio;
    this.bg5.tilePositionX = this.cameras.main.scrollX * 1 / ratio;
    let onGround = (player.body.touching.down || player.body.blocked.down);
    let enemyGround = (enemy.body.touching.down || enemy.body.blocked.down);
		let moving = false;
    let enemyMoving = false;
    let attack = false;
    let isClose = (Math.abs(enemy.x - player.x) <= 185);
    var howClose = Math.abs(enemy.x - player.x);
    let isHeight = (Math.abs(player.y - enemy.y) <= 185);
    if(((enemy.x - player.x  <= 500) && (enemy.x - player.x  >= 175) && enemyGround) && onGround){
      enemy.setVelocityX(-100);
      enemyMoving = true;
      enemy.flipX = false;
    }else if(enemy.x - player.x  <= 175){
      enemyMoving = false;

    }
    if(((enemy.x - player.x  >= -500) && (enemy.x - player.x  <= -175) && enemyGround) && onGround){
      enemy.setVelocityX(100);
      enemy.flipX = true;
      enemyMoving = true;
    }else if(enemy.x - player.x  <= -175){
      enemyMoving = false;

    }
    if(((enemy.x - player.x) <= 185 && (enemy.x - player.x) >= 1) && (player.y - enemy.y) <= 185 && (player.y - enemy.y) >= 1){
      player.setVelocityX(0);
      player.body.velocity.x = -600;
      player.body.velocity.y = -800;
      player.setGravityX(200);
    }else if(((enemy.x - player.x) >= -185 && (enemy.x - player.x) <= 1) && (player.y - enemy.y) >= -185 && (player.y - enemy.y) <= 1){
      player.setVelocityX(0);
      player.body.velocity.x = 600;
      player.body.velocity.y = 800;
      player.setGravityX(-200);
    }
    this.physics.world.collide(this.player, this.enemy, function(player, enemy){
        if(((enemy.body.touching.up && player.body.touching.down) || (!enemy.body.touching.right && !player.body.touching.left) || (enemy.body.touching.left && player.body.touching.right)) && !cursors.space.isDown){
            enemy.setGravityX(-200);
            enemy.setBounceX(0.01);
        }
        else if(((enemy.body.touching.up && player.body.touching.down) || (enemy.body.touching.right && player.body.touching.left) || (!enemy.body.touching.left && !player.body.touching.right)) && !cursors.space.isDown){
          enemy.setGravityX(200);
          enemy.setBounceX(0.01);
        }else if(((enemy.body.touching.left && player.body.touching.right) || (!enemy.body.touching.right && !player.body.touching.left)) && cursors.space.isDown){
          enemy.setVelocityX(0);
          enemy.body.velocity.x = 300;
          enemy.body.velocity.y = -400;
          enemy.setGravityX(-200);
        } else if(((!enemy.body.touching.left && !player.body.touching.right) || (enemy.body.touching.right && player.body.touching.left)) && cursors.space.isDown){
          enemy.setVelocityX(0);
          enemy.body.velocity.x = -300;
          enemy.body.velocity.y = -400;
          enemy.setGravityX(200);
          }
      });

      console.log("enemy" + enemy.x);
      console.log("player" + player.x);
      // player 863
      // enemy 960
      //accelerateTo: function (gameObject, x, y, speed, xSpeedMax, ySpeedMax)
      if((((this.enemy.body.position.x - this.player.body.position.x) <= 100) && cursors.space.isDown) && enemy.x > player.x){
          enemy.body.velocity.x = 300;
          enemy.body.velocity.y = -400;
          enemy.setGravityX(-200);
          // enemy.accelerateTo(this.enemy, (this.enemy.body.position.x + 500), (this.enemy.body.position.y + 500), 5, 5, 5);
          // enemy.setGravityX(-150);
      }else if (((Math.abs(this.enemy.body.position.x - this.player.body.position.x) <= 100) && cursors.space.isDown) && enemy.x < player.x){
        enemy.body.velocity.x = -300;
        enemy.body.velocity.y = -400;
        enemy.setGravityX(200);
      }
      if(Math.pow(enemy.body.velocity.x, 2) <= 1)
      {
        enemy.setVelocityX(0);
        enemy.setGravityX(0);
      }
      if(Math.pow(player.body.velocity.x, 2) <= 1)
      {
        player.setVelocityX(0);
        player.setGravityX(0);
      }




    if (cursors.up.isDown && onGround) {
  			player.setVelocityY(-530);
  		}

  		if (cursors.left.isDown && onGround) {
  			player.setVelocityX(-400); // move left
  			moving = true;
  			player.flipX = true;
  		}
  		else if (cursors.right.isDown && onGround) {
  			player.setVelocityX(400);
  			moving = true;
  			player.flipX = false;
  		} else if(onGround){
  			player.setVelocityX(0);
  		}
      if(cursors.space.isDown && onGround)
      {
        if(player.flipX){
        player.body.setSize(35, 32, false);
    		player.body.setOffset(0, 4);
      } else {
        player.body.setSize(37, 32, false);
    		player.body.setOffset(14, 4);
      }

        cursors.space.on('up', function(event){player.body.setSize(25, 32, false);
        player.body.setOffset(14, 4);})
        attack = true;
      }
      var i = 0;

      if(onGround){
        i = 1;
      }else i = 2;

      if (!enemyGround && !enemyMoving) {
        enemy.anims.play('hurtEnemy', true);
  		} else if(enemyMoving && enemyGround && !isClose){
        enemy.anims.play('runEnemy', true);
      }else if(((howClose <= 300) && enemyGround && isHeight) || i == 2){
        enemy.setVelocityX(0);
        enemy.anims.play('attackEnemy', true);
      }else{
        enemy.anims.play('idleEnemy', true);
  		}

  		if (!onGround && !cursors.space.isDown) {
  			player.anims.play('jump', true);
  		} else if(cursors.space.isDown){
        player.anims.play('attack', true);
      }else if (moving) {
  			player.anims.play('walk', true);
  		} else {
  			player.anims.play('idle', true);
  		}



  },



});

var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  pixelArt: true,
  antialias: false,﻿
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: true
    }
  },
  scene: GameScene
};

var game = new Phaser.Game(config);
