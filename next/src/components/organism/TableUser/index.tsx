import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { USER_COLUMN } from "@/constant";
import { format } from "date-fns";
import SelectAction from "../SelectAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DefaultAvatar from "../DefaultAvatar";

interface TableUserProps {
    users: any;
}

const TableUser: React.FC<TableUserProps> = ({ users }) => {

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        {USER_COLUMN.map((item: any, i: number) => (
                            <TableHead key={item + i}>{item}</TableHead>
                        ))}
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((item: any, i: number) => (
                        <TableRow key={item + i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{format(new Date(item.birth), 'dd MMM yyyy')}</TableCell>
                            <TableCell>{item.job}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                <Badge className={item.status === 'active' ? 'bg-blue-100 text-blue-500 hover:bg-blue-200' : 'bg-red-100 text-red-500 hover:bg-red-200'}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={`http://localhost:5000${item.avatar}`} />
                                    <AvatarFallback>
                                        <DefaultAvatar />
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <SelectAction userId={item.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};

export default TableUser
