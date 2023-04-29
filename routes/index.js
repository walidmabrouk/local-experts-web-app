var express = require("express");
const {
  Register,
  Login,
  Test,
  Admin,
} = require("../controllers/users.controllers");
var router = express.Router();
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");
const { AddProfile, FindAllProfiles, FindSingleProfile, DeleteProfile, FindProfileByTransport, FindProfileByMecanique, FindProfileByLecons, FindProfileByBienetre, FindProfileByHabillement, FindProfileByMaison, FindAllProfileByMecanique, FindAllProfileByLecons, FindAllProfileByHabillement, FindAllProfileByMaison, FindAllProfileBienetre } = require("../controllers/profile.controllers");
/* users routes. */
router.post("/register", Register);
router.post("/login", Login);

/* add profile route */
router.post("/profiles", 
passport.authenticate("jwt", { session: false }),
AddProfile);
/* get all profiles */
router.get("/profiles", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.ADMIN),
FindAllProfiles);
/* get one profiles */
router.get("/profile", 
passport.authenticate("jwt", { session: false }),
FindSingleProfile);
/* delete profiles */
router.delete("/profiles/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.ADMIN),
  DeleteProfile);

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




module.exports = router;
