

let avgloop = 0
let avgmag = 0
let avgcount = 0
let thrustMagnitude = 0
let angle = 0
let b_mag = 0
let a_mag = 0
let rollComponent = 0
let pitchComponent = 0
let APressed = 0
let BPressed = 0
let energyPower = 0
let weaponPower = 0
let TouchPressed = 0
let shieldActive = 0
let lastheading = -1
let currentHeading = -1
weaponPower = 3
energyPower = 3
radio.setGroup(24)

basic.forever(function () {
    if (BPressed == 0 && input.buttonIsPressed(Button.B)) {
        BPressed = 1
        radio.sendString("a:1")
    } else {
        if (BPressed == 1 && !(input.buttonIsPressed(Button.B))) {
            BPressed = 0
            radio.sendString("a:0")
        }
    }
    if (APressed == 0 && input.buttonIsPressed(Button.A)) {
        APressed = 1
        radio.sendString("b:1")
    } else {
        if (APressed == 1 && !(input.buttonIsPressed(Button.A))) {
            APressed = 0
            radio.sendString("b:0")
        }
    }
    pitchComponent = 0 - input.rotation(Rotation.Pitch)
    rollComponent = input.rotation(Rotation.Roll)
    a_mag = Math.sqrt(pitchComponent ** 2 + rollComponent ** 2)
    b_mag = 1
    angle = Math.acos((rollComponent * 0 + pitchComponent * 1) / (a_mag * b_mag))
    thrustMagnitude = (0 - a_mag) / 45
    if (rollComponent > 0) {
        avgcount += angle * 180 / Math.PI
        currentHeading = angle * 180 / Math.PI
    }
    if (rollComponent < 0) {
        avgcount += 360 - angle * 180 / Math.PI
        currentHeading = 360 - angle * 180 / Math.PI
    }
    avgmag += thrustMagnitude
    avgloop += 1
    if (avgloop > 1) {
        if (!(currentHeading - lastheading > 200) || !(lastheading - currentHeading > 200)) {
            radio.sendString("h:" + avgcount / 2)
            if (APressed == 0) {
                radio.sendString("t:" + avgmag / 2)
            }
            avgloop = 0
            avgcount = 0
            avgmag = 0
        }
    }
    lastheading = currentHeading
})

input.onPinPressed(TouchPin.P2, function () {
    if (shieldActive == 0) {
        shieldActive = 1
        radio.sendString("s:1")
    } else {
        shieldActive = 0
        radio.sendString("s:0")
    }
})

radio.onReceivedString(function(receivedString: string) {
    let splitString = receivedString.split(":")
    if (receivedString.charAt(0) == 'e'){
        music.playTone(Note.C, music.beat(BeatFraction.Sixteenth))
        led.plotBarGraph(parseInt(splitString[1]),400)
    }
})