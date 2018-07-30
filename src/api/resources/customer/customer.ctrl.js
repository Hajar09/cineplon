import customerService from './customer.service'
import Customer, { STANDARD_ROLE } from "./customer.model"
import jwt from "../../helpers/jwt"
import Joi from "joi"

export default {
    async signup(req, res) {
        try{
            const { value, error } = customerService.validateSignup(req.body)
            if(error) {
                return res.status(400).json(error)
            }
            const encryptedPass = customerService.encryptPassword(value.password)

            const customer = await Customer.create({
                name: value.name,
                isGold: value.isGold || STANDARD_ROLE,
                phone: value.phone,
                email: value.email,
                password: encryptedPass
            })
            return res.json({ success: true })
        } catch (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        return res.json(value)
    },
    async login(req, res) {
        try {
            const { value, error } = customerService.validateLogin(req.body)
            if(error) {
                return res.status(400).json(error)
            }
            const customer = await Customer.findOne({email: value.email})
            if(!customer) {
                return res.status(401).json({err: "unauthorized token1"})
            }
            const authenticated = customerService.comparePassword(
                value.password,
                customer.password
            );
            if(!authenticated) {
                return res.status(401).json({err: "unauthorized token2"})
            }
            const token = jwt.issue({ id: customer._id }, '1d')
            return res.json({ token })
        } catch (err) {
            console.error(err)
            return res.status(500).send(err)
        }
    },
    authenticate(req, res) {
        return res.json(req.customer)
    },
    async findAll(req, res){
        try{ 
            const { page, perpage } = req.query;
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perpage, 10) || 10
            };
            const customers = await Customer.paginate({}, options)
            res.json(customers)
        }catch(err) {
            console.error(err)
            return res.status(500).send(err)
        }
    },
    async findOne(req, res){
        try{
            const { id } = req.params
            const customer = await Customer.findById(id);
            if(!customer) {
                return res.status(404).json({
                    err: "could not find a customer"
                })
            }
            return res.json(customer)
        }catch (err){
            console.error(err)
            return res.status(500).send(err)
        }
    },
    async update(req, res) {
        try{
            const { id } = req.params//le password n'est pas crypté à son changement
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                isGold: Joi.boolean().required(),
                phone: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            })
            const { value, error } = Joi.validate(req.body, schema)
            if(error && error.details) {
                return res.status(400).json(error)
            }
            const customer = await Customer.findByIdAndUpdate({ _id:id }, value, { new: true });
            if(!customer){
                return res.status(404).json({
                    err: 'could not find a customer'
                })
            }
            return res.json(customer)
        }catch(err) {
            console.error(err)
            return res.status(500).send(err)
        }
    },
    async delete(req, res) {
        try{
            const {
                id
            } = req.params
            const customer = await Customer.findByIdAndRemove({
                _id: id
            })
            if (!customer) {
                return res.status(404).json({
                    err: 'no customer found'
                })
            }
            return res.json({
                msg: 'customer deleted'
            })
        } catch(err) {
            console.error(err)
            return res.status(500).send(err)
        }
    }
}
