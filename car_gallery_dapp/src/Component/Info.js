import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton/IconButton";
import InfoIcon from '@material-ui/icons/Info';

class Info extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <IconButton onClick={this.handleClickOpen}>
                    <InfoIcon />
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="title"
                    aria-describedby="dialog"
                >
                    <DialogTitle id="title">{"Vehicle's details "}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialog">

                            Car Owner Name: {this.props.value1}
                            <br/>
                            Car Make: {this.props.value2}
                            <br/>
                            Car Model: {this.props.value3}
                            <br/>
                            More details : {this.props.value4}
                            <br/>
                            <br/>

                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default Info;