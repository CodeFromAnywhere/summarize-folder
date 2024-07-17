#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

async function writeContentToFiles(basePath, content) {
  for (const [filePath, fileContent] of Object.entries(content)) {
    if (typeof fileContent === "object" && fileContent !== null) {
      await writeContentToFiles(path.join(basePath, filePath), fileContent);
    } else {
      const fullPath = path.join(basePath, filePath);
      await fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      await fs.writeFileSync(fullPath, fileContent);
      console.log(`Written: ${fullPath}`);
    }
  }
}

async function main() {
  if (process.argv.length < 4) {
    console.error("Usage: write <path-to-yaml-file>");
    process.exit(1);
  }

  const inputFile = path.resolve(process.argv[3]);
  const basePath = path.dirname(inputFile);

  try {
    const fileContent = await fs.readFileSync(inputFile, "utf8");
    const parsedContent = yaml.parse(fileContent);

    await writeContentToFiles(basePath, parsedContent);
    console.log("All files have been written successfully.");
  } catch (error) {
    console.error("An error occurred:", error.message);
    process.exit(1);
  }
}

main();
