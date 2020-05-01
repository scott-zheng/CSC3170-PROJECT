var models = require('./db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('./sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// Add User
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add
  var params = req.body
  console.log(params)
  conn.query(sql, [params.user_id, params.name, params.phone, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// Search User
router.get('/searchUser', (req, res) => {
  var sql = $sql.user.search
  var params = req.body
  console.log(params)
  conn.query(sql, [params.phone, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result)
    }
  })
})

router.post('/getPersonInfo', (req, res) => {
  var sql = $sql.user.getPersonInfo
  // var sql = 'insert into User(Person_Name, Phone_number, Person_Password) values (4, 22222222222, 121212121)';
  var params = req.body
  console.log(params.user_id)
  console.log(sql)
  conn.query(sql, [params.user_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result)
    }
  })
})

router.post('/cancelReader', (req, res) => {
  var sql = $sql.reader.delete
  var params = req.body
  console.log(params)
  conn.query(sql, [params.name], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

router.get('/searchReader', (req, res) => {
  var sql = $sql.reader.search
  var params = req.query
  console.log(params)
  conn.query(sql, [params.name], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      res.send(result)
    }
  })
})

router.post('/readerBorrow', (req, res) => {
  var sql = $sql.reader.borrowBook
  var params = req.body
  console.log(params)
  conn.query(sql, [params.readerName, params.bookName], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
