import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Edit, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        width: '100%',
    }
}));

export const ListTodo = ({ todos, handleSelected, handleDelete, handleUpdate}) => {

    const classes = useStyles();

    return (
        <List className={classes.root}>
            {todos.map((value) => {
                const labelId = `checkbox-list-label-${value.title}`;

                return (
                    <ListItem key={value.title} role={undefined} dense button>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={value.complete}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.title} />
                        <ListItemText id={labelId} primary={value.description} />
                        <ListItemText id={labelId} primary={value.create_at} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" onClick={() => handleSelected(value)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="comments">
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};