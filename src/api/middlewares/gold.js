import { GOLD_ROLE } from "../resources/customer/customer.model"

export const isGld = (req, res, next) => {
    if(req.customer.isGold !==  GOLD_ROLE) {
        return res.json({err: "unauthorized, not VIP customer"})
    }
    next()
}
