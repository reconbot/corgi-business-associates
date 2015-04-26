
var corgis_data = [
  {
    name: "ein"
  },
  {
    name: "Matilda"
  }
]

var Corgi = React.createClass({
  removeMe: function() {
    this.props.removeCorgi(this.props.data);
  },
  render: function() {
    return (
      <div>
        Corgi {this.props.data.name}! <span onClick={this.removeMe}>X</span>
      </div>
    )
  }
})

var CorgiList = React.createClass({
  render: function() {
    var removeCorgi = this.props.removeCorgi;
    var corgis = this.props.data.map(function(corgi){
      return (<Corgi data={corgi} removeCorgi={removeCorgi}/>);
    });

    return (
      <div>
        <h1>These are the corgis</h1>
        {corgis}
      </div>
    );
  }
});

var CorgiController = React.createClass({
  getInitialState: function(){
    return {data: corgis_data};
  },
  addCorgi: function(corgi) {
    var corgies = this.state.data;
    corgies.push(corgi);
    this.setState({data: corgies});
  },
  removeCorgi: function(corgi) {
    var corgies = this.state.data;
    var index = corgies.indexOf(corgi);
    corgies.splice(index, 1);
    this.setState({data: corgies})
  },
  render: function(){
    return (
      <div>
        <CorgiList data={this.state.data} removeCorgi={this.removeCorgi}/>
        <CorgiForm addCorgi={this.addCorgi} />
      </div>
    )
  }
});

var CorgiForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    if (!name) {
      return;
    }
    this.props.addCorgi({name: name});
    React.findDOMNode(this.refs.name).value = '';
    return;
  },

  render: function() {
    return (
      <form className="corgiForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Corgi name" ref="name" />
        <input type="submit" value="Post" />
      </form>
    )
  }
})

React.render(
  <CorgiController />,
  document.getElementById('content')
);
