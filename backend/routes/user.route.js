import { Router } from "express";

const router = Router(); // router works like mini app to handle related routes, similar to app

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get user with ID: ${req.params.id}`);
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

// when :id is present in route, this middleware runs first
router.param("id", (req, res, next, id) => {
  console.log(`User ID param: ${id}`);
  req.user = users[id];
  next();
});

export default router;
