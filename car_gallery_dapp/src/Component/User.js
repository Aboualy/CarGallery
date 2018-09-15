import React from 'react';
import TextField from "material-ui/TextField";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../App.css';
import Icon from '@material-ui/core/Icon';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        fontFamily: "Monaco",
    },
    input: {
        display: 'none',

    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },

    textField: {
        marginRight: theme.spacing.unit,
        width: 200,
    },


});

class User extends React.Component{
constructor(props){
    super(props);
    this.state =  {
        user : {
            id: 0,
            ownerFullName: "",
            carMake:"",
            carModel: "",
            extraDes:"",
            photos:[],
        },

        errors:{
            ownerFullNameError: "",
            carMakeError: "",
            carModelError: "",
            extraDesError: "",
            photosError: "",
    }}}

    validateFields = () => {
        let errorFound = false;
        const {errors} = this.state;
        const {user} = this.state;


        if(user.ownerFullName.length  < 4){
            errorFound  = true;
            errors.ownerFullNameError = "Please enter a valid name";
        }

        if(typeof user.ownerFullName !== "undefined"){
            if(!user.ownerFullName.match(/^[a-zA-Z]+$/)){
                errorFound  = true;
                errors.ownerFullNameError = "Please enter only alphabetical letters.";
            }
        }

        if(!user.carMake ){
            errorFound  = true;
            errors.carMakeError = "Please enter a valid car make";
        }
        if(!user.carModel){
            errorFound  = true;
            errors.carModelError = "Please enter a valid car model";
        }

        if(user.extraDes.length  < 5){
            errorFound  = true;
            errors.carModelError = "Cannot be empty";
        }


        if (typeof user.photos === 'undefined' || user.photos.length <= 0){
            errorFound  = true;
            errors.photosError = "Please upload an image";
        }


        this.setState({
            ...this.state.errors,
            ...errors
        });
        return errorFound;
     }


    handleChange = (event) =>{


        this.setState({
            user: {
                ...this.state.user, [event.target.name] : event.target.value
            }
        } );

    }

    handleSubmit = event => {
        event.preventDefault();
        const error = this.validateFields();
        if (!error) {
        const {user} = this.state;


        this.props.doChange(user);
        // last thing here is gonna be to reset state after submition

        this.setState(prevState =>({
            user: {
                ...this.state.user,   id: prevState.user.id + 1, ownerFullName: "", carMake: "", carModel: "",  extraDes:"", photos: [],

            }
        } ));

    }}



    savePhotos = (event)=> {

        const _img = event.target.files;
        const len = _img.length;
        for(let i = 0; i < len; i++) {
            let reader = new FileReader();
            let file = _img[i];
            reader.onloadend = () => {
                let user = Object.assign({}, this.state.user);
                user.photos = this.state.user.photos.concat(Buffer(reader.result)) ;
                this.setState({user});
            }

            reader.readAsArrayBuffer(file);
        }

    }



    render(){

        const { classes } = this.props;
        const {ownerFullName} = this.state.user;
        const {carModel} = this.state.user;
        const {carMake} = this.state.user;
        const {extraDes} = this.state.user;
        return(

                <fieldset className="split left">
                <h5 className="head" style={{fontFamily: "Monaco"}}>Registration Form</h5>
                <form onSubmit={this.handleSubmit}>

                    <TextField
                        style={{fontFamily: "Monaco"}}
                        name="ownerFullName"
                        floatingLabelText="Full Name"
                        value={ownerFullName}
                        onChange={event => this.handleChange(event)}
                        floatingLabelFixed

                    />

                    <br/>
                    <span className="form-span">{this.state.errors.ownerFullNameError}</span>
                    <TextField style={{fontFamily: "Monaco"}}
                        name="carMake"
                        floatingLabelText="Car Make"
                        value={carMake}
                        onChange={this.handleChange.bind(this)}
                        floatingLabelFixed
                    />

                    <br/>
                    <span className="form-span">{this.state.errors.carMakeError}</span>
                    <TextField style={{fontFamily: "Monaco"}}
                        name="carModel"
                        floatingLabelText="Car Model"
                        value={carModel}
                        onChange={this.handleChange.bind(this)}
                        floatingLabelFixed
                    />
                    <br/><span className="form-span">{this.state.errors.carModelError}</span><br/>
                    <TextField style={{fontFamily: "Monaco"}}
                        name= "extraDes"
                        hintText="Additional description"
                        multiLine={true}
                        rows={2}
                        rowsMax={3}
                        value={extraDes}
                        className={classes.textField}
                        onChange={this.handleChange.bind(this)}
                        floatingLabelFixed={true}
                    />
                    <br/>
                    <span className="form-span">{this.state.errors.extraDesError}</span>
                    <br/>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="outlined-button-file"
                        multiple
                        type="file"
                        onChange = {event => this.savePhotos(event)}
                    />
                    <label htmlFor="outlined-button-file">
                        <Button variant="outlined" color="primary" component="span" className={classes.button} >
                            Upload
                        </Button>
                    </label>
                    <br />
                    <span className="form-span">{this.state.errors.photosError}</span>
                    <br />
                    <Button  type="submit" variant="contained" size="small" color="primary" className={classes.button}>
                        Send
                        <Icon className={classes.rightIcon}>send</Icon>
                    </Button>


                </form>

                </fieldset>

            );
    }

}
export default withStyles(styles) (User);