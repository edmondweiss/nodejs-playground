import * as process from "process";

process.stdin
  .on("readable", () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
      process.stdout.write(`data: ${chunk}`);
    }
  })
  .on("end", () => {
    console.log("end of stream");
  });
