const {BlobServiceClient} = require('@azure/storage-blob')
require('dotenv').config()
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)

async function deleteContainer(){
    try {
        let containerName = "mycontainer"
        let containerClient = blobServiceClient.getContainerClient(containerName)
        let deleteResp = await containerClient.delete()
        console.log(deleteResp);
    } catch (error) {
        console.log(error.message);
    }
}

deleteContainer()