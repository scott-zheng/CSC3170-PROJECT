//sqlMap.js
var sqlMap = {
    user: {
      add: 'insert into User(Person_Name, Phone_number, Person_Password) values (?, ?, ?)',
      find: 'select User_id from User where Phone_number = ? and Person_Password = ?',
    },
    customer: {
      add: 'insert into Customer(User_id) values (?)',
      find: 'select User_id from Customer where User_id = ?',
    },
    vendor: {
      add: 'insert into Vendor(User_id) values (?)',
      find: 'select User_id from Vendor where User_id = ?',
    },
    tag: {
      all_tags: 'select Tag_name from Tag'
    },
  }
  module.exports = sqlMap;