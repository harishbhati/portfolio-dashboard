import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../store/slices/projectSlice";
import ProjectFullList from './../components/projects/ProjectFullList';

const ManageProjects = () => {
    const { projects, loading, error } = useSelector((state) => state.project);
    const projectList = projects.project;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProjects());
    }, [dispatch])
    return (
       <section>
            <header className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-6 justify-between">
                <h2 className="font-semibold text-2xl">Manage Project</h2>
                <Link to='/' className="inline-block text-sm font-medium rounded-base py-2.5 px-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-md">
                    Return to Dashboard
                </Link>
            </header>
            <main className="p-8">
                <ProjectFullList data={projectList} error={error} loading={loading} />
            </main>
       </section>
    )
}

export default ManageProjects;