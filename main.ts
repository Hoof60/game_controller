let angle = 0
let b_mag = 0
let a_mag = 0
let rollComponent = 0
let pitchComponent = 0
let APressed = 0
radio.setGroup(24)
basic.forever(function () {
    // if (APressed == 0 && input.buttonIsPressed(Button.B)) {
    // APressed = 1
    // serial.writeLine("t:-1")
    // } else {
    // if (APressed == 1 && !(input.buttonIsPressed(Button.B))) {
    // APressed = 0
    // serial.writeLine("t:0")
    // }
    // }
    pitchComponent = 0 - input.rotation(Rotation.Pitch)
    rollComponent = input.rotation(Rotation.Roll)
    a_mag = Math.sqrt(pitchComponent ** 2 + rollComponent ** 2)
    b_mag = 1
    angle = Math.acos((rollComponent * 0 + pitchComponent * 1) / (a_mag * b_mag))
    if (rollComponent > 0) {
        radio.sendString("h:" + angle * 180 / Math.PI)
    }
    if (rollComponent < 0) {
        radio.sendString("h:" + (360 - angle * 180 / Math.PI))
    }
})
