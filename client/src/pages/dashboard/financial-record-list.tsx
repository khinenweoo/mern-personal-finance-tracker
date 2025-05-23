import { useEffect, useMemo, useState } from "react";
import { FinancialRecord, useFinancialRecords } from "../../contexts/financial-record-context";
import { useTable, Column, CellProps } from "react-table";
import { format } from 'date-fns';
import formatToUSD from "./formatToUSD";

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

    const valueIsIncome = () => {
        return typeof value === "number" && value > 0;
    }

    const valueIsExpenses = () => {
        return typeof value === "number" && value < 0;
    }

    return (
        <div
            className={`editable-cell ${editable ? 'editable dark:text-gray-300 hover:text-blue-600' : 'dark:text-gray-300'}`}
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
                <span className={ valueIsIncome()? 
                   "text-green-400" : valueIsExpenses()? "text-red-400": ""}>
                    
                    {typeof value === "string" ?
                    value : formatToUSD(value)
                    }
                </span>
            )}
        </div>
    )
}


export const FinancialRecordList = () => {
    const { records, isLoading, updateRecord, deleteRecord, searchRecord, fetchRecords } = useFinancialRecords();

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

    useEffect(() => {
        if (filterInput !== "") {
            searchRecord(filterInput);
        } else {
            fetchRecords();
        }
        
    }, [filterInput]);
 
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
        columns,
        data: records,
    },
);
    
    return (
        <div className="table-container expense-card-container bg-white dark:bg-slate-800 p-2 block max-w-full sm:overflow-x-scroll lg:overflow-auto overflow-y-hidden">
            <div className="h-full">
            <input
                value={filterInput}
                onChange={e => setFilterInput(e.target.value)}
                placeholder="Search..."
                className="input text-slate-950 dark:text-white"
            />
                <table {...getTableProps()} className="table w-full">
                    <thead>
                        {headerGroups.map(headerGroup => {
                            const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={key} {...headerGroupProps} className="bg-gray-50 dark:bg-slate-800 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700">
                                    {headerGroup.headers.map(column => {
                                        const { key, ...headerProps } = column.getHeaderProps();
                                        return (
                                            <th className="text-gray-950 dark:text-gray-300 " key={key} {...headerProps}>
                                                {column.render('Header')}
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>

                    <tbody {...getTableBodyProps()} className="">
                        { isLoading && 
                        <tr><td colSpan={6}>
                            <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-sky-600 rounded-full" role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                            </div>
                        </td></tr>}
                        {!isLoading && rows.map(row => {
                            prepareRow(row);
                            const { key, ...rowProps } = row.getRowProps();
                            return (
                                <tr className="expense-card border border-b-blue-200 dark:border-gray-300 hover:bg-white dark:hover:bg-gray-700" key={key} {...rowProps}>
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