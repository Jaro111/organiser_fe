import React from "react";
import { getAllUsers } from "../../utils/user";
import { userContext } from "../../common/context";
import { DeleteJobPanel } from "../DeleteJobPanel/DeleteJobPanel";
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
  const [suggestionslength, seTsuggestionsLength] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const jobId = props.jobId;
  const users = props.users;
  //
  const fetchUsers = async () => {
    const data = await getAllUsers(user.token);
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
          value.slice(0, value.length).toLowerCase()
        ) {
          if (item._id !== user.id) myList.push(item);
        } else {
          setSuggestions([]);
          seTsuggestionsLength(0);
        }
      });
      setSuggestions(myList);
      seTsuggestionsLength(myList.length);
    } else {
      setSuggestions([]);
      seTsuggestionsLength(0);
    }
  };
  //
  useEffect(() => {
    fetchUsers();
  }, [suggestions, jobId]);
  //
  return (
    <div className="searchBar-wrapper">
      <div className="serchInput-wrapper">
        <input
          className="searchBarInput"
          placeholder="Search User"
          type="search"
          onChange={(e) => handleChange(e)}
          value={searchInput}
        ></input>
        {suggestionslength > 0 && (
          <SuggestionList
            suggestions={suggestions}
            jobId={jobId}
            users={users}
            invitedUsersArray={invitedUsersArray}
          />
        )}
      </div>
      {props.mainJobId ? (
        <DeleteJobPanel
          jobsLength={props.jobsLength}
          setJobsLength={props.setJobsLength}
          jobId={jobId}
          setMainJobId={props.setMainJobId}
          owner={props.owner}
          setJobDeleteData={props.setJobDeleteData}
        />
      ) : null}
    </div>
  );
};
