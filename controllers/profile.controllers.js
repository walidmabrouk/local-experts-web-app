const profileModel = require("../models/profiles.models");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImage,
} = require("../utils/cloudinary");
const ValidateProfile = require("../validation/Profile");
const path = require("path");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { Comment } = require("../models/Comment.model");


const AddProfile = async (req, res) => {
  const { errors, isValid } = ValidateProfile(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      // * check if the user have a profile or not
      profileModel.findOne({ user: req.user.id }).then(async (profile) => {
        if (!profile) {
          //? check if the user is already existing
          req.body.user = req.user.id; //! champ user est égale id du passport (user); pour relier la collection user et profile
          await profileModel.create(req.body); //? create the profile
          res.status(200).json({ message: "success" });
        } else {
          //? update the profile
          await profileModel.findOneAndUpdate(
            { _id: profile._id }, //? Search profile by token ID (user ID)
            req.body,
            { new: true } //? changer que les updated-champs
          ).then((result) => {
            res.status(200).json(result);
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};





const FindAllProfiles = async (req, res) => {
  try {
   let query;

   let uiValues = {
     filtering: {},
     sorting: {},
   };

   const reqQuery = { ...req.query };

   const removeFields = ["sort"];

   removeFields.forEach((val) => delete reqQuery[val]);

   const filterKeys = Object.keys(reqQuery);
   const filterValues = Object.values(reqQuery);

   filterKeys.forEach(
     (val, idx) => (uiValues.filtering[val] = filterValues[idx])
   );

   let queryStr = JSON.stringify(reqQuery);

   queryStr = queryStr.replace(
     /\b(gt|gte|lt|lte|in)\b/g,
     (match) => `$${match}`
   );

   query = profileModel.find(JSON.parse(queryStr)).populate("user");

   if (req.query.sort) {
     const sortByArr = req.query.sort.split(",");

     sortByArr.forEach((val) => {
       let order;

       if (val[0] === "-") {
         order = "descending";
       } else {
         order = "ascending";
       }

       uiValues.sorting[val.replace("-", "")] = order;
     });

     const sortByStr = sortByArr.join(" ");

     query = query.sort(sortByStr);
   } else {
     query = query.sort("-price");
   }

   const data = await query;

   const maxPrice = await profileModel
     .find()
     .sort({ price: -1 })
     .limit(1)
     .select("-_id price");

   const minPrice = await profileModel
     .find()
     .sort({ price: 1 })
     .limit(1)
     .select("-_id price");

   uiValues.maxPrice = maxPrice[0].price;
   uiValues.minPrice = minPrice[0].price;

 res.status(200).json(data);
  
  
  
  } catch (error) {
    res.status(404).json(error.message);
  }
};
// const FindAllProfiles = async (req, res) => {
//   try {
//       const {  category, minPrice, maxPrice , city } = req.query;
//     const filter = {};


//      if (category) {
//        filter.category = category;
//      }
//      if (city) {
//        filter.city = { $regex: city, $options: "i" };
//      }

//      if (minPrice && maxPrice) {
//        filter.price = { $gte: minPrice, $lte: maxPrice };
//      }
    
//     const data = await profileModel.find(filter).populate("user");
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(404).json(error.message);
//   }
// };









const FindSingleProfile = async (req, res) => {
  try {
    const profile = await profileModel
      .findOne({ user: req.user.id })
      .populate("user", ["name", "email", "role"])
      .populate("reservations")
      .populate({
        path: "reviews",
        populate: { path: "clientId", select: "name" },
      });
    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const DeleteProfile = async (req, res) => {
  try {
    const data = await profileModel.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

/**-----------------------------------------------
 * @desc    Delete User Profile (Account)
 * @route   /api/users/profile/:id
 * @method  DELETE
 * @access  private (only admin or user himself)
 ------------------------------------------------*/
module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  // 1. Get the user from DB
  const user = await profileModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  // 2. Get all posts from DB
  const posts = await PostModel.find({ user: user._id });

  // 3. Get the public ids from the posts
  const publicIds = posts?.map((post) => post.image.publicId);

  // 4. Delete all posts image from cloudinary that belong to this user
  if(publicIds?.length > 0) {
    await cloudinaryRemoveMultipleImage(publicIds);
  }

  // 5. Delete the profile picture from cloudinary
  if(user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  
  // 6. Delete user posts & comments
  await PostModel.deleteMany({ user: user._id }); //! check
  await Comment.deleteMany({ user: user._id });

  // 7. Delete the user himself
  await profileModel.findByIdAndDelete(req.params.id);

  // 8. Send a response to the client
  res.status(200).json({ message: "your profile has been deleted" });
});


const updatingRatingCtrl =( 
  async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    try {
      // Mettre à jour la valeur de notation dans la base de données
      const professionnel = await profileModel.findById(id);
      professionnel.rating = rating;
      await professionnel.save();

      res
        .status(200)
        .json({ message: "La notation a été mise à jour avec succès." });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notation :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de la notation." });
    }
  }
);

















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
};
const FindProfileByHabillement = async (req, res) => {
  try {
    data = await Profile.find({ category: "Habillement" }).populate("user", [
      "name",
      "email",
      "role",
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
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
};
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
};
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
};
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
    const data = await profileModel.find({ category: "Lecons" }).populate(
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
    const data = await profileModel.find({ category: "Maison" }).populate(
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
    const data = await profileModel.find({ category: "Mecanique" }).populate(
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
    const data = await profileModel.find({ category: "Habillement" }).populate(
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
    const data = await profileModel.find({ category: "transport" }).populate(
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
    const data = await profileModel.find({ category: "Bien-etre" }).populate(
      "user",
      ["name", "email", "role"]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

/**
 * @desc Profile Photo Upload
 * @route /api/profile/Profile-photo-upload
 * @method Post
 * @access private (only logged in users)
 */
const profilePhotoUploadCtrl = async (req, res) => {
  // 1. Validation
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  // 2. Get the path to the image
  const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);
  // 3. Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);
  // 4. Get the user from DB
  const user = await profileModel.findOne({ user: req.user.id }).populate(
    "user",
    ["name", "email", "role"]
  );
  // 5. Delete the old profile photo if exist
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  // 6. Change the profilePhoto field in the DB
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();
  // 7. send response to client
  res.status(200).json({
    message: "your profile photo uploaded succesfully",
    profilePhoto: { url: result.secure_url, publicId: result.public_id },
  });
  // 8.Remove image from the server
  fs.unlinkSync(imagePath)
};


const addToFavorites = async (req, res) => {
  const { profileId, favoriteProfileId } = req.params;

  try {
    // Vérifier si le profil favori existe
    const favoriteProfile = await Profile.findById(favoriteProfileId);
    if (!favoriteProfile) {
      return res.status(404).json({ message: "Le profil favori n'existe pas" });
    }

    // Ajouter le profil favori à la liste des favoris du profil
    const profile = await Profile.findById(profileId);
    profile.favorites.push(favoriteProfile);
    await profile.save();

    res.status(200).json({ message: "Le profil a été ajouté aux favoris" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'ajout aux favoris" });
  }
};

const removeFromFavorites = async (req, res) => {
  const { profileId, favoriteProfileId } = req.params;

  try {
    // Supprimer le profil favori de la liste des favoris du profil
    const profile = await Profile.findById(profileId);
    profile.favorites.pull(favoriteProfileId);
    await profile.save();

    res.status(200).json({ message: "Le profil a été supprimé des favoris" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Une erreur est survenue lors de la suppression des favoris",
      });
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
  profilePhotoUploadCtrl,
  updatingRatingCtrl,
  addToFavorites,
  removeFromFavorites,
};
