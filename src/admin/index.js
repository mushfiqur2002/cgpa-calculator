import { Logs, List, ListIndentIncrease } from "lucide-react";

export const sideBarLinks = [
    {
        name: "semester",
        path: "/admin",
        icon: Logs
    },
    {
        name: "subjects",
        path: "/admin/subjects",
        icon: List
    },

    {
        name: "result",
        path: "/admin/result",
        icon: ListIndentIncrease
    }
]