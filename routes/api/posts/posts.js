const express = require("express");
const router = express.Router();

router.get("/posttest", (req, res) => res.json({ "msg": "posts route" }));

module.exports = router;