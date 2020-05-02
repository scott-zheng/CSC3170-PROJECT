//sqlMap.js
var sqlMap = {
    user: {
      add: 'insert into User(Person_Name, Phone_number, Person_Password) values (?, ?, ?)',
      search: 'select * User where Phone_number = ? and Person_Password = ?',
      getPersonInfo: 'select *, b.contact as school_contact, b.director as school_director, c.contact as college_contact, c.director as college_director from user o join customer a join School b join College c on o.user_id=a.user_id and a.school=b.school_id and a.college=c.college_id where a.User_id = ?;',
      setPersonInfo1: 'update user set Person_Name = ?, Phone_number = ?, Person_Password = ? where User_id = ?',
      setPersonInfo2: 'update customer set email = ?, birthday = ?, school = ?, college = ?, gender = ? where User_id = ?',
    },
    vendor: {
      search: 'select vendor_id from vendor where category = ? and tag = ?',
      getVendorInfo: 'select * from vendor a inner join user b on a.user_id = b.user_id where a.user_id = ?',
      setVendorInfo1: 'update user set Person_Name = ?, Phone_number = ?, Person_Password = ? where User_id = ?',
      setVendorInfo2: 'update vendor set vname = ?, vaddress = ?, vphoneno = ?, vservice = ?, venueopentime = ?, venueclosetime = ? where user_id = ?'
    },
    tag: {
      all_tags: 'select Tag_name from Tag'
    },
    comment: {
      getComment: 'select Content,person_name,time from comment inner join user on comment.customer_id=user.user_id where vendor_id = ? order by time'
    }
  }
  module.exports = sqlMap;