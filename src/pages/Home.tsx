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
import { addManySucursales, addOneSucursal } from "../models/Sucursales.mock";
import { addManyTiendas } from "../models/Tiendas.mock";

export default function Home() {
  const [products, setProducts] = useState<ProductCardClass[]>([]);
  useEffect(() => {
    // obtenerProductos();
    // getProductsFromDB();
    // insertTiendas();
  }, []);

  const db = getFirestore(app);
  const productRef = collection(db, "products");
  const sucursalesRef = collection(db, "sucursales");
  const tiendasRef = collection(db, "tiendas");
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

  const insertSucursales = () => {
    const sucursales = addManySucursales(30);
    sucursales.forEach((suc) => {
      setDoc(doc(sucursalesRef, suc.id.toString()), {
        id: suc.id,
        direccion: suc.direccion,
        name: suc.name,
        coords: suc.coords,
      });
    });
  };

  const insertTiendas = () => {
    const tiendas = addManyTiendas();
    tiendas.forEach((tienda) => {
      setDoc(doc(tiendasRef, tienda.id.toString()), {
        id: tienda.id,
        name: tienda.name,
        responsable: tienda.responsable,
        cuit: tienda.cuit,
        descripcion: tienda.descripcion,
        imgUrl: tienda.imgUrl,
        phone: tienda.phone,
        sucursales: tienda.sucursales,
      });
    });
  };

  const getSucursales = () => {
    getDocs(sucursalesRef).then((docSnap) => {
      docSnap.forEach((doc) => {
        doc.data();
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
      <Header products={products}></Header>
      <ProductList products={products}></ProductList>
      <button onClick={obtenerProductos}>Get Productos</button>
    </div>
  );
}
