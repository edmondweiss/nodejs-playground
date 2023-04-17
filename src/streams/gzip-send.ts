import { createReadStream } from "fs";
import { request, RequestOptions } from "http";
import { createGzip } from "zlib";
import { createCipheriv, randomBytes } from "crypto";

const filename = process.argv[2];
const secret = Buffer.from(process.argv[3], "hex");
const iv = randomBytes(16);

const httpRequestOptions: RequestOptions = {
  headers: {
    "Content-Type": "octet-stream",
    "Content-Encoding": "gzip",
    "X-Filename": filename,
    "X-Initialization-Vector": iv.toString("hex"),
  },
};

const req = request(httpRequestOptions, (response) => {
  console.log(`STATUS: ${response.statusCode}`);
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(createCipheriv("aes-256-gcm", secret, iv))
  .pipe(req)
  .on("finish", () => {
    console.log("File successfully sent");
  });
