import { Router } from "express";

const router = Router(); // router works like mini app to handle related routes, similar to app

router
  .route("/:id")
  .get((req, res) => {
    res.send(`Get user with ID: ${req.params.id}`);
    log(req.user);
  })
  .put((req, res) => {
    res.send(`Update user with ID: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with ID: ${req.params.id}`);
  });

// Middleware to log user ID param, when :id is present, run this first
// mock data
const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];
router.param("id", (req, res, next, id) => {
  console.log(`User ID param: ${id}`);
  req.user = users[id];
  next();
});

export default router;
