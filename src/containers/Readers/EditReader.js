import React, { Component } from 'react';

class EditReader extends React.Component {
    render() {
        return(
            <div>
            <form onSubmit={this.handleSubmit} align="center">
                <div class="form-group row">
                <label >First Name:</label><input type="text" /><br/>
                </div>
                <div class="form-group row">

                <label>Last Name:<input type="text" /></label><br/>
                </div>
                <div class="form-group row">

                <label>Middle Name:<input type="text" /></label><br/>
                </div>

                <div class="form-group row">

                <label>Barcode:<input type="text" unselectable="true" /></label><br/>
                </div>

                <div class="form-group row">
                <input type="submit" value="Update" />
                </div>
                
            </form>
            </div>
       
		)
	}
}
export default EditReader;