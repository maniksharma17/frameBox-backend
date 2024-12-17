const express = require("express")
const router = express.Router()
import { chatHandler } from "../controllers/chat";

router.post('/', chatHandler)

module.exports = router;