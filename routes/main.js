const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/middlewares');
const axios = require('axios');

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const lang = req.session.user && req.session.user.language === 'ru' ? 'ru' : 'en';
        
        const apiUrl = `https://api.soccersapi.com/v2.2/leagues/?user=izok2004&token=8a337e57458e145a2680bacc14fbc197&t=list${lang !== 'en' ? '&lang=ru' : ''}`;
        
        const response = await axios.get(apiUrl);
        
        if (response.status === 200 && response.data && response.data.data) {
            res.render('index', {
                loggedIn: req.session.user ? true : false,
                isAdmin: req.session.user && req.session.user.isAdmin,
                leagues: response.data.data
            });
        } else {
            throw new Error('Failed to fetch leagues');
        }
    } catch (error) {
        console.error('Error fetching competitions:', error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;
