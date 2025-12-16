import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { Button } from "flowbite-react";
import { addApplication, clearAllApplicationErrors, getAllApplication, resetApplicationSlice } from "../store/slices/applicationSlice";
import { toast } from "react-toastify";

const AddApplication = () => {
    const [name, setName] = useState("");
    const [applicationIcon, setApplicationIcon] = useState(null);

    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const {loading, error, message} = useSelector((state) => state.application)

    const resetForm = () => {
        setName("");
        setApplicationIcon("");
        if (fileRef.current) fileRef.current.value = "";

    }
    const handleApplication = (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('applicationIcon',applicationIcon);
        dispatch(addApplication(formdata));
    }

    useEffect(() => {
        dispatch(getAllApplication());
    }, [dispatch])

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearAllApplicationErrors())
        }
        if(message){
            toast.success(message);
            // Clear form fields after successful add
           setTimeout(resetForm, 0);
           dispatch(resetApplicationSlice());
           dispatch(getAllApplication());

        }
    }, [error, message, dispatch])
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Timeline</h2>

            <form className="w-full" onSubmit={handleApplication}>
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Application Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="applicationIcon"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Application Icon
                    </label>
                    <input
                        type="file"
                        id="applicationIcon"
                        ref={fileRef}
                        onChange={(e) => setApplicationIcon(e.target.files[0])}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                
                {loading ? (
                <Loader content={"Adding Project..."} />
                ) : (
                <Button
                    type="submit"
                    className="w-full text-sm font-medium rounded-base py-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                    Add Project
                </Button>
                )}
            </form>
        </div>
    )
}

export default AddApplication;