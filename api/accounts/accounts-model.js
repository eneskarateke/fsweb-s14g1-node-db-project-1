const db = require("../../data/db-config.js");

const getAll = async () => {
  return db("accounts");
};
const getById = (id) => {
  // KODLAR BURAYA

  return db("accounts").where("id", id).first();
};

const create = async (account) => {
  // KODLAR BURAYA
  const inserted = await db("accounts").insert(account);
  return getById(inserted[0]);
};

const updateById = async (id, account) => {
  // KODLAR BURAYA
  await db("accounts").where("id", id).update(account);
  return getById(id);
};

const deleteById = (id) => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
