@chaos =
  init: ->
    @canvas = document.getElementById("canvas")
    @context = @canvas.getContext("2d")
    @setSize window.innerWidth, window.innerHeight

  setSize: (width, height) ->
    @width = @canvas.width = width
    @height = @canvas.height = height

  clear: (color) ->
    if color
      @context.fillStyle = color
      @context.fillRect 0, 0, @width, @height
    else
      @context.clearRect 0, 0, @width, @height

  popImage: ->
    win = window.open "", "CanvasImage"
    src = @canvas.toDataURL "image/png"
    win.document.write(
      "<img src=#{src} width=#{@width} height=#{@height}/>"
    )
    undefined

@onload = ->
  maxDepth = 0

  init = ->
    chaos.init()
    draw()

    document.body.addEventListener "keyup", (event) ->
      switch event.keyCode
        when 32 then (
          maxDepth += 1
          draw()
        )
        when 80 then chaos.popImage()

  draw = ->
    p0 =
      x: chaos.width * 0.32
      y: chaos.height * 0.28

    p1 =
      x: chaos.width * 0.68
      y: chaos.height * 0.28

    p2 =
      x: p1.x + Math.cos(Math.PI * 2 / 3) * (p1.x - p0.x)
      y: p1.y + Math.sin(Math.PI * 2 / 3) * (p1.x - p0.x)

    chaos.clear()
    chaos.context.lineWidth = 2

    koch p0, p1, maxDepth
    koch p1, p2, maxDepth
    koch p2, p0, maxDepth

  koch = (p0, p1, depth) ->
    dx = p1.x - p0.x
    dy = p1.y - p0.y

    # length of main segment
    dist = Math.sqrt dx * dx + dy * dy
    unit = dist / 3

    # angle of main segment
    angle = Math.atan2 dy, dx

    # calculate the 3 intermediate points
    pa =
      x: p0.x + (Math.cos angle) * unit
      y: p0.y + (Math.sin angle) * unit

    pb =
      x: pa.x + (Math.cos angle - Math.PI / 3) * unit
      y: pa.y + (Math.sin angle - Math.PI / 3) * unit

    pc =
      x: p0.x + (Math.cos angle) * unit * 2
      y: p0.y + (Math.sin angle) * unit * 2

    if depth is 0
      chaos.context.beginPath()
      chaos.context.moveTo(p0.x, p0.y)
      chaos.context.lineTo(pa.x, pa.y)
      chaos.context.lineTo(pb.x, pb.y)
      chaos.context.lineTo(pc.x, pc.y)
      chaos.context.lineTo(p1.x, p1.y)
      chaos.context.stroke()
    else
      koch p0, pa, depth - 1
      koch pa, pb, depth - 1
      koch pb, pc, depth - 1
      koch pc, p1, depth - 1

  init()
