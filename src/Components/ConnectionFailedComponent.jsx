
export default function ConnectionFailedComponent() { 
    return (
        <div className="flex flex-col items-center justify-center h-full text-white my-10">
            <img 
                src="/public/giphy.gif" 
                alt="No Movies Available" 
                className="w-64 h-64 mb-4 rocking-image" 
            />
            <p className="text-4xl font-extrabold text-amber-400">Error fetching Movies data</p>
            <p className="text-2xl font-semibold">Please try a different search term.</p>
        </div>
    )
}