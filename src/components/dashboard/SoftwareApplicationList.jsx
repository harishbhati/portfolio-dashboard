import Loader from "../Loader"
import { Link } from "react-router-dom"
import TableSkeleton from "../skeleton/TableSkeleton";

const SoftwareApplicationList = ({isLoading, data}) => {
    const applicationList = data.softwareApplication;
    if(!data) return <p>List is empty</p>

    // Sort the list in alphabatically
    const sortApplication = [...applicationList].sort((a,b) => a.name.localeCompare(b.name));
    // Get first 5
    const topApplications = sortApplication.slice(0, 4);

    return(
        <div className="relative overflow-x-auto bg-white shadow-xs rounded-base border border-gray-200">
            {isLoading ? (<TableSkeleton rows={4} columns={3} />) : (
            <table className="text-sm text-body rounded-base w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-blue-50">
                        <th className="px-6 py-3 font-medium text-left">Name</th>
                        <th className="px-6 py-3 font-medium text-left">Icon</th>
                        <th className="px-6 py-3 font-medium w-[140px] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {topApplications?.map(application => {
                        return(
                            <tr key={application._id} className="border-b border-gray-200">
                                <td className="px-6 py-4">{application?.name}</td>
                                <td className="px-6 py-4">
                                    <img src={application?.applicationIcon?.url} width={30} />
                                </td>
                                <td className="px-6 py-4 w-[140px]">
                                    {isLoading ? (
                                        <Loader content={'Redirecting...'} />
                                        ):
                                        (
                                        <Link to='manage/software' className="inline-block text-sm font-medium rounded-base py-2.5 px-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-md">
                                            Manage
                                        </Link>
                                        )
                                    }
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>

            )}
        </div>
    )
}

export default SoftwareApplicationList;