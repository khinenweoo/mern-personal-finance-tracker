import { useMemo, useState } from "react";
import { FinancialRecord, useFinancialRecords } from "../../contexts/financial-record-context";
import { useTable, Column, CellProps } from "react-table";
import { format } from 'date-fns';

interface EditableCellProps extends CellProps<FinancialRecord> {
    updateRecord: (rowIndex: number, columnId: string, value: any) => void;
    editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
    value: initialValue,
    row,
    column,
    updateRecord,
    editable
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        setIsEditing(false)
        updateRecord(row.index, column.id, value);
    };

    return (
        <div
            className={`editable-cell ${editable ? 'editable' : ''}`}
            onClick={() => editable && setIsEditing(true)}
        >
            {isEditing ? (
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                    onBlur={onBlur}
                    className="input"
                />
            ) : (
                <span>{typeof value === "string" ?
                    value : value.toString()
                }</span>
            )}
        </div>
    )
}


export const FinancialRecordList = () => {
    const { records, updateRecord, deleteRecord } = useFinancialRecords();

    const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
        const id = records[rowIndex]._id;
        // [columnId]: value -> this is only the column we're editing, we want to return the whole record
        updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value })
    }

    const columns: Array<Column<FinancialRecord>> = useMemo(() => [
        {
            Header: "Category",
            accessor: "category",
            Cell: (props) => (
                <EditableCell
                    {...props}
                    updateRecord={updateCellRecord}
                    editable={true}
                />
            ),
        },
        {
            Header: "Description",
            accessor: "description",
            Cell: (props) => (
                <EditableCell
                    {...props}
                    updateRecord={updateCellRecord}
                    editable={true}
                />
            ),
        },
        {
            Header: "Amount",
            accessor: "amount",
            Cell: (props) => (
                <EditableCell
                    {...props}
                    updateRecord={updateCellRecord}
                    editable={true}
                />
            ),
        },
        {
            Header: "Payment Method",
            accessor: "paymentMethod",
            Cell: (props) => (
                <EditableCell
                    {...props}
                    updateRecord={updateCellRecord}
                    editable={true}
                />
            ),
        },
        {
            Header: "Date",
            accessor: "date",
            Cell: (props) => {
                const formattedDate = format(new Date(props.value), 'PP');
                return (
                    <EditableCell
                        {...props}
                        value={formattedDate}
                        updateRecord={updateCellRecord}
                        editable={false}
                    />
                );
            },
        },
        {
            Header: "Actions",
            id: "delete",
            Cell: ({ row }) => (
                <button
                    onClick={() => deleteRecord(row.original._id ?? "")}
                    className="delete-button"
                >
                <i className='bx bx-trash text-lg'></i>
                </button>
            ),
        },
    ], [records]);

    const [ filterInput, setFilterInput ] = useState('');
   

    const filteredData = records.filter(record => {
        let searchTerm = String(filterInput.toLowerCase());

        if (searchTerm === '') {
            return true;
        }

        return (
            record.description?.toLowerCase().includes(searchTerm) ||
            record.category?.toLowerCase().includes(searchTerm) ||
            String(record.amount).includes(searchTerm) ||
            record.paymentMethod?.toLowerCase().includes(searchTerm) 
        );
 
      });



    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
        columns,
        data: filteredData,
    },
);
    
    return (
        <div className="table-container expense-card-container p-2 block max-w-full sm:overflow-x-scroll lg:overflow-auto overflow-y-hidden">
            <div className="h-full">
            <input
                value={filterInput}
                onChange={e => setFilterInput(e.target.value)}
                placeholder="Search..."
                className="input"
            />
                <table {...getTableProps()} className="table w-full">
                    <thead>
                        {headerGroups.map(headerGroup => {
                            const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={key} {...headerGroupProps} className="bg-gray-50 rounded-xl shadow-sm border border-gray-100">
                                    {headerGroup.headers.map(column => {
                                        const { key, ...headerProps } = column.getHeaderProps();
                                        return (
                                            <th key={key} {...headerProps}>
                                                {column.render('Header')}
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>

                    <tbody {...getTableBodyProps()} className="">
                        {rows.map(row => {
                            prepareRow(row);
                            const { key, ...rowProps } = row.getRowProps();
                            return (
                                <tr className="expense-card" key={key} {...rowProps}>
                                    {row.cells.map(cell => {
                                        const { key, ...cellProps } = cell.getCellProps();
                                        return (
                                            <td key={key} {...cellProps}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>   
        </div>
    );
};