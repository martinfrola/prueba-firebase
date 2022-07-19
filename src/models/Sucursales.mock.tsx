import { Sucursales } from "./Sucursales.class";
import { faker } from "@faker-js/faker";

export const addOneSucursal = (): Sucursales => {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    direccion: faker.address.street(),
    coords: {
      lat: faker.address.latitude(),
      lng: faker.address.longitude(),
    },
  };
};

export const addManySucursales = (size = 10): Sucursales[] => {
  const sucursales: Sucursales[] = [];
  for (let index = 0; index < size; index++) {
    sucursales.push(addOneSucursal());
  }
  return sucursales;
};
