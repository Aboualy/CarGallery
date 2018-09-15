import User from "./User";
import React from 'react';
import account from "../connector/account";
import contract from "../connector/contract";
import ipfs from './ipfs'
class Users extends React.Component {


    change = async updatedValue => {
        const instance = await contract;
        const acc = await account;
        //const images = updatedValue[Object.keys(updatedValue)[5]];
        const id = updatedValue.id;
        const fName = updatedValue.ownerFullName;
        const cMake = updatedValue.carMake;
        const cM = updatedValue.carModel;
        const exD = updatedValue.extraDes;
        const photos = updatedValue.photos;

        /*this.setState({
            users: {
                ...this.state.users,
                id: id,
                ownerFullName: fName,
                carMake:cMake,
                carModel: cM,
                extraDes:exD,
                photos:i,
            },
        });
        */
        if (photos.length >= 0) {
        photos.map(img => {

            ipfs.files.add(img, (error, result) => {
                if(error) {
                    console.error(error)
                    return
                }

                instance.addCustomerPhotos(id,result[0].hash,{from: acc})

            })
        })} else {

            ipfs.files.add(photos, (error, result) => {
                if(error) {
                    console.error(error)
                    return
                }

                instance.addCustomerPhotos(id,result[0].hash,{from: acc})
        })}

        await instance.createCustomer(id, fName, cMake, cM,exD,{from: acc});

    };


   /* handleSubmit = async e => {
        e.preventDefault();
        var arr=[];

        const instance = await contract;
        const {id} = this.state.users;


        await instance.getNumOfCustomers.call().then((number) =>{

            const cnum = number.c[0];
            for(let i =0; i <cnum; i++) {

                instance.getCustomerPhotos.call(1, 0).then((image) => {

                    arr.push(image);

                });
            }
            this.setState({ cnum: cnum});
        });

        this.setState({ipfsHash: arr});

        await instance.getNumOfPhotos.call(0).then((number) =>{

           const num = number.c[0];
            this.setState({ num: num});
        });

    }*/



    render() {

        return <div>
            <User doChange={data => this.change(data)}/>
        </div>

                }
}

export default Users;