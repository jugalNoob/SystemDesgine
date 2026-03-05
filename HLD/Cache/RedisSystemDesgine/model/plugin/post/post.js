// after the from submite complete why send me noffictaion 

// 🏁 Final short answer (your exact question)

// 👉 Benefit:
// It guarantees the notification email is triggered only 
// after the form data is fully saved in MongoDB.


export function PostNofication(schema) {
  schema.post("save", async function (doc) {

      if (this.$locals.alreadyLogged) return;
  this.$locals.alreadyLogged = true;

  console.log('User saved:', doc.email);
  });
}



