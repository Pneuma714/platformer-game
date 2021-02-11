const canvas = document.createElement('canvas')
canvas.width = 720, canvas.height = 480

const ctx = canvas.getContext('2d')

let stage = new Array(24).fill(null).map(() => new Array(36).fill(false))

const render = () => {
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 36; j++) {
            if (stage[i][j]) ctx.fillRect((j - 1) * 20, (i - 1) * 20, 20, 20)
        }
    }
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
    let x = Math.ceil(pos.x / 5), y = Math.ceil(pos.y / 5)

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
    let x = Math.ceil(pos.x / 5), y = Math.ceil(pos.y / 5)

    if (isMouseDown && (cursor.x !== x || cursor.y !== y)) {
        stage[y][x] = true
        console.log(`Toggled cell at (${x}, ${y})`)
    }

    cursor = { x, y }
})

document.body.appendChild(canvas)