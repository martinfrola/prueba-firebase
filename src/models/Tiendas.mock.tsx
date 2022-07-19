import { Tiendas } from "./Tiendas.class";
import { faker } from "@faker-js/faker";

export const addOneTienda = (): Tiendas => {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    responsable: faker.name.firstName(),
    cuit: faker.phone.imei(),
    descripcion: faker.company.bs(),
    imgUrl: faker.image.business(),
    phone: faker.phone.number(),
    sucursales: randomSucursales(),
  };
};

export const addManyTiendas = (size = 10): Tiendas[] => {
  const tiendas: Tiendas[] = [];
  for (let index = 0; index < size; index++) {
    tiendas.push(addOneTienda());
  }
  return tiendas;
};

const randomSucursales = (): string[] => {
  const length = faker.datatype.number({ min: 1, max: 3 });
  const result: string[] = [];
  for (let index = 0; index < length; index++) {
    const storeId = faker.datatype.number({ min: 1, max: 30 });
    result.push(`sucursales/${storeId}`);
  }
  return result;
};
