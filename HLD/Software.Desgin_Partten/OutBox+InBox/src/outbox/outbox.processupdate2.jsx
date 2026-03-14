
///---------------------------- >>> Simple  


// const processOutbox = async () => {
//   const events = await Outbox.find({ status: "PENDING" });

//   for (const event of events) {
//     try {
//       await emailQueue.add("send-welcome-email", event.payload);

//       event.status = "SENT";
//       await event.save();

//       console.log(`✅ Event ${event._id} published`);
//     } catch (err) {
//       console.log("❌ Failed to publish event", err.message);
//     }
//   }
// };
