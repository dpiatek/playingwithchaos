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
    chaos.clear()
    chaos.context.save()
    chaos.context.translate chaos.width * 0.5, chaos.height * 0.6
    chaos.context.scale chaos.height * 0.5, chaos.height * 0.5
    drawTriangle(maxDepth)
    chaos.context.restore()

  drawTriangle = (depth) ->
    angle = -Math.PI / 2
    if depth is 0
      chaos.context.beginPath()
      chaos.context.moveTo Math.cos(angle), Math.sin(angle)

      angle += Math.PI * 2 / 3
      chaos.context.lineTo Math.cos(angle), Math.sin(angle)

      angle += Math.PI * 2 / 3
      chaos.context.lineTo Math.cos(angle), Math.sin(angle)

      chaos.context.fill()
    else
      chaos.context.save()
      chaos.context.translate Math.cos(angle) * 0.5, Math.sin(angle) * 0.5
      chaos.context.scale 0.5, 0.5
      drawTriangle depth - 1
      chaos.context.restore()

      angle += Math.PI * 2 / 3
      chaos.context.save()
      chaos.context.translate Math.cos(angle) * 0.5, Math.sin(angle) * 0.5
      chaos.context.scale 0.5, 0.5
      drawTriangle depth - 1
      chaos.context.restore()

      angle += Math.PI * 2 / 3
      chaos.context.save()
      chaos.context.translate Math.cos(angle) * 0.5, Math.sin(angle) * 0.5
      chaos.context.scale 0.5, 0.5
      drawTriangle depth - 1
      chaos.context.restore()

  init()
