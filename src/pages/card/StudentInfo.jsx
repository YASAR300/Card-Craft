import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';


const StudentInfo = ({ 
  cardData, 
  handleInputChange, 
  addParentMobile, 
  removeParentMobile, 
  updateParentMobile 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Student Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Student Name"
          value={cardData.studentInfo?.studentName || ''}
          onChange={(e) => handleInputChange('studentInfo', 'studentName', e.target.value)}
          placeholder="Student's full name"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Student Mobile (if any)"
          value={cardData.studentInfo?.studentMobile || ''}
          onChange={(e) => handleInputChange('studentInfo', 'studentMobile', e.target.value)}
          placeholder="+91 9999999999"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Blood Group"
          value={cardData.studentInfo?.bloodGroup || ''}
          onChange={(e) => handleInputChange('studentInfo', 'bloodGroup', e.target.value)}
          placeholder="A+, B+, O+, etc."
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Age"
          value={cardData.studentInfo?.age || ''}
          onChange={(e) => handleInputChange('studentInfo', 'age', e.target.value)}
          placeholder="Student's age"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="School Name"
          value={cardData.studentInfo?.schoolName || ''}
          onChange={(e) => handleInputChange('studentInfo', 'schoolName', e.target.value)}
          placeholder="School name"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="School ID Card Number"
          value={cardData.studentInfo?.schoolIdNumber || ''}
          onChange={(e) => handleInputChange('studentInfo', 'schoolIdNumber', e.target.value)}
          placeholder="School ID number"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Student Email"
          type="email"
          value={cardData.studentInfo?.studentEmail || ''}
          onChange={(e) => handleInputChange('studentInfo', 'studentEmail', e.target.value)}
          placeholder="student@email.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Parents Email"
          type="email"
          value={cardData.studentInfo?.parentsEmail || ''}
          onChange={(e) => handleInputChange('studentInfo', 'parentsEmail', e.target.value)}
          placeholder="parent@email.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      {/* Parents Mobile Numbers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-300">Parents Mobile Numbers</label>
          <Button size="sm" onClick={addParentMobile}>
            <Plus className="h-4 w-4 mr-1" />
            Add Parent Mobile
          </Button>
        </div>
        <div className="space-y-3">
          {cardData.studentInfo?.parentsMobile?.map((mobile, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Input
                value={mobile}
                onChange={(e) => updateParentMobile(index, e.target.value)}
                placeholder="+91 9999999999"
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeParentMobile(index)}
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">School Address</label>
        <textarea
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={cardData.studentInfo?.schoolAddress || ''}
          onChange={(e) => handleInputChange('studentInfo', 'schoolAddress', e.target.value)}
          placeholder="Complete school address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Home Address</label>
        <textarea
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={cardData.businessInfo?.homeAddress || ''}
          onChange={(e) => handleInputChange('businessInfo', 'homeAddress', e.target.value)}
          placeholder="Complete home address"
        />
      </div>
    </div>
  );
};

export default StudentInfo;