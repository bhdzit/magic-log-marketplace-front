import { Search } from "lucide-react";
import { useState } from "react";

export function ProductSearchInput({
  options,
  onSearchClick = () => {},
}: {
  options: { label: string; key: string }[];
  onSearchClick?: (data: Record<string, string>) => void;
}) {
  const [selectedKey, setSelectedKey] = useState<string>(options[0].key);
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className="px-4 py-3">
      <label className="flex flex-col min-w-40 h-12 w-full">
        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#f0f2f4]">
          <select
            value={selectedKey}
            className="w-3/12 bg-gray-50 rounded-l-lg  border border-gray-300"
            onChange={(evt) => {
              console.log(evt);
              setSelectedKey(evt.target.value);
            }}
          >
            {options.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
          <input
            value={searchText}
            onChange={(evt) => {
              setSearchText(evt.target.value);
            }}
            placeholder={"Buscar Productos"}
            className="w-8/12 bg-[#f0f2f4] bg-gray-50  border border-gray-300"
          />
          <button
            className=" sm:pl-5 w-1/12 rounded-e-lg border border-gray-300"
            onClick={() => {
              onSearchClick({ [selectedKey]: searchText });
            }}
          >
            <Search></Search>
          </button>
        </div>
      </label>
    </div>
  );
}
