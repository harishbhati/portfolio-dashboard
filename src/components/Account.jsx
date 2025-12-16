import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  { label: "Profile", path: "" },
  { label: "Update Profile", path: "updateProfile" },
  { label: "Update Password", path: "updatePassword" },
];

const Account = () => {
  return (
    <div className="md:flex">
      <ul className="flex-column space-y-4 text-sm font-medium text-body md:me-4 mb-4 md:mb-0">

        {/* Profile Tab */}
        {tabs.map((tab, index) => (
            <li key={index}>
          <NavLink
            to={tab.path}
            end={tab.path === ""}
            className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md w-full 
                border-l-4 transition-all whitespace-nowrap
                ${isActive 
                ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold" 
                : "border-transparent text-gray-700 hover:bg-gray-100"
                }`
            }
            >
            {tab.label}
            </NavLink>
        </li>
        ))}

      </ul>
      <div className="bg-neutral-secondary text-medium text-body rounded-base w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
