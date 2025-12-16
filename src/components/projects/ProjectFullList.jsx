import { Pencil, Trash2, View } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProject, getAllProjects } from "../../store/slices/projectSlice";

const ProjectFullList = ({data, isLoading, error}) => {
    const dispatch = useDispatch()
    const [deleting, setDeleting] = useState(false);
    const projectList = data || [];

    useEffect(() => {
        getAllProjects();
    }, [dispatch])

    const handleDelete = async (id) => {
        setDeleting(true); // start delete
        await dispatch(deleteProject(id));
        await dispatch(getAllProjects());
        setDeleting(false); // finish delete
    };

    if(isLoading || deleting) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    if (!Array.isArray(projectList) || projectList.length === 0) return <p>No project found</p>;
    return (
        <div className="relative overflow-x-auto bg-white shadow-xs rounded-base border border-gray-200">
            <table className="text-sm text-body rounded-base w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-blue-50">
                        <th className="px-6 py-3 font-medium text-left">Banner</th>
                        <th className="px-6 py-3 font-medium text-left">Title</th>
                        <th className="px-6 py-3 font-medium text-left">Description</th>
                        <th className="px-6 py-3 font-medium text-left">Stack</th>
                        <th className="px-6 py-3 font-medium text-left">Project Link</th>
                        <th className="px-6 py-3 font-medium text-left w-[140px]">Deployed</th>
                        <th className="px-6 py-3 font-medium w-[200px] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(project => {
                        return(
                            <tr key={project._id} className="border-b border-gray-200">
                                <td className="px-6 py-4">
                                    <img src={project?.projectBanner?.url} alt={project?.title} className="max-w-20 max-h-20" />
                                </td>
                                <td className="px-6 py-4">{project?.title}</td>
                                <td className="px-6 py-4">{project.description}</td>
                                <td className="px-6 py-4">{project?.technology.join(', ')}</td>
                                <td className="px-6 py-4">{project.projectLink}</td>
                                <td className="px-6 py-4">{project.deployed ? 'True' : 'False'}</td>
                                <td className="px-6 py-4 flex gap-2 items-center justify-center">
                                    <Link className="text-blue-800">
                                        <View className="w-[18px] h-[18px]" />
                                    </Link>
                                    <Link className="text-blue-800">
                                        <Pencil className="w-[18px] h-[18px]" />
                                    </Link>
                                    <Link className="text-blue-800" onClick={() => handleDelete(project._id)}>
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

export default ProjectFullList;