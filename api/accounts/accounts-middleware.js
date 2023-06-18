const db = require("../../data/db-config.js");

const accountsModel = require("./accounts-model.js");

exports.checkAccountPayload = (req, res, next) => {
  try {
    let { name, budget } = req.body;

    if (name === undefined || budget === undefined) {
      res.status(400).json({ message: "name and budget are required" });
    } else {
      let trimmedName = name.trim();

      if (trimmedName.length < 3 || trimmedName.length > 100) {
        res
          .status(400)
          .json({ message: "name of account must be between 3 and 100" });
      } else if (typeof budget !== "number") {
        res.status(400).json({ message: "budget of account must be a number" });
      } else if (budget < 0 || budget > 1000000) {
        res
          .status(400)
          .json({ message: "budget of account is too large or too small" });
      }

      req.body.name = trimmedName;
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    let isExist = false;
    const existingAccount = await db("accounts")
      .where("name", req.body.name)
      .first();

    isExist = existingAccount ? true : false;

    if (isExist) {
      return res.status(400).json({ message: "that name is taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA

  const { id } = req.params;

  try {
    const account = await accountsModel.getById(id);
    if (!account) {
      return res.status(404).json({ message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (error) {
    next(error);
  }
};
