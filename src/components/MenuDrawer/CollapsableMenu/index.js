import React, { Fragment, useState } from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CollapsableMenuItem from "./CollapsableMenuItem";
import uuid from "uuid/v4";

import AddDialog from "../../AddDialog";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const CollapsableMenu = ({
  dispatchMenuItemSelected,
  dispatchMenuItems,
  items,
  label,
  type,
  icon,
  menuItemSelected,
  inboxItem,
  handleDrawerClick
}) => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(true);

  const handleClick = () => {
    setNestedOpen(!nestedOpen);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary={label} />
        {nestedOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items
            // Don't show Inbox in project menu
            .filter(item => item.name !== "Inbox")
            .map(item => (
              <CollapsableMenuItem
                key={uuid()}
                dispatchMenuItemSelected={dispatchMenuItemSelected}
                dispatchMenuItems={dispatchMenuItems}
                name={item.name}
                id={item.id}
                type={type}
                icon={icon}
                menuItemSelected={menuItemSelected}
                inboxItem={inboxItem}
                handleDrawerClick={handleDrawerClick}
              />
            ))}
          <ListItem
            button
            className={classes.nested}
            onClick={handleDialogOpen}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Add ${label.substring(0, label.length - 1)}`}
            />
          </ListItem>
        </List>
      </Collapse>
      <AddDialog
        dispatchMenuItems={dispatchMenuItems}
        items={items}
        open={dialogOpen}
        handleClose={handleDialogClose}
        type={type}
        label={`${label.substring(0, label.length - 1)}`}
      />
    </Fragment>
  );
};

export default CollapsableMenu;
