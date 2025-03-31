import React, { useState } from 'react';
import {
  Drawer,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function UploadModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    documentName: '',
    documentType: '',
    remarks: '',
    file: null
  });

  const documentNames = [
    'Loan Agreement',
    'Property Documents',
    'Income Proof',
    'Bank Statements',
    'KYC Documents',
    'Legal Documents',
    'Insurance Documents',
    'Valuation Report'
  ];

  const documentTypes = [
    'PDF',
    'Image',
    'Word Document',
    'Excel Sheet',
    'Scanned Copy',
    'Original Document',
    'Certified Copy'
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setFormData(prev => ({
      ...prev,
      file: event.target.files[0]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          padding: '24px',
        },
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Upload Document</h2>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
          <FormControl fullWidth>
            <InputLabel id="document-name-label">Document Name</InputLabel>
            <Select
              labelId="document-name-label"
              name="documentName"
              value={formData.documentName}
              label="Document Name"
              onChange={handleChange}
              required
            >
              {documentNames.map((name) => (
                <MenuItem key={name} value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="document-type-label">Document Type</InputLabel>
            <Select
              labelId="document-type-label"
              name="documentType"
              value={formData.documentType}
              label="Document Type"
              onChange={handleChange}
              required
            >
              {documentTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Document Remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              required
            />
          </div>

          <div className="mt-auto pt-6">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#4355B9',
                '&:hover': {
                  backgroundColor: '#3a489e'
                },
                textTransform: 'none',
                py: 1.5
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default UploadModal; 