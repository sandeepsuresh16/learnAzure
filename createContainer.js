const {BlobServiceClient} = require("@azure/storage-blob")
require("dotenv").config();
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING
let blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)

async function createContainer(){
    try {
        let containerName = "mycontainer"
        let containerClient = blobServiceClient.getContainerClient(containerName)
        const createRes = await containerClient.create()
        console.log(createRes)
    } catch (error) {
        console.error("Error ::", error.message)
    }
}

createContainer()
.then(() => console.log("done"))
.catch((error)=>console.log(error))
