import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


class My_View extends React.Component {
    state = {
        currentlocation: 0,
    };

    handleNext = () => {
        this.setState(prevState => ({
            currentlocation: prevState.currentlocation + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            currentlocation: prevState.currentlocation - 1,
        }));
    };

    render() {
        const { currentlocation } = this.state;

        return (
            <div className="gallery">


                    <img className="img" src={`https://ipfs.io/ipfs/${this.props.image[currentlocation]}`} alt="..." />

                        <MobileStepper
                        variant="progress"
                        steps={6}
                        position="static"
                        currentlocation={this.state.currentlocation}
                        nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={this.state.currentlocation === this.props.length - 1}>
                        Next
                        {this.props.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                        backButton={
                        <Button size="small" onClick={this.handleBack} disabled={this.state.currentlocation === 0}>
                        {this.props.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                        </Button>






                    }
                />
            </div>
        );
    }
}


export default My_View;