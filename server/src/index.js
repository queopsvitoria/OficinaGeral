const express = require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');
const multpart = require('connect-multiparty');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

//const corsOptions = {
//  origin: '*',
//  optionsSucessStatus: 200
//};

//app.use(cors(corsOptions));

const multipartMiddleware = multpart({ uploadDir: './uploads'});
app.post('/upload', multipartMiddleware, (req, res) => {
  const file = req.files;
  console.log(files);
  res.json ({ message: files });
});

app.get('/dowloadExecel', (req, res) => {
  res.download('./uploads/xxx.xlsx');
})

app.get('/dowloadPDF', (req, res) => {
  res.download('./uploads/xxx.pdf');

})
app.use((err, req, res, next) => res.json({ error: err.message}));

app.listen(8000,() => {
  console.log('servidor porta 8000')
})
