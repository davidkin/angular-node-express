const CustomerModel = require('../models/Customer');
const Validator = require('fastest-validator');

const customers = {};
const customerValidator = new Validator();

/* use the same patterns as on the client to validate the request */
const namePattern = /([A-Za-z\-\’])*/;
const zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

let counter = 0;

/* customer validator shema */
const customerVSchema = {
    guid: { type: "string", min: 3 },
    firstName: { type: "string", min: 1, max: 50, pattern: namePattern },
    lastName: { type: "string", min: 1, max: 50, pattern: namePattern },
    email: { type: "email", max: 75 },
    zipcode: { type: "string", max: 5, pattern: zipCodePattern },
    password: { type: "string", min: 2, max: 50, pattern: passwordPattern }
};

class CustomerService {

    static create(data) {
        
        const vres = customerValidator.validate(data, customerVSchema);
        
        /* validation failed */
        if(!vres) {
            const errors = {};
            let item = null;
            
            for (const index in vres) {
                item = vres[index];
                
                errors[item.field] = item.message;
            }
            
            throw {
                name: 'ValidationError',
                message: errors
            }
        }
        
        const customer = new CustomerModel(data);
        customer.uid = 'c' + counter++;
        
        customers[customer.uid] = customer;
        
        return customer;
    }

    static retrieve(uid) {
        if (customers[uid] != null) {
            return customers[uid]
        } else {
            throw new Error('Unable to retrieve a customer by (uid:'+ uid +')');
        }
    }

    static update(uid, data) {
        if (customers[uid] != null) {
            const customer = customers[uid];

            Object.assign(customer, data);
        } else {
            throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
        }
    }

    static delete(uid) {
        if (customers[uid] != null) {
            delete customers[uid];
        } else {
            throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
        }
    }
}

module.exports = CustomerService