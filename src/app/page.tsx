// pages/docs.tsx
const Docs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">API Documentation</h1>
          <p className="text-lg text-gray-600 mb-6">This documentation outlines the structure of the Product API.</p>
          <p className="mt-2 text-md text-gray-500">Created by <strong className="text-indigo-600">Muhammad Shahroz</strong></p>
          <p className="mt-4 text-sm text-gray-500 italic">
            This API can be used in the <strong className="text-indigo-600">Giaic Hackathon</strong> for Template 2.
          </p>
        </header>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Product API</h2>
          <p className="text-lg text-gray-600 mb-6">The following fields are returned when you access the product API endpoint.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700">
              <li><strong>id:</strong> Unique ID for each product</li>
              <li><strong>name:</strong> Name of the product</li>
              <li><strong>category:</strong> Category of the product</li>
              <li><strong>price:</strong> Price of the product</li>
              <li><strong>slug:</strong> Unique slug identifier</li>
              <li><strong>images:</strong> URL to the product image</li>
              <li><strong>productDescription:</strong> Short description of the product</li>
              <li><strong>originalPrice:</strong> Original price of the product</li>
            </ul>
            <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700">
              <li><strong>stock:</strong> Available stock</li>
              <li><strong>rating:</strong> Rating of the product (rate and count)</li>
              <li><strong>tags:</strong> Tags associated with the product (e.g., "Sale", "Featured")</li>
              <li><strong>dimensions:</strong> Dimensions of the product (height, width, depth in cm)</li>
              <li><strong>discount:</strong> Discount percentage</li>
            </ul>
          </div>

          <div className="mt-10 text-lg text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Example Product API Endpoint</h2>
            <p className="mb-4">You can get a list of all products by calling the following endpoint:</p>
            <pre className="bg-gray-800 text-white p-4 rounded-md text-sm">
              <code>GET /api/products</code>
            </pre>
            <p className="mt-4">To get a single product, use the following format:</p>
            <pre className="bg-gray-800 text-white p-4 rounded-md text-sm">
              <code>GET /api/products/{`{id}`}</code>
            </pre>
            <p className="mt-4 text-indigo-600">Example: <strong>/api/products/1</strong></p>
          </div>
        </section>

        <footer className="text-center mt-12 py-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Muhammad Shahroz. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Docs;
