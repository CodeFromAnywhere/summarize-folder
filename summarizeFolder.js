#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

function isUtf8(buffer) {
  try {
    buffer.toString("utf8");
    return true;
  } catch (e) {
    return false;
  }
}

function parseGitignore(content) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function isIgnored(filePath, ignorePatterns) {
  return ignorePatterns.some((pattern) => {
    if (pattern.endsWith("/")) {
      return filePath.startsWith(pattern);
    }
    return filePath === pattern || filePath.startsWith(pattern + "/");
  });
}

function scanDirectory(baseDir, dir, ignorePatterns) {
  const result = {};
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const relativePath = path.relative(baseDir, filePath);

    if (isIgnored(relativePath, ignorePatterns)) {
      continue;
    }

    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      result[file] = scanDirectory(baseDir, filePath, ignorePatterns);
    } else if (stats.isFile()) {
      const content = fs.readFileSync(filePath);
      if (isUtf8(content)) {
        result[file] = content.toString().length;
      }
    }
  }

  return result;
}

function main() {
  const targetPath = process.argv[3] || ".";
  const absolutePath = path.resolve(targetPath);

  let ignorePatterns = [];
  const gitignorePath = path.join(absolutePath, ".gitignore");
  const generatedIgnorePath = path.join(absolutePath, ".genignore");
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
    ignorePatterns = parseGitignore(gitignoreContent);
  }
  if (fs.existsSync(generatedIgnorePath)) {
    const genignoreContent = fs.readFileSync(generatedIgnorePath, "utf8");
    ignorePatterns = ignorePatterns.concat(parseGitignore(genignoreContent));
  }

  console.log("ignoring:", ignorePatterns);

  const result = {
    [path.basename(absolutePath)]: scanDirectory(
      absolutePath,
      absolutePath,
      ignorePatterns,
    ),
  };

  const yamlContent = yaml.stringify(result);
  const outputPath = "summary-filesizes.yaml";
  fs.writeFileSync(outputPath, yamlContent, "utf8");

  console.log(`Scan complete. Results written to ${outputPath}`);
}

main();
