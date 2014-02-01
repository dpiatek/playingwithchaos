@onload = ->
  init = ->
    chaos.init()
    document.body.addEventListener "keyup", (event) ->
      switch event.keyCode
        when 32 then draw()
        when 80 then chaos.popImage()

  draw = ->
    [x, y] = [Math.random() * chaos.width, Math.random() * chaos.height]
    [w, h] = do -> [0..1].map -> 20 + Math.random() * 100
    [r, g, b] = do -> [0..2].map -> Math.floor Math.random() * 256
    chaos.context.fillStyle = "rgb(#{r},#{g},#{b})"
    chaos.context.fillRect x, y, w, h

  init()
