export interface Sucursales {
  id: number | string;
  name: string;
  direccion: string;
  coords: {
    lat: string;
    lng: string;
  };
}
