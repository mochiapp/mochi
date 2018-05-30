export function stripTags (input) {
  let s = input
  s = s.replace(/<b>/g, '_-=b_=-')
  s = s.replace(/<\/b>/g, '_-=/b_=-')
  s = s.replace(/<br>/g, '_-=br_=-')
  s = s.replace(/<\/?[^>]+(>|$)/g, '')
  s = s.replace(/_-=b_=-/g, '<b>')
  s = s.replace(/_-=\/b_=-/g, '</b>')
  s = s.replace(/_-=br_=-/g, '<br>')
  s = s.replace(/(\r\n|\n|\r)/g, '<br>')
  return s
}
