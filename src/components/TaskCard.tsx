import { Card, CardHeader, CardTitle, CardDescription, } from "../components/ui/card"

export default function TaskCard({title, description,id, isDragging}: {title?: string, description?: string,id?: number, isDragging?: boolean}) {
    return (
        <Card id={id?.toString()} className={`w-full cursor-pointer ${isDragging ? "bg-blue-200" : ""}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{ description }</CardDescription>
            </CardHeader>
        </Card>
    )
}