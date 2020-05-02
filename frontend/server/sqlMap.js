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
	  search: 'select * from vendor where User_id in (select c.User_id from vendor_category c, vendor_tag t where c.User_id = t.User_id and c.Category_id = ? and t.Tag_id in (?))'
    },
    tag: {
      all_tags: 'select Tag_name from Tag',
	  all_tags_search: 'select Tag_id, Tag_name from Tag'
    },
	category: {
		all_cats: 'select Category_id, Category_name from Category'
	}
  }
  module.exports = sqlMap;