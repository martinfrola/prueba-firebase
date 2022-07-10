import React, { useEffect, useState } from "react";
import { app } from "../services/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
} from "firebase/firestore/lite";

import getProducts from "../services/apiService";
import { ProductCardClass } from "../models/ProductCard.class";
import ProductList from "../components/product-list/ProductList";
import Header from "../components/header/header";

export default function Home() {
  const [products, setProducts] = useState<ProductCardClass[]>([]);
  useEffect(() => {
    // obtenerProductos();
    getProductsFromDB();
  }, []);

  const db = getFirestore(app);
  const productRef = collection(db, "products");
  const productsRef = query(productRef);
  const obtenerProductos = () => {
    getProducts().then((p) => {
      const prods: ProductCardClass[] = p.map(
        (x: any) => new ProductCardClass(x)
      );
      setProducts(prods);
      insertProducts(products);
    });
  };

  const insertProducts = (prods: ProductCardClass[]) => {
    prods.map((product: ProductCardClass) => {
      setDoc(doc(productRef, `${product.id}`), {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        stock: product.stock,
      }).catch((error) => {
        console.error(error);
      });
    });
  };

  const getProductsFromDB = async () => {
    const docSnap = await getDocs(productsRef);
    const listProducts: ProductCardClass[] = [];
    docSnap.forEach((doc) => {
      const p = new ProductCardClass(doc.data());
      listProducts.push(p);
    });
    setProducts(listProducts);
  };

  return (
    <div className="App">
      <Header></Header>
      <ProductList products={products}></ProductList>
      <button onClick={obtenerProductos}>Get Productos</button>
    </div>
  );
}
