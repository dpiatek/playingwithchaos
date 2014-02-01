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
