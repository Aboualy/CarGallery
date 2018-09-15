import React from 'react';
import TextField from "material-ui/TextField";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../App.css';
import Icon from '@material-ui/core/Icon';
import contract from "../connector/contract";
import account from "../connector/account";
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

class Update extends React.Component{
    constructor(props){
        super(props);
        this.state =  {
            user : {
                id: this.props.index,
                ownerFullName: "",
                carMake:"",
                carModel: "",
                extraDes:"",

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



        this.setState({
            ...this.state.errors,
            ...errors
        });
        return errorFound;
    }


    /*getID =  updatedValue => {
        const id = updatedValue.id;
        this.setState({
            user: {
                ...this.state.user, id:id}})


    }*/

    myChange = (event) =>{


        this.setState({
            user: {
                ...this.state.user, [event.target.name] : event.target.value
            }
        } );

    }


    mySubmit = async event => {
        event.preventDefault();
        const instance = await contract;
        const acc = await account;
        const error = this.validateFields();
        if (!error) {
            const {user} = this.state;


                const id = user.id;
                const fName = user.ownerFullName;
                const cMake = user.carMake;
                const cM = user.carModel;
                const exD = user.extraDes;

                await instance.updateCustomer(id, fName, cMake, cM, exD, {from: acc});

                //alert("ID: "+id +" "+"FullName: "+fName);

            // last thing here is gonna be to reset state after submition*/

            this.setState(prevState =>({
                user: {
                    ...this.state.user,   ownerFullName: "", carMake: "", carModel: "",  extraDes:"",

                }
            } ));

        }}


    render(){

        const { classes } = this.props;
        const {ownerFullName} = this.state.user;
        const {carModel} = this.state.user;
        const {carMake} = this.state.user;
        const {extraDes} = this.state.user;
        return(

            <div>
                <h5 className="head" style={{fontFamily: "Monaco"}}>Registration Form</h5>
                <form onSubmit={this.mySubmit}>

                    <input
                        type="hidden"
                        name="id"
                        value={this.props.index}
                        onChange={event => this.myChange(event)}


                     />

                    <br/>
                    <TextField
                        style={{fontFamily: "Monaco"}}
                        name="ownerFullName"
                        floatingLabelText="Full Name"
                        value={ownerFullName}
                        onChange={event => this.myChange(event)}
                        floatingLabelFixed

                    />

                    <br/>
                    <span className="form-span">{this.state.errors.ownerFullNameError}</span>
                    <TextField style={{fontFamily: "Monaco"}}
                               name="carMake"
                               floatingLabelText="Car Make"
                               value={carMake}
                               onChange={this.myChange.bind(this)}
                               floatingLabelFixed
                    />

                    <br/>
                    <span className="form-span">{this.state.errors.carMakeError}</span>
                    <TextField style={{fontFamily: "Monaco"}}
                               name="carModel"
                               floatingLabelText="Car Model"
                               value={carModel}
                               onChange={this.myChange.bind(this)}
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
                               onChange={this.myChange.bind(this)}
                               floatingLabelFixed={true}
                    />
                    <br/>
                    <span className="form-span">{this.state.errors.extraDesError}</span>
                    <br/>

                    <Button  type="submit" variant="contained" size="small" color="primary" className={classes.button}>
                        Send
                        <Icon className={classes.rightIcon}>send</Icon>
                    </Button>


                </form>
                </div>


        );
    }

}
export default withStyles(styles) (Update);