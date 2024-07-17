#!/usr/bin/env node

const fs = require("fs");
const yaml = require("yaml");
const path = require("path");

/**Create a function that retreives the content for a pruned file list in full as `prune_content.yaml` ensuring it doens't break the format.*/
function getPrunedContent(basePath, result, maxDepth = 10, currentDepth = 0) {
  if (currentDepth >= maxDepth || typeof result !== "object") {
    const content = fs.readFileSync(basePath, "utf8");
    return content;
  }

  const prunedResult = {};
  for (const [key, value] of Object.entries(result)) {
    prunedResult[key] = getPrunedContent(
      path.join(basePath, key),
      value,
      maxDepth,
      currentDepth + 1,
    );
  }
  return prunedResult;
}

function retrievePrunedContent(absoluteInputPath, outputPath, maxDepth = 10) {
  // Read the input YAML file
  const inputContent = fs.readFileSync(absoluteInputPath, "utf8");
  const parsedContent = yaml.parse(inputContent);
  const absoluteFolderPath = path.parse(absoluteInputPath).dir;
  const folderName = path.parse(absoluteFolderPath).base;

  const realParsedContent =
    folderName === Object.keys(parsedContent)[0]
      ? parsedContent[folderName]
      : parsedContent;

  // Prune the content
  const prunedContent = getPrunedContent(
    absoluteFolderPath,
    realParsedContent,
    maxDepth,
  );

  // Convert the pruned content back to YAML
  const yamlContent = yaml.stringify(prunedContent);

  // Write the pruned content to the output file
  fs.writeFileSync(outputPath, yamlContent, "utf8");

  console.log(`Pruned content written to ${outputPath}`);
}

function main() {
  const args = process.argv.slice(3);
  if (args.length < 2) {
    console.error("Usage: read <input_path> <output_path> [maxDepth]");
    process.exit(1);
  }

  const inputPath = args[0];
  const outputPath = args[1];
  const maxDepth = args[2] ? parseInt(args[2]) : undefined;

  retrievePrunedContent(path.resolve(inputPath), outputPath, maxDepth);
  console.log(`Pruned content has been written to ${outputPath}`);
}

main();
