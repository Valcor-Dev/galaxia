controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laser = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 . . . . . . . . . . 
        . . . . . 8 . . . . . . . . . . 
        . . . . . 8 . . . . . . . . . . 
        . . . . 2 8 2 . . . . . . . . . 
        . . . . 2 2 2 . . . . . . . . . 
        . . . . . 2 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, nave, 0, -100)
    music.pewPew.playUntilDone()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.baDing.playUntilDone()
    sprite.destroy(effects.spray, 100)
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 500)
    music.knock.playUntilDone()
    info.changeLifeBy(-1)
})
let invasor: Sprite = null
let laser: Sprite = null
let nave: Sprite = null
music.powerUp.play()
scene.setBackgroundImage(assets.image`fondo`)
nave = sprites.create(img`
    . . . . . . . 2 . . . . . . . . 
    . . . . . . . 1 . . . . . . . . 
    . . . . . . 1 2 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . 2 . . . 1 2 1 . . . 2 . . . 
    . . 8 . . . 1 1 1 . . . 8 . . . 
    . . 7 . . 1 8 8 8 1 . . 7 . . . 
    2 . 7 7 1 1 8 1 1 1 1 7 7 . 2 . 
    1 . 7 1 2 1 8 1 1 1 2 1 7 . 1 . 
    1 . 1 1 1 1 8 8 8 1 1 1 1 . 1 . 
    1 1 1 1 1 5 1 1 1 5 1 1 1 1 1 . 
    1 1 . . 5 5 1 1 1 5 5 . . 1 1 . 
    2 . . . 5 5 . 1 . 5 5 . . . 2 . 
    . . . . 2 . . 2 . . 2 . . . . . 
    `, SpriteKind.Player)
nave.setStayInScreen(true)
nave.setPosition(80, 107)
info.setLife(5)
info.setScore(0)
controller.moveSprite(nave)
game.onUpdateInterval(400, function () {
    invasor = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . e e . . f . . e e . . . . 
        . . . e e . c f c . e e . . . . 
        . . . e e e 5 f 5 e e e . . . . 
        . . . e e e f f f e e e . . . . 
        . . . . . e 3 f 3 e . . . . . . 
        . . . e e e 1 1 1 e e e . . . . 
        . . . e . 1 1 1 1 1 . e . . . . 
        . . . e . 1 e f e 1 . e . . . . 
        . . . e . . 2 . 2 . . e . . . . 
        . . . 2 . . . . . . . 2 . . . . 
        `, SpriteKind.Enemy)
    invasor.setVelocity(0, 53)
    invasor.setPosition(randint(0, 100), 0)
})
forever(function () {
    if (info.score() == 120) {
        game.over(true, effects.confetti)
    }
})
