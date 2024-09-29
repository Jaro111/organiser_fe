import React from "react";
import { getAllUsers } from "../../utils/user";
import { userContext } from "../../common/context";
import { SuggestionList } from "./SuggestionList";
import { useEffect, useState, useContext } from "react";
import "./SearchBar.css";

export const SearchBar = (props) => {
  //
  const user = useContext(userContext).user;
  //
  const [allUsers, setAllUsers] = useState([]);
  const [invitedUsersArray, setInvitedUsersArray] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [idinvitedUsersString, setIdinvitedUsersString] = useState("");
  const jobId = props.jobId;
  const users = props.users;
  //
  const fetchUsers = async () => {
    const data = await getAllUsers(user.token);
    console.log(data);
    setAllUsers(data);
    const myList = [];
    users.map((user) => {
      myList.push(user._id);
    });
    //
    setInvitedUsersArray([...myList]);
  };
  //
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchInput(value);
    const myList = [];
    if (value.length > 0) {
      allUsers.filter((item) => {
        if (
          item.username.toLowerCase().slice(0, value.length) ===
          value.slice(0, value.length)
        ) {
          if (item._id !== user.id) myList.push(item);
        } else setSuggestions([]);
      });
      console.log(myList);
      setSuggestions(myList);
    } else setSuggestions([]);
  };
  //
  useEffect(() => {
    fetchUsers();
  }, [suggestions, jobId]);
  //
  return (
    <div className="searchBar-wrapper">
      <div>
        <p>Invite user to job</p>
      </div>
      <div className="serchInput-wrapper">
        <input
          className="searchInput"
          placeholder="Search..."
          type="search"
          onChange={(e) => handleChange(e)}
          value={searchInput}
        ></input>
        {suggestions.length > 0 && (
          <SuggestionList
            suggestions={suggestions}
            jobId={jobId}
            users={users}
            invitedUsersArray={invitedUsersArray}
          />
        )}
      </div>
    </div>
  );
};
