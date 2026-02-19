import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  // Legacy type from old system, using Set instead of List
  type OldActor = {
    userLists : Map.Map<Principal, Set.Set<Text>>;
  };

  // New Actor type uses List
  type NewActor = {
    userLists : Map.Map<Principal, List.List<Text>>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserLists = old.userLists.map<Principal, Set.Set<Text>, List.List<Text>>(
      func(_principal, oldSet) {
        let newList = List.empty<Text>();
        for (text in oldSet.values()) {
          newList.add(text);
        };
        newList;
      }
    );
    { userLists = newUserLists };
  };
};
