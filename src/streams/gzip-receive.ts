import { createServer } from "https";
import { basename } from "path";
import { createDecipheriv } from "crypto";
import * as process from "process";
import { createGunzip } from "zlib";
import { createWriteStream } from "fs";

const secret = process.argv[2];

createServer((req, res) => {
  const filenameHeader = req.headers["x-filename"];
  if (!filenameHeader) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Missing filename header");
    return;
  }

  const ivHeader = req.headers["x-initialization-vector"];
  if (!ivHeader) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Missing initialization vector header");
    return;
  }

  const filename = basename(
    typeof filenameHeader === "string" ? filenameHeader : filenameHeader[0]
  );
  const iv = Buffer.from(Array.isArray(ivHeader) ? "" : ivHeader, "hex");

  req
    .pipe(createDecipheriv("aes-256-gcm", secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream(filename))
    .on("finish", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("File successfully written");
    });
}).listen(3000);
