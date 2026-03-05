3️⃣ Command Pattern
Meaning

Encapsulate a request as an object.

Useful for:

Job queues

Undo/redo

Task scheduling

Example:

Button → Command → Receiver

Code Example

Command

class LightOnCommand {
  execute() {
    console.log("Light turned ON");
  }
}


Invoker

class RemoteControl {

  constructor(command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
  }

}


Client

const command = new LightOnCommand();
const remote = new RemoteControl(command);

remote.pressButton();



Real Systems


| System         | Command Use          |
| -------------- | -------------------- |
| Job queue      | Execute tasks        |
| Kafka consumer | Process events       |
| UI systems     | Button actions       |
| Payment queue  | Transaction commands |
