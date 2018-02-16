import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const AddComment = () => (
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
        <FlatButton label="Save"/>
      </CardActions>
    </Card>
);

export default AddComment;