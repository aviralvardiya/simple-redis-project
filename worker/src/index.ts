import { createClient } from "redis";

const client = createClient();

async function main() {
  try {
    await client.connect();

    console.log("connected to redis")

    while (1) {
      const response = await client.brPop("users", 0);
      console.log(response);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("user processed");
    }
  } catch (error) {
    console.log("something went wrong",error);
  }
}

main()
