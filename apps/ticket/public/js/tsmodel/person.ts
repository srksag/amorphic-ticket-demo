import {Supertype, supertypeClass, property} from 'amorphic';
import {TicketItem} from './ticketItem';
import {Principal} from "./Principal";
console.log("Compiling Person");

@supertypeClass
export class Person extends Principal {

    @property({length: 40, rule: ["name", "required"]})
    firstName:          string = "";

    @property({length: 40, rule: ["name", "required"]})
    middleName:         string = "";

    @property({length: 40, rule: ["name", "required"]})
    lastName:           string = "";     //value: "", length: 40, rule: ["name", "required"]},

    // Secure data elements never transmitted in both directions
    @property({toServer: false, length: 200})
    email:              string = "";

    // Relationships
    @property({type: TicketItem})
    ticketItems:        Array<TicketItem> = [];

    constructor  (email: string, first: string, middle: string, last: string) {
        super();
        this.firstName = first || "";
        this.middleName = middle || "";
        this.lastName = last || ""
        this.email = email || "";
    };

    getFullName () {
        return this.firstName + (this.middleName ? " " + this.middleName  + " ": " ") + this.lastName;
    };

    save () {
        return this.persistSave();
    };

    remove () {
        //if (this.getSecurityContext().isAdmin())
            return this.persistDelete();
        //else
        //    return Q(false);
    };

};
