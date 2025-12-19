import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteApplication,
  getAllApplication,
} from "../../store/slices/applicationSlice";
import { useDispatch } from "react-redux";
import TableSkeleton from "../skeleton/TableSkeleton";

const SoftwareList = ({ data, isLoading, error }) => {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const softwareList = data || [];

  useEffect(() => {
    getAllApplication();
  }, [dispatch]);

  const handleDelete = async (id) => {
    setDeleting(true); // start delete
    await dispatch(deleteApplication(id));
    await dispatch(getAllApplication());
    setDeleting(false); // finish delete
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="relative overflow-x-auto bg-white shadow-xs rounded-base border border-gray-200">
      {isLoading || deleting ? (
        <TableSkeleton rows={5} columns={3} />
      ) : (
        <table className="text-sm text-body rounded-base w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-blue-50">
              <th className="px-6 py-3 font-medium text-left">Name</th>
              <th className="px-6 py-3 font-medium text-left">Icon</th>
              <th className="px-6 py-3 font-medium w-[200px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {softwareList.length > 0 ? (
              softwareList.map((applicationItem) => (
                <tr
                  key={applicationItem._id}
                  className="border-b border-gray-200"
                >
                  <td className="px-6 py-4">{applicationItem?.name}</td>
                  <td className="px-6 py-4">
                    <img
                      src={applicationItem?.applicationIcon?.url}
                      alt={applicationItem?.name}
                      className="w-12 h-12"
                    />
                  </td>
                  <td className="px-6 py-4 flex gap-2 items-center justify-center">
                    <Link
                      className="text-blue-800"
                      onClick={() => handleDelete(applicationItem._id)}
                    >
                      <Trash2 className="w-[18px] h-[18px]" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No application found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SoftwareList;
