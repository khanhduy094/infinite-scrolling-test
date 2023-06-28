import { Product as ProductType } from "../../types/product.type";

interface Props {
  data: ProductType;
}

export default function Product({ data }: Props) {
  return (
    <div className="max-w-sm max-h-[450px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="h-[260px]">
        <img
          className="rounded-t-lg"
          src={data.images.length ? data.images[0] : ""}
          alt=""
        />
      </div>
      <div className="p-3 ">
        <h5 className="mb-2 text-base font-bold  text-gray-900">
          {data.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.price}$
        </p>
      </div>
    </div>
  );
}
