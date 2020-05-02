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
