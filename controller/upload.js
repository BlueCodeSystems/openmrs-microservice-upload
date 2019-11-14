import moment from "moment";
import fs from "fs";
function uploadFiles(req, res) {
        
    const EDI_DIR = process.env.ROOT_DIR;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400);
    }

    let name = Object.keys(req.files)[0]
    let files = req.files[name];

    const dir = `${EDI_DIR}/${name}/${moment.now().toString()}`

    fs.mkdirSync(dir, { recursive: true });

    if(Array.isArray(files))
        files.map(file => file.mv(`${dir}/${file.name}`, err => console.error(err)));
    else
        files.mv(`${dir}/${files.name}`, err => console.error(err));

    res.sendStatus(200);
 }

 function serveFiles(req, res) {

    res.sendFile('index.html')
 }

 export {uploadFiles, serveFiles}