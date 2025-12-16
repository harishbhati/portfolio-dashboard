import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTimeline, getAllTimeline, clearAllErrors, resetTimelineSlice } from "../store/slices/timelineSlice";
import { Button } from "flowbite-react";
import Loader from "./Loader";
import { toast } from "react-toastify";
const AddTimeline = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fromYear, setFromYear] = useState("");
    const [toYear, setToYear] = useState("");

    const { loading, error, message} = useSelector((state) => state.timeline);
    const dispatch = useDispatch();

    const handleTimeline = (e) => {
        e.preventDefault();

        const timelineData = {
            title,
            description,
            from: fromYear,
            to: toYear
        };
        dispatch(addTimeline(timelineData))
    }
    // reset the form
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setFromYear("");
        setToYear("");
    };

    useEffect(() => {
        dispatch(getAllTimeline());
    }, [dispatch])

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearAllErrors());
        }
        if(message) {
            toast.success(message)
            // Clear form fields after successful add
           setTimeout(resetForm, 0);

            // Refresh timeline list
            dispatch(resetTimelineSlice())
            dispatch(getAllTimeline())
        }
    }, [error, message, dispatch])
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Timeline</h2>

            <form className="w-full" onSubmit={handleTimeline}>
                <div className="mb-5">
                    <label
                        htmlFor="title"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="description"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Timeline Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="mb-5">
                        <label
                            htmlFor="description"
                            className="block mb-2.5 text-sm font-medium text-heading"
                        >
                            From Year
                        </label>
                        <input
                            type="number"
                            id="description"
                            required
                            value={fromYear}
                            onChange={(e) => setFromYear(e.target.value)}
                            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="toYear"
                            className="block mb-2.5 text-sm font-medium text-heading"
                        >
                            To Year
                        </label>
                        <input
                            type="number"
                            id="toYear"
                            value={toYear}
                            onChange={(e) => setToYear(e.target.value)}
                            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                        />
                    </div>
                </div>
                
                {loading ? (
                <Loader content={"Adding Timeline..."} />
                ) : (
                <Button
                    type="submit"
                    className="w-full text-sm font-medium rounded-base py-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                    Add Timeline
                </Button>
                )}
            </form>
        </div>
    )
}

export default AddTimeline;