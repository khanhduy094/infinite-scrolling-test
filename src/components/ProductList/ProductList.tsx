import InputSearch from "../InputSearch";
import Product from "../Product";

export default function ProductList() {
  return (
    <div className="px-5 mx-auto">
      <InputSearch />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="grid-cols-1">
          <Product />
        </div>
        <div className="grid-cols-1">
          <Product />
        </div>
        <div className="grid-cols-1">
          <Product />
        </div>
        <div className="grid-cols-1">
          <Product />
        </div>
      </div>
    </div>
  );
}
