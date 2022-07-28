import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("listening to request on port", process.env.PORT + ".....");
});

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected to DB successfully");
  return client;
}

const client = await createConnection();

app.get("/", (req, res) => {
  console.log("request received on default path");
  res.send({ message: "Request made successfully" });
});

app.post("/createMentor", async (req, res) => {
  const data = req.body;

  const result = await client.db("zen").collection("mentor").insertOne(data);
  res.send(result);
});

app.post("/createStudent", async (req, res) => {
  const data = req.body;

  const result = await client.db("zen").collection("student").insertOne(data);
  res.send(result);
});

app.put("/assignStudenToMentor", async (req, res) => {
  const data = req.body;
  const { mentor_id, student_id } = req.body;
  const query = { mentor_id: mentor_id };
  const update = { $push: { student_list: { $each: student_id } } };
  const options = { upsert: true };

  const result = await client
    .db("zen")
    .collection("mentor")
    .updateOne(query, update, options);
  const result2 = await client
    .db("zen")
    .collection("student")
    .updateOne(
      { student_id: student_id },
      { $set: { mentor_id: mentor_id } },
      options
    );
  res.send(result2);
});

app.put("/updateStudent", async (req, res) => {
  const data = req.body;
  const { mentor_id, student_id } = req.body;

  const result = await client
    .db("zen")
    .collection("student")
    .updateOne({ student_id: student_id }, { $set: { mentor_id: mentor_id } });
  const result2 = await client
    .db("zen")
    .collection("mentor")
    .updateOne(
      { mentor_id: mentor_id },
      { $addToSet: { student_list: { $each: [student_id] } } }
    );
  res.send(result);
});

app.get("/studentWithoutMentor", async (req, res) => {
  const result = await client
    .db("zen")
    .collection("student")
    .find({ mentor_id: { $exists: false } }, { projection: { _id: false } })
    .toArray();
  res.send(result);
});

app.get("/mentorWithoutStudent", async (req, res) => {
  const result = await client
    .db("zen")
    .collection("mentor")
    .find(
      { student_list: null },
      {
        projection: {
          student_list: true,
          _id: false,
          mentor_id: true,
          name: true,
        },
      }
    )
    .toArray();
  res.send(result);
});

app.get("/getStudentListByMentor", async (req, res) => {
  const { mentor_id } = req.body;

  const result = await client
    .db("zen")
    .collection("mentor")
    .findOne(
      { mentor_id: mentor_id },
      { projection: { student_list: true, _id: false, mentor_id: true } }
    );
  res.send(result);
});
