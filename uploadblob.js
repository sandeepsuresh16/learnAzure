const {BlobServiceClient} = require("@azure/storage-blob")
require("dotenv").config();
const {v1:uuidv1} = require("uuid")
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING
let blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)

async function uploadToBlob(){
    try {
        let containerName = "mycontainer"
        let blobName = "mytext"+uuidv1()+".txt"
        let containerClient = blobServiceClient.getContainerClient(containerName)
        let blobClient = containerClient.getBlockBlobClient(blobName)
        let data = "Hello world, this is a sample text file for testing the blob storage"
        let uploadres = await blobClient.upload(data, data.length)
        console.log(uploadres);
        
    } catch (error) {
        console.log(error.message);
    }
}

uploadToBlob()