import { Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { deleteTimeline, getAllTimeline } from "../../store/slices/timelineSlice";
import { useDispatch } from "react-redux";

const TimelineList = ({data, isLoading, error}) => {
    const dispatch = useDispatch()
    const [deleting, setDeleting] = useState(false);
    const timelineList = data.timeline || [];

    useEffect(() => {
        getAllTimeline();
    }, [dispatch])

     const handleDelete = async (id) => {
        setDeleting(true); // start delete
        await dispatch(deleteTimeline(id));
        await dispatch(getAllTimeline());
        setDeleting(false); // finish delete
    };

    if(isLoading || deleting) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    if (!Array.isArray(timelineList) || timelineList.length === 0) return <p>No timeline found</p>;
    return (
        <div className="relative overflow-x-auto bg-white shadow-xs rounded-base border border-gray-200">
            <table className="text-sm text-body rounded-base w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-blue-50">
                        <th className="px-6 py-3 font-medium text-left">Title</th>
                        <th className="px-6 py-3 font-medium text-left">Description</th>
                        <th className="px-6 py-3 font-medium text-left">From</th>
                        <th className="px-6 py-3 font-medium text-left">To</th>
                        <th className="px-6 py-3 font-medium w-[200px] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {timelineList.map(timelineItem => {
                        return (
                            <tr key={timelineItem._id} className="border-b border-gray-200">
                                <td className="px-6 py-4">{timelineItem.title}</td>
                                <td className="px-6 py-4">{timelineItem.description}</td>
                                <td className="px-6 py-4">{timelineItem.timeline.from}</td>
                                <td className="px-6 py-4">{timelineItem.timeline.to ? timelineItem.timeline.to : 'Present'}</td>
                                <td className="px-6 py-4 flex gap-2 items-center justify-center">
                                    <Link className="text-blue-800">
                                        <Pencil className="w-[18px] h-[18px]" />
                                    </Link>
                                    <Link className="text-blue-800" onClick={() => handleDelete(timelineItem._id)}>
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

export default TimelineList;