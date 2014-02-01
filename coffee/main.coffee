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
    win = window.open "", "Canvas Image"
    src = @canvas.toDataUrl "image/png"
    win.document.write(
      "<img src=#{src} width=#{@width} height=#{@height}/>"
    )
