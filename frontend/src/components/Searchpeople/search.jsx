import React, { useState } from "react";
import axios from "axios";
import './search.css';

const Search = () => {
  const [formData, setData] = useState({ name: '', email: '', batch: '' });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const res = await axios.post("http://localhost:5001/api/auth/searchProfile", formData);
      if (res.data.success) {
        setResults(res.data.users);
      } else {
        alert("Search failed");
      }
    } catch (err) {
  console.log(".askjdnfkwndawknwakdknnndakjndk.jwndekj.wendkj");

      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="form-container ">
      <div className="form_">
        <form onSubmit={handleSubmit} className="user-form">
        <h2 className="form-title">Search Through Keywords</h2>

        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="batch"
            placeholder="Batch"
            value={formData.batch}
            onChange={handleChange}
          />
        </div>

        <div className="button_container">
          <button className="sub_butt" type="submit">Search</button>
        </div>
      </form>
      </div>
        


      {results.length > 0 && (
        <div className="table-container">
           
          <h3>Results:</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Batch</th>
                <th>Hostel</th>
              </tr>
            </thead>
            <tbody>
              {results.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.batch}</td>
                  <td>{user.hostel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;
