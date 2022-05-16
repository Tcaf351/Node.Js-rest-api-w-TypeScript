// inialise express router
const router = require('express').Router();

module.exports.routerGet = router.get('/', (req, res) => {
    res.send('hello world from routes')
});

module.exports.routerPost = router.post('/', (req, res) => {
    res.send('hello, i just got posted')
})