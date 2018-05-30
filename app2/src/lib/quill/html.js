import format from 'stringformat'

var defaults = {
  // line: '<div id="line-{lineNumber}" style="{lineStyle}">{content}</div>',
  line: (lineNumber, lineStyle, content) => '<p' + (lineStyle ? ' style="' + lineStyle + '"' : '') + '>' + content + '</p>',
  text: '<span style="{style}">{content}</span>',
  link: '<a href="{link}" style="{style}">{content}</a>',
  styleType: 'html',
  styleTags: {
    background: '<span style="background-color:{background}">{content}</span>',
    color: '<span style="color:{color}">{content}</span>',
    bold: '<b>{content}</b>',
    italic: '<i>{content}</i>',
    underline: '<u>{content}</u>',
    font: '<span style="font-family:{font}">{content}</span>',
    size: '<span style="font-size:{size}">{content}</span>',
    align: '<span style="text-align:{align}">{content}</span>',
    strike: '<s>{content}</s>',
    script: (n) => n.script === 'super' ? '<sup>' + n.content + '</sup>' : '<sub>' + n.content + '</sub>'
  },
  embed: {
    // image: '<img src="{image}" alt="{alt}" />'
    // image: '<img src="{image.url}" alt="{image.alt}" iid="{image.iid}" />'
    image: (n) => {
      n = n.image
      let imgIids = []
      let ret = '<img src="'
      let retIid = ''
      if (n.iid && n.iid !== '') {
        retIid = ' iid="' + n.iid + '"'
        imgIids.push(n.iid)
      } else {
        ret += n.url
      }
      ret += '"'
      if (n.alt && n.alt !== '') {
        ret += ' alt="' + n.alt + '"'
      }
      ret += retIid + ' />'
      return {content: ret, imgIids: imgIids}
    }
  },
  attributes: {
  }
}

export default function init (defineFormat) {
  defineFormat('line', 'html', defaults, processLine)
}

//
// Process a single line into HTML
//
// @param {line} the line object, containing ops and attributes
// @param {options} the options given
// @param {index} the line index (zero-based)
// @return string
//
function processLine (line, options, index) {
  if (line.ops.length === 1 && line.ops[0].insert.length === 0) {
    return {content: '<p><br></p>'}
  }

  var attrs = Object.keys(line.attributes || { })

  let ret = ''
  let imgIids = []
  try {
    let content = ''
    for (let op of line.ops) {
      let res = contentMap(op)
      content += res.content
      if (res.imgIids) {
        imgIids = [...imgIids, ...res.imgIids]
      }
    }
    ret = options.line(
      index + 1,
      attrs.map(attributeMap).join(''),
      content
    )
  } catch (error) {
    console.log('processLine', line, options, index)
    console.error('processLine ERROR', error)
  }
  return {content: ret, imgIids: imgIids}

  //
  // Builds the content of the line
  //
  function contentMap (op) {
    if (typeof op.insert === 'object') {
      let ret = ''
      let imgIids = []
      for (let ky in op.insert) {
        if (typeof options.embed[ky] === 'function') {
          let res = options.embed[ky]({...op.attributes, ...op.insert})
          ret += res.content
          imgIids = [...imgIids, ...res.imgIids]
        } else {
          ret += format(options.embed[ky] || '', {...op.attributes, ...op.insert})
        }
      }
      return {content: ret, imgIids: imgIids}
    }

    if (!op.attributes) {
      return {content: op.insert}
    }

    switch (options.styleType) {
      // case 'css':
      //   return drawTextCss(op.insert, op.attributes)
      case 'html':
        return {content: drawTextHtml(op.insert, op.attributes)}
    }
  }

  //
  // Builds the style string containing line-level styles (like alignment)
  //
  function attributeMap (attr) {
    var value = line.attributes[attr]

    switch (attr) {
      case 'align':
        return cssProp('text-align', value)
    }
  }

  //
  // Render a section of text using style HTML tags like <b> and <i>
  //
  function drawTextHtml (content, attrs) {
    Object.keys(attrs).forEach(function (attr) {
      var node = {
        template: null,
        data: {...attrs, content: content, style: ''}
      }

      switch (attr) {
        case 'link':
          node.template = options.link
          break
        case 'background':
        case 'color':
        case 'bold':
        case 'italic':
        case 'underline':
        case 'font':
        case 'size':
        case 'align':
        case 'strike':
        case 'script':
          node.template = options.styleTags[attr]
          break
        default:
          if (options.attributes) {
            attr = options.attributes[attr]
            if (attr) {
              attr(node, options)
            }
          }
          break
      }

      try {
        content = typeof node.template === 'function' ? node.template(node.data) : format(node.template, node.data)
      } catch (error) {
        console.log('node', node)
        console.error('drawTextHtml ERROR', error)
      }
    })

    return content
  }

  // //
  // // Render a section of text using CSS for styling
  // //
  // function drawTextCss (content, attrs) {
  //   var node = {
  //     template: attrs.link ? options.link : options.text,
  //     data: {...attrs, content: content, style: ''}
  //   }

  //   Object.keys(attrs).forEach(function (attr) {
  //     switch (attr) {
  //       case 'color':
  //         node.data.style += cssProp('color', attrs.color)
  //         break
  //       case 'bold':
  //         node.data.style += cssProp('font-weight', 'bold')
  //         break
  //       case 'italic':
  //         node.data.style += cssProp('font-style', 'italic')
  //         break
  //       case 'underline':
  //         node.data.style += cssProp('text-decoration', 'underline')
  //         break
  //       case 'strikethrough':
  //         node.data.style += cssProp('text-decoration', 'line-through')
  //         break
  //       case 'font':
  //         node.data.style += cssProp('font-family', attrs.font)
  //         break
  //       default:
  //         if (options.attributes) {
  //           attr = options.attributes[attr]
  //           if (attr) {
  //             attr(node, options)
  //           }
  //         }
  //         break
  //     }
  //   })

  //   return format(node.template, node.data)
  // }
}

//
// Returns a CSS formatted string
//
// @param {key} the css attribute
// @param {value} the css attribute value
// @return string
//
function cssProp (key, value) {
  return key + ':' + value + ';'
}
