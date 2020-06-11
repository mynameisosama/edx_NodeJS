const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const clearDocuments = (db, callback) => {
    const collection = db.collection('edx-course-students')
    collection.drop((error, result) => {
        if (error) return process.exit(1)
        console.log('Cleared all')
        callback(result)
    })
}

const insertDocuments = (db, callback) => {
    // Get reference to edx-course-docs collection
    const collection = db.collection('edx-course-students')
    // Insert 3 documents
    collection.insertMany([
        {name : 'Bob'}, {name : 'John'}, {name : 'Peter'} // 3 documents
    ], (error, result) => {
        if (error) return process.exit(1)
        console.log(result.result.n) // will be 3
        console.log(result.ops.length) // will be 3
        console.log('Inserted 3 documents into the edx-course-students collection')
        callback(result)
    })
}

const updateDocument = (db, callback) => {
    // Get the edx-course-students collection
    var collection = db.collection('edx-course-students')
    // Update document where a is 2, set b equal to 1
    const name = 'Peter'
    collection.updateOne({ name : name }, { $set: { grade : 'A' } }, (error, result) => {
        if (error) return process.exit(1)
        console.log(result.result.n) // will be 1
        console.log(`Updated the student document where name = ${name}`)
        callback(result)
    })
}

const removeDocument = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('edx-course-students')
    // Insert some documents
    const name = 'Bob'
    collection.deleteOne({ name : name }, (error, result) => {
        if (error) return process.exit(1)
        console.log(result.result.n) // will be 1
        console.log(`Removed the document where name = ${name}`)
        callback(result)
    })
}

const findDocuments = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('edx-course-students')
    // Find some documents
    collection.find({}).toArray((error, docs) => {
        if (error) return process.exit(1)
        console.log(2, docs.length) // will be 2 because we removed one document
        console.log(`Found the following documents:`)
        console.dir(docs)
        callback(docs)
    })
}

// Connection URI
const url = 'mongodb://localhost:27017'
// Use connect method to connect to the Server
MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    if (err) return process.exit(1)
    console.log('Kudos. Connected successfully to server')
    // Perform queries
    const db = client.db('edx-course-db')
    clearDocuments(db, () => {
        console.log()
    })
    // clearDocuments(db, () => {
        insertDocuments(db, () => {
            updateDocument(db, () => {
                removeDocument(db, () => {
                    findDocuments(db, () => {
                        client.close()
                    })
                })
            })
        })
    // })
})