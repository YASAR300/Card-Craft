import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import FileUpload from '../../components/ui/FileUpload.jsx';

const Products = ({ 
  cardData, 
  addProduct, 
  removeProduct, 
  updateProduct 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Products</h3>
        <Button onClick={addProduct} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Product
        </Button>
      </div>

      <div className="space-y-4">
        {cardData.products?.map((product) => (
          <div key={product.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-white">Product</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeProduct(product.id)}
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                value={product.name}
                onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                placeholder="Product name"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Input
                label="Price"
                value={product.price}
                onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                placeholder="₹999"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Input
                label="Original Price"
                value={product.originalPrice}
                onChange={(e) => updateProduct(product.id, 'originalPrice', e.target.value)}
                placeholder="₹1999"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Input
                label="Category"
                value={product.category}
                onChange={(e) => updateProduct(product.id, 'category', e.target.value)}
                placeholder="Electronics, Clothing, etc."
                className="bg-gray-700 border-gray-600 text-white"
              />
              <div className="md:col-span-2">
                <FileUpload
                  label="Product Image"
                  onUpload={(url) => updateProduct(product.id, 'image', url)}
                  currentFile={product.image}
                  buttonText="Upload Image"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                value={product.description}
                onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                placeholder="Product description"
              />
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id={`inStock-${product.id}`}
                checked={product.inStock}
                onChange={(e) => updateProduct(product.id, 'inStock', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={`inStock-${product.id}`} className="text-sm text-gray-300">
                In Stock
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;