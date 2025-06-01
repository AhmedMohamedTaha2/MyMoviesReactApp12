
export default function NoMovieAvailableComponent() { 
    return (
        <div className="flex flex-col items-center justify-center h-full text-white my-10">
            <img 
                src="/public/giphy1.gif" 
                alt="No Movies Available" 
                className="w-64 h-64 mb-4 rocking-image" 
            />
            <p className="text-4xl font-extrabold text-amber-400">No Movie Found</p>
            <p className="text-2xl font-semibold">Please try a different search term.</p>
        </div>
    )
}