import React, { useState } from 'react';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import { useSelector } from 'react-redux'
import upload from '../../Assets/upload.png';
import CSV from '../../Assets/CSV.png';
import ResultCsv from './resultCsv';
import ConnectionMessage from './connectionMessage';
import CompaignsDashboard from '../compaignsDashboard';
import axios from 'axios';

const CreateCsvCompaign = ({setActiveCampaign, setConnectionCompaignType}) => {
  const userId = useSelector(state => state.authentication._id);

  const [showComponent, setShowComponent] = useState("newcsvCompaign");
  const [blurName, setBlurName] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

  // State to hold campaign data
  const [campaignData, setCampaignData] = useState({
    userId,
    name: '',
    createdOn: new Date().toLocaleDateString(),
    users: [],
    Connection_Request_Message: '',
    Follow_up_Message: '',
    dm_time: 0,
    isToggled: false
    });

  // Function to handle updating the campaign data
  const updateCampaignData = (field, value) => {
    setCampaignData((prevData) => {
      const updatedData = { ...prevData, [field]: value };
      console.log("Updated Campaign Data:", updatedData); // Log the updated object
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/api/v1/campaign/save-campaign`, campaignData);
      setActiveCampaign('');
      setConnectionCompaignType('');
      console.log('Campaign saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    setErrorMessage(''); // Reset error message on file change
  };

  // Handle drag-and-drop file upload
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setErrorMessage(''); // Reset error message on file change
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to validate CSV headers
  const validateHeaders = (headers) => {
    const requiredHeaders = ['name', 'headline', 'public_identifier'];
    return requiredHeaders.every(header => headers.includes(header));
  };

  // Function to parse CSV file and extract data when "Search" is clicked
  const handleSearchClick = () => {
    if (!uploadedFile) {
      setErrorMessage('Error: No file uploaded. Please upload a CSV file.');
      return;
    }

    Papa.parse(uploadedFile, {
      header: true, // Use the first row as keys (column names)
      skipEmptyLines: true, // Skip empty lines in the CSV
      complete: (result) => {
        const headers = result.meta.fields; // Get CSV headers
        if (!validateHeaders(headers)) {
          setErrorMessage('Error: CSV must contain headers "name", "headline", and "public_identifier".');
          return;
        }

        const data = result.data.map((row) => ({
          name: row.name,
          headline: row.headline,
          public_identifier: row.public_identifier,
        }));
        
        updateCampaignData("users", data)
        setErrorMessage(''); // Clear any previous error
        setShowComponent("result"); // Proceed to result view
        console.log('Parsed CSV Data:', data); // For debugging
      },
      error: (error) => {
        console.error('Error parsing CSV:', error.message);
        setErrorMessage('Error parsing CSV: ' + error.message);
      },
    });
  };

  return (
    <div className='flex-1 transition-margin duration-300 md:ml-[16%] p-4 bg-white'>
      {showComponent === "newcsvCompaign" && (
        <div className='px-10 flex flex-col gap-5'>
          <p className='font-bold text-lg text-[#1F384C]'>Create Campaigns</p>
          <div className='flex flex-col items-start gap-2 pt-5'>
            <label htmlFor="text" className="text-base font-normal text-black">
              Campaign Name
            </label>
            <input
              onFocus={() => setBlurName(true)}
              onBlur={() => setBlurName(false)}
              onChange={(e) => updateCampaignData('name', e.target.value)}
              type="text"
              name="campaignName"
              id="name"
              className={`border ${blurName ? 'border-[#3C82F6]' : 'border-[#D0D0D0]'} ${blurName ? "text-[#3C82F6]" : "text-black"} focus:outline-none rounded-lg w-full h-16 p-3`}
              placeholder="Enter Campaign name"
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-normal text-black'>Upload CSV</p>
            <div
              className='border-2 border-dashed border-[#D0D0D0] rounded-lg py-7'
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className='flex flex-col gap-3 items-center justify-center'>
                {uploadedFile ? (
                  <>
                    <img src={CSV} alt="Upload" />
                    <p className='text-[#1F384C] font-normal text-2xl'>{uploadedFile.name}</p>
                    <button
                      className="text-sm text-red-500 underline"
                      onClick={() => {
                        setUploadedFile(null); // Clear the file to allow re-selection
                        updateCampaignData("users", []); // Reset CSV data
                        setErrorMessage(''); // Clear error message
                      }}
                    >
                      Change File
                    </button>
                  </>
                ) : (
                  <>
                    <img src={upload} alt="Upload" />
                    <p className='text-[#D0D0D0] font-normal text-2xl'>Drag and Drop file here</p>
                    <p className='text-[#D0D0D0] font-semibold text-base'>or</p>
                    <label className='bg-[#3C82F6] text-white w-28 h-10 rounded-lg flex items-center justify-center cursor-pointer'>
                      Browse
                      <input
                        type='file'
                        accept='.csv'
                        onChange={handleFileChange}
                        className='hidden'
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
          {errorMessage && <p className='text-red-500'>{errorMessage}</p>} {/* Display error message if any */}
          <button
            className='bg-[#3C82F6] text-white w-28 h-10 rounded-lg'
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      )}

      {showComponent === "result" && <ResultCsv 
        setShowComponent={setShowComponent}
        users={campaignData.users} 
        uploadedFileName = {uploadedFile.name}
        
        />} {/* Pass csvData to ResultCsv component */}
       

      {showComponent === "connectionMessage" && (
        <ConnectionMessage setShowComponent={setShowComponent}
        updateCampaignData={updateCampaignData}
        handleSubmit={handleSubmit}
        />
      )}

      {showComponent === "compaignStats" && <CompaignsDashboard />}
    </div>
  );
};

export default CreateCsvCompaign;
