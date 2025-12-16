import { Button } from "flowbite-react"
import Loader from "../Loader"
import { Link } from "react-router-dom"

const TimelineList = ({data, isLoading}) => {
    const timelineList = data.timeline;
    if(!data) return <p>There are no list in this table.</p>
    if(isLoading) return <p>Loading...</p>

    return (
        <div className="relative overflow-x-auto bg-white shadow-xs rounded-base border border-gray-200">
            <table className="text-sm text-body rounded-base w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-blue-50">
                        <th className="px-6 py-3 font-medium text-left">Title</th>
                        <th className="px-6 py-3 font-medium text-left">From</th>
                        <th className="px-6 py-3 font-medium text-left">To</th>
                        <th className="px-6 py-3 font-medium w-[140px] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {timelineList.map(timelineItem => {
                        return(
                            <tr key={timelineItem._id} className="border-b border-gray-200">
                                <td className="px-6 py-4">{timelineItem.title}</td>
                                <td className="px-6 py-4">{timelineItem?.timeline?.from}</td>
                                <td className="px-6 py-4">{timelineItem?.timeline?.to ? timelineItem.timeline.to : 'Present'}</td>
                                <td className="px-6 py-4 w-[140px]">
                                    {
                                        isLoading ? 
                                        (
                                        <Loader content={'Redirecting...'} />
                                        ):
                                        (
                                        <Link to='manage/timeline' className="inline-block text-sm font-medium rounded-base py-2.5 px-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-md">
                                            Manage
                                        </Link>
                                        )
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TimelineList;