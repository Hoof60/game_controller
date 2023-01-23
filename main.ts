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
    serial.writeLine("h:" + (input.compassHeading()))
})
