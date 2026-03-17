import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  // Types
  type Course = {
    #bPharm;
    #pharmD;
    #mPharm;
  };

  type Enquiry = {
    applicantName : Text;
    email : Text;
    phone : Text;
    courseOfInterest : Course;
    cityState : Text;
    message : Text;
  };

  module Enquiry {
    public func compare(e1 : Enquiry, e2 : Enquiry) : Order.Order {
      Text.compare(e1.applicantName, e2.applicantName);
    };
  };

  // Persistent Data Structure
  let enquiries = Map.empty<Nat, Enquiry>();
  var nextId = 0;

  public shared ({ caller }) func submitEnquiry(applicantName : Text, email : Text, phone : Text, courseOfInterest : Course, cityState : Text, message : Text) : async () {
    let enquiry : Enquiry = {
      applicantName;
      email;
      phone;
      courseOfInterest;
      cityState;
      message;
    };
    enquiries.add(nextId, enquiry);
    nextId += 1;
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    enquiries.values().toArray().sort();
  };
};
