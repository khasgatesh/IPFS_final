const express = require('express')
const app = express()

const fs =require('fs');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
app.use(express.static(__dirname+'/public'));
app.use('/css',express.static(__dirname+'/public/css'))
app.use('/img',express.static(__dirname+'public/doctor.svg'))
app.get('/', function (req, res) {
//   res.send('Hello World')
    //res.sendFile(__dirname+'/public/ipfs.html');
     res.sendFile(__dirname+'/public/Hospital.html')
})
app.get('/ipfs',(req,res)=>{
    res.sendFile(__dirname+'/public/ipfs.html')
})

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    var data = new Buffer(fs.readFileSync(req.file.path));
    ipfs.add(data, function (err,file){
        if(err){
            console.log(err);
        }
        console.log(file);
        res.send(file[0].hash);
    })

  })

  app.get('/download/:ID',function(req,res){
      console.log(req.params.ID);
      res.redirect('https://ipfs.io/ipfs/'+req.params.ID);
  })
 
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/hospital.html')
})
app.get('/Register',(req,res)=>{
        res.sendFile(__dirname+'/public/Register.html')
})
app.get('/Doctor',(req,res)=>{
    res.sendFile(__dirname+'/public/Doctor.html')
})
app.listen(process.env.PORT || 3030)