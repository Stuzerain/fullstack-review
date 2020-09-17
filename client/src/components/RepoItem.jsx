import React from 'react';

const RepoItem = (props) => {
  return (
    <div>
      <div>Name: {props.repo.name}</div>
      <div>Owner: {props.repo.owner}</div>
      <a href={props.repo.url}>URL: {props.repo.url}</a>
      <div>Watchers: {props.repo.watchers}</div>
      <div>Language: {props.repo.language}</div>
      <br />
    </div>
  )
}

export default RepoItem;