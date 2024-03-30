import Bool "mo:base/Bool";
import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

actor Registry {

  func natHash(n : Nat) : Hash.Hash {
    Text.hash(Nat.toText(n));
  };

  // Databases
  var persons = Map.HashMap<Nat, Person>(0, Nat.equal, natHash);
  var requests = Map.HashMap<Nat, Request>(0, Nat.equal, natHash);

  // Data Types
  type Person = {
    name : Text;
    surname : Text;
    tcNo : Nat;
    reason : Text;
    // description : ?Text;
  };

  type Request = {
    person : Person;
    isOpened : Bool;
    amount : Nat;
  };

  // Registration Process
  public shared func register(name : Text, surname : Text, tcNo : Nat, reason : Text) : async () {
    let person : Person = {
      name;
      surname = surname;
      tcNo = tcNo;
      reason = reason;
      // description = description;
    };

    persons.put(tcNo, person);
    requests.put(tcNo, { person = person; isOpened = true; amount = 0 });
  };

  // Listing Registered Persons
  public func getRegisteredPersons() : async [Person] {
    let filteredRequests = Iter.filter(requests.vals(), func(request : Request) : Bool { request.isOpened });
    let mappedRequests = Iter.map(filteredRequests, func(request : Request) : Person { request.person });
    return Iter.toArray(mappedRequests);
  };

  public func getHelpedPersons() : async [Person] {
    let filteredRequests = Iter.filter(requests.vals(), func(request : Request) : Bool { request.isOpened == false });
    let mappedRequests = Iter.map(filteredRequests, func(request : Request) : Person { request.person });
    return Iter.toArray(mappedRequests);
  };

  public func sendHelp(tcNo : Nat, amount : Nat) : async () {
    ignore do ? {
      let request = requests.get(tcNo);

      if (request != null) {
        requests.put(tcNo, { person = request!.person; isOpened = false; amount = amount });
      };
    };
  };
};
