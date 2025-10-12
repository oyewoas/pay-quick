import { Link } from "react-router";

export default function Logo() {
    return(
         <Link to="/" aria-label="Home" className="inline-flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                        PQ
                      </div>
                    </Link>
    )
}