import React from 'react';
import Input from '../../components/ui/Input.jsx';


const Payment = ({ cardData, handleInputChange, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Payment Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Paytm Number"
          value={cardData.paymentInfo?.paytm || ''}
          onChange={(e) => handleInputChange('paymentInfo', 'paytm', e.target.value)}
          placeholder="Paytm mobile number"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Google Pay"
          value={cardData.paymentInfo?.googlePay || ''}
          onChange={(e) => handleInputChange('paymentInfo', 'googlePay', e.target.value)}
          placeholder="Google Pay number"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="PhonePe"
          value={cardData.paymentInfo?.phonePe || ''}
          onChange={(e) => handleInputChange('paymentInfo', 'phonePe', e.target.value)}
          placeholder="PhonePe number"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="UPI ID"
          value={cardData.paymentInfo?.upi || ''}
          onChange={(e) => handleInputChange('paymentInfo', 'upi', e.target.value)}
          placeholder="your-upi@bank"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <h4 className="text-md font-medium text-white mb-4">Bank Account Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Account Holder Name"
            value={cardData.paymentInfo?.bankDetails?.accountName || ''}
            onChange={(e) => handleNestedInputChange('paymentInfo', 'bankDetails', 'accountName', e.target.value)}
            placeholder="Account holder name"
            className="bg-gray-800 border-gray-700 text-white"
          />
          <Input
            label="Account Number"
            value={cardData.paymentInfo?.bankDetails?.accountNumber || ''}
            onChange={(e) => handleNestedInputChange('paymentInfo', 'bankDetails', 'accountNumber', e.target.value)}
            placeholder="Account number"
            className="bg-gray-800 border-gray-700 text-white"
          />
          <Input
            label="IFSC Code"
            value={cardData.paymentInfo?.bankDetails?.ifscCode || ''}
            onChange={(e) => handleNestedInputChange('paymentInfo', 'bankDetails', 'ifscCode', e.target.value)}
            placeholder="IFSC code"
            className="bg-gray-800 border-gray-700 text-white"
          />
          <Input
            label="Bank Name"
            value={cardData.paymentInfo?.bankDetails?.bankName || ''}
            onChange={(e) => handleNestedInputChange('paymentInfo', 'bankDetails', 'bankName', e.target.value)}
            placeholder="Bank name"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;