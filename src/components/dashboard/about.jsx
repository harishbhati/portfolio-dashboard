import { useState } from "react";

const About = ({user, isLoading}) => {
    const [expanded, setExpanded] = useState(false);

    if(isLoading) return <p>Loading...</p>
    if (!user) return <p>The user didn't have any details.</p>;
    const {aboutMe, portfolio} = user; 

    return (
        <div className="bg-white block p-6 rounded-base shadow-xs w-full">
            <p  className={`text-body mb-2 ${expanded ? "" : "line-clamp-4"}`}>{aboutMe || "No bio available"}</p>
            {aboutMe && aboutMe.length > 150 && (
                <div className="block text-right">
                    <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-blue-600 text-sm font-medium mb-4 hover:underline cursor-pointer inline-block"
                    >
                    {expanded ? "Read less" : "Read more"}
                    </button>
                </div>
            )}

            {portfolio && (
                <div className="block">
                    <a
                    href={portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium rounded-base py-2.5 px-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                    View Portfolio
                    </a>
                </div>
            )}
        </div>
    )
}

export default About;