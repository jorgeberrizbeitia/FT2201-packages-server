const router = require("express").Router();

const isAuthenticated = require("../middleware/isAuthenticated")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)

const productRoutes = require("./product.routes.js")
router.use("/products", productRoutes)

const chatRoutes = require("./chat.routes");
router.use("/chat", isAuthenticated, chatRoutes)

module.exports = router;
