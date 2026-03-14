import "./config/db.js";
import { processOutbox } from "./outbox/outbox.publisher.js";

setInterval(processOutbox, 5000);
