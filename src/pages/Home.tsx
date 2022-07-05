import React, { useEffect, useState } from "react";
import { app } from "../services/firebase";
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
import { Grid } from "@mui/material";

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
    verUsuario();
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
      <button onClick={signIn}>Traer info</button>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {products.map((p: ProductCardClass) => (
              <ProductCard key={p.id} product={p}></ProductCard>
            ))}
          </Grid>
        ))}
      </Grid>
      {user.photo && <img src={user.photo} alt="fotito del tincho " />}{" "}
      {/* <button onClick={verUsuario}>Ver usuario actual</button> */}
      {user.email && <button onClick={signOutUser}>LogOut</button>}
      <button onClick={obtenerProductos}>Get Productos</button>
    </div>
  );
}
