import { randomBytes } from "crypto";

const secret = randomBytes(24);
console.log(`Generated secret: ${secret.toString("hex")}`);
