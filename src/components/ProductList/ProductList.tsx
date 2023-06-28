import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { LIMIT } from "../../constants/contant";
import { Product as ProductType } from "../../types/product.type";
import { fetchRepositories } from "../../utils/utils";
import InputSearch from "../InputSearch";
import Product from "../Product";
import { AxiosResponse } from "axios";
import { SuccessResponse } from "../../types/utils.type";
import useDebounce from "../../hooks/useDebounce";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const debounceSearchValue = useDebounce(search, 500);
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["repositories", debounceSearchValue],
    ({ pageParam = 0 }) => {
      return fetchRepositories(pageParam, LIMIT, debounceSearchValue);
    },
    {
      getNextPageParam: (
        lastPage: AxiosResponse<SuccessResponse<ProductType[]>, any>,
        allPages: AxiosResponse<SuccessResponse<ProductType[]>, any>[]
      ) => {
        // check api has next page
        console.log("lasst", lastPage);
        console.log("all", allPages);
        const maxPages = Math.ceil(lastPage.data.total / LIMIT);
        const nextPage = allPages.length + 1;
        let skip = lastPage.data.skip;
        if (nextPage <= maxPages) {
          console.log(nextPage <= maxPages);
          skip += LIMIT;
          return skip;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="px-6 mx-auto">
      <InputSearch onSearch={handleSearch} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.pages.map((page) =>
          page.data.products.map((data: ProductType) => (
            <div className="grid-col-1" key={data.id}>
              <Product data={data} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
