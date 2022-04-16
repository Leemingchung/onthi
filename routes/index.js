var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res, next) {
  console.log("vào trang chủ ")

  res.render('index');

});

// xem danh sach
router.get('/xemds',async function(req, res, next) {
  console.log("vào trang sem danh sách ")
  // lấy danh sách
  var sinhviens = await SV.find({}) ;

  res.render('xemds', { data : sinhviens });
});
// kết nối mongoo
var db = 'mongodb+srv://Chungbui:chungkk123@cluster0.hq9zz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose')
const {Schema} = mongoose ;
mongoose.connect(db).catch(error =>{
  if (error)
  {
    console.log(" ket nối lỗi ")
  }
}) ;

// tạo model
const sinhvien = new Schema({
  idsv: String ,
  email:String ,
  diachi :String ,
  khoa:String

})
const SV = mongoose.model('thithu' , sinhvien)

//xóa sinh viên
router.get('/xoa' , async function(req , res , next )
{
  await SV.deleteOne({_id: req.query.id})
  res.redirect('/xemds') ;
})
//sua sv
router.get('/sua' , async  function (req , res , next  ){
  var id123 = req.query.id ;
  res.render('sua' , {id123 : id123})
})
router.post('/suasv' , async  function(req , res ){

  var id = req.body.id;
  //     <input name="email" placeholder="nhập email sinh viên ">
  var email = req.body.email ;
  //     <input name="diachi" placeholder="nhập địa chỉ sinh viên ">
  var diachi = req.body.diachi
  //     <input name="khoa" placeholder="nhập khóa sinh viên ">
  var khoa = req.body.khoa ;

  var sinhvienmoi = {
    email:email,
    diachi :diachi,
    khoa: khoa
  }
  await SV.findOneAndUpdate({_id:id }, sinhvienmoi , function (error){
    res.redirect('/xemds')
  })
})
// them Sv
router.post('/xemds' , function (req , res ){
  console.log(" thêm sinh viên ")
  //
  //     <input name="idsv" placeholder="nhập id sinh viên ">
  var id = req.body.idsv ;
  //     <input name="email" placeholder="nhập email sinh viên ">
  var email = req.body.email ;
  //     <input name="diachi" placeholder="nhập địa chỉ sinh viên ">
  var diachi = req.body.diachi
  //     <input name="khoa" placeholder="nhập khóa sinh viên ">
  var khoa = req.body.khoa ;
  const Sinhvienmoi = new SV({
    idsv:id,
    email:email,
    diachi :diachi,
    khoa: khoa
  })

    Sinhvienmoi.save(function (error){
      if (error)
      {
        res.render('xemds' , {message:"thêm không thành công" + error.message})
      }
      else {
         res.redirect('/xemds')
      }
    })

})
module.exports = router;
