import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">SCAN</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#">Libraries<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">librarians</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/books/index">Books</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/readers/index" onclick>Readers</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Statistics
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/addnewadmin" onclick>Add New Admin</a>
                </li>               
                {/* <Link to='/addnewadmin' className='add-new-admin'>Add New Admin</Link>*/}
              </ul>
            </div>
          </nav>
        );
    }
}
export default Navigation;