# summarize-folder

`summarize-folder` is a powerful Node.js CLI tool designed to analyze and manipulate folder structures and file contents. It offers three main functionalities: summarizing folder structures, reading file hierarchies, and writing file hierarchies.

## Features

- **Folder Summarization**: Scan folders recursively and generate a YAML file containing file sizes.
- **File Hierarchy Reading**: Retrieve and prune file contents based on a given structure.
- **File Hierarchy Writing**: Write file contents to a specified structure.
- **Gitignore Support**: Respects `.gitignore` and `.genignore` files for excluding files/folders.
- **UTF-8 Compatibility**: Ignores non-UTF-8 encoded files.

## Installation

```bash
npm install -g summarize-folder
```

## Usage

### Summarize Folder Sizes

```bash
summarize-folder size [path]
```

Scans the current folder or specified path recursively and generates a `summary-filesizes.yaml` file containing the character count for each file.

### Read File Hierarchy

```bash
summarize-folder read <input_path> <output_path> [maxDepth]
```

Retrieves the content for a pruned file list based on the structure defined in the input YAML file.

### Write File Hierarchy

```bash
summarize-folder write <path-to-yaml-file>
```

Writes file contents to the file system based on the structure and content defined in the input YAML file.

## Configuration

- `.gitignore`: Standard Git ignore file, respected by the tool.
- `.genignore`: Additional ignore file specific to this tool.

## Dependencies

- `yaml`: Used for parsing and stringifying YAML content.

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any problems or have any questions, please open an issue in the GitHub repository.
