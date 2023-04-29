const ProfileModel = require('../models/profiles.models')
const ValidateProfile = require("../validation/Profile")
const AddProfile = async (req ,res)=>{
    const {errors, isValid} = ValidateProfile(req.body)
    try {
        if(!isValid){
          res.status(404).json(errors)
        } else {
            // * check if the user have a profile or not
            ProfileModel.findOne({user: req.user.id})
        .then(async (profile)=>{
            if (!profile) {
                //? check if the user is already existing 
                req.body.user = req.user.id //! champ user est égale id du passport (user); pour relier la collection user et profile
                await ProfileModel.create(req.body) //? create the profile
                res.status(200).json({message: "success"})
            } else {
                //? update the profile
            await ProfileModel.findOneAndUpdate(
                { _id: profile._id }, //? Search profile by token ID (user ID)
                req.body,
                { new: true } //? changer que les updated-champs 
                ).then((result) => {
                res.status(200).json(result);
                });
            }
        })
        }
    } catch (error) {
         res.status(404).json(error.message)
    }
}

const FindAllProfiles = async (req ,res)=>{
    try {
       const data =  await ProfileModel.find().populate('user', ["name", "email", "role"])
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}

const FindSingleProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOne({user: req.user.id}).populate('user', ["name", "email", "role"])
        res.status(200).json(data)
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}

const DeleteProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOneAndRemove({_id: req.params.id})
        res.status(200).json({message: "deleted"})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}

const FindProfileByTransport = async (req, res) => { 
        try {
        data = await Profile.find({ category: "Transport" }).populate("user", [
          "name",
          "email",
          "role",
        ]);
          res.status(200).json(data);
        } catch (error) {
          res.status(404).json(error.message);
        }
}
const FindProfileByHabillement = async (req, res) => { 
        try {
        data = await Profile.find({ category: "Habillement" }).populate(
          "user",
          ["name", "email", "role"]
        );
          res.status(200).json(data);
        } catch (error) {
          res.status(404).json(error.message);
        }
}
const FindProfileByLecons = async (req, res) => { 
        try {
        data = await Profile.find({ category: "Lecons" }).populate("user", [
          "name",
          "email",
          "role",
        ]);
          res.status(200).json(data);
        } catch (error) {
          res.status(404).json(error.message);
        }
}
const FindProfileByMaison = async (req, res) => { 
        try {
        data = await Profile.find({ category: "Maison" }).populate("user", [
          "name",
          "email",
          "role",
        ]);
          res.status(200).json(data);
        } catch (error) {
          res.status(404).json(error.message);
        }
}
const FindProfileByMecanique = async (req, res) => { 
        try {
        data = await Profile.find({ category: "Mecanique" }).populate("user", [
          "name",
          "email",
          "role",
        ]);
          res.status(200).json(data);
        } catch (error) {
          res.status(404).json(error.message);
        }
}
const FindProfileByBienetre = async (req, res) => {
  try {
    data = await Profile.find({ category: "Bien-etre" }).populate("user", [
      "name",
      "email",
      "role",
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const FindAllProfileByLecons = async (req, res) => {
  try {
    const data = await ProfileModel.find({ category: "Lecons" }).populate(
      "user",
      ["name", "email", "role"]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const FindAllProfileByMaison = async (req, res) => {
  try {
    const data = await ProfileModel.find({ category: "Maison" }).populate(
      "user",
      ["name", "email", "role"]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const FindAllProfileByMecanique = async (req, res) => {
  try {
    const data = await ProfileModel.find({ category: "Mecanique" }).populate(
      "user",
      ["name", "email", "role"]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const FindAllProfileByHabillement = async (req, res) => {
  try {
    const data = await ProfileModel.find({ category: "Habillement" }).populate(
      "user",
      ["name", "email", "role"]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const FindAllProfileTransport = async (req, res) => {
  try {
    const data = await ProfileModel.find({ category: "transport" }).populate(
      "user",
      ["name", "email", "role"]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const FindAllProfileBienetre = async (req, res) => {
  try {
    const data = await ProfileModel.find({ category: "Bien-etre" }).populate(
      "user",
      ["name", "email", "role"]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};


module.exports = {
  AddProfile,
  FindAllProfiles,
  FindSingleProfile,
  DeleteProfile,
  FindAllProfileBienetre,
  FindAllProfileTransport,
  FindAllProfileByHabillement,
  FindAllProfileByMecanique,
  FindAllProfileByMaison,
  FindAllProfileByLecons,
  FindProfileByBienetre,
  FindProfileByMecanique,
  FindProfileByMaison,
  FindProfileByLecons,
  FindProfileByHabillement,
  FindProfileByTransport,
};