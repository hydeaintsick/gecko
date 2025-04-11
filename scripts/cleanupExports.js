// scripts/cleanupExport.js
import fs from "fs";
import path from "path";

const keep = ["app", "login", "signup", "edit", "add"];
const outPath = path.resolve(__dirname, "../out");

fs.readdirSync(outPath).forEach((item) => {
  if (!keep.includes(item) && item !== "_next" && item !== "index.html") {
    fs.rmSync(path.join(outPath, item), { recursive: true, force: true });
  }
});
