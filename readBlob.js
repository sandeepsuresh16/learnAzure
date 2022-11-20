const {BlobServiceClient} = require("@azure/storage-blob")
require('dotenv').config()
let AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING
let blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)

async function readBlob(){
    try {
        let containerName = "mycontainer"
        let blobName = "mytext4f820310-662f-11ed-87ac-038d0a29b167.txt"
        let containerClient = blobServiceClient.getContainerClient(containerName)
        let blobClient = containerClient.getBlockBlobClient(blobName)
        let downloadData = await blobClient.download()
        let data = await streamToText(downloadData.readableStreamBody)
        console.log("data ::",downloadData)
        console.log("Blob content ::",data)
        
    } catch (error) {
        console.error("Error :", error.message)
    }
}

async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
        data += chunk;
    }
    return data;
}

readBlob()