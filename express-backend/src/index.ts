import express from "express";
import { createClient } from "redis";

const app = express();
const client = createClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.post("/submit", async (req, res) => {
  const { name, age, like } = req.body;

  try {
    await client.lPush("users", JSON.stringify({ name, age, like }));
    res.json({
      msg: "submission done",
    });
  } catch (error) {
    console.log(error)
    res.json({msg:"something went wrong"})
  }
});

async function connectAndStart() {
  try {
    await client.connect();
    console.log("connected to redis");
    const port = 8080;
    app.listen(port, () => {
      console.log("server listening on port :", port);
    });
  } catch (error) {
    console.log("error while connecting to redis");
  }
}

connectAndStart();
