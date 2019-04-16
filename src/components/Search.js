import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField/';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import "./search.css"



const styles = theme => ({
  field: {
    textAlign: 'left',
    margin: 'auto',
    paddingBottom: 10,
    width: '75%',
  },
});

const Search = (props) => {
    let resultList = null

    if (props.searching && (props.defaultTitle !== '')) {
        resultList = (
            <ul className="results">
                {props.results.map(item => (
                    <body>
                              
                    <ListItem selected
                     key={item.imdbID} onClick={() => props.clicked(item)}>
                        {item.Title}
                    </ListItem>
                    <br></br>
                    </body>
                ))}
            </ul>
        )
    }

    return (
        <div className="search">
            <TextField style={{textAlign: 'left', margin: 'auto', paddingBottom: 10, width: '75%'}} type="search" name="movie-search" value={props.defaultTitle} onChange={props.search} placeholder="Movie Title" required variant="outlined" label="Movie Title"/>
            {resultList}
        </div>
    );
};

export default Search