const fs = require('fs');
const authViaApiKey = require('../tools/authViaApiKey');
const config = require('../../../config/config');
const node = require('../../models/node');

module.exports = async (req, res) => {
    const {id, apikey} = req.query;

    // Authenticate user
    const user = await authViaApiKey(apikey);

    // Check if user is owner
    node.findOne({owner: user.id, id}).then(node => {

        // Check node
        if (!node) {
            throw config.errors.impossible.notfound;
        }

        // Check file
        const path = `${__dirname}/../../..${config.storagepath}/${node.id}`;
        if (fs.existsSync(path)) {
            res.contentType(node.name);
            fs.createReadStream(path).pipe(res);
        } else {
            throw config.errors.impossible.notfound;
        }
    });
};
