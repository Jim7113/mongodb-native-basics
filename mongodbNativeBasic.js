// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectID } = require("mongodb");

const dbServerUrl = "mongodb://127.0.0.1:27017";
const dbName = "";

// const genId = ObjectID();
// or, const genId = new ObjectID();

// console.log(genId, genId.id, genId.id.length, genId.toHexString());

MongoClient.connect(
  dbServerUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      console.log("Could not connect to database");
    } else {
      console.log("database connected successfully");

      const db = client.db(dbName);

      db.collection("users").insertOne(
        {
          //   _id: genId,
          username: "Gwen",
          email: "gwen@gmail.com",
        },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result.ops);
          }
        }
      );

      db.collection("users").insertMany(
        [
          {
            name: "Andrew",
            email: "andrew@gmail.com",
          },
          {
            name: "Stephen",
            email: "steph@gmail.com",
          },
        ],
        (error, result) => {
          if (error) {
            console.log("unsuccessful operation");
          } else {
            console.log(result.ops, result.insertedIds, result.insertedCount);
          }
        }
      );

      db.collection("users").findOne({ username: "Jane" }, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });

      db.collection("users").findOne(
        { _id: new ObjectID("5f767123afd9060324b798ee") },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
          }
        }
      );

      const cursor = db.collection("users").find({ username: "Nina" });

      cursor.toArray((error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });

      db.collection("users")
        .updateMany(
          {
            username: "Nina",
          },
          {
            $set: {
              username: "Nina Joe",
            },
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      db.collection("users")
        .deleteOne({
          _id: ObjectID("5f7667c15da1902ecc5128ba"),
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      db.collection("users")
        .deleteMany({
          username: "Gwen",
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
);
