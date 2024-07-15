create: a node.js cli that scans the current folder or given absolute or relative path for all files and folders recursively, and writes a yaml file which is a nested object where the keys are the folder or file names, and the leafs are the amount of characters in the file.

use no libraries except node ones

if the target folder has a .gitignore file, ensure to ignore the files/folders in that gitignore in the result. Do the same if there's a .genignore file available in the root folder or target folder. Also ignore files that are not utf8.
