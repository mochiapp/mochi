module.exports = (service, app) => {
  function saveImageFromBlob (blob, opt) {
    return service.create({ uri: opt.src1 })
      .then((response) => {
        return response
      })
  }

  return {
    saveImageFromBlob
  }
}
