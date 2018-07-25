import jwt from "jsonwebtoken"
import { devConfig } from "../../config/env/devpment"

export default {
    issue(payload, expiresIn) {
        return jwt.sign(payload, devConfig.secret, { expiresIn, })
    }
};