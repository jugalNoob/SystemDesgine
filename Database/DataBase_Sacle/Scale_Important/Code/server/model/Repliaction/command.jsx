1::: start mongod --port 27017 --dbpath C:\data\db

2:: open new  terminal enter this command:: mongosh --port 27017

3::show dbs

4::

rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" },  // primary
    { _id: 1, host: "localhost:27018" },  // secondary
    { _id: 2, host: "localhost:27019" }   // secondary
  ]
});
Check status:

js
Copy code
rs.status()
You should see 1 PRIMARY and 2 SECONDARIES.