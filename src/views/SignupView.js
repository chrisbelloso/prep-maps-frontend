import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

import {
  Navbar,
  Nav,
  Container,
  InputGroup,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";

import { useLoadScript } from "@react-google-maps/api";

import { Animated } from "react-animated-css";
import { useEffect, useState } from "react";
import { signupUser } from "../services/UserServices";
import { useHistory } from "react-router";

const libraries = ["places"];

const SignupView = () => {
  const history = useHistory();
  const [currentAddress, setCurrentAddress] = useState("");
  const [newUsuer, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    website: "",
    PrEP: false,
    PEP: false,
    insurance: false,
    testing: false,
    longitude: 0,
    latitude: 0,
  });

  const handleChange = (event) => {

    console.log(event.target.checked)

    if (
      event.target.checked === true &&
      (event.target.name === "PrEP" ||
        event.target.name === "PEP" ||
        event.target.name === "insurance" ||
        event.target.name === "testing")
    ) {
      setNewUser({
        ...newUsuer,
        [event.target.name]: true,
      });
    } else if (
      event.target.checked === false  &&
      (event.target.name === "PrEP" ||
        event.target.name === "PEP" ||
        event.target.name === "insurance" ||
        event.target.name === "testing")
    ) {
      setNewUser({
        ...newUsuer,
        [event.target.name]: false,
      });
    } else {
      setNewUser({
        ...newUsuer,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const userResponse = await signupUser(newUsuer);
    setNewUser({
      email: "",
      password: "",
      name: "",
      address: "",
      phone: "",
      website: "",
      PrEP: false,
      PEP: false,
      insurance: false,
      testing: false,
      longitude: 0,
      latitude: 0,
    });
    history.push("/");
  };

  const Search = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: {
          lat: () => 25.76585949266363,
          lng: () => -80.19816792343089,
        },
        radius: 10 * 1000,
      },
    });

    useEffect(() => {
      setValue(currentAddress, false);
    }, []);

    return (
      <div className="search">
        <Combobox
          onSelect={async (address) => {
            setCurrentAddress(address);
            clearSuggestions();

            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              setNewUser({
                ...newUsuer,
                address: results[0].formatted_address,
                latitude: lat,
                longitude: lng,
              });

              console.log(results);
            } catch (error) {
              console.log("error");
            }
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
          />
          <ComboboxPopover
            style={{ listStyleType: "none" }}
            className="search-field"
          >
            {status === "OK" &&
              data.map(({ id, description }) => (
                <div key={id}>
                  <ComboboxOption value={description} />
                </div>
              ))}
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <Animated>
      <div className="signup-form">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Create password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Enter password that is at least 8 characters long
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name of practice</Form.Label>
            <Form.Control name="name" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Search />
            {/* <Form.Control name="address" onChange={handleChange} /> */}

            {/* <InputGroup
            className="mb-3"
            style={{ marginTop: "9px", width: "70%" }}
          >
            <FormControl
              style={{ height: "30px" }}
              placeholder="Latitude"
              type="number"
              name="latitude"
              onChange={handleChange}
            />
            <FormControl
              style={{ height: "30px" }}
              placeholder="Longitude"
              type="number"
              name="longitude"
              onChange={handleChange}
            />
          </InputGroup> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone number</Form.Label>
            <Form.Control name="phone" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Website</Form.Label>
            <Form.Control name="website" onChange={handleChange} />
          </Form.Group>

          <br />

          <Form.Check
            className="grid-elem"
            type="checkbox"
            id={"default-checkbox"}
            label="Do you offer PrEP?"
            name="PrEP"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Read <a href="">here</a> to learn more about PrEP
          </Form.Text>
          <br />
          <br />
          <Form.Check
            className="grid-elem"
            type="checkbox"
            id={"default-checkbox"}
            label="Do you offer PEP?"
            name="PEP"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Read <a href="">here</a> to learn more about PEP
          </Form.Text>
          <br />
          <br />

          <Form.Check
            className="grid-elem"
            type="checkbox"
            id={"default-checkbox"}
            label="Do you require insurance?"
            name="insurance"
            onChange={handleChange}
          />
          <br />
          <Form.Check
            className="grid-elem"
            type="checkbox"
            id={"default-checkbox"}
            label="Do you offer HIV testing?"
            name="testing"
            onChange={handleChange}
          />
          <br />
          <br />
          <div className="center">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </Animated>
  );
};

export default SignupView;
