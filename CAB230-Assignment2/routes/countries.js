const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) =>{ 


    const queryParams = Object.keys(req.query);
    if (queryParams.length > 0) {
        res.status(400).json({
            error: true,
            message: `Invalid query parameters: ${queryParams.join(',')}. Query parameters are not permitted.`
        }); 
        return; 
    }


    const queryVolcanoes = req.db.from('volcanoes').distinct('country').whereNotNull('country').orderBy('country')
    .then((rows) => {
     
        const countries = rows.map((row) => row.country)

    
        res.status(200).json(countries)
    })
    .catch((err) => { 
        console.log(err);
        res.status(500).json({
            error: true, 
            message: 'An interal server error occurred.'
        });
    })
});



module.exports = router;