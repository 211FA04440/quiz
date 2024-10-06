const http = require('http');
const querystring = require('querystring');
const { MongoClient } = require('mongodb');

// Replace the URI with your MongoDB connection string
const uri = "mongodb://localhost:27017"; // Local MongoDB URI
const client = new MongoClient(uri);
const dbName = 'registrationDB'; // Replace with your database name
let db;

async function connectToDatabase() {
    await client.connect();
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const parsedData = querystring.parse(body);
            const { name, email, password, confirmPassword } = parsedData;

            // Store registration information in MongoDB
            const usersCollection = db.collection('users'); // Replace with your collection name

            try {
                const user = { name, email, password, confirmPassword };
                await usersCollection.insertOne(user); // Save user to the database

                // Respond with a confirmation page showing submitted data
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<center>');
                res.write('<h1>Registration Successful!</h1>');
                res.write(`<strong>Name: </strong> <i>${name}</i><br>`);
                res.write(`<strong>Email: </strong> <i>${email}</i><br>`);
                res.write('</center>');
                res.end();
            } catch (error) {
                console.error('Error inserting user:', error);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.write('<center>Internal Server Error</center>');
                res.end();
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<center>404 - Not Found</center>');
        res.end();
    }
});

// Start the server and connect to the database
connectToDatabase().then(() => {
    server.listen(9000, () => {
        console.log("Server is running @ http://localhost:9000");
    });
}).catch(console.error);
