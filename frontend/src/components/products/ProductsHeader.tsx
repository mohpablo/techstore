import { Archive, Package } from "lucide-react";
import Header from "../Header";

export default function ProductsHeader() {
  return (
    <Header
      title={"Manage Products"}
      subtitle={"Create, view and manage products"}
      primaryAction={{
        label: "add Product",
        onClick: () => {},
        icon:<Package size={18}/>
      }}
      secondaryAction={{
        label: "view archived Products",
        onClick: () => {},
        icon: <Archive size={18} />,
      }}
      filterOptions={[{label:'nujnuj',value:"jdjd"}]}
      filterPlaceholder="status"
      filterValue="gg"
      setFilterValue={()=>{}}
      searchPlaceholder="search for a product by name"
      searchTerm=""
      setSearchTerm={()=>{}}
    />
  );
}
