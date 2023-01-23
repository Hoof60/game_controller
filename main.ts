let APressed = 0
basic.forever(function () {
    if (APressed == 0 && input.buttonIsPressed(Button.B)) {
        APressed = 1
        serial.writeLine("t:-1")
    } else {
        if (APressed == 1 && !(input.buttonIsPressed(Button.B))) {
            APressed = 0
            serial.writeLine("t:0")
        }
    }

    let pitchComponent = input.rotation(Rotation.Pitch)
    let rollComponent = input.rotation(Rotation.Roll)

    let a_mag = Math.sqrt(pitchComponent**2 + rollComponent**2)

    


    //if (input.rotation(Rotation.Pitch)){
    if (input.rotation(Rotation.Pitch) > 0){
        serial.writeLine("h:0")
    }
    if (input.rotation(Rotation.Pitch) < 0) {
        serial.writeLine("h:270")
    }
    if (input.rotation(Rotation.Roll) > 0) {
        serial.writeLine("h:90")
    }
    if (input.rotation(Rotation.Roll) < 0) {
        serial.writeLine("h:270")
    }


    //}
})
