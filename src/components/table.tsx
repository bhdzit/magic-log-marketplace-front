import { useState, type JSX } from "react";

export function MagiclogTableTable<T>({
  children,
  data,
  headers,
  titel,
  onRowClick = () => {},
  onAddClick = () => {},
}: {
  children?: JSX.Element;
  data: T[];
  headers: { [key: string]: string }[];
  titel: string;
  onRowClick?: (item: T) => void;
  onAddClick?: () => void;
}) {
  const [page, setPage] = useState(1);

  function getRowValue(item: unknown, key: string) {
    return (
      key.split(".").reduce((obj, prop) => {
        if (obj != null && typeof obj === "object" && prop in obj) {
          const objKey = prop as keyof typeof obj;
          return obj[objKey];
        }
        return "";
      }, item) ?? ""
    );
  }

  return (
    <div>
      <div className="md:px-40 md:flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#121416] tracking-light text-[32px] font-bold leading-tight min-w-72">
              {titel}
            </p>
            <button
              className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 w-1/4 bg-[#1978e5] text-white text-base font-bold "
              onClick={() => onAddClick()}
            >
              Agregar
            </button>
          </div>
          {children}
          <div className="px-4 py-3 @container">
            <div className="flex overflow-hidden rounded-xl border border-[#dde0e3] bg-white">
              <table className="flex-1">
                <thead>
                  <tr className="bg-white">
                    {headers.map((item, index) => (
                      <th
                        key={index}
                        className="table-be8a7b09-6805-4084-9c07-f1a19d0c98b6-column-120 px-4 py-3 text-left text-[#121416] w-[400px] text-sm font-medium leading-normal"
                      >
                        {item.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(page * 10 - 10, page * 10).map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-t-[#dde0e3] hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        onRowClick(item);
                      }}
                    >
                      {headers.map(({ key }, index) => (
                        <td
                          key={key + index}
                          className="table-be8a7b09-6805-4084-9c07-f1a19d0c98b6-column-120 h-[72px] px-4 py-2 w-[400px] text-[#121416] text-sm font-normal leading-normal"
                        >
                          {getRowValue(item, key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-t-[#dde0e3]">
                    <td colSpan={headers.length - 2}>
                      <p className="hidden sm:block text-sm text-gray-700 ml-5 my-2">
                        Mostrando
                        <span className="font-medium mx-2">
                          {page * 10 - 9}
                        </span>
                        al
                        <span className="font-medium mx-2">{page * 10}</span>
                        de
                        <span className="font-medium mx-2">{data.length}</span>
                        registros
                      </p>
                    </td>
                    <td colSpan={2} className="">
                      <div className="flex justify-center">
                        <button
                          disabled={page === 1}
                          onClick={() => {
                            setPage(page - 1);
                          }}
                          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Anterior
                        </button>
                        <button
                          disabled={page * 10 > data.length}
                          onClick={() => {
                            setPage(page + 1);
                          }}
                          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Siguiente
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
