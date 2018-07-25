import customerService from './customer.service'
import Customer, { STANDARD_ROLE } from "./customer.model"
import jwt from "../../helpers/jwt"

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
                return res.status(401).json({err: "unauthorized"})
            }
            const authenticated = customerService.comparePassword(
                value.password,
                customer.password
            );
            if(!authenticated) {
                return res.status(401).json({err: "unauthorized"})
            }
            const token = jwt.issue({ _id: customer._id }, '1d')
            return res.json({ token })
        } catch (err) {
            console.error(err)
            return res.status(500).send(err)
        }
    },
    authenticate(req, res) {
        return res.json(req.customer)
    }
}