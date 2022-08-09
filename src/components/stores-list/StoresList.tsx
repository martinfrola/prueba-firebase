//TODO: Resivir lista de tiendas como props

import { Grid } from "@mui/material";
import { StoreClass } from "../../models/Store.class";
import StoreCard from "../store/Store";

interface Props {
  tiendas: StoreClass[];
}
export default function StoresList({ tiendas }: Props) {
  console.log("🚀 ~ file: storesList.tsx ~ line 11 ~ StoresList ~ tiendas", tiendas)
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {tiendas.map((t: StoreClass) => (
        <Grid item xs={2} sm={4} md={4} key={t.id}>
          <StoreCard key={t.id} store={t} />
        </Grid>
      ))}
    </Grid>
  );
}
