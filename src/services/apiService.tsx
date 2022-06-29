import React, { useState } from "react";

export default function getProducts() {
  const url = `https://fakestoreapi.com/products`;
  return fetch(url).then((res) => res.json());
}
