import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import TableSkeleton from "../skeleton/TableSkeleton";

const ProjectList = ({projects, isLoading}) => {
    if(!projects) return <p>List is empty</p>
    return (
         <div className="relative overflow-x-auto bg-white shadow-xs rounded-base border border-gray-200">
            {isLoading ? (<TableSkeleton rows={4} columns={5} />) : (
                <table className="text-sm text-body rounded-base w-full">
                    <thead>
                        <tr className="border-b border-gray-200 bg-blue-50">
                            <th className="px-6 py-3 font-medium text-left">Title</th>
                            <th className="px-6 py-3 font-medium text-left">Description</th>
                            <th className="px-6 py-3 font-medium text-left">Stack</th>
                            <th className="px-6 py-3 font-medium text-left w-[140px]">Deployed</th>
                            <th className="px-6 py-3 font-medium w-[200px] text-center">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {projects?.project?.length > 0 ? (
                            projects.project.map((listItem) => {
                                return(
                                <tr key={listItem._id} className="border-b border-gray-200">
                                    <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">{listItem.title}</td>
                                    <td className="px-6 py-4">{listItem.description}</td>
                                    <td className="px-6 py-4">
                                        {listItem.technology.join(", ")}
                                    </td>
                                    <td className="px-6 py-4 w-[140px]">{listItem.deployed ? 'True' : 'False'}</td>
                                    <td className="px-6 py-4 w-[200px] flex gap-2 items-center justify-center">
                                        {isLoading ? (
                                            <Loader content={'Redirecting...'} />
                                        ):
                                        (
                                        <Link to='manage/projects' className="inline-block text-sm font-medium rounded-base py-2.5 px-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-md">
                                            Manage
                                        </Link>
                                        )
                                    }
                                    </td>
                                </tr>
                            )})
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No messages found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            )}
        </div>
    )
}

export default ProjectList;