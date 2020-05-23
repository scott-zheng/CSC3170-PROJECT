//sqlMap.js
var sqlMap = {
    user: {
      add: 'insert into User(Person_Name, Phone_number, Person_Password) values (?, ?, ?)',
      find: 'select User_id from User where Phone_number = ? and Person_Password = ?',
      getPersonInfo: 'select *, b.contact as school_contact, b.director as school_director, c.contact as college_contact, c.director as college_director from user o join customer a join School b join College c on o.user_id=a.user_id and a.school=b.school_id and a.college=c.college_id where a.User_id = ?',
      setPersonInfo1: 'update user set Person_Name = ?, Phone_number = ?, Person_Password = ? where User_id = ?',
      setPersonInfo2: 'update customer set email = ?, birthday = ?, school = ?, college = ?, gender = ? where User_id = ?',
    },
    customer: {
      add: 'insert into Customer(User_id) values (?)',
      find: 'select User_id from Customer where User_id = ?',
    },
    vendor: {
      add: 'insert into Vendor(User_id) values (?)',
      find: 'select User_id from Vendor where User_id = ?',
      search: 'select * from vendor where User_id in (select c.User_id from vendor_category c, vendor_tag t where c.User_id = t.User_id and c.Category_id = ? and t.Tag_id in (?))',
      getVendorInfo: 'select * from vendor a inner join user b on a.user_id = b.user_id where a.user_id = ?',
      setVendorInfo1: 'update user set Person_Name = ?, Phone_number = ?, Person_Password = ? where User_id = ?',
      setVendorInfo2: 'update vendor set vname = ?, vaddress = ?, vphoneno = ?, vservice = ?, venueopentime = ?, venueclosetime = ? where user_id = ?'
    },
    tag: {
      all_tags: 'select Tag_name from Tag',
      all_tags_search: 'select Tag_id, Tag_name from Tag'
      },
    category: {
      all_cats: 'select Category_id, Category_name from Category'
    },
    comment: {
      getComment: 'select Content,person_name,time from comment inner join user on comment.customer_id=user.user_id where vendor_id = ? order by time',
      setComment: 'insert into comment (vendor_id, customer_id, content, time) values (?, ?, ?, ?)'
    }
  }
  module.exports = sqlMap;