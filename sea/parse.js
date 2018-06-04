
module.exports = (props) => {
  try {
    if (props.slice && props.slice(0, 4) === 'SEA{') {
      props = props.slice(3)
    }
    return props.slice ? JSON.parse(props) : props
  } catch (e) {} // eslint-disable-line no-empty
  return props
}
