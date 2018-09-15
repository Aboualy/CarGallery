import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton/IconButton";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import './Gallery.css';
class My_Dialog extends React.Component {
    state = {
        open: false,
    };

    onOpen = () => {
        this.setState({ open: true });
    };

    onClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <IconButton size="large" color="primary" className="button" component="span" onClick={this.onOpen}>
                    <PhotoCamera />
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Vehicle's photos "}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.items && this.props.items.map((item, i ) => (
                                <img key={i} className="img" src={`https://ipfs.io/ipfs/${item}`} alt="Car" />
                            ))}

                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default My_Dialog;