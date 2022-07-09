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
import { ProductCardClass } from "../models/ProductCard.class";
import {
  Avatar,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from "@mui/material";
import ProductList from "../components/product-list/ProductList";
import SearchIcon from "@mui/icons-material/Search";

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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <img
          src="https://www.logolynx.com/images/logolynx/f0/f009386dc544d1455db05db19d454629.png"
          width={100}
          height={60}
          alt="Logo"
        ></img>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscá un producto o tienda..."
            inputProps={{ "aria-label": "Buscá un producto o tienda..." }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        <Avatar
          alt="Usuario"
          src="https://v4.mui.com/static/images/avatar/1.jpg"
        />
      </Stack>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <ProductList products={products}></ProductList>
      {user.photo && <img src={user.photo} alt="fotito del tincho " />}{" "}
      {/* <button onClick={verUsuario}>Ver usuario actual</button> */}
      {user.email && <button onClick={signOutUser}>LogOut</button>}
      <button onClick={obtenerProductos}>Get Productos</button>      
      <button onClick={signIn}>Traer info</button>
    </div>
  );
}
