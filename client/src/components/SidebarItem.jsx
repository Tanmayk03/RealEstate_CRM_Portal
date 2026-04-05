import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const SidebarItem = ({ icon: Icon, label, to, children }) => {
  const [open, setOpen] = useState(false);

  // If it has children → dropdown item
  if (children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full p-2 hover:bg-blue-200 rounded"
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon size={18} />}
            <span>{label}</span>
          </div>
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {open && <div className="ml-6 mt-1 space-y-1">{children}</div>}
      </div>
    );
  }

  // Normal sidebar link
  return (
    <Link
      to={to}
      className="flex items-center gap-2 p-2 hover:bg-blue-200 rounded"
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItem;
