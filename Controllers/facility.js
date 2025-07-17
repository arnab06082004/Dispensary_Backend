const facilityModel = require("../Model/facility")



exports.addFacility = async(req, res) =>{
    try {
        const {title, description} = req.body;
        const facility = new facilityModel({title, description, addedBy:req.user._id})
        await facility.save()

        res.status(200).json({message : "Facility added Successfully", facility})
    } catch (error) {
         res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
    }
}

exports.updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const facility = await facilityModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        addedBy: req.user._id
      },
      { new: true }
    );

    if (!facility) {
      return res.status(400).json({ error: "Data not found" });
    }

    res.status(200).json({ message: "Facility updated successfully", facility });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", issue: error.message });
  }
};

exports.getAllFacility = async(req, res) => {
    try {
        const facility = await facilityModel.find().populate("addedBy", "name")
        res
      .status(200)
      .json({ message: "facilities fetched successfully", facility });
        
    } catch (error) {
        res
      .status(500)
      .json({ error: "something went wrong", issue: error.message });
    }
}

exports.deleteFacility = async(req, res) => {
    try {
        const {id} = req.params
        const facility = await facilityModel.findByIdAndDelete(id)

        if(!facility)
            res
      .status(400)
      .json({ error: "facility not found"}); 

        res.status(200)
      .json({ message: "facility deleted successfully"});
    } catch (error) {
       res
      .status(500)
      .json({ error: "something went wrong", issue: error.message }); 
    }
}