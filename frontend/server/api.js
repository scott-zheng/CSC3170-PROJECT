var models = require('./db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('./sqlMap')
var moment = require('moment')
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

// get tags
router.get('/getTag', (req, res) => {
  var sql = $sql.tag.all_tags_search
  var params = req.body
  console.log(params)
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result)
    }
  })
})

//get categories
router.get('/getCategory', (req, res) => {
  var sql = $sql.category.all_cats
  var params = req.body
  console.log(params)
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result)
    }
  })
})

// Search Vendor
router.post('/searchVendor', (req, res) => {
  var sql = $sql.vendor.search
  var params = req.body
  console.log(params)
  conn.query(sql, [params.category, params.tag], function (err, result) {
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


router.post('/setPersonInfo', (req, res) => {
  var sql1 = $sql.user.setPersonInfo1
  var sql2 = $sql.user.setPersonInfo2
  // var sql = 'insert into User(Person_Name, Phone_number, Person_Password) values (4, 22222222222, 121212121)';
  var params = req.body
  console.log(params)
  conn.query('select School_id, College_id from school join college where School_name = ? and College_name = ?', [params.school, params.college], function (err, result) {
    var schoolid = result[0].School_id
    var collegeid = result[0].College_id
    console.log(result)
    conn.query(sql2, [params.email, params.birth, schoolid, collegeid, params.gender, params.id], function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result) {
        console.log(result)
      }
    })
  })
  conn.query(sql1, [params.name, params.phone, params.password, params.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      conn.query($sql.user.getPersonInfo, [params.id], function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result) {
          console.log(result)
          jsonWrite(res, result)
        }
      })
    }
  })
})

router.post('/getVendorInfo', (req, res) => {
  var sql = $sql.vendor.getVendorInfo
  // var sql = 'insert into User(Person_Name, Phone_number, Person_Password) values (4, 22222222222, 121212121)';
  var params = req.body
  conn.query(sql, [params.vendor_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result)
    }
  })
})

router.post('/setVendorInfo', (req, res) => {
  var sql1 = $sql.vendor.setVendorInfo1
  var sql2 = $sql.vendor.setVendorInfo2
  // var sql = 'insert into User(Person_Name, Phone_number, Person_Password) values (4, 22222222222, 121212121)';
  var params = req.body
  console.log(params)
  conn.query(sql1, [params.personname, params.personphone, params.password, params.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
    }
  })
  conn.query(sql2, [params.name, params.address, params.phone, params.service, params.opentime, params.closetime, params.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      conn.query($sql.vendor.getVendorInfo, [params.id], function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result) {
          console.log(result)
          jsonWrite(res, result)
        }
      })
    }
  })
})

router.post('/getComment', (req, res) => {
  var sql = $sql.comment.getComment
  var params = req.body
  console.log(params)
  conn.query(sql, [params.vendor_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result)
    }
  })
})

router.post('/setComment', (req, res) => {
  var sql = $sql.comment.setComment
  var params = req.body
  console.log(params)
  conn.query(sql, [params.vendor_id, params.customer_id, params.content, moment(params.time).format("YYYY-MM-DD HH:mm:ss")], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
    }
  })
})

module.exports = router
