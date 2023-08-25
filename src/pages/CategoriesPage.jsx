import { useParams } from "react-router-dom";

export const CategoriesPage = () => {
  const { category } = useParams();
  return (
    <>
      <h1>Categorias</h1>

      {category}
    </>
  );
};
