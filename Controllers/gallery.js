const galleryModel = require("../Model/gallery")

exports.addGallery = async(req, res) => {
    try {
        const {link} = req.body
        const gallery = new galleryModel({link, addedBy : req.user._id})
        await gallery.save()
        res.status(200).json({ message: "gallery added successfully",gallery });
    } catch (error) {
       res
      .status(500)
      .json({ error: "something went wrong", issue: error.message }); 
    }
}

exports.getGallery = async(req, res) => {
    try {
        
        const gallery = await galleryModel.find().populate("addedBy", "name")
       
        res.status(200).json({ message: "gallery fetched successfully",gallery });
    } catch (error) {
       res
      .status(500)
      .json({ error: "something went wrong", issue: error.message }); 
    }
}
exports.deleteById = async(req, res) => {
    try {
        const {id} = req.params
        const gallery = await galleryModel.findByIdAndDelete(id)
       if(!gallery)
        res.status(400).json({ error: "No Such gallery found"});
        
       
       res.status(200).json({ message: "gallery deleted successfully"});
    } catch (error) {
       res
      .status(500)
      .json({ error: "something went wrong", issue: error.message }); 
    }
}