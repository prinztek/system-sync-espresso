import { Link } from "react-router-dom";
import RecentOrders from "../components/RecentOrders";
import TotalProducts from "../components/TotalProducts";

function AdminDashboard() {
  return (
    <div className="min-h-screen mt-[90px] py-16 px-4 bg-gray-50">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-neutral-900 mb-3">
          Admin Dashboard
        </h1>

        {/* Summary Section (Total + Quick Links) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Total Products Card */}
          <TotalProducts />

          {/* Quick Links Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              Quick Links
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/admin/products"
                className="flex-1 text-center py-4 px-6 bg-amber-600 text-white rounded hover:bg-orange-700 transition"
              >
                Manage Products
              </Link>
              <Link
                to="/admin/orders"
                className="flex-1 text-center py-4 px-6 bg-amber-600 text-white rounded hover:bg-orange-700 transition"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
