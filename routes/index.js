var express = require("express");
const {
  Register,
  Login,
  Test,
  Admin,
  verifyUserAccountCtrl,
} = require("../controllers/user.controllers");
var router = express.Router();
const passport = require("passport");
const { ROLES, inRole } = require("../middlewares/Rolemiddleware");
const {
  AddProfile,
  FindAllProfiles,
  FindSingleProfile,
  DeleteProfile,
  FindProfileByTransport,
  FindProfileByMecanique,
  FindProfileByLecons,
  FindProfileByBienetre,
  FindProfileByHabillement,
  FindProfileByMaison,
  FindAllProfileByMecanique,
  FindAllProfileByLecons,
  FindAllProfileByHabillement,
  FindAllProfileByMaison,
  FindAllProfileBienetre,
  profilePhotoUploadCtrl,
} = require("../controllers/profile.controllers");
const subcategorieController = require("../controllers/subcategories.controllers");

const photoUpload = require("../middlewares/photoUpload");
const { createPostCtrl, getAllPostsCtrl, getSinglePostCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl } = require("../controllers/posts.controllers");
const { createCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl } = require("../controllers/comments.controller");
const { createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl } = require("../controllers/categories.controllers");
const { createReservationCtrl, getReservationByProfessional, getAllReservationCtrl, updateReservationCtrl, deleteReservationCtrl } = require("../controllers/reservations.controllers");
/* users routes. */
router.post("/register", Register);
router.post("/login", Login);
// /api/auth/:userId/verify/:token
router.get("/auth/:userId/verify/:token", verifyUserAccountCtrl);
/* add profile route */
router.post(
  "/profiles",
  passport.authenticate("jwt", { session: false }),
  AddProfile
);
/* get all profiles */
router.get(
  "/profiles",
  passport.authenticate("jwt", { session: false }),
  
  FindAllProfiles
);
/* get one profiles */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  FindSingleProfile
);
/* delete profiles */
router.delete(
  "/profiles/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  DeleteProfile
);

/* get one profile by category */
router.get(
  "/profile/transport",
  passport.authenticate("jwt", { session: false }),
  FindProfileByTransport
);
router.get(
  "/profile/mecanique",
  passport.authenticate("jwt", { session: false }),
  FindProfileByMecanique
);
router.get(
  "/profile/lecons",
  passport.authenticate("jwt", { session: false }),
  FindProfileByLecons
);
router.get(
  "/profile/bien-etre",
  passport.authenticate("jwt", { session: false }),
  FindProfileByBienetre
);
router.get(
  "/profile/habillement",
  passport.authenticate("jwt", { session: false }),
  FindProfileByHabillement
);
router.get(
  "/profile/maison",
  passport.authenticate("jwt", { session: false }),
  FindProfileByMaison
);

router.post(
  "/profile/Profile-photo-upload",
  passport.authenticate("jwt", { session: false }),
  photoUpload.single("image"),
  profilePhotoUploadCtrl
);

/* get all profiles by category */
router.get(
  "/profiles/transport",
  passport.authenticate("jwt", { session: false }),
  FindProfileByTransport
);
router.get(
  "/profiles/mecanique",
  passport.authenticate("jwt", { session: false }),
  FindAllProfileByMecanique
);
router.get(
  "/profiles/lecons",
  passport.authenticate("jwt", { session: false }),
  FindAllProfileByLecons
);
router.get(
  "/profiles/bien-etre",
  passport.authenticate("jwt", { session: false }),
  FindAllProfileBienetre
);
router.get(
  "/profiles/habillement",
  passport.authenticate("jwt", { session: false }),
  FindAllProfileByHabillement
);
router.get(
  "/profiles/maison",
  passport.authenticate("jwt", { session: false }),
  FindAllProfileByMaison
);

/* posts routes. */
router
  .route("/posts")
  .post(
    passport.authenticate("jwt", { session: false }),
    photoUpload.single("image"),
    createPostCtrl
  )
  .get(getAllPostsCtrl);
  router.route(`/posts/count`).get(getPostCountCtrl);
  router
    .route(`/posts/:id`)
    .get(getSinglePostCtrl)
    .delete(passport.authenticate("jwt", { session: false }), deletePostCtrl)
    .put(passport.authenticate("jwt", { session: false }), updatePostCtrl)

// /api/posts/update-image/:id
router
  .route("/posts/update-image/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    photoUpload.single("image"),
    updatePostImageCtrl
);
  
// /api/posts/like/:id
router
  .route("/posts/like/:id")
  .put(passport.authenticate("jwt", { session: false }), toggleLikeCtrl);


  /* Comment routes. */
// /api/comments
router
  .route("/comment")
  .post(passport.authenticate("jwt", { session: false }), createCommentCtrl)
  .get(passport.authenticate("jwt", { session: false }), getAllCommentsCtrl);

// /api/comments/:id
router
  .route("/comment/:id")
  .delete(passport.authenticate("jwt", { session: false }), deleteCommentCtrl)
  .put(passport.authenticate("jwt", { session: false }), updateCommentCtrl);

  // /api/categories
router
  .route("/categories")
  .post(
    passport.authenticate("jwt", { session: false }),
    inRole(ROLES.ADMIN),
    createCategoryCtrl
  )
  .get(getAllCategoriesCtrl);

// /api/categories/:id
router
  .route("/categories/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    inRole(ROLES.ADMIN),
    deleteCategoryCtrl
);
  


// Créer une nouvelle sous-catégorie
router.post("/subcategories/", subcategorieController.createSubcategorie);

// Récupérer toutes les sous-catégories
router.get(
  "/subcategories/:categoryId",
  subcategorieController.getSubcategoriesByCategory
);
router.get("/subcategories/", subcategorieController.getSubcategories);
// Mettre à jour une sous-catégorie
router.put("/subcategories/:id", subcategorieController.updateSubcategorie);

// Supprimer une sous-catégorie
router.delete("/subcategories/:id", subcategorieController.deleteSubcategorie);





// /api/reservations
router
  .route("/reservations")
  .post(createReservationCtrl ).get(getAllReservationCtrl)
router.route(`/reservations/:professionalId`).get(getReservationByProfessional);
router.route(`/reservations/:reservationId`).put(updateReservationCtrl).delete(deleteReservationCtrl);
 


module.exports = router;
