export class Credential {
    email:string;
    pass:string;

    constructor(email:string, pass:string){
        this.email = email;
        this.pass = pass;
    }

    public GetEmail():string{
        return this.email;
    }

    public GetPass():string{
        return this.pass;
    }
}
