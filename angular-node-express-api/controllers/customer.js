const CustomerService = require('../services/customer.service');

exports.customerListing = async (req, res, next) => {
    res.json({ error: 'Invalid Customer UID.' });
};

exports.addNewCustomer = async (req, res, next) => {
    const body = req.body;

    try {
        const customer = await CustomerService.create(body);
        
        if (body.guid != null) {
            customer.guid = body.guid;
        }
        
        res.cookie('guid', customer.guid, { maxAge: 90000, httpOnly: true });
        
        return res.status(201).json({ customer });
    } catch (err) {
        if (err.name = 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }

        return next(err);
    }
};

exports.getCustomerById = async (req, res, next) => {
    try {
        const customer = await CustomerService.retrieve(req.params.id);
        return res.json({ customer });
    } catch (err) {
        return next(err);
    }
};

exports.updateCustomerById = async (req, res, next) => {
    try {
        const customer = await CustomerService.update(req.params.id, req.body);
        return res.json({ customer });
    } catch (err) {
        return next(err);
    }
};

exports.deleteCustomerById = async (req, res, next) => {
    try {
        const customer = await CustomerService.delete(req.params.id);
        return res.json({ success: true })
    } catch(err) {
        return next(err);
    }
};