'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

    const Calculation = (method, x, y) => {
        switch (method.toLowerCase()) {
            case 'add':
                return { result: x + y, operation: '+' };
            case 'subtract':
                return { result: x - y, operation: '-' };
            case 'multiply':
                return { result: x * y, operation: '*' };
            case 'divide':
                return { result: x / y, operation: '/' };
            default:
                return 'This is an invalid option';
        }

    }

    const validOptions = ['add', 'subtract', 'multiply', 'divide'];

    const handleHttpCalculations = (request, response) => {
        request.query.x = parseInt(request.query.x);
        request.query.y = parseInt(request.query.y);
        const query = request.query;
        const x = parseInt(query.x);
        const y = parseInt(query.y);
        const method = query.method;

        if (isNaN(x) || isNaN(y)) {
            return response.send('Both X and Y must be a number');
        }

        if (!method) {
            return response.send(`Method must be included and be one of the following: ${
                validOptions.join(', ')
                }`);
        }

        const { operation, result } = Calculation(method, x, y);

        response.send(`${x} ${operation} ${y} = ${result}`);
        //Response.send("X + Y = RESULT");
    }

    module.exports = handleHttpCalculations;

    res.render('index', { title: 'Express' });


});

module.exports = router;
