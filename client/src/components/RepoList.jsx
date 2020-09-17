import React from 'react';
import RepoItem from './RepoItem.jsx';
import App from '../index.jsx';

// class RepoList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       repos: this.props.repos
//     }
//   }

//   // console.log('top results are ', this.state.top);
//   componentDidMount() {
//     this.setState({
//       repos: this.props.repos
//     });
//   }
const RepoList = ({ repos }) => {
  return (
    <div>
      <h4> Repo List Component </h4>
            There are { repos.length} repos.
      < div className='top25' > Top 25 Repos:</div > <br />
      {
        (repos.slice(0, 25)).map((repo, index) =>
          < RepoItem repo={repo} key={index} />
        )
      }
    </div >
  )

}
// render() {


export default RepoList;