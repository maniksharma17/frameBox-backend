const express = require("express")
const router = express.Router()
import { templateHandler } from "../controllers/template";

router.post('/', templateHandler)

module.exports = router;