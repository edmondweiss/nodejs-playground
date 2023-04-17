import { createReadStream } from "fs";
import { request, RequestOptions } from "http";
import { createGzip } from "zlib";

const filename = process.argv[2];

const httpRequestOptions: RequestOptions = {
  headers: {
    "Content-Type": "octet-stream",
    "Content-Encoding": "gzip",
  },
};

const req = request(httpRequestOptions, (response) => {
  console.log(`STATUS: ${response.statusCode}`);
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(req)
  .on("finish", () => {
    console.log("File successfully sent");
  });
