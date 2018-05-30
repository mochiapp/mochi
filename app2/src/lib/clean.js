export function stripTags (input) {
  let s = input
  s = s.replace(/<b>/g, '_-=b_=-')
  s = s.replace(/<\/b>/g, '_-=/b_=-')
  s = s.replace(/<\/?[^>]+(>|$)/g, '')
  s = s.replace(/_-=b_=-/g, '<b>')
  s = s.replace(/_-=\/b_=-/g, '</b>')
  s = s.replace(/(\r\n|\n|\r)/g, '<br>')
  return s
}
