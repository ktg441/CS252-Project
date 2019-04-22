import React from 'react';
import TextField from '@material-ui/core/TextField/';
import ListItem from '@material-ui/core/ListItem';
import "./search.css"


const styles = theme => ({
  field: {
    textAlign: 'left',
    margin: 'auto',
    paddingBottom: 10,
    width: '75%',
  },
});

const BookSearch = (props) => {
    let resultList = null

    if (props.searching && (props.defaultTitle !== '')) {
        resultList = (
            <ul className="results">
                {props.results.map(item => (
                    <body>
                              
                    <ListItem selected
                    onClick={() => props.clicked(item)}>
                        {item}
                    </ListItem>
                    <br></br>
                    </body>
                ))}
            </ul>
        )
    }

    return (
        <div className="search">
            <TextField style={{textAlign: 'left', margin: 'auto', paddingBottom: 10, width: '75%'}} type="search" name="movie-search" value={props.defaultTitle} onChange={props.search} placeholder="Book Title" required variant="outlined" label="Book Title"/>
            {resultList}
        </div>
    );
};

export default BookSearch