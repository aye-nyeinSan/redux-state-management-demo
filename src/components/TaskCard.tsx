import { Card, CardHeader, CardTitle, CardDescription, } from "../components/ui/card"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { taskActions } from "../features/tasks/tasksSlice"
import { Trash } from "lucide-react"
export default function TaskCard({ title, description, id, isDragging, columnId }: { title?: string, description?: string, id?: number, isDragging?: boolean, columnId?: string }) {
    const [isFocused, setIsFocused] = useState(false)
    const [editedTitle, setEditedTitle] = useState(title)
    const [editedDescription, setEditedDescription] = useState(description)

    const dispatch = useDispatch()

    const handleClick = () => {
        setIsFocused(true)
    }
    const handleOnSave = () => {
        setIsFocused(false)
        console.log("Saving changes for task with id:", id)
        if(editedTitle != title || editedDescription != description){
            dispatch(taskActions.updateTaskTitleAndDescription({  
            taskId: id,
            newTitle: editedTitle ,
            newDescription: editedDescription,
            columnId: columnId,
        }))
        }   
    }
    const handleOnBlur = (e: React.FocusEvent) => {
        const card = e.currentTarget.closest('[data-card]')
        // If the related target (the element gaining focus) is still within the card, do not exit edit mode
        if (card && card.contains(e.relatedTarget as Node)) return

        // Otherwise, save changes and exit edit mode
        handleOnSave()
    }


    return (
      <Card
        onClick={handleClick}
        data-card
        id={id?.toString()}
        className={`w-full ${isFocused ? "cursor-default" : "cursor-pointer"} ${isDragging ? "bg-blue-200" : ""}`}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>
              {!isFocused ? (
                <span>{title}</span>
              ) : (
                <input
                  autoFocus
                  type="text"
                  placeholder={editedTitle}
                  value={editedTitle}
                  onClick={e => e.stopPropagation()}
                  onChange={e => setEditedTitle(e.target.value)}
                  onBlur={handleOnBlur}
                  onKeyDown={e => e.key === "Enter" && handleOnSave()}
                  className="border-none rounded w-full mb-2 cursor-text outline-0 bg-transparent"
                />
              )}
            </CardTitle>
            <Trash
               onClick={(e) => {
                e.stopPropagation()
                dispatch(taskActions.removeTask(id))
                        }}
              className="w-4 h-4 cursor-pointer hover:text-red-500"
            />
          </div>

          <CardDescription>
            {!isFocused ? (
              <span className="whitespace-pre-wrap block ">{description}</span>
            ) : (
              <textarea
                placeholder={editedDescription}
                value={editedDescription}
                onClick={e => e.stopPropagation()}
                onChange={e => setEditedDescription(e.target.value)}
                onBlur={handleOnBlur}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleOnSave()
                  }
                }}
                className="border-none rounded w-full cursor-text outline-none bg-transparent resize-none overflow-hidden"
                rows={3}
              />
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    )
}