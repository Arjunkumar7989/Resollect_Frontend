import React, { useState } from 'react';
import {
    Checkbox,
    IconButton,
    Button,
    Popover,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    Upload as UploadIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';
import UploadModal from './UploadModal';

function Portfolio({ onUpload }) {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedRows, setSelectedRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [columnMenuAnchor, setColumnMenuAnchor] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isColumnsActive, setIsColumnsActive] = useState(false);
    const [isFiltersActive, setIsFiltersActive] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState(new Set([
        'loanNo', 'loanType', 'borrower', 'borrowerAddress', 'coBorrowerName',
        'coBorrowerAddress', 'currentDPD', 'sanctionAmount', 'region', 'State'
    ]));
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    const columnOptions = [
        { id: 'loanNo', label: 'Loan No' },
        { id: 'loanType', label: 'Loan Type' },
        { id: 'borrower', label: 'Borrower' },
        { id: 'borrowerAddress', label: 'Borrower Address' },
        { id: 'coBorrowerName', label: 'Co Borrower Name' },
        { id: 'coBorrowerAddress', label: 'Co Borrower Address' },
        { id: 'currentDPD', label: 'Current DPD' },
        { id: 'sanctionAmount', label: 'Sanction Amount' },
        { id: 'region', label: 'Region' },
        { id: 'State', label: 'State' }
    ];

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'preSarfaesi', label: 'Pre Sarfaesi' },
        { id: 'npa', label: 'NPA' },
        { id: '13(3)', label: 'Responses' },
        { id: 'symbolicPossession', label: 'Symbolic Possession' },
        { id: 'dmOrder', label: 'DM Order' },
        { id: 'physicalPossessions', label: 'Physical Possessions' },
        { id: 'auctions', label: 'Auctions' },
    ];
    

    const sampleData = [
        {
            loanNo: 'L2810201',
            loanType: 'Home Loan',
            borrower: 'Arjun',
            borrowerAddress: '22-C/5, Hyderabad',
            coBorrowerName: 'Pavvan Ram',
            coBorrowerAddress: '19/583, Delhi',
            currentDPD: 84,
            sanctionAmount: '₹259634',
            region: 'North',
            State: 'P'
        },
        {
            loanNo: 'L2810202',
            loanType: 'Car Loan',
            borrower: 'Amit Sharma',
            borrowerAddress: '14 Greenway Lane, Pune-411045',
            coBorrowerName: 'Neha Sharma',
            coBorrowerAddress: '78, Nandanvan Society, Mumbai-400064',
            currentDPD: 45,
            sanctionAmount: '₹850000',
            region: 'West',
            State: 'M'
        },
        {
            loanNo: 'L2810203',
            loanType: 'Personal Loan',
            borrower: 'Rohan Das',
            borrowerAddress: '5B, Aurobindo Marg, Kolkata-700019',
            coBorrowerName: 'Suman Das',
            coBorrowerAddress: 'B-12, Salt Lake City, Kolkata-700091',
            currentDPD: 30,
            sanctionAmount: '₹500000',
            region: 'East',
            State: 'W'
        },
        {
            loanNo: 'L2810204',
            loanType: 'Business Loan',
            borrower: 'Manoj Kumar',
            borrowerAddress: '11A, MG Road, Chennai-600002',
            coBorrowerName: 'Sita Devi',
            coBorrowerAddress: '22, Marina Beach Road, Chennai-600004',
            currentDPD: 60,
            sanctionAmount: '₹1200000',
            region: 'South',
            State: 'T'
        },
        {
            loanNo: 'L2810205',
            loanType: 'Education Loan',
            borrower: 'Ananya Nair',
            borrowerAddress: 'Flat 3, Sainik Colony, Bengaluru-560098',
            coBorrowerName: 'Ramesh Nair',
            coBorrowerAddress: 'House No. 4, Indiranagar, Bengaluru-560038',
            currentDPD: 20,
            sanctionAmount: '₹750000',
            region: 'South',
            State: 'K'
        },
        {
            loanNo: 'L2810206',
            loanType: 'Home Loan',
            borrower: 'Priya Singh',
            borrowerAddress: 'Sector 62, Noida-201309',
            coBorrowerName: 'Rohit Singh',
            coBorrowerAddress: 'Shalimar Garden, Ghaziabad-201005',
            currentDPD: 90,
            sanctionAmount: '₹2100000',
            region: 'North',
            State: 'U'
        },
        {
            loanNo: 'L2810207',
            loanType: 'Gold Loan',
            borrower: 'Rajeev Chauhan',
            borrowerAddress: 'Phase 5, Mohali-160059',
            coBorrowerName: 'Sunita Chauhan',
            coBorrowerAddress: 'Sector 17, Chandigarh-160017',
            currentDPD: 15,
            sanctionAmount: '₹350000',
            region: 'North',
            State: 'P'
        },
        {
            loanNo: 'L2810208',
            loanType: 'Car Loan',
            borrower: 'Kiran Rao',
            borrowerAddress: 'Banjara Hills, Hyderabad-500034',
            coBorrowerName: 'Deepak Rao',
            coBorrowerAddress: 'Hitech City, Hyderabad-500081',
            currentDPD: 25,
            sanctionAmount: '₹650000',
            region: 'South',
            State: 'T'
        },
        {
            loanNo: 'L2810209',
            loanType: 'Personal Loan',
            borrower: 'Sandeep Verma',
            borrowerAddress: 'Sector 15, Gurgaon-122001',
            coBorrowerName: 'Meena Verma',
            coBorrowerAddress: 'DLF Phase 2, Gurgaon-122002',
            currentDPD: 55,
            sanctionAmount: '₹400000',
            region: 'North',
            State: 'H'
        },
        {
            loanNo: 'L2810210',
            loanType: 'Education Loan',
            borrower: 'Shweta Patel',
            borrowerAddress: 'Navrangpura, Ahmedabad-380009',
            coBorrowerName: 'Suresh Patel',
            coBorrowerAddress: 'Satellite, Ahmedabad-380015',
            currentDPD: 10,
            sanctionAmount: '₹800000',
            region: 'West',
            State: 'G'
        },
        {
            loanNo: 'L2810211',
            loanType: 'Gold Loan',
            borrower: 'Pankaj Mehta',
            borrowerAddress: 'C-Scheme, Jaipur-302005',
            coBorrowerName: 'Kiran Mehta',
            coBorrowerAddress: 'C-Scheme, Jaipur-302005',
            currentDPD: 35,
            sanctionAmount: '₹400,000',
            region: 'North',
            State: 'Rajasthan'
        },
        {
            loanNo: 'L2810212',
            loanType: 'Home Loan',
            borrower: 'Deepak Verma',
            borrowerAddress: 'BTM Layout, Bangalore-560076',
            coBorrowerName: 'Swati Verma',
            coBorrowerAddress: 'BTM Layout, Bangalore-560076',
            currentDPD: 10,
            sanctionAmount: '₹2,800,000',
            region: 'South',
            State: 'Karnataka'
        },
        {
            loanNo: 'L2810213',
            loanType: 'Business Loan',
            borrower: 'Ajay Patel',
            borrowerAddress: 'Satellite, Ahmedabad-380015',
            coBorrowerName: 'Hina Patel',
            coBorrowerAddress: 'Satellite, Ahmedabad-380015',
            currentDPD: 50,
            sanctionAmount: '₹1,500,000',
            region: 'West',
            State: 'Gujarat'
        },
        {
            loanNo: 'L2810214',
            loanType: 'Personal Loan',
            borrower: 'Sneha Malhotra',
            borrowerAddress: 'Juhu, Mumbai-400049',
            coBorrowerName: 'Rohit Malhotra',
            coBorrowerAddress: 'Juhu, Mumbai-400049',
            currentDPD: 40,
            sanctionAmount: '₹700,000',
            region: 'West',
            State: 'Maharashtra'
        },
        {
            loanNo: 'L2810215',
            loanType: 'Education Loan',
            borrower: 'Rahul Bose',
            borrowerAddress: 'Salt Lake, Kolkata-700091',
            coBorrowerName: 'Anjana Bose',
            coBorrowerAddress: 'Salt Lake, Kolkata-700091',
            currentDPD: 0,
            sanctionAmount: '₹1,000,000',
            region: 'East',
            State: 'West Bengal'
        },
        {
            loanNo: 'L2810216',
            loanType: 'Car Loan',
            borrower: 'Amitabh Sen',
            borrowerAddress: 'Rajdanga, Kolkata-700107',
            coBorrowerName: 'Sushmita Sen',
            coBorrowerAddress: 'Rajdanga, Kolkata-700107',
            currentDPD: 25,
            sanctionAmount: '₹550,000',
            region: 'East',
            State: 'West Bengal'
        },
        {
            loanNo: 'L2810217',
            loanType: 'Home Loan',
            borrower: 'Kavita Rane',
            borrowerAddress: 'Baner, Pune-411045',
            coBorrowerName: 'Sandeep Rane',
            coBorrowerAddress: 'Baner, Pune-411045',
            currentDPD: 55,
            sanctionAmount: '₹3,200,000',
            region: 'West',
            State: 'Maharashtra'
        },
        {
            loanNo: 'L2810218',
            loanType: 'Gold Loan',
            borrower: 'Dinesh Pillai',
            borrowerAddress: 'Thiruvanmiyur, Chennai-600041',
            coBorrowerName: 'Lakshmi Pillai',
            coBorrowerAddress: 'Thiruvanmiyur, Chennai-600041',
            currentDPD: 90,
            sanctionAmount: '₹300,000',
            region: 'South',
            State: 'Tamil Nadu'
        },
        {
            loanNo: 'L2810219',
            loanType: 'Business Loan',
            borrower: 'Sanjay Yadav',
            borrowerAddress: 'Gomti Nagar, Lucknow-226010',
            coBorrowerName: 'Pooja Yadav',
            coBorrowerAddress: 'Gomti Nagar, Lucknow-226010',
            currentDPD: 80,
            sanctionAmount: '₹2,500,000',
            region: 'North',
            State: 'Uttar Pradesh'
        },
        {
            loanNo: 'L2810220',
            loanType: 'Personal Loan',
            borrower: 'Bhavna Joshi',
            borrowerAddress: 'Sector 17, Chandigarh-160017',
            coBorrowerName: 'Nitin Joshi',
            coBorrowerAddress: 'Sector 17, Chandigarh-160017',
            currentDPD: 35,
            sanctionAmount: '₹850,000',
            region: 'North',
            State: 'Chandigarh'
        }
    ];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedRows(sampleData.map(row => row.loanNo));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (loanNo) => {
        setSelectedRows(prev =>
            prev.includes(loanNo)
                ? prev.filter(id => id !== loanNo)
                : [...prev, loanNo]
        );
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
        onUpload();
    };

    const handleCloseUploadModal = () => {
        setIsUploadModalOpen(false);
    };

    const handleColumnMenuOpen = (event) => {
        setColumnMenuAnchor(event.currentTarget);
        setIsColumnsActive(true);
    };

    const handleColumnMenuClose = () => {
        setColumnMenuAnchor(null);
        setIsColumnsActive(false);
    };

    const handleFiltersClick = () => {
        setIsFiltersActive(!isFiltersActive);
    };

    const toggleColumn = (columnId) => {
        const newVisibleColumns = new Set(visibleColumns);
        if (newVisibleColumns.has(columnId)) {
            newVisibleColumns.delete(columnId);
        } else {
            newVisibleColumns.add(columnId);
        }
        setVisibleColumns(newVisibleColumns);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setSelectedRows([]); 
    };

    const filteredData = sampleData.filter(row =>
        Object.values(row).some(value =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Calculate pagination
    const totalPages = Math.ceil(sortedData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + entriesPerPage);

    return (
        <div className="p-6 h-screen overflow-hidden">
            {/* Title */}
            <h1 className="text-2xl font-semibold mb-6">Portfolio</h1>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${selectedFilter === filter.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Search and Actions Bar */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search Loan Number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outlined"
                        onClick={handleColumnMenuOpen}
                        endIcon={<KeyboardArrowDownIcon className={isColumnsActive ? 'text-white' : 'text-black'} />}
                        size="small"
                        className={`min-w-[130px] rounded-md text-sm font-medium transition-colors 
    ${isColumnsActive
                                ? 'bg-[#4355B9] text-white border-[#4355B9]'
                                : 'bg-white text-black border-gray-300 hover:bg-gray-50'
                            }`}
                        style={{ textTransform: 'none' }} // 👈 Prevents uppercase text
                    >
                        Select Columns
                    </Button>

                    <Popover
                        open={Boolean(columnMenuAnchor)}
                        anchorEl={columnMenuAnchor}
                        onClose={handleColumnMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            style: {
                                width: '250px',
                                maxHeight: '400px'
                            }
                        }}
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3 border-b pb-2">
                                <span className="font-medium text-gray-700">Show/Hide Columns</span>
                                <IconButton size="small" onClick={handleColumnMenuClose}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </IconButton>
                            </div>
                            <div className="flex flex-col space-y-1">
                                {columnOptions.map((column) => (
                                    <div
                                        key={column.id}
                                        className="flex items-center py-2 px-1 hover:bg-gray-50 rounded-md"
                                    >
                                        <Checkbox
                                            checked={visibleColumns.has(column.id)}
                                            onChange={() => toggleColumn(column.id)}
                                            size="small"
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">{column.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popover>
                    {/* more filter button */}
                    <Button
                        variant="contained" // Use "contained" to ensure background color is applied
                        onClick={handleFiltersClick}
                        endIcon={<FilterListIcon className="text-white" />} // Ensure icon remains white
                        size="small"
                        className="min-w-[120px] rounded-md text-sm font-medium bg-[#4355B9] text-white border-[#4355B9] hover:bg-[#334499] transition-colors"
                        style={{ textTransform: 'none' }} // Keeps "More Filters" as it is
                    >
                        More Filters
                    </Button>


                </div>
            </div>

            {/* Selected Count */}
            <div className="text-sm text-gray-600 mb-4">
                {selectedRows.length} loans selected
            </div>

            {/* Table Container with Scrollbars */}
            <div className="bg-white rounded-lg shadow overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
                <div className="overflow-auto h-full">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr className="bg-gray-50">
                                <th className="w-12 px-6 py-3">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRows(sampleData.map(row => row.loanNo));
                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                        checked={selectedRows.length === sampleData.length}
                                    />
                                </th>
                                {columnOptions.map((column) => (
                                    visibleColumns.has(column.id) && (
                                        <th
                                            key={column.id}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {column.label} ▼
                                        </th>
                                    )
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.map((row) => (
                                <tr key={row.loanNo} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300"
                                            checked={selectedRows.includes(row.loanNo)}
                                            onChange={() => {
                                                if (selectedRows.includes(row.loanNo)) {
                                                    setSelectedRows(selectedRows.filter(id => id !== row.loanNo));
                                                } else {
                                                    setSelectedRows([...selectedRows, row.loanNo]);
                                                }
                                            }}
                                        />
                                    </td>
                                    {columnOptions.map((column) => (
                                        visibleColumns.has(column.id) && (
                                            <td
                                                key={column.id}
                                                className={`px-6 py-4 text-sm ${column.id === 'loanNo' ? 'text-blue-600 hover:underline cursor-pointer' : 'text-gray-900'
                                                    }`}
                                            >
                                                {row[column.id]}
                                            </td>
                                        )
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, sortedData.length)} of {sortedData.length} entries
                </div>
                <div className="flex gap-2">
                    <button
                        className={`px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 text-sm ${currentPage === page
                                ? 'text-white bg-[#4355B9] border-[#4355B9]'
                                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                                } border rounded-md`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className={`px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Upload Modal */}
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={handleCloseUploadModal}
            />
        </div>
    );
}

export default Portfolio; 