import { createGzip } from "zlib";
import * as fs from "fs";
import { createServer } from "https";
import { basename } from "path";

createServer((req, res) => {
  const filenameHeader = req.headers["x-filename"];
  if (!filenameHeader) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Missing filename header");
    return;
  }

  const filename = basename(
    typeof filenameHeader === "string" ? filenameHeader : filenameHeader[0]
  );
  res.writeHead(200, { "Content-Type": "text/plain" });
  fs.createReadStream(filename).pipe(createGzip()).pipe(res);
}).listen(3000);
