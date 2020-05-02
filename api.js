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
      msg: 'Operation failed!'
    })
  } else {
    res.json(ret)
  }
}

// Add User
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add
  var params = req.body
  console.log('addUser:', params)
  conn.query(sql, [params.name, params.phone, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})


// Add Customer with user_id
router.post('/addCustomer', (req, res) => {
  var sql = $sql.customer.add
  var params = req.body
  console.log('addCustomer:', params)
  conn.query(sql, [params.user_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// Add Vendor with user_id
router.post('/addVendor', (req, res) => {
  var sql = $sql.vendor.add
  var params = req.body
  console.log('addVendor:', params)
  conn.query(sql, [params.user_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// Find User
router.post('/findUser', (req, res) => {
  var sql = $sql.user.find
  var params = req.body
  console.log('findUser:', params)
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

// Find Customer
router.post('/findCustomer', (req, res) => {
  var sql = $sql.customer.find
  var params = req.body
  console.log('findCustomer:', params)
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

// Find Vendor
router.post('/findVendor', (req, res) => {
  var sql = $sql.vendor.find
  var params = req.body
  console.log('findVendor:', params)
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

module.exports = router
