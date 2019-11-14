import express from 'express';
import fileUpload from 'express-fileupload';
import {uploadFiles,serveFiles} from './controller/upload';


let app = express();

const PORT = process.env.PORT || 8089;

app.use(fileUpload());

app.use('/upload',express.static('dist'))

app.get('/upload', serveFiles);

app.post('/upload', uploadFiles);

app.listen(PORT, function () {
    console.log(`openmrs-microservices-upload listening on port ${PORT}`);
});
