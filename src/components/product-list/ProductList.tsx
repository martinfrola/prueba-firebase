import { Grid } from "@mui/material";
import ProductCard from "../product/ProductCard";
import { ProductCardClass } from "../../models/ProductCard.class";

interface Props {
  products: ProductCardClass[];
}
export default function ProductList({ products }: Props) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {products.map((p: ProductCardClass) => (
        <Grid item xs={2} sm={4} md={4} key={p.id}>
          <ProductCard key={p.id} product={p}></ProductCard>
        </Grid>
      ))}
    </Grid>
  );
}
