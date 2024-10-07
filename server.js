const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

const serviceAccount = require(path.join(
    __dirname,
    "service-account.json"
));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    //databaseURL: "https://<your-project-id>.firebaseio.com"
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/", function(request, response){
	
	// отправляем ответ
	response.send("<h2>Server for PWA testing is running</h2>");
});

app.post("/subscribe", async(req,res) => {
    const {token,topic} = req.body;

    try {
        console.log("catching the message");
        await admin.messaging().subscribeToTopic(token,topic);
        console.log(res.status.code);
        res.status(200).send('Successfully subscribed to topic: ${topic}');
    } catch (error) {
        console.error("Error subscribing to topic", error);
        res.status(500).send("Failed to subscribe to topic");
    }

});
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})