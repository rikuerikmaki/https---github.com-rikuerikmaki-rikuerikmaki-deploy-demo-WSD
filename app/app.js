import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as addressService from "./services/addressService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const deleteAddress = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];
  await addressService.deleteById(id);

  return redirectTo("/");
};

const addAddress = async (request) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const address = formData.get("address");

  await addressService.create(name, address);

  return redirectTo("/");
};

const listAddresses = async (request) => {
  const data = {
    addresses: await addressService.findAll(),
    counts: await addressService.countAddresses(),
  };

  return new Response(await renderFile("index.eta", data), responseDetails);
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === "POST" && url.pathname.startsWith("/delete/")) {
    return await deleteAddress(request);
  } else if (request.method === "POST") {
    if (addressService.countAddresses > 5) {
      await addressService.deleteFirst();
    }
    return await addAddress(request);
  } else {
    return await listAddresses(request);
  }
};

serve(handleRequest, { port: 7777 });