import { useState, useEffect } from "react";
import { Stack, Paper, InputBase, IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../hooks/useDebounce";
import { ProductCardClass } from "../../models/ProductCard.class";

interface Props {
  products: ProductCardClass[];
}
export default function Header({ products }: Props) {
  const [search, setSearch] = useState<string | null>(null);
  const debounceSearch = useDebounce(search, 300);

  useEffect(() => {
    searchProducts();
  }, [debounceSearch]);

  const searchProducts = async () => {
    if (search) {
      let p = products.filter((x) => x.title.toLowerCase().includes(search.toLowerCase()));
      console.log("🚀 ~ file: header.tsx ~ line 21 ~ searchProducts ~ p", p)
    }
  };

  return (
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
          onChange={(e) => setSearch(e.target.value)}
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
  );
}
