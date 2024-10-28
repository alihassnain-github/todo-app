import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RiDeleteBin6Line, RiEditLine } from "@remixicon/react";

type propType = {
    id: string,
    completed: boolean,
    task: string,
    createdAt: string | Date,
    deleteTodo: (id: string) => void,
    editTodo: (id: string, task: string) => void,
    toggleCompleted: (id: string) => void
}

export default function Todo({ id, completed, task, createdAt, deleteTodo, editTodo, toggleCompleted }: propType) {
    return (
        <div className="flex gap-2 justify-between items-center border px-4 py-2 rounded my-2">
            <div className="flex items-center gap-4">
                <Checkbox className="rounded" checked={completed} onClick={() => toggleCompleted(id)} />
                <p className={completed ? "opacity-50" : ""}>{task}</p>
            </div>
            <div className="flex items-center gap-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className="rounded" size="icon" onClick={() => editTodo(id, task)}>
                                <RiEditLine />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="rounded">
                            <p>Edit</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className="rounded" size="icon" onClick={() => deleteTodo(id)}>
                                <RiDeleteBin6Line />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="rounded">
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}