import { Link } from "react-router-dom";
import SoftwareList from "../components/software/SoftwareList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllApplication } from "../store/slices/applicationSlice";

const ManageSoftware = () => {
    const dispatch = useDispatch();
    const {applications, loading, error} = useSelector((state) => state.application);
    const applicationList = applications.softwareApplication;

    useEffect(() => {
        dispatch(getAllApplication());
    }, [dispatch])
    return (
       <section>
            <header className="mb-8 px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-6 justify-between">
                <h2 className="font-semibold text-2xl">Manage software</h2>
                <Link to='/' className="inline-block text-sm font-medium rounded-base py-2.5 px-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-md">
                    Return to Dashboard
                </Link>
            </header>
            <main className="p-8">
                <SoftwareList data={applicationList} isLoading={loading} error={error} />
            </main>
       </section>
    )
}

export default ManageSoftware;