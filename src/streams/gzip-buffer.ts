import { readFile, writeFile } from "node:fs/promises";
import { gzip as gzipSync } from "node:zlib";
import { promisify } from "node:util";
import * as console from "console";

const gzip = promisify(gzipSync);

const filename = process.argv[2];
const data = await readFile(filename);
const gzipData = await gzip(data);
await writeFile(`${filename}.gz`, gzipData);
console.log("Done");
