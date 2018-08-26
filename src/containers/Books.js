import React from 'react';
import * as BookAPI from './BookAPI';


const api = "https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test";
class Books extends React.Component {

    // componentDidMount(){
    //     fetch(`${api}/book`)
    //     .then(res => res.json())
    //     .then(data => console.log("====="+JSON.stringify(data)))

    //     // BookAPI.getAll
    //     // .then((data) => console.log(JSON.stringify(data)))
    // }

    render() {
        return(<h1>Books Page</h1>
		)
	}
}
export default Books;