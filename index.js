const [cmd] = process.argv.slice(2);

if (cmd === "size") {
  require("./summarizeFolder.js");
}
if (cmd === "read") {
  require("./getFileHierarchyContent.js");
}
if (cmd === "write") {
  require("./writeFileHieararchyContent.js");
}
