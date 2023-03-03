import { sql } from "../database/database.js";

const create = async (name, address) => {
  await sql`INSERT INTO addresses (name, address)
    VALUES (${ name }, ${ address })`;
};

const deleteById = async (id) => {
  try {
    await sql`DELETE FROM addresses WHERE id = ${ id }`;
  } catch (e) {
    console.log(e);
  }
};

const deleteFirst = async () => {
    const rows = await sql `SELECT COUNT(*) AS count FROM addresses`;
    const first = rows[0][0]
    try {
      await sql `DELETE FROM addresses WHERE id = ${ first.id }`;
    } catch (e) {
      console.log(e);
    }

}

const countAddresses = async() => {
  const rows = await sql`SELECT COUNT(*) AS count FROM addresses`;
  return rows[0].count;
};

const findAll = async () => {
  return await sql`SELECT * FROM addresses`;
};

const findByNameOrAddressLike = async (nameOrAddress) => {
  const likePart = `%${nameOrAddress}%`;

  return await sql`SELECT * FROM addresses
    WHERE name ILIKE ${ namePart } OR address ILIKE ${ namePart }`;
};

export { create, deleteById, findAll, findByNameOrAddressLike, countAddresses, deleteFirst };