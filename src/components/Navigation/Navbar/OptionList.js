import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import LibraryIcon from '@material-ui/icons/AccountBalance';
import ReaderIcon from '@material-ui/icons/Face';
import LibrarianIcon from '@material-ui/icons/People';
import AdminIcon from '@material-ui/icons/AccountBox';
import GraphIcon from '@material-ui/icons/Assessment';
import NavigationItem from '../NavigationItem/NavigationItem'
import Divider from '@material-ui/core/Divider';


export const OptionList = (
      <div>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText> <NavigationItem link='/' /* active */ exact>Home</NavigationItem></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText><NavigationItem link='/books' /* active */ exact>Books</NavigationItem></ListItemText> 
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LibraryIcon />
            </ListItemIcon>
            <ListItemText><NavigationItem link='/libraries' >Libraries</NavigationItem></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReaderIcon />
            </ListItemIcon>
            <ListItemText> <NavigationItem link='/readers' >Readers</NavigationItem></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LibrarianIcon />
            </ListItemIcon>
            <ListItemText> <NavigationItem link='/librarians' >Librarians</NavigationItem></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GraphIcon />
            </ListItemIcon>
            <ListItemText> <NavigationItem link='/statistics' >Statistics</NavigationItem></ListItemText>
          </ListItem>
          
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <AdminIcon/>
            </ListItemIcon>
            <ListItemText> <NavigationItem link='/admin' >Administrators</NavigationItem></ListItemText>
          </ListItem>
      </div>
    );

