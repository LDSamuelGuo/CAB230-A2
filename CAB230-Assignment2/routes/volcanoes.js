const express = require('express');
const authorize = require('../Auth/auth');
const router = express.Router();

const validPopulatedWithin = [
    '5km',
    '10km', 
    '30km',
    '100km'
]



router.get('/volcanoes', (req, res,  next) =>{ 

  
    const country = req.query.country;
    const populatedWithin = req.query.populatedWithin;

   
    if (!country) { 
        res.status(400).json({
            error: true,
            message: `Country is a required query parameter.`
        }); 
        return; 
    }

    if (populatedWithin && !validPopulatedWithin.includes(populatedWithin)) { 
        res.status(400).json({
            error: true,
            message: `Invalid value for populatedWithin: ${populatedWithin}. Only ${validPopulatedWithin.join(',')} are permitted.`
        }); 
        return; 
    }

   
    for (const item of Object.keys(req.query)) { 
        if (item !== 'country' && item !== 'populatedWithin') { 
            res.status(400).json({
                error: true,
                message: `Invalid query parameters. Only country and populatedWithin are permitted.`
            }); 
            return;
        }
    }

   
    const queryVolcanoes = req.db.from('volcanoes').select('id', 'name', 'country', 'region', 'subregion').where({ country: country }).andWhere(function() { 
        if (populatedWithin) { this.where(`population_${populatedWithin}`, '>', 0); }
    })
    .then((rows) => {
        
        res.status(200).json(rows)
    })
    .catch((err) => { 
        console.log(err);
        res.status(500).json({
            error: true, 
            message: 'An interal server error occurred.'
        })
    })
});



router.get('/volcano/:id', authorize, (req, res, next) => { 

  
    const queryParams = Object.keys(req.query);
    if (queryParams.length > 0) {
        res.status(400).json({
            error: true,
            message: `Invalid query parameters: ${queryParams.join(',')}. Query parameters are not permitted.`
        }); 
        return; 
    }

    
    const volcanoID = req.params.id;

   
    const selectColumns = ['id', 'name', 'country', 'region', 'subregion', 'last_eruption', 'summit', 'elevation', 'latitude', 'longitude'];
    if (req.isAuthenticated) {  
        Array.prototype.push.apply(selectColumns, [ 'population_5km', 'population_10km', 'population_30km', 'population_100km']);
    }

  
    const queryVolcanoes = req.db.from('volcanoes').first(selectColumns).where({ id: volcanoID })
    .then((row) => {

      
        if (!row) { res.status(404).json({
            error: true,
            message: `Volcano with ID: ${req.params.id} not found.`
        }); return; }

       
        res.status(200).json(row)
    })
    .catch((err) => { 
        console.log(err);
        res.status(500).json({
            error: true, 
            message: 'An interal server error occurred.'
        })
    })
});


module.exports = router;