const UploadImageModel = require('../models/UploadImageModel');

module.exports = {

    async storeNameImage(req, res) {
        const { path } = req.file;
        const { id } = req.body;
        console.log(req.file);

        const response = await UploadImageModel.storeImageLocation(path, id)

        if (!response) {
            res.status(400).json({ error: 'error image added' });
        }

        return res.status(200).json({ success: 'user image added' });
    }

}