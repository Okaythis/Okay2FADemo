import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {

    // verify user credentials
    // then send second auth

    res.json({
        msg: "login"
    })
});

export default router;