module.exports = (service, app) => {
  function saveImageFromBlob (blob, opt) {
    console.log({ blob, opt })
  }

  return {
    saveImageFromBlob
  }
}
