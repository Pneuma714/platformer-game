const canvas = document.createElement('canvas')
canvas.width = 960, canvas.height = 640

const ctx = canvas.getContext('2d')

let stage = new Array(32).fill(null).map(() => new Array(64).fill(false))

const render = () => {
    for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 64; j++) {
            if (stage[i][j]) ctx.fillRect((j - 1) * 20, (i - 1) * 20, 20, 20)
        }
    }

    ctx.strokeRect(x, y, 20, 20)
}

// Edit

let cursor = { x: 0, y: 0 }, isMouseDown = false

const getMousePosition = evt => {
    let rect = canvas.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }
}

canvas.addEventListener('mousedown', evt => {
    isMouseDown = true
    console.log('Mouse is down')
    
    let pos = getMousePosition(evt)
    let x = Math.ceil(pos.x / 20), y = Math.ceil(pos.y / 20)

    stage[y][x] = true
    console.log(`Toggled cell at (${x}, ${y})`)
    
    cursor = { x, y }
})

canvas.addEventListener('mouseup', evt => {
    isMouseDown = false
    console.log('Mouse is up')
})

canvas.addEventListener('mousemove', evt => {
    let pos = getMousePosition(evt)
    let x = Math.ceil(pos.x / 20), y = Math.ceil(pos.y / 20)

    if (isMouseDown && (cursor.x !== x || cursor.y !== y)) {
        stage[y][x] = true
        console.log(`Toggled cell at (${x}, ${y})`)
    }

    cursor = { x, y }
})

setInterval(render, 10)

// Controls

let x = 480, y = 320, isJumping = false, keyStatus = [], velocityX = 0, velocityY = 0

document.body.addEventListener('keydown', evt => {
    keyStatus[evt.key] = true
})

document.addEventListener('keyup', evt => {
    keyStatus[evt.key] = false
})

setInterval(() => {
    if (keyStatus['a']) velocityX += -1
    if (keyStatus['d']) velocityX += 1

    velocityX *= 0.9

    x += velocityX
}, 10)

document.body.appendChild(canvas)