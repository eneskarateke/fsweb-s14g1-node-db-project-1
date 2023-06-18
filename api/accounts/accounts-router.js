const router = require("express").Router();

const accountsModel = require("./accounts-model.js");

const mw = require("./accounts-middleware.js");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA

  try {
    const accounts = await accountsModel.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkAccountId, (req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.account);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA

    try {
      const insertedAccount = await accountsModel.create({
        name: req.body.name,
        budget: req.body.budget,
      });
      res.status(201).json(insertedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountId,
  mw.checkAccountPayload,
  async (req, res, next) => {
    // KODLAR BURAYA
    const id = req.params.id;

    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };

    try {
      const updatedProject = await accountsModel.updateById(id, payload);
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA

  const id = req.params.id;
  try {
    await accountsModel.deleteById(id);
    res.json(req.account);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
});

module.exports = router;
