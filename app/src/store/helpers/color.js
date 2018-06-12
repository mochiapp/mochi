// Changes the RGB/HEX temporarily to a HSL-Value, modifies that value
// and changes it back to RGB/HEX.
export default function changeHue (rgb, degree) {
  var hsl = rgbToHSL(rgb)
  hsl.h += degree
  if (hsl.h > 360) {
    hsl.h -= 360
  } else if (hsl.h < 0) {
    hsl.h += 360
  }
  return hslToRGB(hsl)
}

// exepcts a string and returns an object
function rgbToHSL (rgb) {
  // strip the leading # if it's there
  rgb = rgb.replace(/^\s*#|\s*$/g, '')

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (rgb.length === 3) {
    rgb = rgb.replace(/(.)/g, '$1$1')
  }

  var r = parseInt(rgb.substr(0, 2), 16) / 255
  var g = parseInt(rgb.substr(2, 2), 16) / 255
  var b = parseInt(rgb.substr(4, 2), 16) / 255
  var cMax = Math.max(r, g, b)
  var cMin = Math.min(r, g, b)
  var delta = cMax - cMin
  var l = (cMax + cMin) / 2
  var h = 0
  var s = 0

  if (delta === 0) {
    h = 0
  } else if (cMax === r) {
    h = 60 * (((g - b) / delta) % 6)
  } else if (cMax === g) {
    h = 60 * (((b - r) / delta) + 2)
  } else {
    h = 60 * (((r - g) / delta) + 4)
  }

  if (delta === 0) {
    s = 0
  } else {
    s = (delta / (1 - Math.abs(2 * l - 1)))
  }

  return {
    h: h,
    s: s,
    l: l
  }
}

// expects an object and returns a string
function hslToRGB (hsl) {
  var h = hsl.h
  var s = hsl.s
  var l = hsl.l
  var c = (1 - Math.abs(2 * l - 1)) * s
  var x = c * (1 - Math.abs((h / 60) % 2 - 1))
  var m = l - c / 2
  var r, g, b

  if (h < 60) {
    r = c
    g = x
    b = 0
  } else if (h < 120) {
    r = x
    g = c
    b = 0
  } else if (h < 180) {
    r = 0
    g = c
    b = x
  } else if (h < 240) {
    r = 0
    g = x
    b = c
  } else if (h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  r = normalizeRgbValue(r, m)
  g = normalizeRgbValue(g, m)
  b = normalizeRgbValue(b, m)

  return rgbToHex(r, g, b)
}

function normalizeRgbValue (color, m) {
  color = Math.floor((color + m) * 255)
  if (color < 0) {
    color = 0
  }
  return color
}

function rgbToHex (r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}