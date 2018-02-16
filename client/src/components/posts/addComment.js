import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class AddComment extends React.Component {


  render() {
    return (
        <Card>
          <CardHeader title='Add comment'/>
          <CardText>
            <TextField
                hintText="Write the comment here"
                multiLine={true}
                rows={2}
                rowsMax={4}
                style={{width: "100%"}}
            />
          </CardText>
          <CardActions>
            {this.props.isLoggedIn ? <FlatButton label="Save"/>
                :
                <Link to='/login'><FlatButton label="Login"/></Link>
            }
          </CardActions>
        </Card>
    )
  }
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(AddComment);