import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.refresh = this.refresh.bind(this)
  }

  search(term) {
    // console.log(`${term} was searched`);
    // debugger;
    $.post('http://localhost:1128/repos', {
      username: term
    })
      .done(this.refresh())
  }

  refresh() {
    // debugger;
    $.get('http://localhost:1128/repos')
      .done((results) => {
        // debugger;
        // console.log('these are our results baby ', results);
        console.log(this.state)
        console.log('STATE UPDATE ABOUT TO HAPPEN')
        this.setState({
          repos: results
        });
        console.log(this.state)
      });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      {/* { this.state && this.state.repos[0] && */}
      <RepoList repos={this.state.repos} />
      {/* } */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));