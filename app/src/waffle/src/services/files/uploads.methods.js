export default (service, app) => {
  function createFromBlob (blob) {
    return createUri(blob)
      .then((uri) => {
        return service.create({ uri })
      })
  }

  function createUri (blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const value = event.target.result
        resolve(value)
      }
      reader.readAsDataURL(blob)
    })
  }

  return {
    createFromBlob
  }
}
