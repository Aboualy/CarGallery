pragma solidity ^0.4.23;

contract CustomerContract {
    struct Customer {

        uint256 id;
        string ownerFullName;
        string carMake;
        string carModel;
        string extraDe;
        string[] photos;
        bool exist;

    }
    mapping(uint256=> Customer) public customers;
    uint256[] public customerIndex;


    function getNumOfPhotos(uint256 index) public view returns(uint256) {
        if(!isCustomer(index)) revert();
        return customers[index].photos.length;
    }


    // update an image by index
    function addCustomerPhotos(uint256 index, string carImage) public {
        customers[index].photos.push(carImage);
       // Customer memory  appendedCustomerImages = customers[index];
        //customers[index].photos[_index] = _carImg;
    }

   // update an image by index
    function updateCustomerPhotos(uint256 index, uint256 _index, string _carImg) public {
        //Customer storage  customerImages =
        customers[index].photos[_index] = _carImg;
    }

    //Getter methods are marked view.
    // Solidity can't return string arrays. So we'll have to provide the Image index of the piece of data we want
    function getCustomerPhotos(uint256 index, uint256 _ImgIndex) public view returns (string) {
        Customer storage customer = customers[index];
        return (customer.photos[_ImgIndex]);
        //return customers[index].data[_carImg];
    }


    /*function getNumOfPhotos(uint256 index) public returns (uint256) {
        Customer storage customer = customers[index];
        return customer.photos.length;
    }
    */


    function getCustomer(uint256 index) public view returns (uint256, string , string , string , string ) {
        Customer storage customer = customers[index];
        return (customer.id, customer.ownerFullName, customer.carMake, customer.carModel, customer.extraDe);
    }


    function isCustomer(uint256 index) public constant returns(bool isIndeed) {
        if(customerIndex.length == 0) return false;
        return (customerIndex[customers[index].id] == index);
    }


    function deleteCustomer(uint256 index) public returns(bool success) {
        if(!isCustomer(index)) revert();
        uint256 rowToDelete = customers[index].id;
        uint256 keyToMove   = customerIndex[customerIndex.length-1];
        customerIndex[rowToDelete] = keyToMove;
        customers[keyToMove].id = rowToDelete;
        delete customers[keyToMove];
        customerIndex.length--;
        return true;
    }



    //Good to know !!
    //that  If you use memory, then you're making a copy of the struct in memory and then updating that.
    // and If you use " storage ", you'll get a reference to the struct in storage, so your modifications will be persisted.
    function createCustomer(uint256 index, string _fullName,string _carMake,string _carModel,string _extraDe) public {
        Customer storage customer = customers[index];
        require(!customer.exist);

        /*
        //Another way of creating a new customer but since solidity does not accept string [], so cannot this way use it in my case
        customers[index] = Customer({
            id:index,
            ownerFullName: _fullName,
            carMake: _carMake,
            carModel: _carModel,
            extraDe: _extraDe,
            photos: ???,   <------ !!
            exist: true

            });
         */
        customers[index].id = index;
        customers[index].ownerFullName = _fullName;
        customers[index].carMake = _carMake;
        customers[index].carModel = _carModel;
        customers[index].extraDe = _extraDe;
        customers[index].exist = true;
        customerIndex.push(index);
    }



    // Getting the length of the customer array which represent the number of customers save in blockchain
    function getNumOfCustomers() public returns (uint256) {
        return customerIndex.length;
    }


    //Updating customers by index
    function updateCustomer(uint256 index, string _fullName,string _carMake,string _carModel,string _extraDe) public {
        // A shorter way to update a customer
       // Customer memory  updatedCustomer = Customer(index, _fullName, _carMake, _carModel, _extraDe, false);
        if(!isCustomer(index)) revert();
        customers[index].ownerFullName = _fullName;
        customers[index].carMake = _carMake;
        customers[index].carModel = _carModel;
        customers[index].extraDe = _extraDe;
        customers[index].exist = false;

    }


}