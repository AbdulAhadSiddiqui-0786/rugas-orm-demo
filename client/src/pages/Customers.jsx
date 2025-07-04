import { useEffect, useState } from "react";
import API from "@/services/api";
import FormInput from "../components/FormInput";
import CustomerListItem from "../components/CustomerListItem"; 

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); 
  const [searchStatus, setSearchStatus] = useState("idle"); // 'idle', 'searching', 'found', 'not_found', 'error'

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      alert("Failed to fetch customers. Please try again.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchResults([]);
    setSearchStatus("idle");

    // Basic validation for the add form
    if (!form.name && !form.email && !form.phone && !form.address) {
      alert("Please fill in at least one field to add a customer.");
      return;
    }

    try {
      // Still use /check endpoint for exact duplicate check during add operation
      const existingCustomerRes = await API.get(
        `/customers/check?name=${encodeURIComponent(
          form.name
        )}&email=${encodeURIComponent(form.email)}&phone=${encodeURIComponent(
          form.phone
        )}&address=${encodeURIComponent(form.address)}`
      );

      if (existingCustomerRes.data.exists) {
        alert(
          "A customer with similar details already exists. Please review the customer list or try searching."
        );
        return; 
      }

      await API.post("/customers", form);
      setForm({ name: "", address: "", phone: "", email: "" }); // Clear form
      fetchCustomers(); // Refresh customer list
      alert("Customer added successfully!");
    } catch (error) {
      console.error("Error adding customer:", error);
      if (error.response && error.response.status === 409) {
        alert(
          error.response.data.error ||
            "Customer with provided details already exists."
        );
      } else {
        alert("An error occurred while adding the customer.");
      }
    }
  };

  // --- SEARCH FUNCTIONALITY ---
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchResults([]); // Clear results as user types
    setSearchStatus("idle");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchResults([]); // Clear previous results
    setSearchStatus("searching"); // Set loading state

    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      alert("Please enter a search query.");
      setSearchStatus("idle");
      return;
    }

    try {
      // Use the new /customers/search endpoint
      const res = await API.get(
        `/customers/search?query=${encodeURIComponent(trimmedQuery)}`
      );

      if (res.data.length > 0) {
        setSearchResults(res.data);
        setSearchStatus("found");
      } else {
        setSearchResults([]); 
        setSearchStatus("not_found");
      }
    } catch (error) {
      console.error("Error during customer search:", error);
      setSearchResults([]); 
      setSearchStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">
        👥 Customer Management
      </h2>

      {/* --- NEW SEARCH SECTION --- */}
      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow dark:text-white"
      >
        <h3 className="text-lg font-semibold mb-3">
          Find Customer (Partial Match)
        </h3>
        <FormInput
          label="Search by Name, Email, Phone, or Address"
          name="searchQuery"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter any part of customer details..."
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
          disabled={searchStatus === "searching"}
        >
          {searchStatus === "searching" ? "Searching..." : "Search Customer"}
        </button>

        {/* Display Search Results - This section will now only show results from explicit search actions */}
        {searchStatus !== "idle" && searchStatus !== "searching" && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded border dark:border-gray-600">
            {searchStatus === "not_found" && (
              <p className="text-red-600 dark:text-red-400">
                No customer found matching your query.
              </p>
            )}
            {searchStatus === "error" && (
              <p className="text-red-600 dark:text-red-400">
                An error occurred during search. Please try again.
              </p>
            )}
            {searchStatus === "found" && searchResults.length > 0 && (
              <>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
                  Found {searchResults.length} customer(s):
                </p>
                <div className="grid gap-2">
                  {searchResults.map((customer) => (
                    <div
                      key={customer._id}
                      className="p-2 border rounded bg-white dark:bg-gray-800 text-sm"
                    >
                      <p className="font-medium">{customer.name}</p>
                      <p>{customer.email}</p>
                      <p>{customer.phone}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </form>
  

      {/* Existing Add Customer Form */}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow dark:text-white"
      >
        <h3 className="text-lg font-semibold md:col-span-2 mb-2">
          Add New Customer
        </h3>
        <FormInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <FormInput
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
        />
        <FormInput
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Customer
          </button>
        </div>
      </form>

      {/* Existing Customer List */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {customers.map((customer) =>
          customer._id ? (
            <CustomerListItem customer={customer} key={customer._id} />
          ) : (
            <CustomerListItem
              customer={customer}
              key={customer.email || Math.random()}
            />
          )
        )}
      </div>
    </div>
  );
}
