import { useParams } from "react-router-dom";

import AccountNav from "../../components/Account/AccountNav";

export default function FavoritePage() {
  const { id } = useParams();

  return (
    <div className="my-8 mt-64">
      <AccountNav />
    </div>
  );
}
