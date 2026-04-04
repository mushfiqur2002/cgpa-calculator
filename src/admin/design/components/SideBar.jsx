import { Sidebar } from "lucide-react";

export default function SideBar() {
  return (
    <div className="h-screen bg-blue-500 inline-block pr-6">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Sidebar size={18} />
        <h1 className="capitalize">admin dashboard</h1>
      </div>
    </div>
  );
}
