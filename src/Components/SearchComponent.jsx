// SearchComponent.jsx
import React from "react";
import { PiBroomBold } from "react-icons/pi";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom"; // تم اختيار نسخة HEAD التي تستورد Link

function SearchComponent({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full md:w-96 ">
      <div className="relative flex items-center">
        {/* تم اختيار نسخة HEAD التي تضيف أيقونة البحث */}
        <FcSearch className="absolute left-3 text-xl text-gray-400 pointer-events-none" /> {/* Added pointer-events-none to prevent it from capturing clicks meant for the input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
          className={`w-full pl-10 pr-12 py-3
            bg-slate-950/70 
            text-gray-100
            placeholder-gray-400
            rounded-xl
            outline-none
            border border-gray-700
            focus:border-sky-500
            focus:ring-2
            focus:ring-sky-500/20 {/* تم اختيار focus:ring-sky-500/20 من النسخة الثانية */}
            focus:outline-none
            transition-all duration-300
           
          `}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 p-1.5
              text-gray-400
              hover:text-gray-100
              border-none
              outline-none
              transition-all duration-300"
            aria-label="Clear search"
          >
            {/* هنا القرار معقد شوية:
              HEAD: بيستخدم <Link to="/"> وبيمسح البحث عند الضغط. ده ممكن يرجعك للصفحة الرئيسية ويمسح البحث.
              النسخة التانية: بتمسح البحث بس من غير <Link>.

              لو محتاج ترجع للرئيسية وتمسح البحث، خلي كود HEAD.
              لو محتاج تمسح البحث بس وتفضل في نفس الصفحة، استخدم كود النسخة التانية.
              
              هنا هختار كود النسخة التانية كافتراض أبسط لزر "مسح" فقط، لكن ممكن تعدله.
            */}
            <PiBroomBold className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;