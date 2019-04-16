import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField/';
import List from '@material-ui/core/List';


const Search = (props) => {
    let resultList = null

    if (props.searching && (props.defaultTitle !== '')) {
        resultList = (
            <ul className="results">
                {props.results.map(item => (
                    <List>
                    <li key={item.imdbID} onClick={() => props.clicked(item)}>
                        {item.Title}
                    </li>
                    </List>
                ))}
            </ul>
        )
    }

    return (
        <div className="search">
            <TextField type="search" name="movie-search" value={props.defaultTitle} onChange={props.search} />
            {resultList}
        </div>
    );
};

export default Search