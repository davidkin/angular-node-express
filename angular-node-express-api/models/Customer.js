class CustomerModel {
    constructor({ uid, firstName, lastName, email, zipcode, password }) {        
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
		this.email = email;
		this.zipcode = zipcode;
		this.password = password;
    }
}

module.exports = CustomerModel;