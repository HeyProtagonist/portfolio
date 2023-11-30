/**
 * Downloads a file
 * @param{string} realFileId file ID
 * @return{obj} file status
 * */
async function downloadFile(realFileId) {
  // Get credentials and build service
  // TODO (developer) - Use appropriate auth mechanism for your app

  const { GoogleAuth } = require('google-auth-library')
  const { google } = require('googleapis')

  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive',
  })
  const service = google.drive({ version: 'v3', auth })

  fileId = realFileId
  try {
    const file = await service.files.get({
      fileId: fileId,
      alt: 'media',
    })
    console.log(file.status)
    return file.status
  } catch (err) {
    // TODO(developer) - Handle error
    throw err
  }
}
