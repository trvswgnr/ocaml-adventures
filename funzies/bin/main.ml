module Option = struct
  include Option

  let unwrap_or default = function Some s -> s | None -> default
end

module Debug = struct
  module type ToString = sig
    type t

    val to_string : t -> string
  end

  let print (type a) (module M : ToString with type t = a) (x : a) =
    M.to_string x |> print_endline
end

module Animal = struct
  module Dog = struct
    type t = { name : string; age : int }

    let to_string { name; age } = Printf.sprintf "dog named %s, age %d" name age
  end

  module Crab = struct
    type t = Hermit | King | Dungeness

    let to_string = function
      | Hermit -> "hermit crab"
      | King -> "king crab"
      | Dungeness -> "dungeness crab"
  end

  (** Camels can have any number of humps *)
  module Camel = struct
    type t = int

    let to_string = function
      | 0 -> Some "camel with no humps"
      | 1 -> Some "camel with 1 hump"
      | 2 -> Some "camel with 2 humps"
      | _ -> None
  end

  type t = Dog of Dog.t | Crab of Crab.t | Camel of Camel.t

  let to_string = function
    | Dog info -> Dog.to_string info
    | Crab kind -> Crab.to_string kind
    | Camel humps ->
        Camel.to_string humps
        |> Option.unwrap_or "freak ass camel shouldn't even be allowed to exist"
end

module Main = struct
  Random.self_init ()

  let animal =
    match Random.int 3 with
    | 0 -> Animal.Dog { name = "jackson"; age = 12 }
    | 1 -> Animal.Camel (Random.int 5)
    | 2 ->
        Animal.Crab
          (match Random.int 3 with
          | 0 -> Animal.Crab.Hermit
          | 1 -> Animal.Crab.King
          | 2 -> Animal.Crab.Dungeness
          | _ -> failwith "unreachable")
    | _ -> failwith "unreachable"
end

let () = Debug.print (module Animal) Main.animal
