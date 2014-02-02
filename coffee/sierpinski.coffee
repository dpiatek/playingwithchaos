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
