import postgres from "https://deno.land/x/postgresjs@v3.3.3/mod.js";

const sql = postgres({});

const create = async (name, address) => {
  await sql`INSERT INTO addresses (name, address)
    VALUES (${ name }, ${ address })`;
};

const findAll = async () => {
  return await sql`SELECT * FROM addresses`;
}; 

const findByNameOrAddressLike = async (nameOrAddress) => {
  const namePart = `%${nameOrAddress}%`;

  return await sql`SELECT * FROM addresses
    WHERE name ILIKE ${ namePart } OR address ILIKE ${ namePart }`;
};


const findByName = async (name) => {
    const rows = await sql`SELECT * FROM addresses WHERE name = ${ name }`;
    return rows
};

const findByAddress = async (address) => {
    const rows = await sql`SELECT * FROM addresses WHERE name = ${ address }`;
    return rows
};

const findByNameAndAddress = async (name, address) => {
  return await sql`SELECT * FROM addresses
    WHERE name ILIKE ${ name }
      AND address ILIKE ${ address }`;
};

const deleteById = async (id) => {
  await sql`DELETE FROM addresses WHERE id = ${ id }`;
};

export {
  create,
  findAll,
  findByAddress,
  findByName,
  findByNameAndAddress,
  findByNameOrAddressLike,
  deleteById,
};
