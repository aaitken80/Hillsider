class People {
    _id:string;
    title: string;
    firstName: string;
    surname: string;
    address1: string;
    address2: string;
    address3: string;
    postCode: string;
    emailAddress: string;
    homePhone: string;
    mobilePhone: string;
    createdDate: Date;
    status: string;

    constructor(
    ){
        this.title = ""
        this.firstName = ""
        this.surname = ""
        this.address1 = ""
        this.address2 = ""
        this.address3 = ""
        this.postCode = ""
        this.emailAddress = ""
        this.homePhone = ""
        this.mobilePhone = ""
        this.createdDate = new Date()
    }
}

export default People;