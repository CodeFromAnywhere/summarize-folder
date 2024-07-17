#!/usr/bin/env node

const command = process.argv[2];

if (command === "size") {
  require("./summarizeFolder.js");
} else if (command === "read") {
  require("./getFileHierarchyContent.js");
} else if (command === "write") {
  require("./writeFileHieararchyContent.js");
} else {
  console.log(require("fs").readFileSync("README.md", "utf8"));
}
