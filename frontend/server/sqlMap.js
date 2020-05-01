//sqlMap.js
var sqlMap = {
    user: {
      add: 'insert into User(Person_Name, Phone_number, Person_Password) values (?, ?, ?)',
      search: 'select * User where Phone_number = ? and Person_Password = ?',
      getPersonInfo: 'select *, b.contact as school_contact, b.director as school_director, c.contact as college_contact, c.director as college_director from user o join customer a join School b join College c on o.user_id=a.user_id and a.school=b.school_id and a.college=c.college_id where a.User_id = ?;',
    },
    vendor: {
      comments: 'select comments from vendor where vendor_id = ?',
      search: 'select vendor_id from vendor where category = ? and tag = ?'
    },
    tag: {
      all_tags: 'select Tag_name from Tag'
    },
  }
  module.exports = sqlMap;