import { Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { deleteApplication, getAllApplication } from "../../store/slices/applicationSlice";
import { useDispatch } from "react-redux";

const SoftwareList = ({data, isLoading, error}) => {
    const dispatch = useDispatch()
    const [deleting, setDeleting] = useState(false);
    const softwareList = data || [];

    useEffect(() => {
        getAllApplication();
    }, [dispatch])

    const handleDelete = async (id) => {
        setDeleting(true); // start delete
        await dispatch(deleteApplication(id));
        await dispatch(getAllApplication());
        setDeleting(false); // finish delete
    };

    if(isLoading || deleting) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    if (!Array.isArray(softwareList) || softwareList.length === 0) return <p>No application found</p>;
  
    return (
        <div className="relative overflow-x-auto bg-white shadow-xs rounded-base border border-gray-200">
            <table className="text-sm text-body rounded-base w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-blue-50">
                        <th className="px-6 py-3 font-medium text-left">Name</th>
                        <th className="px-6 py-3 font-medium text-left">Icon</th>
                        <th className="px-6 py-3 font-medium w-[200px] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {softwareList.map(applicationItem => {
                        return(
                            <tr key={applicationItem._id} className="border-b border-gray-200">
                                <td className="px-6 py-4">{applicationItem?.name}</td>
                                <td className="px-6 py-4">
                                    <img src={applicationItem?.applicationIcon?.url} alt={applicationItem?.name} className="w-12 h-12" />
                                </td>
                                <td className="px-6 py-4 flex gap-2 items-center justify-center">
                                    <Link className="text-blue-800">
                                        <Pencil className="w-[18px] h-[18px]" />
                                    </Link>
                                    <Link className="text-blue-800" onClick={() => handleDelete(applicationItem._id)}>
                                        <Trash2 className="w-[18px] h-[18px]" />
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SoftwareList;