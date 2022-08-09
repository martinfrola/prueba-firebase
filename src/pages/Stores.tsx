import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import StoresList from "../components/stores-list/StoresList";
import { app, firestore } from "../services/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
} from "firebase/firestore/lite";
import { StoreClass } from "../models/Store.class";

export default function Stores() {
  let { idTienda } = useParams();
  const [stores, setStores] = useState<StoreClass[]>([]);
  console.log(idTienda);
  const storesRef = query(collection(firestore, "tiendas"));

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    const docSnap = await getDocs(storesRef);
    const listStores: StoreClass[] = [];
    docSnap.forEach((doc) => {
      const store: StoreClass = doc.data() as StoreClass;
      listStores.push(store);
    });
    setStores(listStores);
  };

  return (
    <div>
      {idTienda === undefined ? (
        <StoresList tiendas={stores} />
      ) : (
        //TODO: listar tiendas
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
