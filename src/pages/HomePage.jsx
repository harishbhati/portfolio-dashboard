import React, { useEffect } from "react";
import { 
  LogOut,
  FolderGit,
  Package,
  PencilRuler,
  LayoutGrid,
  User,
  History,
  MessageSquareMore
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logoutUser } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { clearMessage } from "../store/slices/userSlice";

const navItems = [
  { name: "Dashboard", icon: <Package size={20} />, path: "/" },
  { name: "Add Project", icon: <FolderGit size={20} />, path: "/project" },
  { name: "Add Skill", icon: <PencilRuler size={20} />, path: "/skill" },
  { name: "Add Application", icon: <LayoutGrid size={20} />, path: "/application" },
  { name: "Account", icon: <User size={20} />, path: "/account" },
  { name: "Add Timeline", icon: <History size={20} />, path: "/timeline" },
  { name: "Messages", icon: <MessageSquareMore size={20} />, path: "/messages" },
];

const HomePage = () => {
  const { error, message, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  // Logout Handler
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (error) {
        toast.error(error);
        dispatch(clearAllUserErrors());
    }

    if (message === "Logout Successfully") {
        toast.success(message);
        dispatch(clearMessage());
        navigateTo("/login");
    }

}, [dispatch, error, message, navigateTo, user]);
  return (
    <div className="flex h-dvh bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white  border-r border-gray-100 p-5 flex flex-col justify-between">

        {/* Top Section */}
        <div>
          <h1 className="text-2xl font-bold mb-8">My Portfolio</h1>

          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg cursor-pointer
                    ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-100 cursor-pointer"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {user && (
            <header className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-6 justify-end">
                <h2 className="text-1xl font-semibold text-heading">{`Welcome, ${user.fullname ? user.fullname : ''}`}</h2>
                <img
                src={user?.avtar?.url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                alt={user.fullname}
                className="w-12 h-12 rounded-full object-cover"
                />
            </header>
        )}
        <div className="p-10 flex-1 overflow-auto">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
