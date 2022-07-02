import React, { useEffect, useState } from "react";
import { app } from "../index";
import { Outlet } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
} from "firebase/firestore/lite";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import getProducts from "../services/apiService";
import ProductCard from "../components/product/ProductCard";
import { ProductCardClass } from "../components/product/ProductCard.class";

interface User {
  name: string;
  photo: string;
  email: string;
}
export default function Home() {
  const [user, setUser] = useState<User>({
    name: "",
    photo: "",
    email: "",
  });
  const [products, setProducts] = useState<ProductCardClass[]>([]);

  useEffect(() => {
    // obtenerProductos();
    getProductsFromDB();
  }, []);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getFirestore(app);
  const productRef = collection(db, "products");
  const productsRef = query(productRef);
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const userResult = result.user;
        console.log(credential, result, user);
        setUser({
          name: userResult.displayName ?? "",
          photo: userResult.photoURL ?? "",
          email: userResult.email ?? "",
        });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(error);

        // ...
      });
  };

  const verUsuario = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        // ...
      } else {
        console.log("No hay usuario");
      }
    });
  };

  const signOutUser = () => {
    signOut(auth)
      .then((user) =>
        setUser({
          name: "",
          photo: "",
          email: "",
        })
      )
      .catch((err) => console.log(err));
  };

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
    prods.map(async (product) => {
      await setDoc(doc(productRef, `${product.id}`), {
        id: product.id,
        title: product.title,
        price: product.price,
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
      <button onClick={signIn}>Traer info</button>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {products.map((p: ProductCardClass) => (
        <ProductCard key={p.id} product={p}></ProductCard>
      ))}
      {user.photo && <img src={user.photo} alt="fotito del tincho " />}{" "}
      <button onClick={verUsuario}>Ver usuario actual</button>
      {user.email && <button onClick={signOutUser}>LogOut</button>}
      <button onClick={obtenerProductos}>Get Productos</button>
    </div>
  );
}
